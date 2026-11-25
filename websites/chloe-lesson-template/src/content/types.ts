import type {ComponentType} from 'react';

/** Where a section's lesson video comes from. */
export type VideoSource =
	| {
			/** A Remotion composition, played in the browser with @remotion/player. */
			kind: 'remotion';
			component: ComponentType<any>;
			inputProps?: Record<string, unknown>;
			durationInFrames: number;
			fps: number;
			width: number;
			height: number;
	  }
	| {
			/** A rendered video file under public/, e.g. "videos/q14.mp4". */
			kind: 'file';
			src: string;
			poster?: string;
			/** Optional WebVTT captions file under public/. */
			captions?: string;
	  }
	| {kind: 'none'};

export type Chapter = {
	title: string;
	/** Start time in seconds. */
	start: number;
	/** If set, the video pauses here (seconds) so the learner can make a guess. */
	pauseForGuessAt?: number;
};

export type AnswerOption = {key: string; label: string};

export type TutorNote = {
	/** The AI tutor's explanation, written for the learner. Shown after the whole set is checked. */
	explain: string;
	/** Why each wrong option looked right, keyed by option key. Shown only when the learner chose it. */
	traps?: Record<string, string>;
	/** Optional narrated audio file under public/ for the Listen button. Falls back to the browser's voice. */
	audio?: string;
};

export type Question = {
	/** Unique across the whole site. Answers are saved against it. */
	id: string;
	/** Short label shown above the question, e.g. "Fewest landings · 8 sides". */
	tag?: string;
	stem: string;
	/** Optional picture under public/. */
	image?: {src: string; alt: string};
	/** Optional drawn figure (an SVG React component). */
	Figure?: ComponentType;
	options: AnswerOption[];
	answer: string;
	tutor: TutorNote;
};

export type FollowUp = {
	/** The one habit to keep from the video. */
	rule: string;
	steps: string[];
	/** The trap to avoid. */
	pitfall?: string;
};

export type Section = {
	/** Used in the URL hash, e.g. #q14. */
	id: string;
	/** Short code shown in the menu, e.g. "Q14". */
	code: string;
	/** Short menu name, e.g. "Rolling tube". */
	short: string;
	subject: string;
	title: string;
	summary: string;
	video: VideoSource;
	chapters: Chapter[];
	followUp: FollowUp;
	questions: Question[];
};

export type Site = {
	/** Keeps this site's saved progress separate from other sites. Change it for every new site. */
	id: string;
	learner: string;
	/** Line next to the learner's name in the header, e.g. "SELECTIVE / WEEK 6 THINKING SKILLS". */
	brandLine: string;
	/** Where the questions came from. */
	source: string;
	title: string;
	intro: string;
	/** Small note under each video, e.g. "Australian tutor voice · captions on". */
	videoNote?: string;
	questionsPerSet: number;
	footer: {left: string; right: string};
	sections: Section[];
};
