import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const project = path.resolve(import.meta.dirname, '..');
const root = path.resolve(project, '../..');
const data = JSON.parse(fs.readFileSync(path.join(project, 'src/course/course.json'), 'utf8'));
const errors = [];
const check = (ok, msg) => {
  if (!ok) errors.push(msg);
};

const models = data.filter((m) => m.unit > 0 && m.unit < 10);
check(models.length === 72, 'Expected 72 models');
check(new Set(models.map((m) => m.id)).size === 72, 'Model IDs unique');

const questions = [];
for (const m of models) {
  for (const field of ['challenge', 'reviewQuestion']) {
    const q = m[field];
    check(!!q, `${m.id} ${field} missing`);
    if (!q) continue;
    questions.push(q);
    check(q.options.length === 4 && q.options.map((o) => o.id).join('') === 'ABCD', `${m.id} ${field} options`);
    check(q.options.filter((o) => o.id === q.answer).length === 1, `${m.id} answer ID`);
    check(new Set(q.options.map((o) => o.text)).size === 4, `${m.id} duplicate choice`);
    check(
      q.options.filter((o) => o.id !== q.answer).every((o) => q.distractorReasons[o.id]?.length > 5),
      `${m.id} distractor feedback`
    );
    check(q.explanation.length > 20 && q.proofPrompt.length > 10, `${m.id} proof`);
  }
  check(m.scenes.some((s) => s.kind === 'quiz') && m.scenes.some((s) => s.kind === 'answer'), `${m.id} prediction/reveal`);
}
check(new Set(questions.map((q) => q.stem)).size === 144, 'Expected 144 distinct question stems');

const ff = path.join(root, 'c3-veritasium/node_modules/@remotion/compositor-darwin-arm64/ffmpeg');
const probe = path.join(path.dirname(ff), 'ffprobe');
const options = {cwd: path.dirname(ff), env: {...process.env, DYLD_LIBRARY_PATH: path.dirname(ff)}, encoding: 'utf8'};
const media = [];

for (const m of data) {
  let end = 0;
  for (const s of m.scenes) {
    check(s.start === end, `${s.id} timeline gap`);
    end += s.durationInFrames;
    if (s.silent) {
      check(s.kind === 'habit', `Unexpected silent scene ${s.id}`);
      check(!s.title.startsWith('Answer'), `${s.id} habit scene still titled Answer`);
      continue;
    }
    check(s.ready === true, `${s.id} narration pending`);
    const filename = path.join(project, 'public', s.audio);
    check(fs.existsSync(filename), `${s.id} file missing: ${s.audio}`);
    if (!fs.existsSync(filename)) continue;
    const metaPath = filename.replace(/\.m4a$/, '.json');
    check(fs.existsSync(metaPath), `${s.id} metadata json missing`);
    if (fs.existsSync(metaPath)) {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      check(meta.model === 'gemini-3.8-flash-tts', `${s.id} wrong model (${meta.model})`);
      check(meta.languageCode === 'en-AU', `${s.id} wrong languageCode (${meta.languageCode})`);
      check(meta.text === s.narration, `${s.id} script mismatch`);
      const actual = JSON.parse(
        execFileSync(
          probe,
          ['-v', 'error', '-show_entries', 'format=duration:stream=codec_name,sample_rate,channels', '-of', 'json', filename],
          options
        )
      );
      const duration = Number(actual.format.duration);
      check(Math.abs(duration - meta.duration) < 0.08, `${s.id} duration mismatch (${duration} vs ${meta.duration})`);
      check(s.audioFrames >= duration * 30 - 0.5, `${s.id} clip too long`);
      check(s.durationInFrames >= s.audioFrames + Math.round(0.25 * 30) + 8, `${s.id} tail too short`);
      check(s.captions.map((c) => c.text).join(' ') === s.narration, `${s.id} incomplete caption transcript`);
      check(
        s.captions.every((c, i) => !i || c.startMs >= s.captions[i - 1].endMs - 0.5),
        `${s.id} overlapping captions`
      );
      check(
        s.captions.every((c) => c.startMs >= 0 && c.endMs > c.startMs && c.endMs <= duration * 1000 + 80),
        `${s.id} captions outside clip`
      );
      const decoded = execFileSync(ff, ['-v', 'error', '-i', filename, '-f', 'wav', '-acodec', 'pcm_s24le', '-ac', '1', 'pipe:1'], {
        ...options,
        encoding: null,
        maxBuffer: 64 * 1024 * 1024,
      });
      let offset = 12;
      let pcm;
      while (offset + 8 <= decoded.length) {
        const tag = decoded.toString('ascii', offset, offset + 4);
        const size = decoded.readUInt32LE(offset + 4);
        if (tag === 'data') {
          pcm = decoded.subarray(offset + 8, Math.min(decoded.length, offset + 8 + size));
          break;
        }
        offset += 8 + size + (size % 2);
      }
      check(pcm && pcm.length % 3 === 0, `${s.id} PCM decode`);
      let peak = 0;
      let squares = 0;
      let clipped = 0;
      for (let i = 0; i < pcm.length; i += 3) {
        const v = pcm.readIntLE(i, 3) / 8388608;
        peak = Math.max(peak, Math.abs(v));
        squares += v * v;
        if (Math.abs(v) >= 0.9999) clipped++;
      }
      const maxDb = 20 * Math.log10(peak);
      const rms = Math.sqrt(squares / (pcm.length / 3));
      check(clipped === 0, `${s.id} ${clipped} clipped samples`);
      check(rms > 0.001 && peak > 0.01, `${s.id} near-silent audio`);
      media.push({
        id: s.id,
        duration,
        maxDb: Number(maxDb.toFixed(2)),
        voice: meta.voice,
        sha256: createHash('sha256').update(fs.readFileSync(filename)).digest('hex'),
      });
    }
  }
  check(end === m.durationInFrames, `${m.id} total duration mismatch`);
}

const result = {
  reviewDate: '2026-11-22',
  voice: 'Australian Gemini 3.8 Flash TTS (Chloe Sydney Logic Tutor AU)',
  models: models.length,
  questions: questions.length,
  scenes: data.reduce((n, m) => n + m.scenes.length, 0),
  narratedClips: media.length,
  totalMinutes: Number(data.reduce((n, m) => n + m.durationInFrames / 1800, 0).toFixed(2)),
  errors,
  media,
};
fs.writeFileSync(path.join(root, 'research/chloe-mastery/technical-validation.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({...result, media: undefined, errors: errors.slice(0, 30), errorCount: errors.length}, null, 2));
if (errors.length) process.exit(1);
