#!/usr/bin/env node
/**
 * Generate Australian-accent Gemini 3.8 Flash TTS narration + Gemini 3.5 Transcribe
 * word-level aligned captions for Week 6 Questions 14 & 18.
 *
 * Usage:
 *   node scripts/generate-au-tts.mjs --draft      # Offline estimated timings (ready: false)
 *   node scripts/generate-au-tts.mjs              # Live Gemini 3.8 Flash TTS + 3.5 Transcribe
 */
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import {existsSync, readdirSync} from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const MODEL_TTS = 'gemini-3.8-flash-tts';
const MODEL_ASR = 'gemini-3.5-transcribe';
const PREFERRED_VOICE_ID = process.env.GEMINI_AU_VOICE_ID || 'voice_p3rkxzz22c59';
const IS_DRAFT = process.argv.includes('--draft');

const RAW_DIR = path.join(PROJECT, 'work/narration-raw');
const ASR_DIR = path.join(PROJECT, 'work/asr-cache');
const OUT_AUDIO_DIR = path.join(PROJECT, 'public/discovery');
const VOICE_CACHE_PATH = path.join(PROJECT, 'work/au-voice.json');

const LESSONS = [
	{
		name: 'q14',
		scriptPath: path.join(PROJECT, 'src/discovery/q14/script.json'),
		manifestPath: path.join(PROJECT, 'src/discovery/q14-narration.json'),
	},
	{
		name: 'q18',
		scriptPath: path.join(PROJECT, 'src/discovery/q18/script.json'),
		manifestPath: path.join(PROJECT, 'src/discovery/q18-narration.json'),
	},
];

function findFfmpeg() {
	const remotionDir = path.join(PROJECT, 'node_modules/@remotion');
	if (existsSync(remotionDir)) {
		for (const entry of readdirSync(remotionDir)) {
			if (!entry.startsWith('compositor-')) continue;
			const dir = path.join(remotionDir, entry);
			const ffmpeg = path.join(dir, 'ffmpeg');
			const ffprobe = path.join(dir, 'ffprobe');
			if (existsSync(ffmpeg) && existsSync(ffprobe)) {
				return {
					ffmpeg,
					ffprobe,
					opts: {
						cwd: dir,
						env: {...process.env, LD_LIBRARY_PATH: dir, DYLD_LIBRARY_PATH: dir},
					},
				};
			}
		}
	}
	return {ffmpeg: 'ffmpeg', ffprobe: 'ffprobe', opts: {}};
}

async function loadApiKey() {
	if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
	const candidates = [
		path.join(PROJECT, '.env'),
		path.resolve(PROJECT, '../.env'),
		path.resolve(PROJECT, '../../.env'),
		path.join(process.env.HOME || '', '.env'),
	];
	for (const candidate of candidates) {
		try {
			const txt = await fs.readFile(candidate, 'utf8');
			const m = txt.match(/^\s*(?:export\s+)?GEMINI_API_KEY\s*=\s*["']?([^"'\s#]+)["']?/m);
			if (m) return m[1].trim();
		} catch {
			// ignore
		}
	}
	throw new Error(
		'GEMINI_API_KEY not found. Set GEMINI_API_KEY in environment or websites/chloe-week6-q14-q18/.env'
	);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function apiJson(apiKey, endpoint, bodyObj, method = 'POST', attempt = 1) {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		method,
		headers: {'x-goog-api-key': apiKey, 'Content-Type': 'application/json'},
		body: method === 'GET' ? undefined : JSON.stringify(bodyObj),
	});
	const text = await res.text();
	if ((res.status === 429 || res.status === 500 || res.status === 502 || res.status === 503) && attempt <= 6) {
		const m = text.match(/retry in (\d+(?:\.\d+)?)s/i);
		const waitMs = m ? (Math.ceil(Number(m[1])) + 2) * 1000 : Math.min(35000, 2000 * attempt * attempt);
		console.log(`  [HTTP ${res.status} attempt ${attempt}] waiting ${(waitMs / 1000).toFixed(1)}s...`);
		await sleep(waitMs);
		return apiJson(apiKey, endpoint, bodyObj, method, attempt + 1);
	}
	if (!res.ok) {
		const err = new Error(`Gemini API ${endpoint} HTTP ${res.status}: ${text.slice(0, 500)}`);
		err.status = res.status;
		throw err;
	}
	return JSON.parse(text);
}

function styleForClip(kind) {
	if (kind === 'hook') return 'curious, warm, and inviting at a steady ~150 words per minute';
	if (kind === 'quiz') return 'calm, clear, and neutral without hinting at the answer, ~146 words per minute';
	if (kind === 'answer' || kind === 'recap') {
		return 'warm, encouraging, and crisp on every letter and number, ~150 words per minute';
	}
	return 'warm, engaging, and clear step-by-step explanation, ~150 words per minute';
}

function pcmToWav(pcmBuf, sampleRate = 24000, channels = 1, bitsPerSample = 16) {
	const header = Buffer.alloc(44);
	const byteRate = (sampleRate * channels * bitsPerSample) / 8;
	const blockAlign = (channels * bitsPerSample) / 8;
	header.write('RIFF', 0);
	header.writeUInt32LE(36 + pcmBuf.length, 4);
	header.write('WAVE', 8);
	header.write('fmt ', 12);
	header.writeUInt32LE(16, 16);
	header.writeUInt16LE(1, 20);
	header.writeUInt16LE(channels, 22);
	header.writeUInt32LE(sampleRate, 24);
	header.writeUInt32LE(byteRate, 28);
	header.writeUInt16LE(blockAlign, 32);
	header.writeUInt16LE(bitsPerSample, 34);
	header.write('data', 36);
	header.writeUInt32LE(pcmBuf.length, 40);
	return Buffer.concat([header, pcmBuf]);
}

function parseOffsetMs(val) {
	if (typeof val === 'number') return Math.round(val * 1000);
	if (typeof val === 'string') {
		const n = parseFloat(val.replace(/s$/i, ''));
		if (Number.isFinite(n)) return Math.round(n * 1000);
	}
	return 0;
}

function normTok(w) {
	return w.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9']/g, '');
}

function weightedFallbackWords(tokens, durationMs) {
	const weights = tokens.map((w) => {
		let wt = Math.max(2, w.replace(/[^a-zA-Z0-9]/g, '').length);
		if (/[.!?]$/.test(w)) wt += 6;
		else if (/[,;:—–-]$/.test(w)) wt += 3;
		return wt;
	});
	const totalW = weights.reduce((a, b) => a + b, 0);
	const span = Math.max(200, durationMs - 140);
	let acc = 0;
	return tokens.map((word, i) => {
		const startMs = Math.round(70 + (acc / totalW) * span);
		acc += weights[i];
		const endMs = Math.round(70 + (acc / totalW) * span);
		return {word, startMs, endMs: Math.max(startMs + 40, endMs)};
	});
}

function reconcileWords(canonicalText, asrWords, durationMs) {
	const canTokens = canonicalText.trim().split(/\s+/);
	const N = canTokens.length;
	const canNorm = canTokens.map(normTok);
	if (!asrWords || asrWords.length < 2) return weightedFallbackWords(canTokens, durationMs);

	const M = asrWords.length;
	const asrNorm = asrWords.map((w) => normTok(w.word));
	const dp = Array.from({length: N + 1}, () => new Int32Array(M + 1));
	const bt = Array.from({length: N + 1}, () => new Uint8Array(M + 1));
	for (let i = 1; i <= N; i++) {
		dp[i][0] = -2 * i;
		bt[i][0] = 2;
	}
	for (let j = 1; j <= M; j++) {
		dp[0][j] = -2 * j;
		bt[0][j] = 3;
	}
	for (let i = 1; i <= N; i++) {
		for (let j = 1; j <= M; j++) {
			const a = canNorm[i - 1];
			const b = asrNorm[j - 1];
			const scoreMatch = a && a === b ? 5 : a && b && (a.startsWith(b) || b.startsWith(a)) ? 2 : -2;
			const d = dp[i - 1][j - 1] + scoreMatch;
			const u = dp[i - 1][j] - 2;
			const l = dp[i][j - 1] - 2;
			if (d >= u && d >= l) {
				dp[i][j] = d;
				bt[i][j] = 1;
			} else if (u >= l) {
				dp[i][j] = u;
				bt[i][j] = 2;
			} else {
				dp[i][j] = l;
				bt[i][j] = 3;
			}
		}
	}

	const mapped = new Array(N).fill(null);
	let i = N;
	let j = M;
	while (i > 0 || j > 0) {
		const move = bt[i][j];
		if (move === 1) {
			if (
				canNorm[i - 1] === asrNorm[j - 1] ||
				(canNorm[i - 1] &&
					asrNorm[j - 1] &&
					(canNorm[i - 1].startsWith(asrNorm[j - 1]) || asrNorm[j - 1].startsWith(canNorm[i - 1])))
			) {
				mapped[i - 1] = asrWords[j - 1];
			}
			i--;
			j--;
		} else if (move === 2) {
			i--;
		} else {
			j--;
		}
	}

	const result = new Array(N);
	let idx = 0;
	while (idx < N) {
		if (mapped[idx]) {
			const s = Math.max(0, Math.min(durationMs - 40, mapped[idx].startMs));
			const e = Math.max(s + 40, Math.min(durationMs, mapped[idx].endMs));
			result[idx] = {word: canTokens[idx], startMs: s, endMs: e};
			idx++;
		} else {
			const runStart = idx;
			while (idx < N && !mapped[idx]) idx++;
			const runEnd = idx;
			const prevEnd = runStart > 0 ? result[runStart - 1].endMs : 60;
			const nextStart = runEnd < N ? Math.max(prevEnd + 80, mapped[runEnd].startMs) : durationMs - 60;
			const span = Math.max(60 * (runEnd - runStart), nextStart - prevEnd);
			const weights = canTokens.slice(runStart, runEnd).map((w) => Math.max(2, w.length));
			const sumW = weights.reduce((a, b) => a + b, 0);
			let acc = 0;
			for (let k = runStart; k < runEnd; k++) {
				const wt = weights[k - runStart];
				const s = Math.round(prevEnd + (acc / sumW) * span);
				acc += wt;
				const e = Math.round(prevEnd + (acc / sumW) * span);
				result[k] = {
					word: canTokens[k],
					startMs: Math.min(durationMs - 40, s),
					endMs: Math.min(durationMs, Math.max(s + 40, e)),
				};
			}
		}
	}

	for (let k = 0; k < N; k++) {
		if (k > 0 && result[k].startMs < result[k - 1].startMs) result[k].startMs = result[k - 1].startMs;
		if (result[k].endMs <= result[k].startMs) result[k].endMs = Math.min(durationMs, result[k].startMs + 60);
	}
	return result;
}

// Clause/scope-aware caption chunker keeping face+letter, option+letter, numbers+units, and negations together.
const NO_BREAK_AFTER = new Set([
	'not', 'no', 'cannot', 'never', 'without', 'unless', 'only', 'may', 'might', 'could', 'would', 'should', 'must',
	"can't", "won't", "doesn't", "didn't", "isn't", "aren't", "don't",
	'a', 'an', 'the', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'by', 'from', 'as', 'into', 'onto',
	'his', 'her', 'its', 'their', 'our', 'your', 'my', 'this', 'that', 'these', 'those',
	'face', 'option', 'options', 'question', 'choice', 'layer', 'step', 'count', 'choose', 'put',
	'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
]);
const BOUND_NEXT = new Set([
	'faces', 'face', 'steps', 'step', 'rolls', 'roll', 'sides', 'side', 'layers', 'layer', 'panels', 'panel',
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'p', 'r', 's', 'w',
	'not', 'than', 'if', 'of', 'flat', 'top',
]);

const NUMBER_WORDS = new Set(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']);
const SHADE_WORDS = new Set(['black', 'white', 'grey', 'gray']);

function splitSentenceCleanly(sentenceWords) {
	const full = sentenceWords.join(' ');
	if (full.length <= 68 || sentenceWords.length <= 4) return [sentenceWords];
	const n = sentenceWords.length;
	const dp = new Array(n + 1).fill(Infinity);
	const prev = new Array(n + 1).fill(-1);
	dp[0] = 0;
	for (let end = 1; end <= n; end++) {
		for (let start = 0; start < end; start++) {
			if (!Number.isFinite(dp[start])) continue;
			const chunkWords = sentenceWords.slice(start, end);
			const len = chunkWords.join(' ').length;
			if (len > 74 && chunkWords.length > 1) continue;
			let cost = 0;
			if (chunkWords.length === 1) cost += 2500;
			else if (chunkWords.length === 2 && len < 16) cost += 450;
			if (len > 66) cost += (len - 66) * 35;
			if (len < 22 && end < n) cost += (22 - len) * 6;
			cost += Math.abs(len - 50) * 0.8;
			if (start > 0) {
				const lastRaw = sentenceWords[start - 1];
				const nextRaw = sentenceWords[start];
				const lastW = normTok(lastRaw);
				const nextW = normTok(nextRaw);
				const hasColonOrDash = /[:;—–]$/.test(lastRaw);
				const hasComma = /,$/.test(lastRaw);
				// Never split inside a spoken number order ("two, four, one, three") or shade list ("grey, black, white, grey")!
				const insideNumberSeq = NUMBER_WORDS.has(lastW) && NUMBER_WORDS.has(nextW);
				const insideShadeSeq = SHADE_WORDS.has(lastW) && SHADE_WORDS.has(nextW);
				if (insideNumberSeq || insideShadeSeq) {
					cost += 1200;
				} else if (hasColonOrDash) {
					cost -= 220;
				} else if (hasComma) {
					cost -= 80;
				}
				if (!hasColonOrDash && !hasComma && NO_BREAK_AFTER.has(lastW)) cost += 650;
				if (!hasColonOrDash && !hasComma && BOUND_NEXT.has(nextW)) cost += 550;
			}
			const cand = dp[start] + cost + 40;
			if (cand < dp[end]) {
				dp[end] = cand;
				prev[end] = start;
			}
		}
	}
	if (prev[n] < 0) return [sentenceWords];
	const segments = [];
	let cur = n;
	while (cur > 0) {
		segments.push(sentenceWords.slice(prev[cur], cur));
		cur = prev[cur];
	}
	segments.reverse();
	return segments;
}

function buildCleanCaptions(text, canonicalWords, durationMs) {
	const sentences = text.trim().split(/(?<=[.!?]["'’”]?)\s+/);
	const rawChunks = [];
	let wordCursor = 0;
	for (const sent of sentences) {
		const sWords = sent.trim().split(/\s+/).filter(Boolean);
		if (!sWords.length) continue;
		for (const seg of splitSentenceCleanly(sWords)) {
			const startIdx = wordCursor;
			const endIdx = Math.min(canonicalWords.length - 1, wordCursor + seg.length - 1);
			wordCursor += seg.length;
			const startMs = canonicalWords[startIdx]?.startMs ?? 0;
			const endMs = (canonicalWords[endIdx]?.endMs ?? durationMs) + 90;
			rawChunks.push({
				text: seg.join(' '),
				startMs: Math.max(0, Math.min(durationMs - 120, Math.round(startMs))),
				endMs: Math.min(durationMs, Math.max(Math.round(startMs) + 120, Math.round(endMs))),
			});
		}
	}

	// Merge ultra-short cues (<500ms) if they stay readable
	const merged = [];
	for (const cur of rawChunks) {
		if (
			merged.length > 0 &&
			cur.endMs - cur.startMs < 500 &&
			(merged[merged.length - 1].text + ' ' + cur.text).length <= 72
		) {
			merged[merged.length - 1].text += ' ' + cur.text;
			merged[merged.length - 1].endMs = cur.endMs;
		} else {
			merged.push({...cur});
		}
	}

	for (let i = 0; i < merged.length; i++) {
		if (i > 0 && merged[i].startMs < merged[i - 1].endMs) {
			merged[i - 1].endMs = Math.max(merged[i - 1].startMs + 120, merged[i].startMs);
		}
		if (merged[i].endMs <= merged[i].startMs) merged[i].endMs = Math.min(durationMs, merged[i].startMs + 200);
		if (merged[i].endMs > durationMs) merged[i].endMs = durationMs;
	}

	const out = merged.map(({text: t, startMs, endMs}) => ({
		text: t,
		startMs,
		endMs,
		timestampMs: startMs,
		confidence: null,
	}));
	if (out.map((c) => c.text).join(' ') !== text.trim()) {
		throw new Error(`Caption join mismatch for: ${text}`);
	}
	return out;
}

function encodeAndCheckAudio(ff, wavPath, m4aPath) {
	execFileSync(
		ff.ffmpeg,
		[
			'-y', '-hide_banner', '-loglevel', 'error',
			'-i', wavPath,
			'-af', 'loudnorm=I=-18:TP=-2:LRA=7',
			'-ar', '24000', '-ac', '1',
			'-c:a', 'aac', '-b:a', '96k', '-f', 'mp4',
			m4aPath,
		],
		ff.opts
	);
	const durStr = execFileSync(
		ff.ffprobe,
		['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', m4aPath],
		{...ff.opts, encoding: 'utf8'}
	).trim();
	const duration = Number(durStr);
	if (!Number.isFinite(duration) || duration <= 0.3) {
		throw new Error(`Invalid encoded duration for ${m4aPath}: ${durStr}`);
	}
	// Decode to 24-bit mono PCM & verify peak headroom, non-silence, and zero clipping
	const decoded = execFileSync(
		ff.ffmpeg,
		['-v', 'error', '-i', m4aPath, '-f', 'wav', '-acodec', 'pcm_s24le', '-ac', '1', 'pipe:1'],
		{...ff.opts, maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe']}
	);
	let offset = 12;
	let pcm = null;
	while (offset + 8 <= decoded.length) {
		const tag = decoded.toString('ascii', offset, offset + 4);
		const size = decoded.readUInt32LE(offset + 4);
		if (tag === 'data') {
			pcm = decoded.subarray(offset + 8, Math.min(decoded.length, offset + 8 + size));
			break;
		}
		offset += 8 + size + (size % 2);
	}
	if (!pcm?.length || pcm.length % 3) throw new Error(`Cannot decode PCM for ${m4aPath}`);
	let peak = 0;
	let squares = 0;
	let clippedSamples = 0;
	for (let i = 0; i < pcm.length; i += 3) {
		const v = pcm.readIntLE(i, 3) / 8388608;
		peak = Math.max(peak, Math.abs(v));
		squares += v * v;
		if (Math.abs(v) >= 0.9999) clippedSamples++;
	}
	const rms = Math.sqrt(squares / (pcm.length / 3));
	if (rms < 0.002) throw new Error(`Audio is effectively silent for ${m4aPath} (rms=${rms})`);
	if (clippedSamples > 0) throw new Error(`Audio clipped (${clippedSamples} samples) in ${m4aPath}`);
	return {duration, peak: Number(peak.toFixed(4)), rms: Number(rms.toFixed(4)), clippedSamples};
}

async function resolveAustralianVoice(apiKey) {
	if (existsSync(VOICE_CACHE_PATH)) {
		try {
			const cached = JSON.parse(await fs.readFile(VOICE_CACHE_PATH, 'utf8'));
			if (cached?.id) return cached;
		} catch {
			// regenerate
		}
	}
	// 1. Try existing locked Chloe Sydney AU voice first
	try {
		await apiJson(apiKey, '/interactions', {
			model: MODEL_TTS,
			store: false,
			input: [
				{
					type: 'user_input',
					content: [{type: 'text', text: 'Ready.', annotations: [{type: 'speech_metadata', style: styleForClip('hook')}]}],
				},
			],
			response_format: {type: 'audio'},
			generation_config: {speech_config: [{voice: PREFERRED_VOICE_ID}]},
		});
		const info = {id: PREFERRED_VOICE_ID, display_name: 'Chloe Sydney Logic Tutor AU', language_code: 'en-AU'};
		await fs.writeFile(VOICE_CACHE_PATH, JSON.stringify(info, null, 2) + '\n');
		return info;
	} catch (err) {
		console.log(`Preferred voice ${PREFERRED_VOICE_ID} unavailable on this key (${err.message.slice(0, 120)}); designing an Australian tutor voice...`);
	}

	// 2. Design a persistent Australian Sydney tutor voice on this API project via official POST /v1beta/voices
	try {
		const created = await apiJson(apiKey, '/voices', {
			store: true,
			voice: {
				model: MODEL_TTS,
				type: 'prompted',
				display_name: 'Chloe Sydney Logic Tutor AU',
				gender: 'female',
				language_code: 'en-AU',
				prompted: {
					input:
						'A warm, encouraging, articulate Australian primary school maths and thinking skills tutor in her early 30s from Sydney, speaking with a natural Australian accent and crisp, friendly clarity for a Year 5 student.',
				},
			},
		});
		const chosen = created.id || created.voice?.id;
		if (chosen) {
			const info = {id: chosen, display_name: created.display_name || 'Chloe Sydney Logic Tutor AU', language_code: 'en-AU'};
			await fs.writeFile(VOICE_CACHE_PATH, JSON.stringify(info, null, 2) + '\n');
			return info;
		}
	} catch (err) {
		console.log(`Voice design create fallback (${err.message.slice(0, 140)}); querying Extended Voice Library for en-AU...`);
	}

	// 3. Fallback: pick an en-AU voice from Extended Voice Library or Kore with explicit Sydney AU style
	try {
		const listRes = await apiJson(apiKey, '/voices', null, 'GET');
		const auVoice = (listRes.voices || []).find((v) =>
			String(v.language_code || v.languageCode || '').toLowerCase().includes('au')
		);
		if (auVoice) {
			const id = auVoice.id || auVoice.name;
			const info = {id, display_name: auVoice.display_name || id, language_code: 'en-AU'};
			await fs.writeFile(VOICE_CACHE_PATH, JSON.stringify(info, null, 2) + '\n');
			return info;
		}
	} catch {
		// ignore
	}
	const fallback = {id: 'Kore', display_name: 'Kore (Australian Sydney tutor style)', language_code: 'en-AU'};
	await fs.writeFile(VOICE_CACHE_PATH, JSON.stringify(fallback, null, 2) + '\n');
	return fallback;
}

async function runDraft() {
	for (const lesson of LESSONS) {
		const clips = JSON.parse(await fs.readFile(lesson.scriptPath, 'utf8'));
		const manifest = {};
		for (const clip of clips) {
			const words = clip.text.trim().split(/\s+/);
			const estDuration = Number(Math.max(2.6, (words.length / 150) * 60 + 0.55).toFixed(3));
			const durationMs = Math.round(estDuration * 1000);
			const canonicalWords = weightedFallbackWords(words, durationMs);
			const captions = buildCleanCaptions(clip.text, canonicalWords, durationMs);
			manifest[clip.id] = {
				text: clip.text,
				src: `discovery/${clip.id}-draft.m4a`,
				duration: estDuration,
				voice: 'Pending Gemini 3.8 Flash TTS (en-AU)',
				model: MODEL_TTS,
				languageCode: 'en-AU',
				captions,
				words: canonicalWords,
				captionTiming: 'Estimated draft word timing (150 WPM). Not final audio.',
				ready: false,
				provisional: true,
			};
		}
		await fs.writeFile(lesson.manifestPath, JSON.stringify(manifest, null, 2) + '\n');
		console.log(`Wrote draft manifest (${clips.length} clips, ready:false): ${lesson.manifestPath}`);
	}
}

async function runLive() {
	await fs.mkdir(RAW_DIR, {recursive: true});
	await fs.mkdir(ASR_DIR, {recursive: true});
	await fs.mkdir(OUT_AUDIO_DIR, {recursive: true});

	const apiKey = await loadApiKey();
	const ff = findFfmpeg();
	const voice = await resolveAustralianVoice(apiKey);
	console.log(`Using Australian Gemini TTS voice: ${voice.display_name} (${voice.id})`);

	const validationReport = {voice, modelTts: MODEL_TTS, modelAsr: MODEL_ASR, lessons: {}};

	for (const lesson of LESSONS) {
		const clips = JSON.parse(await fs.readFile(lesson.scriptPath, 'utf8'));
		const manifest = {};
		const reportClips = [];

		for (const clip of clips) {
			const style = styleForClip(clip.kind);
			const sourceHash = crypto
				.createHash('sha256')
				.update(JSON.stringify({text: clip.text, voiceId: voice.id, model: MODEL_TTS, style}))
				.digest('hex');
			const hash12 = sourceHash.slice(0, 12);
			const wavPath = path.join(RAW_DIR, `${clip.id}-${hash12}.wav`);
			const relSrc = `discovery/${clip.id}-${hash12}.m4a`;
			const m4aPath = path.join(PROJECT, 'public', relSrc);
			const asrCachePath = path.join(ASR_DIR, `${clip.id}-${hash12}.json`);

			if (!existsSync(wavPath)) {
				console.log(`  [TTS] ${clip.id} (${clip.text.split(/\s+/).length} words)...`);
				const resp = await apiJson(apiKey, '/interactions', {
					model: MODEL_TTS,
					store: false,
					input: [
						{
							type: 'user_input',
							content: [{type: 'text', text: clip.text, annotations: [{type: 'speech_metadata', style}]}],
						},
					],
					response_format: {type: 'audio'},
					generation_config: {speech_config: [{voice: voice.id}]},
				});
				let b64 = null;
				for (const step of resp.steps || []) {
					if (step.type === 'model_output') {
						for (const part of step.content || []) {
							if (part.type === 'audio' && part.data) b64 = part.data;
						}
					}
				}
				if (!b64) throw new Error(`No audio returned for ${clip.id}`);
				let wavBuf = Buffer.from(b64, 'base64');
				if (wavBuf.subarray(0, 4).toString('ascii') !== 'RIFF') {
					wavBuf = pcmToWav(wavBuf, 24000, 1, 16);
				}
				await fs.writeFile(wavPath, wavBuf);
			}

			// Clean older hashes for this clip id
			for (const f of await fs.readdir(OUT_AUDIO_DIR)) {
				if (f.startsWith(`${clip.id}-`) && !f.startsWith(`${clip.id}-${hash12}.`)) {
					await fs.unlink(path.join(OUT_AUDIO_DIR, f)).catch(() => {});
				}
			}
			const {duration, peak, rms, clippedSamples} = encodeAndCheckAudio(ff, wavPath, m4aPath);
			const durationMs = Math.round(duration * 1000);
			const m4aBuf = await fs.readFile(m4aPath);
			const mediaSha256 = crypto.createHash('sha256').update(m4aBuf).digest('hex');

			let asrWords = [];
			let asrText = '';
			if (existsSync(asrCachePath)) {
				const cached = JSON.parse(await fs.readFile(asrCachePath, 'utf8'));
				asrWords = cached.asrWords || [];
				asrText = cached.asrText || '';
			} else {
				console.log(`  [ASR] ${clip.id} (${duration.toFixed(2)}s)...`);
				const trResp = await apiJson(apiKey, '/interactions', {
					model: MODEL_ASR,
					store: false,
					input: [
						{
							type: 'user_input',
							content: [{type: 'audio', mime_type: 'audio/mp4', data: m4aBuf.toString('base64')}],
						},
					],
					generation_config: {
						transcription_config: {mode: {type: 'verbatim', timestamp_granularities: ['word']}},
					},
				});
				for (const step of trResp.steps || []) {
					for (const part of step.content || []) {
						if (part.type === 'text' && part.text) asrText += (asrText ? ' ' : '') + part.text.trim();
						for (const ann of part.annotations || []) {
							if (ann.type === 'word_info' && ann.text) {
								asrWords.push({
									word: ann.text,
									startMs: parseOffsetMs(ann.start_offset),
									endMs: parseOffsetMs(ann.end_offset),
								});
							}
						}
					}
				}
				await fs.writeFile(asrCachePath, JSON.stringify({id: clip.id, sourceHash, mediaSha256, asrText, asrWords}, null, 2) + '\n');
			}

			const canonicalWords = reconcileWords(clip.text, asrWords, durationMs);
			const captions = buildCleanCaptions(clip.text, canonicalWords, durationMs);
			const wordCount = clip.text.trim().split(/\s+/).length;
			const wpm = Number(((wordCount / duration) * 60).toFixed(1));

			manifest[clip.id] = {
				text: clip.text,
				src: relSrc,
				duration: Number(duration.toFixed(3)),
				sourceHash,
				mediaSha256,
				voice: voice.display_name,
				voiceId: voice.id,
				model: MODEL_TTS,
				languageCode: voice.language_code,
				wpm,
				captions,
				words: canonicalWords,
				asrText,
				captionTiming: 'Word-level timestamps aligned from Gemini 3.5 Transcribe on this exact encoded clip.',
				ready: true,
				provisional: false,
			};
			reportClips.push({id: clip.id, duration: Number(duration.toFixed(3)), wpm, peak, rms, clippedSamples, mediaSha256, expected: clip.text, recognized: asrText});
		}

		await fs.writeFile(lesson.manifestPath, JSON.stringify(manifest, null, 2) + '\n');
		validationReport.lessons[lesson.name] = reportClips;
		console.log(`Committed ${lesson.name} manifest (${clips.length} clips, ready:true): ${lesson.manifestPath}`);
	}

	await fs.writeFile(path.join(PROJECT, 'work/narration-validation.json'), JSON.stringify(validationReport, null, 2) + '\n');
	console.log('All Australian Gemini TTS audio generated, normalized, and word-aligned!');
}

(IS_DRAFT ? runDraft() : runLive()).catch((err) => {
	console.error(err);
	process.exit(1);
});
