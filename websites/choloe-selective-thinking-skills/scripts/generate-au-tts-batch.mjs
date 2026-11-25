#!/usr/bin/env node
/**
 * Synthesize all remaining Australian Gemini 3.8 Flash TTS WAV clips via the official
 * Gemini Batch API (50% cost reduction + separate token-based batch quota, avoiding Tier 1
 * 100 RPD online cap). Uses the exact same sourceHash & styleForClip as generate-au-tts.mjs
 * so existing cached WAVs are reused and generate-au-tts.mjs can immediately run encoding
 * + Gemini 3.5 Transcribe word alignment afterwards with zero TTS calls.
 */
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import {createReadStream, createWriteStream, existsSync} from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');
const WORKSPACE = path.resolve(PROJECT, '../..');
const RAW_DIR = path.join(WORKSPACE, 'work/chloe-mastery/audio-au-raw');
const BATCH_DIR = path.join(WORKSPACE, 'work/chloe-mastery/batch-tts');
const STATE_PATH = path.join(BATCH_DIR, 'jobs-state.json');
const C3_AUDIO_PATH = path.join(PROJECT, 'src/course/c3/c3-audio.json');
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

async function uploadJsonlFile(localPath, displayName) {
  const bytes = await fs.readFile(localPath);
  const startRes = await fetch('https://generativelanguage.googleapis.com/upload/v1beta/files', {
    method: 'POST',
    headers: {
      'x-goog-api-key': API_KEY,
      'X-Goog-Upload-Protocol': 'resumable',
      'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': String(bytes.length),
      'X-Goog-Upload-Header-Content-Type': 'application/jsonl',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({file: {display_name: displayName}}),
  });
  if (!startRes.ok) {
    throw new Error(`File upload start HTTP ${startRes.status}: ${await startRes.text()}`);
  }
  const uploadUrl = startRes.headers.get('x-goog-upload-url');
  if (!uploadUrl) throw new Error('Missing x-goog-upload-url header');

  const upRes = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Length': String(bytes.length),
      'X-Goog-Upload-Offset': '0',
      'X-Goog-Upload-Command': 'upload, finalize',
    },
    body: bytes,
  });
  const text = await upRes.text();
  if (!upRes.ok) {
    throw new Error(`File upload finalize HTTP ${upRes.status}: ${text}`);
  }
  const parsed = JSON.parse(text);
  return parsed.file?.name || parsed.name;
}

async function createBatchJob(fileName, displayName) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_TTS}:batchGenerateContent`, {
    method: 'POST',
    headers: {'x-goog-api-key': API_KEY, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      batch: {
        displayName,
        inputConfig: {fileName},
      },
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`batchGenerateContent HTTP ${res.status}: ${text}`);
  }
  const data = JSON.parse(text);
  return data.name;
}

async function downloadFileTo(fileResourceName, localPath) {
  const url = `https://generativelanguage.googleapis.com/download/v1beta/${fileResourceName}:download?alt=media`;
  const res = await fetch(url, {headers: {'x-goog-api-key': API_KEY}});
  if (!res.ok || !res.body) {
    throw new Error(`Download ${fileResourceName} HTTP ${res.status}: ${await res.text()}`);
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(localPath));
}

async function extractWavsFromJsonl(jsonlPath) {
  const rl = readline.createInterface({input: createReadStream(jsonlPath, 'utf8'), crlfDelay: Infinity});
  let saved = 0;
  let failed = 0;
  for await (const line of rl) {
    if (!line.trim()) continue;
    const obj = JSON.parse(line);
    const key = obj.key || obj.metadata?.key;
    if (!key) continue;
    const [id, hash12] = key.split('|');
    const wavPath = path.join(RAW_DIR, `${id}-${hash12}.wav`);
    const part = obj.response?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
    if (!part) {
      failed++;
      console.error(`  [FAIL] ${id}:`, JSON.stringify(obj.error || obj.status || obj).slice(0, 260));
      continue;
    }
    let buf = Buffer.from(part.inlineData.data, 'base64');
    if (buf.subarray(0, 4).toString('ascii') !== 'RIFF') {
      buf = pcmToWav(buf, 24000, 1, 16);
    }
    await fs.writeFile(wavPath, buf);
    saved++;
  }
  return {saved, failed};
}

async function main() {
  await fs.mkdir(RAW_DIR, {recursive: true});
  await fs.mkdir(BATCH_DIR, {recursive: true});

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
    queue.push({id: s.id, text: s.narration.trim(), kind: s.kind, unit: s.chapter});
  }
  for (const m of units) {
    if (m.id === 'C3') continue;
    queue.push({id: m.id.toLowerCase() + '-hook', text: (m.spokenHook ?? m.hook).trim(), kind: 'hook', unit: m.unit});
  }
  const c3Kinds = {
    'c3-hook': 'hook', 'c3-predict': 'quiz', 'c3-cross': 'worked', 'c3-stay': 'worked',
    'c3-forward': 'worked', 'c3-language': 'logic', 'c3-room': 'worked', 'c3-exam': 'quiz',
    'c3-exam-proof': 'answer', 'c3-transfer': 'quiz', 'c3-transfer-proof': 'answer', 'c3-recap': 'recap',
  };
  for (const [id, tr] of Object.entries(c3Tracks)) {
    queue.push({id, text: tr.text.trim(), kind: c3Kinds[id] || 'worked', unit: 1});
  }

  const missing = [];
  for (const item of queue) {
    const style = styleForClip(item.kind, item.unit);
    const sourceHash = crypto
      .createHash('sha256')
      .update(JSON.stringify({text: item.text, voiceId: VOICE_ID, model: MODEL_TTS, style}))
      .digest('hex');
    const wavPath = path.join(RAW_DIR, `${item.id}-${sourceHash.slice(0, 12)}.wav`);
    if (!existsSync(wavPath)) {
      missing.push({...item, style, hash12: sourceHash.slice(0, 12), wavPath});
    }
  }

  console.log(`Total clips: ${queue.length} | Already cached WAVs: ${queue.length - missing.length} | Need Batch TTS: ${missing.length}`);
  if (missing.length === 0) {
    console.log('All 380 WAVs already exist!');
    return;
  }

  // Resume existing active batch jobs if matching signature, else submit 3 parallel JSONL batches
  const missingSig = crypto.createHash('sha256').update(missing.map((m) => `${m.id}:${m.hash12}`).join(',')).digest('hex').slice(0, 12);
  let state = existsSync(STATE_PATH) ? JSON.parse(await fs.readFile(STATE_PATH, 'utf8')) : null;
  if (!state || state.sig !== missingSig || !Array.isArray(state.jobs) || !state.jobs.length) {
    const numShards = missing.length > 100 ? 3 : 1;
    const shardSize = Math.ceil(missing.length / numShards);
    const jobs = [];
    for (let s = 0; s < numShards; s++) {
      const slice = missing.slice(s * shardSize, (s + 1) * shardSize);
      if (!slice.length) continue;
      const inPath = path.join(BATCH_DIR, `input-${missingSig}-s${s + 1}.jsonl`);
      const lines = slice.map((item) =>
        JSON.stringify({
          key: `${item.id}|${item.hash12}`,
          request: {
            contents: [{role: 'user', parts: [{text: item.text, speechMetadata: {style: item.style}}]}],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {voiceConfig: {voice: VOICE_ID}},
            },
          },
        })
      );
      await fs.writeFile(inPath, lines.join('\n') + '\n');
      console.log(`Uploading shard ${s + 1}/${numShards} (${slice.length} clips)...`);
      const fileName = await uploadJsonlFile(inPath, `chloe-au-tts-${missingSig}-s${s + 1}`);
      const batchName = await createBatchJob(fileName, `chloe-au-tts-${missingSig}-s${s + 1}`);
      console.log(`  Created batch job ${batchName} (input=${fileName})`);
      jobs.push({shard: s + 1, count: slice.length, fileName, batchName, extracted: false});
    }
    state = {sig: missingSig, createdAt: new Date().toISOString(), jobs};
    await fs.writeFile(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
  } else {
    console.log(`Resuming ${state.jobs.length} existing batch job(s) for sig=${missingSig}...`);
  }

  // Poll until all shards finish & extract WAVs
  while (true) {
    let allDone = true;
    for (const job of state.jobs) {
      if (job.extracted) continue;
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/${job.batchName}`, {
        headers: {'x-goog-api-key': API_KEY},
      });
      const data = await res.json();
      const st = data.metadata?.state || data.state;
      const stats = data.metadata?.batchStats || {};
      console.log(`  [shard ${job.shard}] state=${st} stats=${JSON.stringify(stats)}`);
      if (data.done || st === 'BATCH_STATE_SUCCEEDED') {
        const respFile = data.response?.responsesFile || data.metadata?.output?.responsesFile;
        if (!respFile) {
          throw new Error(`Batch ${job.batchName} finished without responsesFile: ${JSON.stringify(data).slice(0, 600)}`);
        }
        const outJsonl = path.join(BATCH_DIR, `output-${missingSig}-s${job.shard}.jsonl`);
        console.log(`  Downloading shard ${job.shard} responses (${respFile})...`);
        await downloadFileTo(respFile, outJsonl);
        const {saved, failed} = await extractWavsFromJsonl(outJsonl);
        console.log(`  Extracted shard ${job.shard}: saved=${saved}, failed=${failed}`);
        job.extracted = true;
        job.saved = saved;
        job.failed = failed;
        await fs.writeFile(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
      } else if (['BATCH_STATE_FAILED', 'BATCH_STATE_CANCELLED', 'BATCH_STATE_EXPIRED'].includes(st)) {
        throw new Error(`Batch ${job.batchName} ended in state ${st}: ${JSON.stringify(data).slice(0, 600)}`);
      } else {
        allDone = false;
      }
    }
    if (allDone) break;
    await new Promise((r) => setTimeout(r, 15000));
  }

  const stillMissing = missing.filter((m) => !existsSync(m.wavPath));
  console.log(`\nBatch TTS complete! WAVs present: ${queue.length - stillMissing.length}/${queue.length} (stillMissing=${stillMissing.length})`);
  if (stillMissing.length > 0) {
    console.log('Still missing ids:', stillMissing.map((m) => m.id));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
