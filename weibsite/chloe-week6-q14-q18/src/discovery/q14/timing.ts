import narration from '../q14-narration.json';
import {Easing, interpolate} from 'remotion';

type WordTiming = {word: string; startMs: number; endMs: number};
type Track = {text: string; duration: number; words?: WordTiming[]};
const tracks = narration as Record<string, Track>;

export const LEAD = 0.35;

/** Seconds of the clip itself. */
export const dur = (id: string) => {
	const duration = tracks[id]?.duration;
	if (!Number.isFinite(duration) || duration <= 0) {
		throw new Error(`Missing q14 narration timing: ${id}`);
	}
	return duration;
};

const norm = (s: string) =>
	s
		.toLowerCase()
		.replace(/[’‘]/g, "'")
		.replace(/[^a-z0-9' ]/g, ' ')
		.split(/\s+/)
		.filter(Boolean);

/**
 * Moment (seconds from scene start) when `phrase` begins in clip `id`.
 * Uses real Gemini 3.5 Transcribe word timestamps when available, falling back
 * to word-proportional estimation for drafts.
 */
export const at = (id: string, phrase?: string) => {
	const t = tracks[id];
	if (!t) throw new Error(`Missing q14 narration track: ${id}`);
	if (!phrase) return LEAD;

	const target = norm(phrase);
	if (t.words && t.words.length > 0) {
		const alignedNorm = t.words.map((w) => norm(w.word)[0] ?? '');
		for (let i = 0; i <= alignedNorm.length - target.length; i++) {
			if (target.every((w, j) => alignedNorm[i + j] === w)) {
				return LEAD + t.words[i].startMs / 1000;
			}
		}
	}

	const words = norm(t.text);
	let index = -1;
	for (let i = 0; i <= words.length - target.length && index < 0; i++) {
		if (target.every((w, j) => words[i + j] === w)) index = i;
	}
	if (index < 0) throw new Error(`Phrase "${phrase}" not found in ${id}`);
	const ms = t.duration * 1000;
	const inset = Math.min(100, ms * 0.05);
	return LEAD + (inset + (index / words.length) * (ms - inset * 2)) / 1000;
};

export const sceneSeconds = (id: string, tail = 1) => LEAD + dur(id) + tail;

const smooth = Easing.bezier(0.42, 0, 0.2, 1);
export const ramp = (time: number, t0: number, len = 0.7) =>
	interpolate(time, [t0, t0 + len], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: smooth});
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
