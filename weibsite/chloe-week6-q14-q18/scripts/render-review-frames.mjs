#!/usr/bin/env node
/**
 * Bundle once and render key representative PNG frames across all 10 Q14 scenes
 * and all 10 Q18 scenes for visual inspection and evaluator verification.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {getCompositions, renderStill, openBrowser} from '@remotion/renderer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');
const OUT_DIR = process.argv[2] || path.join(PROJECT, 'work/review-frames');
const BROWSER =
	process.env.REMOTION_BROWSER ||
	'/home/oliver/.cache/ms-playwright/chromium_headless_shell-1208/chrome-headless-shell-linux64/chrome-headless-shell';

await fs.mkdir(OUT_DIR, {recursive: true});

console.log('Bundling Remotion compositions...');
const serveUrl = await bundle({
	entryPoint: path.join(PROJECT, 'src/index.ts'),
	publicDir: path.join(PROJECT, 'public'),
});

const browser = await openBrowser('chrome', {
	browserExecutable: BROWSER,
	chromiumOptions: {gl: 'swiftshader', disableWebSecurity: true},
});

try {
	const comps = await getCompositions(serveUrl, {puppeteerInstance: browser});
	const byId = Object.fromEntries(comps.map((c) => [c.id, c]));

	// Pick key moments: early, mid-action, late/reveal, and prediction pause (no spoilers!)
	const targets = [
		['Q14-hook', 'q14_01_hook', 0.72],
		['Q14-predict', 'q14_02_predict_pause', 0.85],
		['Q14-fold', 'q14_03_fold_mid', 0.35],
		['Q14-fold', 'q14_03_fold_closed', 0.85],
		['Q14-trap', 'q14_04_trap_landed', 0.85],
		['Q14-opposite', 'q14_05_opposite', 0.85],
		['Q14-roll', 'q14_06_roll_mid', 0.58],
		['Q14-roll', 'q14_06_roll_done', 0.88],
		['Q14-exam', 'q14_07_exam', 0.88],
		['Q14-practice', 'q14_08_practice_pause', 0.85],
		['Q14-practice-answer', 'q14_09_practice_rim', 0.24],
		['Q14-practice-answer', 'q14_09_practice_proof', 0.88],
		['Q14-pocket', 'q14_10_pocket', 0.75],

		['Q18-hook', 'q18_01_hook', 0.65],
		['Q18-predict', 'q18_02_predict_pause', 0.85],
		['Q18-trap', 'q18_03_trap', 0.85],
		['Q18-shapes', 'q18_04_shapes_midflight', 0.66],
		['Q18-shapes', 'q18_04_shapes', 0.88],
		['Q18-shades', 'q18_05_shades', 0.85],
		['Q18-apply', 'q18_06_apply', 0.85],
		['Q18-exam', 'q18_07_exam', 0.88],
		['Q18-practice', 'q18_08_practice_pause', 0.85],
		['Q18-practice-answer', 'q18_09_practice_proof', 0.88],
		['Q18-pocket', 'q18_10_pocket', 0.75],
	];

	for (const [compId, fileBase, frac] of targets) {
		const comp = byId[compId];
		if (!comp) throw new Error(`Composition not found: ${compId}`);
		const frame = Math.max(0, Math.min(comp.durationInFrames - 1, Math.round(comp.durationInFrames * frac)));
		const outPath = path.join(OUT_DIR, `${fileBase}.png`);
		await renderStill({
			composition: comp,
			serveUrl,
			output: outPath,
			frame,
			puppeteerInstance: browser,
			imageFormat: 'png',
		});
		console.log(`  rendered ${fileBase}.png (frame ${frame}/${comp.durationInFrames})`);
	}
	console.log(`Done! Rendered ${targets.length} frames to ${OUT_DIR}`);
} finally {
	await browser.close({silent: true});
}
