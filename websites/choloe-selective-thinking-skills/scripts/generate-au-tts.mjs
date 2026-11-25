#!/usr/bin/env node
/**
 * Synthesize all 380 active narrated clips for Chloe Thinking Studio using the locked
 * Australian Gemini 3.8 Flash TTS voice (`voice_p3rkxzz22c59` — "Chloe Sydney Logic Tutor AU"),
 * encode with loudnorm (-18 LUFS, -2 dBTP, 24 kHz mono AAC), measure true post-encoded
 * durations via ffprobe, align true millisecond word timestamps via Gemini 3.5 Transcribe,
 * and generate clean clause/scope-aware captions (zero negation/unit splits, zero 1-word orphans).
 */
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');
const WORKSPACE = path.resolve(PROJECT, '../..');
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const FFDIR = path.join(WORKSPACE, 'c3-veritasium/node_modules/@remotion/compositor-darwin-arm64');
const FFMPEG = path.join(FFDIR, 'ffmpeg');
const FFPROBE = path.join(FFDIR, 'ffprobe');
const FF_OPTS = {cwd: FFDIR, env: {...process.env, DYLD_LIBRARY_PATH: FFDIR}};

const RAW_DIR = path.join(WORKSPACE, 'work/chloe-mastery/audio-au-raw');
const ASR_CACHE_DIR = path.join(WORKSPACE, 'work/chloe-mastery/asr-cache');
const AUDIO_DIR = path.join(PROJECT, 'public/audio');
const DISCOVERY_DIR = path.join(PROJECT, 'public/discovery');
const ALIGNED_PATH = path.join(PROJECT, 'src/course/aligned-captions.json');
const C3_AUDIO_PATH = path.join(PROJECT, 'src/course/c3/c3-audio.json');
const ASR_REPORT_PATH = path.join(WORKSPACE, 'work/chloe-mastery/au-tts-asr-report.json');
const VOICE_PATH = path.join(WORKSPACE, 'c3-veritasium/scripts/.au-tutor-voice.json');

async function loadApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  for (const candidate of [
    path.join(PROJECT, '.env'),
    path.join(WORKSPACE, 'c3-veritasium/.env'),
    path.join(WORKSPACE, '.env'),
  ]) {
    try {
      const txt = await fs.readFile(candidate, 'utf8');
      const m = txt.match(/^\s*(?:export\s+)?GEMINI_API_KEY\s*=\s*["']?([^"'\s#]+)["']?/m);
      if (m) return m[1];
    } catch {
      // ignore
    }
  }
  throw new Error('GEMINI_API_KEY not found');
}

const API_KEY = await loadApiKey();
const VOICE = JSON.parse(await fs.readFile(VOICE_PATH, 'utf8'));
const VOICE_ID = VOICE.id;
const MODEL_TTS = 'gemini-3.8-flash-tts';
const MODEL_ASR = 'gemini-3.5-transcribe';
const CONCURRENCY = Number(process.env.TTS_CONCURRENCY || 5);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function styleForClip(kind, unit) {
  if (unit === 0) {
    return 'Warm, welcoming Australian educator in his early 30s from Sydney speaking to a bright Year 5 student; crisp natural pronunciation, friendly clarity, steady ~152 words per minute.';
  }
  if (unit === 10) {
    return 'Warm, calm, respectful Australian educator speaking to a parent about practical study habits; clear natural Sydney accent, thoughtful unhurried cadence around 150 words per minute.';
  }
  if (kind === 'hook') {
    return 'Warm, curious Australian tutor opening a short puzzle for a bright Year 5 student; crisp natural enunciation, inviting intrigue on the question, ~150 words per minute.';
  }
  if (kind === 'quiz') {
    return 'Calm, neutral, well-paced Australian tutor reading a puzzle clearly without hinting or telegraphing the answer; steady ~148 words per minute.';
  }
  if (kind === 'answer' || kind === 'recap') {
    return 'Warm, encouraging Australian tutor explaining a clear proof step by step for a Year 5 learner; crisp articulation of numbers, letters, and negations, ~152 words per minute.';
  }
  return 'Warm, articulate Australian science and logic tutor from Sydney explaining a thinking model step by step; crisp natural pronunciation and engaging clarity, ~152 words per minute.';
}

async function apiJson(endpoint, bodyObj, attempt = 1) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {'x-goog-api-key': API_KEY, 'Content-Type': 'application/json'},
    body: JSON.stringify(bodyObj),
  });
  const text = await res.text();
  if ((res.status === 429 || res.status === 500 || res.status === 502 || res.status === 503) && attempt <= 8) {
    const m = text.match(/retry in (\d+(?:\.\d+)?)s/i);
    const waitMs = m ? (Math.ceil(Number(m[1])) + 2) * 1000 : Math.min(45000, 2500 * attempt * attempt);
    console.log(`  [HTTP ${res.status} attempt ${attempt}] waiting ${(waitMs / 1000).toFixed(1)}s...`);
    await sleep(waitMs);
    return apiJson(endpoint, bodyObj, attempt + 1);
  }
  if (!res.ok) {
    throw new Error(`Gemini API ${endpoint} HTTP ${res.status}: ${text.slice(0, 500)}`);
  }
  return JSON.parse(text);
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

/**
 * Monotonic DP alignment between canonical script words and ASR recognized words.
 * Guarantees every canonical word receives a clean, strictly monotonic [startMs, endMs].
 */
function reconcileWords(canonicalText, asrWords, durationMs) {
  const canTokens = canonicalText.trim().split(/\s+/);
  const N = canTokens.length;
  const canNorm = canTokens.map(normTok);

  if (!asrWords || asrWords.length < 2) {
    return weightedFallbackWords(canTokens, durationMs);
  }

  const M = asrWords.length;
  const asrNorm = asrWords.map((w) => normTok(w.word));

  // DP edit-alignment scoring matches, prefix matches, and gaps
  const dp = Array.from({length: N + 1}, () => new Int32Array(M + 1));
  const bt = Array.from({length: N + 1}, () => new Uint8Array(M + 1)); // 1=diag, 2=up(skip can), 3=left(skip asr)
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
      if (canNorm[i - 1] === asrNorm[j - 1] || (canNorm[i - 1] && asrNorm[j - 1] && (canNorm[i - 1].startsWith(asrNorm[j - 1]) || asrNorm[j - 1].startsWith(canNorm[i - 1])))) {
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

  // Fill any unmatched canonical words by linear interpolation between anchored neighbors
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
      const runEnd = idx; // exclusive
      const prevEnd = runStart > 0 ? result[runStart - 1].endMs : 60;
      const nextStart = runEnd < N ? Math.max(prevEnd + 80, mapped[runEnd].startMs) : durationMs - 60;
      const span = Math.max(60 * (runEnd - runStart), nextStart - prevEnd);
      const weights = canTokens.slice(runStart, runEnd).map((w) => Math.max(2, w.length));
      const sumW = weights.reduce((a, b) => a + b, 0);
      let acc = 0;
      for (let k = runStart; k < runEnd; k++) {
        const w = weights[k - runStart];
        const s = Math.round(prevEnd + (acc / sumW) * span);
        acc += w;
        const e = Math.round(prevEnd + (acc / sumW) * span);
        result[k] = {word: canTokens[k], startMs: Math.min(durationMs - 40, s), endMs: Math.min(durationMs, Math.max(s + 40, e))};
      }
    }
  }

  // Enforce strict monotonicity
  for (let k = 0; k < N; k++) {
    if (k > 0 && result[k].startMs < result[k - 1].startMs) {
      result[k].startMs = result[k - 1].startMs;
    }
    if (result[k].endMs <= result[k].startMs) {
      result[k].endMs = Math.min(durationMs, result[k].startMs + 60);
    }
  }
  return result;
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

// Clause/scope-aware caption chunker (eliminates F09 negation splits, proper-noun/unit splits, and 1-word orphans)
const NO_BREAK_AFTER = new Set([
  'not', 'no', 'cannot', 'never', 'without', 'unless', 'only', 'may', 'might', 'could', 'would', 'should', 'must',
  "can't", "won't", "doesn't", "didn't", "isn't", "aren't", "don't", "wasn't", "weren't",
  'every', 'all', 'some', 'most', 'neither', 'either', 'both', 'each', 'rather', 'just', 'very',
  'a', 'an', 'the', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'by', 'from', 'as', 'into', 'onto', 'per',
  'his', 'her', 'its', 'their', 'our', 'your', 'my', 'this', 'that', 'these', 'those',
  'new', 'south', 'year', 'room', 'choice', 'option', 'case', 'position', 'step', 'group', 'unit', 'model', 'rule',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'twenty', 'thirty', 'forty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand',
]);
const UNIT_OR_BOUND_NEXT = new Set([
  'cent', 'percent', 'degrees', 'degree', 'minutes', 'minute', 'seconds', 'second', 'hours', 'hour', 'days', 'day',
  'metres', 'metre', 'centimetres', 'litres', 'grams', 'dollars', 'cents', 'wales', 'seven', 'eight', 'a', 'b', 'c', 'd',
  'not', 'than', 'if', 'of',
]);
const CLAUSE_STARTERS = new Set([
  'because', 'so', 'but', 'while', 'when', 'where', 'if', 'then', 'and', 'or', 'which', 'until', 'unless', 'although', 'yet',
]);

function splitSentenceCleanly(sentenceWords) {
  const full = sentenceWords.join(' ');
  if (full.length <= 68 || sentenceWords.length <= 4) {
    return [sentenceWords];
  }

  // Optimal DP segmentation of sentenceWords into chunks of 3..N words (<= 68 chars preferred, <= 76 hard cap)
  const n = sentenceWords.length;
  const dp = new Array(n + 1).fill(Infinity);
  const prev = new Array(n + 1).fill(-1);
  dp[0] = 0;

  for (let end = 1; end <= n; end++) {
    for (let start = 0; start < end; start++) {
      if (!Number.isFinite(dp[start])) continue;
      const chunkWords = sentenceWords.slice(start, end);
      const len = chunkWords.join(' ').length;
      if (len > 76 && chunkWords.length > 1) continue;

      let cost = 0;
      // Strongly avoid 1-word or 2-word fragments when splitting a sentence
      if (chunkWords.length === 1) cost += 2500;
      else if (chunkWords.length === 2 && len < 18) cost += 450;

      // Length comfort penalty (prefer 32..66 chars)
      if (len > 68) cost += (len - 68) * 35;
      if (len < 24 && end < n) cost += (24 - len) * 6;
      cost += Math.abs(len - 52) * 0.8;

      // Evaluate the break boundary RIGHT BEFORE `start` (if start > 0)
      if (start > 0) {
        const lastRaw = sentenceWords[start - 1];
        const nextRaw = sentenceWords[start];
        const lastW = normTok(lastRaw);
        const nextW = normTok(nextRaw);
        const hasPunctBreak = /[,;:—–]$/.test(lastRaw);
        if (hasPunctBreak) cost -= 120;
        if (CLAUSE_STARTERS.has(nextW)) cost -= 55;
        if (!hasPunctBreak && NO_BREAK_AFTER.has(lastW)) cost += 600;
        if (!hasPunctBreak && UNIT_OR_BOUND_NEXT.has(nextW)) cost += 500;
        if (!hasPunctBreak && /^\d/.test(lastRaw) && /^[a-z]/i.test(nextRaw)) cost += 450;
      }

      const cand = dp[start] + cost + 40; // small per-chunk cost to avoid unnecessary splits
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
    const s = prev[cur];
    segments.push(sentenceWords.slice(s, cur));
    cur = s;
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
    const segs = splitSentenceCleanly(sWords);
    for (const seg of segs) {
      const startIdx = wordCursor;
      const endIdx = Math.min(canonicalWords.length - 1, wordCursor + seg.length - 1);
      wordCursor += seg.length;
      const startMs = canonicalWords[startIdx]?.startMs ?? 0;
      const endMs = (canonicalWords[endIdx]?.endMs ?? durationMs) + 90;
      rawChunks.push({
        text: seg.join(' '),
        startMs: Math.max(0, Math.min(durationMs - 120, Math.round(startMs))),
        endMs: Math.min(durationMs, Math.max(Math.round(startMs) + 120, Math.round(endMs))),
        sentenceEnd: /[.!?]["'’”]?$/.test(seg[seg.length - 1]),
      });
    }
  }

  // Merge any ultra-short (< 500ms) cue with an adjacent cue if combined length <= 74
  const merged = [];
  for (let i = 0; i < rawChunks.length; i++) {
    const cur = rawChunks[i];
    if (
      merged.length > 0 &&
      cur.endMs - cur.startMs < 500 &&
      (merged[merged.length - 1].text + ' ' + cur.text).length <= 74
    ) {
      merged[merged.length - 1].text += ' ' + cur.text;
      merged[merged.length - 1].endMs = cur.endMs;
      merged[merged.length - 1].sentenceEnd = cur.sentenceEnd;
    } else {
      merged.push({...cur});
    }
  }

  // Enforce strictly monotonic, non-overlapping boundaries inside [0, durationMs]
  for (let i = 0; i < merged.length; i++) {
    if (i > 0 && merged[i].startMs < merged[i - 1].endMs) {
      merged[i - 1].endMs = Math.max(merged[i - 1].startMs + 120, merged[i].startMs);
    }
    if (merged[i].endMs <= merged[i].startMs) {
      merged[i].endMs = Math.min(durationMs, merged[i].startMs + 200);
    }
    if (merged[i].endMs > durationMs) {
      merged[i].endMs = durationMs;
    }
  }

  const out = merged.map(({text: t, startMs, endMs}) => ({
    text: t,
    startMs,
    endMs,
    timestampMs: startMs,
    confidence: null,
  }));

  const joined = out.map((c) => c.text).join(' ');
  if (joined !== text.trim()) {
    throw new Error(`Caption join mismatch:\n  expected: ${text.trim()}\n  got:      ${joined}`);
  }
  return out;
}

function encodeM4aAndProbe(wavPath, m4aPath) {
  execFileSync(
    FFMPEG,
    [
      '-y', '-hide_banner', '-loglevel', 'error',
      '-i', wavPath,
      '-af', 'loudnorm=I=-18:TP=-2:LRA=7',
      '-ar', '24000', '-ac', '1',
      '-c:a', 'aac', '-b:a', '96k', '-f', 'mp4',
      m4aPath,
    ],
    FF_OPTS
  );
  const durStr = execFileSync(
    FFPROBE,
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', m4aPath],
    {...FF_OPTS, encoding: 'utf8'}
  ).trim();
  const duration = Number(durStr);
  if (!Number.isFinite(duration) || duration <= 0.3) {
    throw new Error(`Invalid encoded duration for ${m4aPath}: ${durStr}`);
  }
  return duration;
}

async function synthesizeAndAlignOne(item, alignedMap, c3Tracks) {
  const {id, text, kind, unit, isC3} = item;
  const style = styleForClip(kind, unit);
  const sourceHash = crypto
    .createHash('sha256')
    .update(JSON.stringify({text, voiceId: VOICE_ID, model: MODEL_TTS, style}))
    .digest('hex');

  const wavPath = path.join(RAW_DIR, `${id}-${sourceHash.slice(0, 12)}.wav`);
  const relSrc = isC3 ? `discovery/${id}-${sourceHash.slice(0, 12)}.m4a` : `audio/${id}.m4a`;
  const m4aPath = path.join(PROJECT, 'public', relSrc);
  const metaPath = m4aPath.replace(/\.m4a$/, '.json');

  // Check if already completely synthesized, encoded, and word-aligned for this exact hash
  if (existsSync(m4aPath) && existsSync(metaPath)) {
    try {
      const existingMeta = JSON.parse(await fs.readFile(metaPath, 'utf8'));
      const existingAligned = isC3 ? c3Tracks[id] : alignedMap[id];
      if (
        existingMeta.sourceHash === sourceHash &&
        existingMeta.model === MODEL_TTS &&
        existingMeta.text === text &&
        existingAligned?.sourceHash === sourceHash &&
        Array.isArray(existingAligned?.words) &&
        existingAligned.words.length >= 2
      ) {
        return {id, skipped: true, duration: existingMeta.duration, asrMismatch: null};
      }
    } catch {
      // fall through and regenerate
    }
  }

  // 1. Synthesize WAV (reuse raw WAV if hash-matched)
  if (!existsSync(wavPath)) {
    const resp = await apiJson('/interactions', {
      model: MODEL_TTS,
      store: false,
      input: [
        {
          type: 'user_input',
          content: [{type: 'text', text, annotations: [{type: 'speech_metadata', style}]}],
        },
      ],
      response_format: {type: 'audio'},
      generation_config: {speech_config: [{voice: VOICE_ID}]},
    });
    let b64 = null;
    for (const step of resp.steps || []) {
      if (step.type === 'model_output') {
        for (const part of step.content || []) {
          if (part.type === 'audio' && part.data) b64 = part.data;
        }
      }
    }
    if (!b64) throw new Error(`No audio returned for ${id}`);
    await fs.writeFile(wavPath, Buffer.from(b64, 'base64'));
  }

  // 2. Encode normalized 24 kHz mono AAC .m4a and probe exact duration
  if (isC3) {
    // Clean up older hash-suffixed C3 files for this clip id before writing the new one
    for (const f of await fs.readdir(DISCOVERY_DIR)) {
      if (f.startsWith(`${id}-`) && !f.startsWith(`${id}-${sourceHash.slice(0, 12)}.`)) {
        await fs.unlink(path.join(DISCOVERY_DIR, f)).catch(() => {});
      }
    }
  }
  const duration = encodeM4aAndProbe(wavPath, m4aPath);
  const durationMs = Math.round(duration * 1000);

  // 3. Transcribe the exact encoded .m4a clip with Gemini 3.5 Transcribe (cached by sourceHash)
  const asrCachePath = path.join(ASR_CACHE_DIR, `${id}-${sourceHash.slice(0, 12)}.json`);
  let asrWords = [];
  let asrText = '';
  if (existsSync(asrCachePath)) {
    const cachedAsr = JSON.parse(await fs.readFile(asrCachePath, 'utf8'));
    asrWords = cachedAsr.asrWords || [];
    asrText = cachedAsr.asrText || '';
  } else {
    const m4aB64 = (await fs.readFile(m4aPath)).toString('base64');
    const trResp = await apiJson('/interactions', {
      model: MODEL_ASR,
      store: false,
      input: [{type: 'user_input', content: [{type: 'audio', mime_type: 'audio/mp4', data: m4aB64}]}],
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
    await fs.writeFile(asrCachePath, JSON.stringify({id, sourceHash, asrText, asrWords}, null, 2) + '\n');
  }

  const canonicalWords = reconcileWords(text, asrWords, durationMs);
  const captions = buildCleanCaptions(text, canonicalWords, durationMs);
  const wordCount = text.trim().split(/\s+/).length;

  const meta = {
    id,
    duration: Number(duration.toFixed(3)),
    sourceHash,
    voice: VOICE.display_name,
    voiceId: VOICE_ID,
    model: MODEL_TTS,
    languageCode: VOICE.language_code,
    text,
    words: wordCount,
    wpm: Number(((wordCount / duration) * 60).toFixed(1)),
  };
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2) + '\n');

  if (isC3) {
    c3Tracks[id] = {
      text,
      src: relSrc,
      duration: Number(duration.toFixed(3)),
      sourceHash,
      voice: VOICE.display_name,
      voiceId: VOICE_ID,
      model: MODEL_TTS,
      languageCode: VOICE.language_code,
      captions,
      words: canonicalWords,
      captionTiming: 'Word-level timestamps aligned from Gemini 3.5 Transcribe on this exact encoded clip.',
      ready: true,
      provisional: false,
    };
  } else {
    alignedMap[id] = {
      sourceHash,
      duration: Number(duration.toFixed(3)),
      words: canonicalWords,
      captions,
    };
  }

  // Track ASR accuracy ratio for QA report
  const canN = text.trim().split(/\s+/).map(normTok).filter(Boolean);
  const asrN = (asrText || asrWords.map((w) => w.word).join(' ')).trim().split(/\s+/).map(normTok).filter(Boolean);
  const exactNormMatch = canN.join(' ') === asrN.join(' ');
  return {
    id,
    skipped: false,
    duration: Number(duration.toFixed(3)),
    asrMismatch: exactNormMatch ? null : {id, expected: text, recognized: asrText},
  };
}

async function main() {
  await fs.mkdir(RAW_DIR, {recursive: true});
  await fs.mkdir(ASR_CACHE_DIR, {recursive: true});
  await fs.mkdir(AUDIO_DIR, {recursive: true});
  await fs.mkdir(DISCOVERY_DIR, {recursive: true});

  const scenes = JSON.parse(await fs.readFile(path.join(WORKSPACE, 'research/chloe-mastery/scenes.json'), 'utf8'));
  const units = (
    await Promise.all(
      ['01-03', '04-06', '07-09'].map(async (n) =>
        JSON.parse(await fs.readFile(path.join(WORKSPACE, `research/chloe-mastery/units-${n}.json`), 'utf8'))
      )
    )
  ).flat();

  let alignedMap = {};
  if (existsSync(ALIGNED_PATH)) {
    const rawAligned = (await fs.readFile(ALIGNED_PATH, 'utf8')).trim();
    if (rawAligned) alignedMap = JSON.parse(rawAligned);
  }
  const c3Tracks = JSON.parse(await fs.readFile(C3_AUDIO_PATH, 'utf8'));

  // Build exact 380-clip queue
  const queue = [];
  for (const s of scenes) {
    if (s.sourceModels?.includes('C3')) continue;
    queue.push({id: s.id, text: s.narration.trim(), kind: s.kind, unit: s.chapter, isC3: false});
  }
  for (const m of units) {
    if (m.id === 'C3') continue;
    queue.push({
      id: m.id.toLowerCase() + '-hook',
      text: (m.spokenHook ?? m.hook).trim(),
      kind: 'hook',
      unit: m.unit,
      isC3: false,
    });
  }
  const c3Kinds = {
    'c3-hook': 'hook', 'c3-predict': 'quiz', 'c3-cross': 'worked', 'c3-stay': 'worked',
    'c3-forward': 'worked', 'c3-language': 'logic', 'c3-room': 'worked', 'c3-exam': 'quiz',
    'c3-exam-proof': 'answer', 'c3-transfer': 'quiz', 'c3-transfer-proof': 'answer', 'c3-recap': 'recap',
  };
  for (const [id, tr] of Object.entries(c3Tracks)) {
    queue.push({id, text: tr.text.trim(), kind: c3Kinds[id] || 'worked', unit: 1, isC3: true});
  }

  console.log(`Starting Australian Gemini 3.8 Flash TTS + Gemini 3.5 Transcribe for ${queue.length} clips (voice=${VOICE_ID}, concurrency=${CONCURRENCY})...`);

  let nextIdx = 0;
  let completed = 0;
  let skipped = 0;
  const mismatches = [];
  let saveLock = Promise.resolve();

  const flushState = () => {
    saveLock = saveLock.then(async () => {
      const tmpAligned = ALIGNED_PATH + '.tmp';
      const tmpC3 = C3_AUDIO_PATH + '.tmp';
      await fs.writeFile(tmpAligned, JSON.stringify(alignedMap, null, 2) + '\n');
      await fs.rename(tmpAligned, ALIGNED_PATH);
      await fs.writeFile(tmpC3, JSON.stringify(c3Tracks, null, 2) + '\n');
      await fs.rename(tmpC3, C3_AUDIO_PATH);
    });
    return saveLock;
  };

  async function worker() {
    while (true) {
      const idx = nextIdx++;
      if (idx >= queue.length) return;
      const item = queue[idx];
      const res = await synthesizeAndAlignOne(item, alignedMap, c3Tracks);
      completed++;
      if (res.skipped) skipped++;
      if (res.asrMismatch) mismatches.push(res.asrMismatch);
      if (completed % 10 === 0 || completed === queue.length) {
        await flushState();
        console.log(`  [${completed}/${queue.length}] ${item.id} (${res.duration}s${res.skipped ? ', cached' : ''}) | skipped=${skipped}, asrDiffs=${mismatches.length}`);
      }
    }
  }

  await Promise.all(Array.from({length: CONCURRENCY}, () => worker()));
  await flushState();
  await fs.writeFile(
    ASR_REPORT_PATH,
    JSON.stringify({total: queue.length, skipped, mismatchCount: mismatches.length, mismatches}, null, 2) + '\n'
  );
  console.log(`\nALL ${queue.length} Australian Gemini TTS clips synthesized, normalized, and word-aligned! ASR notes: ${ASR_REPORT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
