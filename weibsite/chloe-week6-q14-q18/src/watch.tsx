import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {Q14Video, Q14_SCENES, q14DurationFrames, q14SceneFrames} from './discovery/Q14Video';
import {Q18Video, Q18_SCENES, q18DurationFrames, q18SceneFrames} from './discovery/Q18Video';
import {isNarrationReady, P} from './discovery/Shared';
import {FlatNetStrip} from './discovery/q14/DecagonTube';
import {Q14_FACES, Q14_PRAC_FACES} from './discovery/q14/Q14Scenes';
import {dur as durQ14, LEAD as leadQ14} from './discovery/q14/timing';
import {dur as durQ18, LEAD as leadQ18} from './discovery/q18/timing';
import q14Script from './discovery/q14/script.json';
import q18Script from './discovery/q18/script.json';
import {
	DiagonalBox,
	NestedBox,
	Q18_LOWER_IN,
	Q18_OPTIONS,
	Q18_PRAC_LOWER_IN,
	Q18_PRAC_OPTIONS,
	Q18_PRAC_UPPER_IN,
	Q18_PRAC_UPPER_OUT,
	Q18_UPPER_IN,
	Q18_UPPER_OUT,
} from './discovery/q18/AnalogyShapes';
import './styles.css';

type LessonId = 'q14' | 'q18';
type TabId = 'watch' | 'practice' | 'review';
type ScriptEntry = {id: string; kind: string; title: string; text: string};
type Chapter = {id: string; title: string; startFrame: number; pauseFrame: number | null; text: string};

type SavedPractice = {
	choice: string;
	correct: boolean;
	proof: string;
	explained: boolean;
	at: number;
};

type ProgressStore = {
	version: 1;
	watched: Partial<Record<LessonId, boolean>>;
	practice: Partial<Record<LessonId, SavedPractice>>;
};

const STORE_KEY = 'chloe-week6-q14-q18-v1';

function readStore(): ProgressStore {
	try {
		const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
		if (raw?.version === 1) return {version: 1, watched: raw.watched || {}, practice: raw.practice || {}};
	} catch {
		// ignore storage failures
	}
	return {version: 1, watched: {}, practice: {}};
}

function formatTime(frames: number) {
	const seconds = Math.max(0, Math.floor(frames / 30));
	return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

function buildChapters(
	scenes: [string, string, React.FC, number, boolean][],
	script: ScriptEntry[],
	sceneFramesFn: (id: string, fps?: number) => number,
	durFn: (id: string) => number,
	lead: number,
): Chapter[] {
	let cursor = 0;
	return scenes.map(([id, title, , , hasPause]) => {
		const frames = sceneFramesFn(id, 30);
		const pauseFrame = hasPause ? cursor + Math.ceil((lead + durFn(id) + 0.15) * 30) : null;
		const text = script.find((s) => s.id === id)?.text ?? '';
		const ch: Chapter = {id, title, startFrame: cursor, pauseFrame, text};
		cursor += frames;
		return ch;
	});
}

const LESSON_DATA = {
	q14: {
		id: 'q14' as const,
		code: 'QUESTION 14',
		audioPrefix: 'q14-',
		subject: 'Spatial reasoning · Prism nets',
		title: 'Roll the tube, watch the top.',
		shortTitle: 'Q14 · Rolling tube',
		copy: 'Fold a ten-sided net into a regular prism, dodge the upside-down trap, find the opposite face halfway round, and count each flat landing.',
		component: Q14Video,
		frames: q14DurationFrames(30),
		pocketRule: 'Regular, even-sided tube? Roll the shortest way to the face opposite your chosen top. Count each landing.',
		steps: [
			'Check that the tube has a regular, even-sided end so opposite faces sit halfway round.',
			'Count halfway round from your chosen top face to find which face must land flat on the ground.',
			'Roll the shortest way from the starting ground face and count every new face that lands flat.',
		],
		pitfall: 'The upside-down trap: rolling straight to the named target face puts it flat on the ground instead of on top.',
		sourceTitle: 'Cortex Academy · Thinking Skills Lesson 36 (Week 6 Topic Test), Question 14',
		sourceStem:
			'A construction company needed to build a giant tube made up of ten flat faces (B G A D E H J C F I). Face D is on the ground when the decagonal tube is folded up, and face J needs to be at the very top. How many other faces, excluding face D, now must come in contact with the ground?',
		sourceAnswer: 'Option B · 2 faces (face A and face G)',
		sourceDistractors: [
			{k: 'A · 1', why: 'Counts only face A between D and G, forgetting that face G itself must land flat on the ground.'},
			{k: 'B · 2 ✓', why: 'Correct! Opposite face J is face G (5 steps halfway round). Rolling the short way lands face A, then face G.'},
			{k: 'C · 3', why: 'Either includes the excluded starting face D in D → A → G, or rolls E → H → J which puts J on the ground.'},
			{k: 'D · 4', why: 'Counts all four printed panels D, E, H, J from start to target, including D and ending with J underneath.'},
		],
		practice: {
			badge: 'Original practice · regular 8-sided tube',
			stem: 'This tube has a regular eight-sided end (R K W P L H M S, seam joins S to R). Face K starts on the ground. Roll the tube to put face R on top. How few other faces must land flat?',
			options: [
				{k: 'A', label: '1'},
				{k: 'B', label: '2'},
				{k: 'C', label: '3'},
				{k: 'D', label: '4'},
			],
			answer: 'C',
			explanation:
				'Halfway round a regular 8-sided tube is 4 steps, so face L is opposite face R. Starting on face K, rolling left crosses the seam (R, S, M, H, L = 5 landings). Rolling right lands face W (1), face P (2), and face L (3) — putting face R flat on top in 3 landings.',
			distractors: {
				A: 'Rolling 1 step left from K onto R puts face R flat on the floor — the upside-down trap!',
				B: 'Counts only W and P between K and L and misses the final landing on face L.',
				C: 'W, P, and L each land flat on the ground — 3 faces, putting R flat on top.',
				D: 'Includes the starting face K, or uses the 4-step opposite distance as the roll count.',
			} as Record<string, string>,
		},
		consensus:
			'Verified independently by Gemini 4 Neon and Codex gpt-6.2-astra (max). Both confirmed Q14 = B (2), octagon transfer = C (3), explicit rolling & regularity conditions, zero-spoiler pauses, and the odd-sided pentagon near-miss condition.',
	},
	q18: {
		id: 'q18' as const,
		code: 'QUESTION 18',
		audioPrefix: 'q18-',
		subject: 'Abstract reasoning · Shape analogies',
		title: 'Which picture fits?',
		shortTitle: 'Q18 · Shape analogy',
		copy: 'Separate shapes from shades on Mr. Boris’s analogy puzzle, beat the sticky-paint trap, and verify every layer from the outside in.',
		component: Q18Video,
		frames: q18DurationFrames(30),
		pocketRule: 'Use the example to find both orders. Check shapes and shades from the outside in.',
		steps: [
			'Number the diagonal input from top left (1) to bottom right (4), and read nested layers from outside in.',
			'Track only the outlines first to see which starting position goes into each nested layer.',
			'Track the shades separately, then check every layer — not just the outer shape — against all four options.',
		],
		pitfall: 'The sticky-paint trap: assuming each shape carries its original fill colour when it moves to a new layer.',
		sourceTitle: 'Cortex Academy · Thinking Skills Lesson 36 (Week 6 Topic Test), Question 18',
		sourceStem:
			'Mr. Boris likes to make analogies using shapes. In the top pair, four diagonal shapes (black triangle, white circle, grey pentagon, black hexagon) nest into a black circle, white hexagon, grey triangle, and black pentagon. Using the same rule on the bottom box (grey parallelogram, black heart, white triangle, grey circle), which option completes the sequence?',
		sourceAnswer: 'Option C · Grey heart → Black circle → White parallelogram → Grey triangle',
		sourceDistractors: [
			{k: 'A', why: 'Nests both shapes and shades in original 1–2–3–4 diagonal order, wrongly placing the parallelogram outside.'},
			{k: 'B', why: 'Gets outlines right (2–4–1–3) but falls for the sticky-paint trap by keeping each shape’s starting shade (black heart).'},
			{k: 'C ✓', why: 'Correct! Outlines follow 2–4–1–3 (heart, circle, parallelogram, triangle) while shades stay 1–2–3–4 (grey, black, white, grey).'},
			{k: 'D', why: 'Swaps the two tracks: reorders shades by 2–4–1–3 while leaving the shapes in 1–2–3–4 order (black parallelogram outside).'},
		],
		practice: {
			badge: 'Original practice · reverse-order analogy',
			stem: 'Use the top worked pair to work out both orders (shapes and shades), then choose the missing picture for the bottom box.',
			options: [
				{k: 'A', label: 'Option A'},
				{k: 'B', label: 'Option B'},
				{k: 'C', label: 'Option C'},
				{k: 'D', label: 'Option D'},
			],
			answer: 'D',
			explanation:
				'In the top pair, the outlines reverse to 4–3–2–1 (square, circle, pentagon, triangle) while the shades stay in original order 1–2–3–4 (black, white, black, grey). Applying both orders to the bottom box builds: grey square (outer), black circle, grey hexagon (layer 3), and white diamond (inner).',
			distractors: {
				A: 'Reverses the shapes correctly, but keeps each shape’s original shade (white square outside).',
				B: 'Matches the first two outer layers AND every shade — but puts the diamond third instead of the hexagon!',
				C: 'Reverses only the shades and keeps the shapes in 1–2–3–4 order (white diamond outside).',
				D: 'Grey square → black circle → grey hexagon → white diamond matches both orders on all four layers.',
			} as Record<string, string>,
		},
		consensus:
			'Verified pixel-for-pixel and across all 24 × 24 positional permutations by Gemini 4 Neon and Codex gpt-6.2-astra (max). Both confirmed Q18 = C, strengthened Option B in the fresh practice so Layer 3 uniquely decides D over B, and locked zero-spoiler wording.',
	},
} as const;

const Q14PracticeFigure: React.FC = () => (
	<div className="practice-diagram">
		<svg viewBox="0 0 1120 320" width="100%" role="img" aria-label="Eight-sided tube net R K W P L H M S with regular octagon end view">
			<FlatNetStrip
				faces={Q14_PRAC_FACES}
				x={24}
				y={76}
				width={800}
				height={150}
				styles={{
					K: {fill: '#2b5867', glow: P.cyan, textColor: P.ink},
					R: {fill: '#234a3f', glow: P.mint, textColor: P.ink},
				}}
			/>
			<text x={174} y={266} textAnchor="middle" fill={P.cyan} fontSize={20} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
				K · ON GROUND
			</text>
			<text x={74} y={54} textAnchor="middle" fill={P.mint} fontSize={20} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
				R · GOAL: TOP
			</text>
			<path d="M 774 68 C 774 34, 160 34, 130 50" fill="none" stroke={P.muted} strokeWidth={2.5} strokeDasharray="7 6" />
			<text x={470} y={24} textAnchor="middle" fill={P.muted} fontSize={18} fontWeight={700} fontFamily="Manrope Variable, Arial, sans-serif">
				seam: face S joins face R
			</text>
			{/* Regular 8-gon end-view */}
			<g transform="translate(975, 152)">
				<rect x={-112} y={-104} width={224} height={208} rx={12} fill="#111a20" stroke={P.line} strokeWidth={2} />
				<polygon
					points={Array.from({length: 8}, (_, i) => {
						const a = Math.PI / 2 - Math.PI / 8 + (i * 2 * Math.PI) / 8;
						return `${(58 * Math.cos(a)).toFixed(1)},${(58 * Math.sin(a)).toFixed(1)}`;
					}).join(' ')}
					fill="#1c2a32"
					stroke={P.cyan}
					strokeWidth={3.5}
				/>
				<text y={-74} textAnchor="middle" fill={P.cyan} fontSize={16} fontWeight={800} letterSpacing={1.8} fontFamily="Manrope Variable, Arial, sans-serif">
					REGULAR 8-GON
				</text>
				<text y={86} textAnchor="middle" fill={P.muted} fontSize={16} fontWeight={650} fontFamily="Manrope Variable, Arial, sans-serif">
					Equal 45° turns
				</text>
			</g>
		</svg>
	</div>
);

const Q18PracticeFigure: React.FC<{
	choice: string;
	submitted: boolean;
	answer: string;
	onSelect: (k: string) => void;
}> = ({choice, submitted, answer, onSelect}) => (
	<div className="practice-diagram">
		<svg viewBox="0 0 980 270" width="100%" role="img" aria-label="Fresh shape analogy worked pair and bottom input">
			<DiagonalBox items={Q18_PRAC_UPPER_IN} x={20} y={24} size={210} />
			<text x={274} y={136} textAnchor="middle" fill={P.muted} fontSize={20} fontWeight={800} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
				IS TO
			</text>
			<NestedBox layers={Q18_PRAC_UPPER_OUT} x={318} y={24} size={210} />
			<text x={578} y={136} textAnchor="middle" fill={P.cyan} fontSize={22} fontWeight={850} letterSpacing={3} fontFamily="Manrope Variable, Arial, sans-serif">
				AS
			</text>
			<DiagonalBox items={Q18_PRAC_LOWER_IN} x={625} y={24} size={210} />
			<text x={878} y={136} textAnchor="middle" fill={P.muted} fontSize={20} fontWeight={800} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
				IS TO
			</text>
			<rect x={922} y={88} width={44} height={74} rx={8} fill="#121d24" stroke={P.cyan} strokeWidth={2.5} strokeDasharray="5 5" />
			<text x={944} y={140} textAnchor="middle" fill={P.cyan} fontSize={44} fontWeight={850} fontFamily="Manrope Variable, Arial, sans-serif">
				?
			</text>
		</svg>
		<div className="visual-option-grid" role="radiogroup" aria-label="Choose the matching picture">
			{Q18_PRAC_OPTIONS.map((opt) => {
				const selected = choice === opt.k;
				const cls = [
					'visual-option',
					selected ? 'chosen' : '',
					submitted && opt.k === answer ? 'correct' : '',
					submitted && selected && opt.k !== answer ? 'incorrect' : '',
				]
					.filter(Boolean)
					.join(' ');
				return (
					<button
						key={opt.k}
						type="button"
						className={cls}
						disabled={submitted}
						aria-pressed={selected}
						onClick={() => onSelect(opt.k)}
					>
						<svg viewBox="0 0 210 210" width="100%">
							<NestedBox layers={opt.layers} x={5} y={5} size={200} />
						</svg>
						<span>
							Option {opt.k}
							{submitted && opt.k === answer ? ' ✓' : ''}
						</span>
					</button>
				);
			})}
		</div>
	</div>
);

const OriginalQuestionFigure: React.FC<{id: LessonId}> = ({id}) => {
	if (id === 'q14') {
		return (
			<div className="practice-diagram">
				<svg viewBox="0 0 1060 220" width="100%" role="img" aria-label="Week 6 Question 14 ten-face net B G A D E H J C F I">
					<FlatNetStrip
						faces={Q14_FACES}
						x={30}
						y={34}
						width={1000}
						height={150}
						styles={{
							D: {fill: '#2b5867', glow: P.cyan, textColor: P.ink},
							J: {fill: '#234a3f', glow: P.mint, textColor: P.ink},
						}}
					/>
				</svg>
			</div>
		);
	}
	return (
		<div className="practice-diagram">
			<svg viewBox="0 0 1040 440" width="100%" role="img" aria-label="Week 6 Question 18 analogy diagram and options A B C D">
				<DiagonalBox items={Q18_UPPER_IN} x={20} y={14} size={180} />
				<text x={242} y={110} textAnchor="middle" fill={P.muted} fontSize={18} fontWeight={800} letterSpacing={2}>
					IS TO
				</text>
				<NestedBox layers={Q18_UPPER_OUT} x={282} y={14} size={180} />
				<text x={515} y={110} textAnchor="middle" fill={P.cyan} fontSize={20} fontWeight={850} letterSpacing={3}>
					AS
				</text>
				<DiagonalBox items={Q18_LOWER_IN} x={560} y={14} size={180} />
				<text x={782} y={110} textAnchor="middle" fill={P.muted} fontSize={18} fontWeight={800} letterSpacing={2}>
					IS TO ?
				</text>
				{Q18_OPTIONS.map((opt, idx) => (
					<NestedBox key={opt.k} layers={opt.layers} x={40 + idx * 245} y={225} size={170} label={opt.k} />
				))}
			</svg>
		</div>
	);
};

function App() {
	const initial = location.hash.slice(1);
	const [lessonId, setLessonId] = useState<LessonId>(initial === 'q18' ? 'q18' : 'q14');
	const [tab, setTab] = useState<TabId>('watch');
	const [store, setStore] = useState<ProgressStore>(readStore);
	const [autoPause, setAutoPause] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [muted, setMuted] = useState(false);
	const [rate, setRate] = useState(1);
	const [frame, setFrame] = useState(0);
	const [notice, setNotice] = useState('');

	const playerRef = useRef<PlayerRef>(null);
	const pausedSet = useRef<Set<string>>(new Set());

	const lesson = LESSON_DATA[lessonId];
	const ready = isNarrationReady(lesson.audioPrefix);

	const chapters = useMemo(
		() =>
			lessonId === 'q14'
				? buildChapters(Q14_SCENES, q14Script as ScriptEntry[], q14SceneFrames, durQ14, leadQ14)
				: buildChapters(Q18_SCENES, q18Script as ScriptEntry[], q18SceneFrames, durQ18, leadQ18),
		[lessonId],
	);

	useEffect(() => {
		try {
			localStorage.setItem(STORE_KEY, JSON.stringify(store));
		} catch {
			// ignore
		}
	}, [store]);

	useEffect(() => {
		const onHash = () => {
			const h = location.hash.slice(1);
			if (h === 'q14' || h === 'q18') setLessonId(h);
		};
		window.addEventListener('hashchange', onHash);
		return () => window.removeEventListener('hashchange', onHash);
	}, []);

	useEffect(() => {
		pausedSet.current.clear();
		setFrame(0);
		setIsPlaying(false);
		setNotice('');
		setTab('watch');
		history.replaceState(null, '', `#${lessonId}`);
	}, [lessonId]);

	useEffect(() => {
		const p = playerRef.current;
		if (!p || tab !== 'watch') return;
		const onFrame = ({detail}: {detail: {frame: number}}) => {
			const f = detail.frame;
			setFrame(f);
			if (!autoPause) return;
			const target = chapters.find(
				(c) => c.pauseFrame !== null && f >= c.pauseFrame && f < c.pauseFrame + 24 && !pausedSet.current.has(c.id),
			);
			if (target) {
				pausedSet.current.add(target.id);
				p.pause();
				setNotice('Your turn! Lock in your answer and explain why, then press Play to watch the proof.');
			}
		};
		const onPlay = () => {
			setIsPlaying(true);
			setNotice('');
		};
		const onPause = () => setIsPlaying(false);
		const onMute = ({detail}: {detail: {isMuted: boolean}}) => setMuted(detail.isMuted);
		const onEnd = () => {
			setIsPlaying(false);
			setStore((s) => ({...s, watched: {...s.watched, [lessonId]: true}}));
			setNotice('Lesson finished! Switch to Fresh practice to test the habit on your own.');
		};
		p.addEventListener('frameupdate', onFrame);
		p.addEventListener('play', onPlay);
		p.addEventListener('pause', onPause);
		p.addEventListener('mutechange', onMute);
		p.addEventListener('ended', onEnd);
		return () => {
			p.removeEventListener('frameupdate', onFrame);
			p.removeEventListener('play', onPlay);
			p.removeEventListener('pause', onPause);
			p.removeEventListener('mutechange', onMute);
			p.removeEventListener('ended', onEnd);
		};
	}, [lessonId, tab, autoPause, chapters]);

	const activeChapter = useMemo(() => {
		for (let i = chapters.length - 1; i >= 0; i--) {
			if (frame >= chapters[i].startFrame) return chapters[i];
		}
		return chapters[0];
	}, [chapters, frame]);

	const switchLesson = (next: LessonId) => {
		playerRef.current?.pause();
		setLessonId(next);
	};

	const downloadTranscript = () => {
		const lines = [
			`CHLOE SELECTIVE · ${lesson.code} — ${lesson.title}`,
			`Source: ${lesson.sourceTitle}`,
			`Pocket rule: ${lesson.pocketRule}`,
			'',
			...chapters.map((c) => `[${formatTime(c.startFrame)}] ${c.title}\n${c.text}\n`),
		];
		const blob = new Blob([lines.join('\n')], {type: 'text/plain;charset=utf-8'});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `chloe-week6-${lesson.id}-transcript.txt`;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<header className="site-header">
				<a
					className="brand"
					href="#q14"
					onClick={(e) => {
						e.preventDefault();
						switchLesson('q14');
					}}
				>
					<span className="brand-mark" />
					<strong>CHLOE</strong>
					<span>SELECTIVE / WEEK 6 THINKING SKILLS</span>
				</a>
				<span className="review-label">
					<span className={ready ? 'dot-ready' : 'dot-draft'} />
					{ready ? 'AUSTRALIAN GEMINI TTS · READY' : 'SILENT DRAFT · AUDIO PENDING'}
				</span>
			</header>

			<main>
				<nav className="lesson-picker" aria-label="Choose a Week 6 lesson">
					{(['q14', 'q18'] as LessonId[]).map((id) => {
						const item = LESSON_DATA[id];
						const done = store.practice[id]?.correct;
						const watched = store.watched[id];
						return (
							<button
								key={id}
								type="button"
								className={lessonId === id ? 'selected' : ''}
								aria-pressed={lessonId === id}
								onClick={() => switchLesson(id)}
							>
								<div>
									<strong>{item.shortTitle}</strong>
									<span className="picker-sub">{item.subject}</span>
								</div>
								<small>
									{formatTime(item.frames)}
									{done ? ' · Practised ✓' : watched ? ' · Watched' : ''}
								</small>
							</button>
						);
					})}
				</nav>

				<div className="lesson-heading">
					<div>
						<p className="eyebrow">
							{lesson.code} <span>/ {lesson.subject.toUpperCase()}</span>
						</p>
						<h1>{lesson.title}</h1>
					</div>
					<div className="activity-tabs" role="tablist" aria-label="Lesson activities">
						<button role="tab" aria-selected={tab === 'watch'} onClick={() => setTab('watch')}>
							01 · Watch & think
						</button>
						<button
							role="tab"
							aria-selected={tab === 'practice'}
							onClick={() => {
								playerRef.current?.pause();
								setTab('practice');
							}}
						>
							02 · Fresh practice{store.practice[lessonId]?.correct ? ' ✓' : ''}
						</button>
						<button
							role="tab"
							aria-selected={tab === 'review'}
							onClick={() => {
								playerRef.current?.pause();
								setTab('review');
							}}
						>
							03 · Question & review
						</button>
					</div>
				</div>

				{notice && (
					<div role="status" className="notice-bar">
						{notice}
					</div>
				)}

				{tab === 'watch' && (
					<section className="watch" aria-label={lesson.title}>
						<div className="video-shell">
							<Player
								ref={playerRef}
								key={lesson.id}
								component={lesson.component}
								durationInFrames={lesson.frames}
								fps={30}
								compositionWidth={1920}
								compositionHeight={1080}
								style={{width: '100%'}}
								controls
								clickToPlay
								doubleClickToFullscreen
								showVolumeControls
								playbackRate={rate}
								initiallyMuted={muted}
								numberOfSharedAudioTags={8}
								moveToBeginningWhenEnded={false}
								spaceKeyToPlayOrPause
								acknowledgeRemotionLicense
							/>
						</div>

						<div className="video-toolbar">
							<div className="toolbar-group">
								<button
									type="button"
									className="primary"
									onClick={() => playerRef.current?.toggle()}
								>
									{isPlaying ? 'Ⅱ Pause' : '▶ Play'}
								</button>
								<button
									type="button"
									onClick={() => {
										pausedSet.current.clear();
										playerRef.current?.seekTo(0);
										playerRef.current?.play();
										setNotice('');
									}}
								>
									↺ Replay
								</button>
								<span className="runtime-pill">
									{formatTime(frame)} / {formatTime(lesson.frames)}
								</span>
							</div>
							<div className="toolbar-group">
								<label className="autopause-toggle">
									<input
										type="checkbox"
										checked={autoPause}
										onChange={(e) => setAutoPause(e.target.checked)}
									/>
									Pause for my prediction
								</label>
								<select
									aria-label="Playback speed"
									value={rate}
									onChange={(e) => setRate(Number(e.target.value))}
								>
									<option value={0.85}>0.85×</option>
									<option value={1}>1×</option>
									<option value={1.2}>1.2×</option>
								</select>
								<button
									type="button"
									onClick={() => {
										const next = !(playerRef.current?.isMuted() ?? muted);
										setMuted(next);
										if (next) playerRef.current?.mute();
										else playerRef.current?.unmute();
									}}
								>
									{muted ? 'Unmute' : 'Mute'}
								</button>
								<button type="button" onClick={() => playerRef.current?.requestFullscreen()}>
									⛶ Fullscreen
								</button>
							</div>
						</div>

						<div className="under-video">
							<p>{lesson.copy}</p>
							<span className="note-meta">
								{ready
									? 'Australian Gemini 3.8 Flash TTS · word-aligned captions'
									: 'Narration pending · silent draft'}
							</span>
						</div>

						<div className="chapter-strip" aria-label="Lesson chapters">
							{chapters.map((ch) => (
								<button
									key={ch.id}
									type="button"
									className={activeChapter.id === ch.id ? 'active' : ''}
									onClick={() => {
										pausedSet.current.delete(ch.id);
										playerRef.current?.seekTo(ch.startFrame);
										setFrame(ch.startFrame);
										setNotice('');
									}}
								>
									<small>{formatTime(ch.startFrame)}</small>
									<span>{ch.title}</span>
								</button>
							))}
						</div>

						<section className="pocket-card">
							<p className="eyebrow">THE HABIT TO KEEP</p>
							<h2>{lesson.pocketRule}</h2>
							<div className="step-grid">
								{lesson.steps.map((s, i) => (
									<p key={s}>
										<b>0{i + 1}</b>
										{s}
									</p>
								))}
							</div>
							<p className="pitfall">
								<b>Watch for:</b> {lesson.pitfall}
							</p>
						</section>

						<div className="cta-bar">
							<div>
								<h3>Ready to test the habit on a fresh question?</h3>
								<p>Try an original practice puzzle with new shapes or a new tube before checking the solution.</p>
							</div>
							<button
								type="button"
								className="primary"
								onClick={() => {
									playerRef.current?.pause();
									setTab('practice');
								}}
							>
								Try fresh practice →
							</button>
						</div>

						<details className="transcript">
							<summary>
								<span>Read the full lesson transcript ({chapters.length} beats)</span>
								<button
									type="button"
									className="link-btn"
									onClick={(e) => {
										e.preventDefault();
										downloadTranscript();
									}}
								>
									Download .txt
								</button>
							</summary>
							<div className="transcript-body">
								{chapters.map((ch) => (
									<article key={ch.id}>
										<button
											type="button"
											onClick={() => {
												playerRef.current?.seekTo(ch.startFrame);
												setFrame(ch.startFrame);
											}}
										>
											{formatTime(ch.startFrame)} · {ch.title}
										</button>
										<p>{ch.text}</p>
									</article>
								))}
							</div>
						</details>
					</section>
				)}

				{tab === 'practice' && (
					<PracticePanel
						lessonId={lessonId}
						saved={store.practice[lessonId]}
						onSave={(attempt) =>
							setStore((s) => ({...s, practice: {...s.practice, [lessonId]: attempt}}))
						}
						onBack={() => setTab('watch')}
					/>
				)}

				{tab === 'review' && (
					<section className="review-panel">
						<div className="panel-card">
							<p className="eyebrow">SUPPLIED SOURCE QUESTION</p>
							<h2>{lesson.sourceTitle}</h2>
							<p className="source-stem">{lesson.sourceStem}</p>
							<OriginalQuestionFigure id={lessonId} />
							<div className="verified-answer">
								<span>VERIFIED ANSWER</span>
								<strong>{lesson.sourceAnswer}</strong>
							</div>
							<div className="distractor-list">
								{lesson.sourceDistractors.map((d) => (
									<p key={d.k}>
										<b>{d.k}</b> — {d.why}
									</p>
								))}
							</div>
						</div>

						<div className="panel-card">
							<p className="eyebrow">ASTRA + NEON CONSENSUS REVIEW</p>
							<h3>Dual-model verification & NSW Selective alignment</h3>
							<p>{lesson.consensus}</p>
							<p className="exam-meta">
								NSW Selective High School Placement Test — Thinking Skills: 40 multiple-choice questions in 40 minutes,
								four options (A–D). Original transfer items are clearly labelled as original practice material.
							</p>
						</div>
					</section>
				)}
			</main>

			<footer>
				<span>
					CHLOE SELECTIVE <span className="footer-divider">/</span> WEEK 6 · Q14 &amp; Q18
				</span>
				<span>Cortex Academy Week 6 Q14 &amp; Q18 + original transfer practice · Year 5 NSW Selective Prep</span>
			</footer>
		</>
	);
}

function PracticePanel({
	lessonId,
	saved,
	onSave,
	onBack,
}: {
	lessonId: LessonId;
	saved?: SavedPractice;
	onSave: (p: SavedPractice) => void;
	onBack: () => void;
}) {
	const prac = LESSON_DATA[lessonId].practice;
	const [choice, setChoice] = useState(saved?.choice || '');
	const [proof, setProof] = useState(saved?.proof || '');
	const [submitted, setSubmitted] = useState(Boolean(saved));
	const [explained, setExplained] = useState(Boolean(saved?.explained));
	const [error, setError] = useState('');

	useEffect(() => {
		setChoice(saved?.choice || '');
		setProof(saved?.proof || '');
		setSubmitted(Boolean(saved));
		setExplained(Boolean(saved?.explained));
		setError('');
	}, [lessonId, saved]);

	const commit = () => {
		if (!choice) {
			setError('Choose an option (A, B, C, or D) before checking your reasoning.');
			return;
		}
		setError('');
		setSubmitted(true);
		onSave({choice, correct: choice === prac.answer, proof, explained: false, at: Date.now()});
	};

	const reset = () => {
		setChoice('');
		setProof('');
		setSubmitted(false);
		setExplained(false);
		setError('');
	};

	const isCorrect = choice === prac.answer;

	return (
		<section className="practice-panel">
			<div className="practice-meta">
				<span>FRESH TRANSFER PRACTICE</span>
				<span>{prac.badge}</span>
			</div>
			<h2>{prac.stem}</h2>

			{lessonId === 'q14' ? (
				<>
					<Q14PracticeFigure />
					<div className="choice-grid" role="radiogroup" aria-label="Choose one answer">
						{prac.options.map((opt) => {
							const selected = choice === opt.k;
							const cls = [
								'choice-row',
								selected ? 'chosen' : '',
								submitted && opt.k === prac.answer ? 'correct' : '',
								submitted && selected && opt.k !== prac.answer ? 'incorrect' : '',
							]
								.filter(Boolean)
								.join(' ');
							return (
								<button
									key={opt.k}
									type="button"
									className={cls}
									disabled={submitted}
									aria-pressed={selected}
									onClick={() => setChoice(opt.k)}
								>
									<b>{opt.k}</b>
									<span>{opt.label}</span>
									{submitted && opt.k === prac.answer && <strong>✓</strong>}
								</button>
							);
						})}
					</div>
				</>
			) : (
				<Q18PracticeFigure choice={choice} submitted={submitted} answer={prac.answer} onSelect={setChoice} />
			)}

			<label className="proof-box">
				<span>Explain your thinking (in your own words, or say it aloud first)</span>
				<textarea
					rows={3}
					value={proof}
					onChange={(e) => {
						setProof(e.target.value);
						if (submitted && saved) onSave({...saved, proof: e.target.value});
					}}
					placeholder={
						lessonId === 'q14'
							? 'Which face is opposite R, and which faces land flat on the short roll?'
							: 'What order do the shapes follow, and what order do the shades follow?'
					}
				/>
			</label>

			{!submitted ? (
				<div className="practice-actions">
					{error && (
						<p role="alert" className="error-msg">
							{error}
						</p>
					)}
					<button type="button" className="primary" onClick={commit}>
						Check my reasoning →
					</button>
				</div>
			) : (
				<div className="feedback-card">
					<p className="eyebrow">{isCorrect ? 'SPOT ON — NOW CHECK EVERY DETAIL' : 'GREAT TRY — LET’S CHECK THE TRAP'}</p>
					<h3>Answer: Option {prac.answer}</h3>
					<p>{prac.explanation}</p>
					{!isCorrect && prac.distractors[choice] && (
						<p className="chosen-trap">
							<b>Why option {choice} was tempting:</b> {prac.distractors[choice]}
						</p>
					)}
					<details>
						<summary>Compare all four options</summary>
						<div className="distractor-list">
							{(['A', 'B', 'C', 'D'] as const).map((k) => (
								<p key={k}>
									<b>Option {k}</b> — {prac.distractors[k]}
								</p>
							))}
						</div>
					</details>
					<label className="explain-check">
						<input
							type="checkbox"
							checked={explained}
							onChange={(e) => {
								setExplained(e.target.checked);
								onSave({choice, correct: isCorrect, proof, explained: e.target.checked, at: saved?.at || Date.now()});
							}}
						/>
						I can explain why option {prac.answer} works and why the tempting options fail.
					</label>
					<div className="practice-actions">
						<button type="button" onClick={reset}>
							Try again
						</button>
						<button type="button" className="primary" onClick={onBack}>
							Back to video lesson →
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

createRoot(document.getElementById('root')!).render(<App />);
