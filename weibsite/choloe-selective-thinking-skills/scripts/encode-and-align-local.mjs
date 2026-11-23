#!/usr/bin/env node
/**
 * Pure-local encoding (--phase encode) and word-timestamp reconciliation + clause-aware
 * captioning (--phase finalize) for all 380 Australian Gemini 3.8 Flash TTS clips.
 * Zero cloud API calls: consumes WAVs in work/chloe-mastery/audio-au-raw/ and ASR JSONs
 * in work/chloe-mastery/asr-cache/.
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

const FFDIR = path.join(WORKSPACE, 'c3-veritasium/node_modules/@remotion/compositor-darwin-arm64');
const FFMPEG = path.join(FFDIR, 'ffmpeg');
const FFPROBE = path.join(FFDIR, 'ffprobe');
const FF_OPTS = {cwd: FFDIR, env: {...process.env, DYLD_LIBRARY_PATH: FFDIR}};

const RAW_DIR = path.join(WORKSPACE, 'work/chloe-mastery/audio-au-raw');
const ASR_CACHE_DIR = path.join(WORKSPACE, 'work/chloe-mastery/asr-cache');
const MANIFEST_PATH = path.join(WORKSPACE, 'work/chloe-mastery/au-align-manifest.json');
const ASR_REPORT_PATH = path.join(WORKSPACE, 'work/chloe-mastery/au-tts-asr-report.json');
const AUDIO_DIR = path.join(PROJECT, 'public/audio');
const DISCOVERY_DIR = path.join(PROJECT, 'public/discovery');
const ALIGNED_PATH = path.join(PROJECT, 'src/course/aligned-captions.json');
const C3_AUDIO_PATH = path.join(PROJECT, 'src/course/c3/c3-audio.json');
const VOICE_PATH = path.join(WORKSPACE, 'c3-veritasium/scripts/.au-tutor-voice.json');

const VOICE = JSON.parse(await fs.readFile(VOICE_PATH, 'utf8'));
const VOICE_ID = VOICE.id;
const MODEL_TTS = 'gemini-3.8-flash-tts';

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

function normTok(w) {
  return w.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9']/g, '');
}

const NUM_WORDS = {
  '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
  '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten',
  '11': 'eleven', '12': 'twelve', '13': 'thirteen', '14': 'fourteen', '15': 'fifteen',
  '16': 'sixteen', '17': 'seventeen', '18': 'eighteen', '19': 'nineteen', '20': 'twenty',
  '24': 'twenty four', '30': 'thirty', '40': 'forty', '50': 'fifty', '60': 'sixty',
  '70': 'seventy', '80': 'eighty', '90': 'ninety', '100': 'hundred', '360': 'three hundred sixty',
  '1st': 'first', '2nd': 'second', '3rd': 'third', '4th': 'fourth', '5th': 'fifth',
  '6th': 'sixth', '7th': 'seventh', '8th': 'eighth', '9th': 'ninth', '10th': 'tenth',
};

function expandAsrWords(asrWords) {
  const expanded = [];
  for (const w of asrWords) {
    const raw = w.word.replace(/%$/, '');
    const hadPct = /%$/.test(w.word);
    const n = normTok(raw);
    const pieces = [];
    if (NUM_WORDS[n]) {
      pieces.push(...NUM_WORDS[n].split(' '));
    } else if (/^\d{4}$/.test(n) && n === '2027') {
      pieces.push('2027');
    } else {
      pieces.push(w.word);
    }
    if (hadPct) pieces.push('per', 'cent');
    if (pieces.length === 1) {
      expanded.push({word: pieces[0], startMs: w.startMs, endMs: w.endMs});
    } else {
      const span = Math.max(40, w.endMs - w.startMs);
      for (let i = 0; i < pieces.length; i++) {
        const s = Math.round(w.startMs + (i / pieces.length) * span);
        const e = Math.round(w.startMs + ((i + 1) / pieces.length) * span);
        expanded.push({word: pieces[i], startMs: s, endMs: Math.max(s + 20, e)});
      }
    }
  }
  return expanded;
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

function reconcileWords(canonicalText, rawAsrWords, durationMs) {
  const canTokens = canonicalText.trim().split(/\s+/);
  const N = canTokens.length;
  const canNorm = canTokens.map(normTok);
  const asrWords = expandAsrWords(rawAsrWords || []);

  if (asrWords.length < 2) {
    return {words: weightedFallbackWords(canTokens, durationMs), matchRatio: 0};
  }

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
      const scoreMatch =
        a && a === b ? 5 : a && b && a.length >= 3 && b.length >= 3 && (a.startsWith(b) || b.startsWith(a)) ? 2 : -2;
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
      const a = canNorm[i - 1];
      const b = asrNorm[j - 1];
      if (a && b && (a === b || (a.length >= 3 && b.length >= 3 && (a.startsWith(b) || b.startsWith(a))))) {
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
        const w = weights[k - runStart];
        const s = Math.round(prevEnd + (acc / sumW) * span);
        acc += w;
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
    if (k > 0 && result[k].startMs < result[k - 1].startMs) {
      result[k].startMs = result[k - 1].startMs;
    }
    if (result[k].endMs <= result[k].startMs) {
      result[k].endMs = Math.min(durationMs, result[k].startMs + 60);
    }
  }
  const matchCount = mapped.filter(Boolean).length;
  return {words: result, matchRatio: matchCount / N};
}

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
      if (chunkWords.length === 1) cost += 2500;
      else if (chunkWords.length === 2 && len < 18) cost += 450;
      if (len > 68) cost += (len - 68) * 35;
      if (len < 24 && end < n) cost += (24 - len) * 6;
      cost += Math.abs(len - 52) * 0.8;

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
      });
    }
  }

  // Merge short standalone/brief cues (< 850ms) backward or forward so no caption flashes unreadably
  const merged = rawChunks.map((c) => ({...c}));
  let changed = true;
  while (changed && merged.length > 1) {
    changed = false;
    for (let i = 0; i < merged.length; i++) {
      const cur = merged[i];
      const dur = cur.endMs - cur.startMs;
      if (dur >= 850) continue;
      const canPrev = i > 0 && (merged[i - 1].text + ' ' + cur.text).length <= 76;
      const canNext = i < merged.length - 1 && (cur.text + ' ' + merged[i + 1].text).length <= 76;
      if (canNext && (!canPrev || i === 0 || (cur.text.split(/\s+/).length <= 2 && /^[A-Z]/.test(cur.text)))) {
        merged[i + 1].text = cur.text + ' ' + merged[i + 1].text;
        merged[i + 1].startMs = cur.startMs;
        merged.splice(i, 1);
        changed = true;
        break;
      } else if (canPrev) {
        merged[i - 1].text = merged[i - 1].text + ' ' + cur.text;
        merged[i - 1].endMs = cur.endMs;
        merged.splice(i, 1);
        changed = true;
        break;
      }
    }
  }

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
    // Give any still-brief (< 700ms) cue gentle extra hold into available following silence
    if (merged[i].endMs - merged[i].startMs < 700) {
      const maxEnd = i < merged.length - 1 ? merged[i + 1].startMs : durationMs;
      merged[i].endMs = Math.max(merged[i].endMs, Math.min(maxEnd, merged[i].startMs + 750));
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

async function buildQueue() {
  const scenes = JSON.parse(await fs.readFile(path.join(WORKSPACE, 'research/chloe-mastery/scenes.json'), 'utf8'));
  const units = (
    await Promise.all(
      ['01-03', '04-06', '07-09'].map(async (n) =>
        JSON.parse(await fs.readFile(path.join(WORKSPACE, `research/chloe-mastery/units-${n}.json`), 'utf8'))
      )
    )
  ).flat();
  const c3Tracks = JSON.parse(await fs.readFile(C3_AUDIO_PATH, 'utf8'));

  const queue = [];
  for (const s of scenes) {
    if (s.sourceModels?.includes('C3')) continue;
    queue.push({id: s.id, text: s.narration.trim(), kind: s.kind, unit: s.chapter, isC3: false});
  }
  for (const m of units) {
    if (m.id === 'C3') continue;
    queue.push({id: m.id.toLowerCase() + '-hook', text: (m.spokenHook ?? m.hook).trim(), kind: 'hook', unit: m.unit, isC3: false});
  }
  const c3Kinds = {
    'c3-hook': 'hook', 'c3-predict': 'quiz', 'c3-cross': 'worked', 'c3-stay': 'worked',
    'c3-forward': 'worked', 'c3-language': 'logic', 'c3-room': 'worked', 'c3-exam': 'quiz',
    'c3-exam-proof': 'answer', 'c3-transfer': 'quiz', 'c3-transfer-proof': 'answer', 'c3-recap': 'recap',
  };
  for (const [id, tr] of Object.entries(c3Tracks)) {
    queue.push({id, text: tr.text.trim(), kind: c3Kinds[id] || 'worked', unit: 1, isC3: true});
  }
  return {queue, c3Tracks};
}

const phase = process.argv[2] || 'encode';
await fs.mkdir(ASR_CACHE_DIR, {recursive: true});
const {queue, c3Tracks} = await buildQueue();

if (phase === 'encode') {
  const manifest = [];
  let encoded = 0;
  let reused = 0;
  for (const item of queue) {
    const style = styleForClip(item.kind, item.unit);
    const sourceHash = crypto
      .createHash('sha256')
      .update(JSON.stringify({text: item.text, voiceId: VOICE_ID, model: MODEL_TTS, style}))
      .digest('hex');
    const wavPath = path.join(RAW_DIR, `${item.id}-${sourceHash.slice(0, 12)}.wav`);
    if (!existsSync(wavPath)) throw new Error(`Missing WAV: ${wavPath}`);
    const relSrc = item.isC3 ? `discovery/${item.id}-${sourceHash.slice(0, 12)}.m4a` : `audio/${item.id}.m4a`;
    const m4aPath = path.join(PROJECT, 'public', relSrc);
    const metaPath = m4aPath.replace(/\.m4a$/, '.json');

    let needEncode = true;
    if (existsSync(m4aPath) && existsSync(metaPath)) {
      const m = JSON.parse(await fs.readFile(metaPath, 'utf8'));
      if (m.sourceHash === sourceHash && m.model === MODEL_TTS && m.text === item.text) {
        needEncode = false;
        reused++;
      }
    }
    if (needEncode) {
      if (item.isC3) {
        for (const f of await fs.readdir(DISCOVERY_DIR)) {
          if (f.startsWith(`${item.id}-`) && !f.startsWith(`${item.id}-${sourceHash.slice(0, 12)}.`)) {
            await fs.unlink(path.join(DISCOVERY_DIR, f)).catch(() => {});
          }
        }
      }
      const duration = encodeM4aAndProbe(wavPath, m4aPath);
      const wordCount = item.text.split(/\s+/).length;
      const meta = {
        id: item.id,
        duration: Number(duration.toFixed(3)),
        sourceHash,
        voice: VOICE.display_name,
        voiceId: VOICE_ID,
        model: MODEL_TTS,
        languageCode: VOICE.language_code,
        text: item.text,
        words: wordCount,
        wpm: Number(((wordCount / duration) * 60).toFixed(1)),
      };
      await fs.writeFile(metaPath, JSON.stringify(meta, null, 2) + '\n');
      encoded++;
      if (encoded % 40 === 0) console.log(`  Encoded ${encoded} clips (reused=${reused})...`);
    }
    manifest.push({
      id: item.id,
      sourceHash,
      m4aPath,
      cachePath: path.join(ASR_CACHE_DIR, `${item.id}-${sourceHash.slice(0, 12)}.json`),
    });
  }
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Encode phase complete: total=${queue.length}, encoded=${encoded}, reused=${reused}. Manifest: ${MANIFEST_PATH}`);
} else if (phase === 'finalize') {
  const alignedMap = {};
  const lowMatch = [];
  let sumRatio = 0;

  for (const item of queue) {
    const style = styleForClip(item.kind, item.unit);
    const sourceHash = crypto
      .createHash('sha256')
      .update(JSON.stringify({text: item.text, voiceId: VOICE_ID, model: MODEL_TTS, style}))
      .digest('hex');
    const relSrc = item.isC3 ? `discovery/${item.id}-${sourceHash.slice(0, 12)}.m4a` : `audio/${item.id}.m4a`;
    const m4aPath = path.join(PROJECT, 'public', relSrc);
    const meta = JSON.parse(await fs.readFile(m4aPath.replace(/\.m4a$/, '.json'), 'utf8'));
    const cachePath = path.join(ASR_CACHE_DIR, `${item.id}-${sourceHash.slice(0, 12)}.json`);
    if (!existsSync(cachePath)) throw new Error(`Missing ASR cache: ${cachePath}`);
    const asr = JSON.parse(await fs.readFile(cachePath, 'utf8'));

    const durationMs = Math.round(meta.duration * 1000);
    const {words: canonicalWords, matchRatio} = reconcileWords(item.text, asr.asrWords, durationMs);
    sumRatio += matchRatio;
    const captions = buildCleanCaptions(item.text, canonicalWords, durationMs);

    if (matchRatio < 0.85) {
      lowMatch.push({id: item.id, matchRatio: Number(matchRatio.toFixed(3)), expected: item.text, recognized: asr.asrText});
    }

    if (item.isC3) {
      c3Tracks[item.id] = {
        text: item.text,
        src: relSrc,
        duration: meta.duration,
        sourceHash,
        voice: VOICE.display_name,
        voiceId: VOICE_ID,
        model: MODEL_TTS,
        languageCode: VOICE.language_code,
        captions,
        words: canonicalWords,
        captionTiming: 'Word-level timestamps aligned on-device with macOS en-AU SpeechAnalyzer on this exact encoded clip.',
        ready: true,
        provisional: false,
      };
    } else {
      alignedMap[item.id] = {
        sourceHash,
        duration: meta.duration,
        words: canonicalWords,
        captions,
      };
    }
  }

  await fs.writeFile(ALIGNED_PATH + '.tmp', JSON.stringify(alignedMap, null, 2) + '\n');
  await fs.rename(ALIGNED_PATH + '.tmp', ALIGNED_PATH);
  await fs.writeFile(C3_AUDIO_PATH + '.tmp', JSON.stringify(c3Tracks, null, 2) + '\n');
  await fs.rename(C3_AUDIO_PATH + '.tmp', C3_AUDIO_PATH);
  await fs.writeFile(
    ASR_REPORT_PATH,
    JSON.stringify(
      {
        total: queue.length,
        meanWordMatchRatio: Number((sumRatio / queue.length).toFixed(4)),
        lowMatchCount: lowMatch.length,
        lowMatch,
      },
      null,
      2
    ) + '\n'
  );
  console.log(
    `Finalize complete! ${queue.length} clips aligned (meanWordMatchRatio=${(sumRatio / queue.length).toFixed(4)}, lowMatch<0.85=${lowMatch.length}).`
  );
}
