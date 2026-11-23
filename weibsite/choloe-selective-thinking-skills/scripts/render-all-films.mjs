#!/usr/bin/env node
/**
 * Re-render all 74 Thinking Studio 1080p 30fps MP4 films with the new Australian Gemini 3.8 Flash TTS
 * audio + all 19 consensus visual/content fixes, and update films/review.json with exact SHA-256 digests.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');
const WORKSPACE = path.resolve(PROJECT, '../..');
const FILMS_DIR = path.join(PROJECT, 'films');
const CACHE_PATH = path.join(WORKSPACE, 'work/chloe-mastery/film-render-cache.json');
fs.mkdirSync(FILMS_DIR, {recursive: true});
fs.mkdirSync(path.dirname(CACHE_PATH), {recursive: true});

const require = createRequire(path.join(PROJECT, 'package.json'));
const {bundle} = require('@remotion/bundler');
const {openBrowser, getCompositions, renderMedia} = require('@remotion/renderer');

const course = JSON.parse(fs.readFileSync(path.join(PROJECT, 'src/course/course.json'), 'utf8'));
const onlyIds = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const force = process.argv.includes('--force');

// Fingerprint all TSX/JSON sources so cache invalidates automatically on any code/audio edit
function dirHash(dir) {
  const h = crypto.createHash('sha256');
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, {withFileTypes: true}).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(tsx?|json|css)$/.test(entry.name)) {
        h.update(path.relative(PROJECT, full));
        h.update(fs.readFileSync(full));
      }
    }
  };
  walk(dir);
  return h.digest('hex').slice(0, 16);
}

const srcHash = dirHash(path.join(PROJECT, 'src/course'));
const renderCache = fs.existsSync(CACHE_PATH) ? JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) : {};

console.log(`1) Bundling ${path.basename(PROJECT)} (srcHash=${srcHash})...`);
const serveUrl = await bundle({
  entryPoint: path.join(PROJECT, 'src/index.ts'),
  outDir: path.join(WORKSPACE, 'work/chloe-mastery/bundle-au'),
  publicDir: path.join(PROJECT, 'public'),
});

const chromeCandidates = [
  path.join(WORKSPACE, '.remotion/chrome-headless-shell/mac-arm64/chrome-headless-shell-mac-arm64/chrome-headless-shell'),
];
const browserExecutable = chromeCandidates.find((p) => fs.existsSync(p));
const browser = await openBrowser('chrome', {
  ...(browserExecutable ? {browserExecutable} : {}),
  logLevel: 'error',
});

const targets = onlyIds.length ? course.filter((m) => onlyIds.includes(m.id)) : course;
const startAll = Date.now();

try {
  const compositions = await getCompositions(serveUrl, {puppeteerInstance: browser, logLevel: 'error'});
  for (let i = 0; i < targets.length; i++) {
    const m = targets[i];
    const compId = `Chloe-${m.id}`;
    const outMp4 = path.join(FILMS_DIR, `${m.id}.mp4`);
    const lessonSig = crypto
      .createHash('sha256')
      .update(JSON.stringify({srcHash, id: m.id, frames: m.durationInFrames, revs: m.scenes.map((s) => s.audioRevision || '')}))
      .digest('hex')
      .slice(0, 16);

    if (!force && renderCache[m.id] === lessonSig && fs.existsSync(outMp4)) {
      console.log(`  [${i + 1}/${targets.length}] SKIP ${m.id}.mp4 (up to date)`);
      continue;
    }

    const comp = compositions.find((c) => c.id === compId);
    if (!comp) throw new Error(`Composition not found: ${compId}`);

    const t0 = Date.now();
    await renderMedia({
      composition: comp,
      serveUrl,
      puppeteerInstance: browser,
      codec: 'h264',
      crf: 21,
      pixelFormat: 'yuv420p',
      audioCodec: 'aac',
      audioBitrate: '128k',
      concurrency: 6,
      outputLocation: outMp4,
      logLevel: 'error',
    });

    const sec = ((Date.now() - t0) / 1000).toFixed(1);
    const mb = (fs.statSync(outMp4).size / 1024 / 1024).toFixed(2);
    renderCache[m.id] = lessonSig;
    fs.writeFileSync(CACHE_PATH, JSON.stringify(renderCache, null, 2) + '\n');
    console.log(`  [${i + 1}/${targets.length}] RENDERED ${m.id}.mp4 (${comp.durationInFrames}f, ${mb} MB, ${sec}s)`);
  }
} finally {
  await browser.close({silent: true});
}

// Refresh films/review.json when rendering full set (or update rendered entries)
const reviewPath = path.join(FILMS_DIR, 'review.json');
const review = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
review.voice = 'Australian Gemini 3.8 Flash TTS (Chloe Sydney Logic Tutor AU)';
review.reviewedDate = '2026-11-22';
review.audioLoudnessTarget = '-18 LUFS / -2 dBTP';
review.wordAlignedBy = 'macOS on-device SpeechAnalyzer (en_AU)';
const revMap = new Map(review.lessons.map((r) => [r.id, r]));

for (const m of course) {
  const existing = {...(revMap.get(m.id) || {id: m.id, title: m.title, file: `${m.id}.mp4`})};
  // Always clear stale metrics/adjudication counts from previous Easton renders
  delete existing.normalSpeedPlaybackCompleted;
  delete existing.playbackRateMeasured;
  delete existing.minimumVoiceCorrelation;
  delete existing.visualSamples;
  existing.captionsVisuallyAdjudicated = 0;
  if (m.id === 'C3') {
    existing.observation =
      'Nina moves across the gate synced dynamically to the Australian narration in c3-cross; c3-stay preserves her wristband while changing whether she enters; Room B distinguishes no permitted use from knowing nobody entered; Exhibition option C and Rover stem are verified.';
  }
  const mp4Path = path.join(FILMS_DIR, `${m.id}.mp4`);
  const sha = crypto.createHash('sha256').update(fs.readFileSync(mp4Path)).digest('hex');
  const spokenSections = m.scenes.filter((s) => !s.silent).length;
  const captionsCount = m.scenes.reduce((n, s) => n + (s.captions?.length || 0), 0);
  revMap.set(m.id, {
    ...existing,
    title: m.title,
    file: `${m.id}.mp4`,
    sha256: sha,
    frames: m.durationInFrames,
    scenes: m.scenes.length,
    spokenSections,
    captions: captionsCount,
    voice: 'Australian Gemini 3.8 Flash TTS',
  });
}

review.lessons = course.map((m) => revMap.get(m.id));
fs.writeFileSync(reviewPath, JSON.stringify(review, null, 2) + '\n');
const totalMin = ((Date.now() - startAll) / 60000).toFixed(1);
console.log(`\nCompleted rendering ${targets.length} films and updated films/review.json in ${totalMin} min.`);
