#!/usr/bin/env node
/**
 * Run the official evaluate-chloe-tutorial-video/scripts/check_transcript.py
 * against every encoded Australian Gemini TTS clip in q14-narration.json and
 * q18-narration.json, verifying SHA-256 media identity, captions, ASR readback,
 * and the exact learner-facing transcript body.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');
const CHECKER = path.resolve(PROJECT, '../../skills/evaluate-chloe-tutorial-video/scripts/check_transcript.py');
const OUT_DIR = path.join(PROJECT, 'work/transcript-checks');

await fs.mkdir(OUT_DIR, {recursive: true});

const LESSONS = [
	{
		id: 'q14',
		script: path.join(PROJECT, 'src/discovery/q14/script.json'),
		manifest: path.join(PROJECT, 'src/discovery/q14-narration.json'),
		names: ['D', 'J', 'G', 'A', 'E', 'H', 'C', 'F', 'I', 'B', 'K', 'R', 'W', 'P', 'L', 'M', 'S'],
	},
	{
		id: 'q18',
		script: path.join(PROJECT, 'src/discovery/q18/script.json'),
		manifest: path.join(PROJECT, 'src/discovery/q18-narration.json'),
		names: ['A', 'B', 'C', 'D', 'Boris'],
	},
];

let total = 0;
let passed = 0;
const summary = {};

for (const lesson of LESSONS) {
	const script = JSON.parse(await fs.readFile(lesson.script, 'utf8'));
	const manifest = JSON.parse(await fs.readFile(lesson.manifest, 'utf8'));
	const results = [];

	for (const clip of script) {
		const track = manifest[clip.id];
		if (!track?.ready) {
			throw new Error(`Track ${clip.id} is not ready (silent draft). Run generate-au-tts.mjs with GEMINI_API_KEY first.`);
		}
		const casePath = path.join(OUT_DIR, `${clip.id}-case.json`);
		const reportPath = path.join(OUT_DIR, `${clip.id}-report.json`);
		const mediaRel = path.relative(OUT_DIR, path.join(PROJECT, 'public', track.src));

		const payload = {
			media: mediaRel,
			durationMs: Math.round(track.duration * 1000),
			approvedText: clip.text,
			captions: track.captions.map(({startMs, endMs, text}) => ({startMs, endMs, text})),
			publishedTranscript: clip.text,
			names: lesson.names,
			recognition: {
				engine: track.model ? 'gemini-3.5-transcribe' : 'unknown',
				mediaSha256: track.mediaSha256,
				text: track.asrText || '',
			},
		};
		await fs.writeFile(casePath, JSON.stringify(payload, null, 2) + '\n');

		let exitCode = 0;
		try {
			execFileSync('python3', [CHECKER, casePath, '--output', reportPath], {encoding: 'utf8'});
		} catch (err) {
			exitCode = err.status ?? 1;
		}
		const report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
		total++;
		if (exitCode === 0) passed++;
		results.push({id: clip.id, exitCode, result: report.result, speechDiffs: report.speechWordDifferences, boundaryChecks: report.cueBoundaryChecks});
		console.log(`  [${exitCode === 0 ? 'PASS' : 'FLAG'}] ${clip.id}: ${report.result}`);
	}
	summary[lesson.id] = results;
}

await fs.writeFile(path.join(OUT_DIR, 'summary.json'), JSON.stringify({total, passed, summary}, null, 2) + '\n');
console.log(`\nTranscript check complete: ${passed}/${total} clips clean (report: ${path.join(OUT_DIR, 'summary.json')})`);
