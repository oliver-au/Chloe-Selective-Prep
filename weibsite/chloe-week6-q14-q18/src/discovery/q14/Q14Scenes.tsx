import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Eyebrow, Narration, P, PauseMeter, Shell} from '../Shared';
import {FaceStyle, FlatNetStrip, PolygonTube} from './DecagonTube';
import {at, dur, LEAD, lerp, ramp} from './timing';

const SUBJECT = 'Thinking skills · Q14';
const useT = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	return f / fps;
};
const end = (id: string) => LEAD + dur(id);

export const Q14_FACES = ['B', 'G', 'A', 'D', 'E', 'H', 'J', 'C', 'F', 'I'];
export const Q14_PRAC_FACES = ['R', 'K', 'W', 'P', 'L', 'H', 'M', 'S'];

type Choice = {k: 'A' | 'B' | 'C' | 'D'; label: string; note?: string};
const Q14_CHOICES: Choice[] = [
	{k: 'A', label: '1', note: 'misses face G landing'},
	{k: 'B', label: '2', note: 'face A and face G both land'},
	{k: 'C', label: '3', note: 'counts D or puts J on ground'},
	{k: 'D', label: '4', note: 'counts D, E, H, J'},
];
const PRAC_CHOICES: Choice[] = [
	{k: 'A', label: '1', note: 'puts face R on the floor'},
	{k: 'B', label: '2', note: 'misses final landing on L'},
	{k: 'C', label: '3', note: 'W, P, and L land flat'},
	{k: 'D', label: '4', note: 'counts starting face K'},
];

const QuestionBanner: React.FC<{children: React.ReactNode; p?: number; top?: number; size?: number}> = ({
	children,
	p = 1,
	top = 132,
	size = 52,
}) => (
	<div
		style={{
			position: 'absolute',
			left: 110,
			right: 360,
			top,
			fontSize: size,
			fontWeight: 750,
			letterSpacing: -1.6,
			lineHeight: 1.18,
			opacity: p,
			translate: `0 ${(1 - p) * 14}px`,
		}}
	>
		{children}
	</div>
);

/** Sleek regular N-gon end-view card (horizontal compact option avoids ever colliding with strips or pause meters). */
const RegularEndBadge: React.FC<{
	n: number;
	cx: number;
	cy: number;
	r: number;
	label: string;
	sublabel?: string;
	compact?: boolean;
	opacity?: number;
}> = ({n, cx, cy, r, label, sublabel, compact = false, opacity = 1}) => {
	const polyCx = compact ? cx - 96 : cx;
	const polyCy = cy;
	const pts = Array.from({length: n}, (_, i) => {
		const a = Math.PI / 2 - Math.PI / n + (i * 2 * Math.PI) / n;
		return `${(polyCx + r * Math.cos(a)).toFixed(1)},${(polyCy + r * Math.sin(a)).toFixed(1)}`;
	}).join(' ');
	if (compact) {
		return (
			<g opacity={opacity}>
				<rect x={cx - 170} y={cy - 58} width={340} height={116} rx={12} fill="#111a20" stroke={P.line} strokeWidth={2} />
				<polygon points={pts} fill="#1c2a32" stroke={P.cyan} strokeWidth={3} />
				<line x1={polyCx - r - 10} y1={polyCy + r * Math.cos(Math.PI / n)} x2={polyCx + r + 10} y2={polyCy + r * Math.cos(Math.PI / n)} stroke={P.muted} strokeWidth={2} strokeDasharray="5 5" />
				<text x={cx - 24} y={cy - 8} fill={P.cyan} fontSize={19} fontWeight={800} letterSpacing={1.8} fontFamily="Manrope Variable, Arial, sans-serif">
					{label}
				</text>
				{sublabel && (
					<text x={cx - 24} y={cy + 24} fill={P.muted} fontSize={18} fontWeight={650} fontFamily="Manrope Variable, Arial, sans-serif">
						{sublabel}
					</text>
				)}
			</g>
		);
	}
	return (
		<g opacity={opacity}>
			<rect x={cx - 132} y={cy - 122} width={264} height={246} rx={12} fill="#111a20" stroke={P.line} strokeWidth={2} />
			<polygon points={pts} fill="#1c2a32" stroke={P.cyan} strokeWidth={3.5} />
			<line x1={cx - r - 18} y1={cy + r * Math.cos(Math.PI / n)} x2={cx + r + 18} y2={cy + r * Math.cos(Math.PI / n)} stroke={P.muted} strokeWidth={2.5} strokeDasharray="6 6" />
			<text x={cx} y={cy - r - 20} textAnchor="middle" fill={P.cyan} fontSize={19} fontWeight={800} letterSpacing={2} fontFamily="Manrope Variable, Arial, sans-serif">
				{label}
			</text>
			{sublabel && (
				<text x={cx} y={cy + r + 34} textAnchor="middle" fill={P.muted} fontSize={18} fontWeight={650} fontFamily="Manrope Variable, Arial, sans-serif">
					{sublabel}
				</text>
			)}
		</g>
	);
};

const ChoiceCards: React.FC<{
	items: Choice[];
	x: number;
	y: number;
	w?: number;
	show?: number;
	pick?: string;
	pickP?: number;
	wrong?: Record<string, number>;
	showNotes?: boolean;
}> = ({items, x, y, w = 520, show = 1, pick, pickP = 0, wrong = {}, showNotes = false}) => (
	<div style={{position: 'absolute', left: x, top: y, width: w, display: 'flex', flexDirection: 'column', gap: 18}}>
		{items.map((item, i) => {
			const p = Math.max(0, Math.min(1, show * items.length - i));
			const good = pick === item.k ? pickP : 0;
			const bad = wrong[item.k] ?? 0;
			const border = good > 0.4 ? P.mint : bad > 0.4 ? P.red : P.line;
			return (
				<div
					key={item.k}
					style={{
						opacity: p * (bad > 0.5 ? 0.58 : pick && pickP > 0.5 && pick !== item.k ? 0.5 : 1),
						translate: `${(1 - p) * 24}px 0`,
						display: 'flex',
						alignItems: 'center',
						gap: 22,
						minHeight: 84,
						padding: '12px 26px',
						borderRadius: 10,
						background: good > 0.4 ? '#152b25' : '#141f26',
						boxShadow: `inset 0 0 0 ${good > 0.4 ? 3.5 : 2}px ${border}`,
					}}
				>
					<span style={{fontSize: 32, fontWeight: 850, color: good > 0.4 ? P.mint : bad > 0.4 ? P.red : P.cyan, width: 34}}>
						{item.k}
					</span>
					<span style={{fontSize: 40, fontWeight: 800, color: P.ink, width: 42}}>{item.label}</span>
					{showNotes && (good > 0.4 || bad > 0.4) && item.note && (
						<span style={{fontSize: 22, fontWeight: 600, color: good > 0.4 ? P.mint : '#f1a198', opacity: Math.max(good, bad)}}>
							{item.note}
						</span>
					)}
					{bad > 0.3 && (
						<span style={{marginLeft: 'auto', fontSize: 38, color: P.red, opacity: bad, fontWeight: 850}}>✗</span>
					)}
					{good > 0.3 && (
						<span style={{marginLeft: 'auto', fontSize: 42, color: P.mint, opacity: good, fontWeight: 850}}>✓</span>
					)}
				</div>
			);
		})}
	</div>
);

/** ============ 01 Cold open ============ */
export const Q14Hook = () => {
	const t = useT();
	const id = 'q14-hook';
	const appear = 1;
	const dHi = ramp(t, at(id, 'Face D starts'), 0.35);
	const jHi = ramp(t, at(id, 'put face J on top'), 0.4);

	const styles: Record<string, FaceStyle> = {
		D: dHi > 0.3 ? {fill: '#2b5867', glow: P.cyan, textColor: P.ink} : {},
		J: jHi > 0.3 ? {fill: '#234a3f', glow: P.mint, textColor: P.ink} : {},
	};

	return (
		<Shell subject={SUBJECT} step="01 / THE PUZZLE">
			<QuestionBanner p={appear} top={132} size={46}>
				Face D starts on the ground. Roll the tube to put face J on top.
				<br />
				How few other faces must land flat?
			</QuestionBanner>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<FlatNetStrip faces={Q14_FACES} x={120} y={390} width={1260} height={240} styles={styles} opacity={appear} />
				{/* Role indicators below D and above J */}
				<g opacity={dHi}>
					<line x1={120 + 3.5 * 126} y1={640} x2={120 + 3.5 * 126} y2={690} stroke={P.cyan} strokeWidth={4} />
					<rect x={120 + 3.5 * 126 - 135} y={692} width={270} height={46} rx={8} fill="#14232a" stroke={P.cyan} strokeWidth={2.5} />
					<text x={120 + 3.5 * 126} y={723} textAnchor="middle" fill={P.cyan} fontSize={23} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
						D · ON THE GROUND
					</text>
				</g>
				<g opacity={jHi}>
					<line x1={120 + 6.5 * 126} y1={324} x2={120 + 6.5 * 126} y2={382} stroke={P.mint} strokeWidth={4} />
					<rect x={120 + 6.5 * 126 - 140} y={276} width={280} height={46} rx={8} fill="#122720" stroke={P.mint} strokeWidth={2.5} />
					<text x={120 + 6.5 * 126} y={307} textAnchor="middle" fill={P.mint} fontSize={23} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
						J · FINISH ON TOP
					</text>
				</g>
				<RegularEndBadge
					n={10}
					cx={1610}
					cy={510}
					r={70}
					label="10-SIDED TUBE"
					sublabel="Equal faces · 36° turns"
					opacity={appear}
				/>
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 02 Commit (Prediction + 4.5s quiet pause) ============ */
export const Q14Predict = () => {
	const t = useT();
	const id = 'q14-predict';
	const temptStart = at(id, 'three steps along');
	const temptEnd = at(id, 'Which number');
	// Subtle neutral highlight on E, H, J only while voicing the tempting count; clears completely before pause!
	const tempt = ramp(t, temptStart, 0.35) * (1 - ramp(t, temptEnd, 0.3));
	const opts = ramp(t, 0.15, 0.8);

	const styles: Record<string, FaceStyle> = {
		D: {fill: '#2b5867', glow: P.cyan, textColor: P.ink},
		J: {fill: '#234a3f', glow: P.mint, textColor: P.ink},
		...(tempt > 0.1
			? {
					E: {glow: P.cyan},
					H: {glow: P.cyan},
			  }
			: {}),
	};

	const stripX = 110;
	const stripY = 345;
	const stripW = 1080;
	const cellW = stripW / 10;

	return (
		<Shell subject={SUBJECT} step="02 / YOUR GUESS">
			<QuestionBanner top={124} size={44}>
				Face D starts on the ground. Roll the tube to put face J on top. How few other faces must land flat?
			</QuestionBanner>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<FlatNetStrip faces={Q14_FACES} x={stripX} y={stripY} width={stripW} height={195} styles={styles} />
				{/* Persistent clear given tags (non-spoiling!) */}
				<rect x={stripX + 3.5 * cellW - 125} y={stripY + 216} width={250} height={44} rx={8} fill="#14232a" stroke={P.cyan} strokeWidth={2} />
				<text x={stripX + 3.5 * cellW} y={stripY + 245} textAnchor="middle" fill={P.cyan} fontSize={21} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
					D starts on the ground
				</text>
				<rect x={stripX + 6.5 * cellW - 125} y={stripY - 60} width={250} height={44} rx={8} fill="#122720" stroke={P.mint} strokeWidth={2} />
				<text x={stripX + 6.5 * cellW} y={stripY - 31} textAnchor="middle" fill={P.mint} fontSize={21} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
					J must finish on top
				</text>
				{/* Temporary neutral step bracket under E, H, J during spoken temptation (clear of D badge!) */}
				{tempt > 0.05 && (
					<g opacity={tempt}>
						<path
							d={`M ${stripX + 4 * cellW + 10} ${stripY + 276} L ${stripX + 4 * cellW + 10} ${stripY + 292} L ${stripX + 7 * cellW - 10} ${stripY + 292} L ${stripX + 7 * cellW - 10} ${stripY + 276}`}
							fill="none"
							stroke={P.cyan}
							strokeWidth={3.5}
						/>
						<text x={stripX + 5.5 * cellW} y={stripY + 328} textAnchor="middle" fill={P.cyan} fontSize={23} fontWeight={750} fontFamily="Manrope Variable, Arial, sans-serif">
							3 steps along strip…?
						</text>
					</g>
				)}
				{/* Compact horizontal end-view card in open space — zero overlap with strip or PauseMeter! */}
				<RegularEndBadge n={10} cx={990} cy={695} r={38} label="REGULAR 10-GON" sublabel="Equal 36° turns" compact />
			</svg>
			<ChoiceCards items={Q14_CHOICES} x={1290} y={310} w={500} show={opts} />
			<PauseMeter start={end(id) + 0.15} duration={4.5} label="PAUSE · LOCK IN YOUR ANSWER" />
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 03 Test it: Fold the 10-sided tube ============ */
export const Q14Fold = () => {
	const t = useT();
	const id = 'q14-fold';
	const foldP = ramp(t, at(id, 'fold the net'), 2.6);
	const seamP = ramp(t, at(id, 'face I meets face B'), 0.45);
	const dGlow = ramp(t, at(id, 'Face D rests flat'), 0.4);
	const fGlow = ramp(t, at(id, 'Face F sits flat'), 0.4);

	const styles: Record<string, FaceStyle> = {
		D: dGlow > 0.2 ? {fill: P.cyan, glow: P.cyan, textColor: P.bg} : {stroke: P.cyan},
		F: fGlow > 0.2 ? {fill: '#5bb8d0', glow: P.cyan, textColor: P.bg} : {},
		J: {stroke: P.mint},
		I: seamP > 0.3 && dGlow < 0.5 ? {glow: P.cyan} : {},
		B: seamP > 0.3 && dGlow < 0.5 ? {glow: P.cyan} : {},
	};

	const faceW = lerp(116, 108, foldP);
	const originX = lerp(890, 930, foldP);
	const groundY = 720;

	return (
		<Shell subject={SUBJECT} step="03 / FOLD THE TUBE">
			<QuestionBanner top={130} size={46}>
				Fold the flat strip into a regular 10-sided tube
			</QuestionBanner>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<PolygonTube
					faces={Q14_FACES}
					groundIndex={3}
					fold={foldP}
					faceWidth={faceW}
					originX={originX}
					groundY={groundY}
					styles={styles}
					highlightSeam={seamP * (1 - fGlow * 0.6)}
				/>
				{/* Top level guide starting cleanly right of face C */}
				{fGlow > 0.05 && (
					<g opacity={fGlow}>
						<line x1={originX + 185} y1={groundY - 2 * (faceW / (2 * Math.tan(Math.PI / 10)))} x2={originX + 290} y2={groundY - 2 * (faceW / (2 * Math.tan(Math.PI / 10)))} stroke={P.cyan} strokeWidth={3} strokeDasharray="8 8" />
						<text x={originX + 308} y={groundY - 2 * (faceW / (2 * Math.tan(Math.PI / 10))) + 8} fill={P.cyan} fontSize={28} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
							TOP · FACE F
						</text>
					</g>
				)}
				{dGlow > 0.05 && (
					<g opacity={dGlow}>
						<text x={originX + 308} y={groundY + 8} fill={P.cyan} fontSize={28} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
							GROUND · FACE D
						</text>
					</g>
				)}
				{seamP > 0.1 && dGlow < 0.8 && (
					<g opacity={seamP * (1 - dGlow)}>
						<rect x={300} y={320} width={330} height={64} rx={10} fill="#122129" stroke={P.cyan} strokeWidth={2.5} />
						<text x={465} y={361} textAnchor="middle" fill={P.cyan} fontSize={26} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
							Face I joins face B
						</text>
					</g>
				)}
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 04 Visible contradiction: The upside-down trap ============ */
export const Q14Trap = () => {
	const t = useT();
	const id = 'q14-trap';
	const tStart = at(id, 'Watch three rolls');
	const tStop = at(id, 'Stop');
	const tTopG = at(id, 'Face G is on top');
	const tTrap = at(id, 'upside-down trap');

	// Smooth 3-step corner-pivoting roll RIGHT: 0 -> 1 (E) -> 2 (H) -> 3 (J), then hold RIGIDLY STILL!
	const stepSpan = Math.max(0.7, (tStop - tStart - 0.15) / 3);
	const r1 = ramp(t, tStart, stepSpan);
	const r2 = ramp(t, tStart + stepSpan, stepSpan);
	const r3 = ramp(t, tStart + stepSpan * 2, stepSpan);
	const rollSteps = r1 + r2 + r3;

	const faceW = 104;
	const originX = 720;
	const groundY = 708;
	const topY = groundY - 2 * (faceW / (2 * Math.tan(Math.PI / 10)));
	const jOnGround = ramp(t, tStop, 0.35);
	const gOnTop = ramp(t, tTopG, 0.35);
	const trapTitle = ramp(t, tTrap, 0.45);

	const stamps = [
		{step: 0, label: 'D', color: P.muted, opacity: 0.75},
		...(r1 > 0.9 ? [{step: 1, label: 'E', count: '1', color: P.red, opacity: 0.85}] : []),
		...(r2 > 0.9 ? [{step: 2, label: 'H', count: '2', color: P.red, opacity: 0.85}] : []),
		...(r3 > 0.9 ? [{step: 3, label: 'J', count: '3', color: P.red, opacity: 1}] : []),
	];

	const styles: Record<string, FaceStyle> = {
		J: {fill: jOnGround > 0.3 ? P.red : P.mint, glow: jOnGround > 0.3 ? P.red : P.mint, textColor: P.bg},
		G: gOnTop > 0.3 ? {fill: P.cyan, glow: P.cyan, textColor: P.bg} : {},
		D: {stroke: P.muted},
	};

	return (
		<Shell subject={SUBJECT} step="04 / THE TRAP">
			{trapTitle > 0.05 ? (
				<QuestionBanner p={trapTitle} top={124} size={64}>
					<span style={{color: P.red}}>The upside-down trap</span>
				</QuestionBanner>
			) : (
				<QuestionBanner top={130} size={46}>
					Test the tempting guess: roll 3 steps to face J
				</QuestionBanner>
			)}
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<PolygonTube
					faces={Q14_FACES}
					groundIndex={3}
					fold={1}
					rollSteps={rollSteps}
					faceWidth={faceW}
					originX={originX}
					groundY={groundY}
					styles={styles}
					stamps={stamps}
				/>
				{jOnGround > 0.1 && (
					<g opacity={jOnGround}>
						<rect x={1330} y={625} width={450} height={92} rx={12} fill="#2a1517" stroke={P.red} strokeWidth={3} />
						<text x={1555} y={667} textAnchor="middle" fill={P.red} fontSize={30} fontWeight={850} fontFamily="Manrope Variable, Arial, sans-serif">
							Face J is on the GROUND ✗
						</text>
						<text x={1555} y={701} textAnchor="middle" fill="#e5b3ae" fontSize={22} fontWeight={600} fontFamily="Manrope Variable, Arial, sans-serif">
							Rolling to J puts J underneath!
						</text>
					</g>
				)}
				{gOnTop > 0.1 && (
					<g opacity={gOnTop}>
						<line x1={originX + 3 * faceW + 175} y1={topY} x2={1325} y2={topY} stroke={P.cyan} strokeWidth={3} strokeDasharray="8 8" />
						<rect x={1330} y={topY - 40} width={450} height={82} rx={12} fill="#132229" stroke={P.cyan} strokeWidth={2.5} />
						<text x={1555} y={topY - 2} textAnchor="middle" fill={P.cyan} fontSize={29} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
							Face G is at the top
						</text>
						<text x={1555} y={topY + 29} textAnchor="middle" fill={P.muted} fontSize={22} fontWeight={600} fontFamily="Manrope Variable, Arial, sans-serif">
							We wanted face J up here!
						</text>
					</g>
				)}
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 05 Mechanism: Find the opposite face (halfway round = 5 steps) ============ */
export const Q14Opposite = () => {
	const t = useT();
	const id = 'q14-opposite';
	const tHalf = at(id, 'opposite is halfway');
	const tCount = at(id, 'one, two, three');
	const tFaceG = at(id, "That's face G");

	const countP = ramp(t, tCount, Math.max(1.8, tFaceG - tCount));
	const diamP = ramp(t, tHalf, 1.0);
	const gTarget = ramp(t, tFaceG, 0.45);

	const faceW = 102;
	const originX = 710;
	const groundY = 715;

	// Light up C, F, I, B, G sequentially as the 5-step arc counts 1..5
	const stepsArr = ['C', 'F', 'I', 'B', 'G'];
	const stepStyles: Record<string, FaceStyle> = {
		D: {stroke: P.cyan},
		J: {fill: P.mint, glow: P.mint, textColor: P.bg},
	};
	stepsArr.forEach((letter, idx) => {
		if (countP * 5 >= idx + 0.5) {
			stepStyles[letter] =
				letter === 'G' && gTarget > 0.3
					? {fill: P.mint, glow: P.mint, textColor: P.bg}
					: {fill: '#234a58', glow: P.cyan, textColor: P.ink};
		}
	});

	return (
		<Shell subject={SUBJECT} step="05 / FIND THE OPPOSITE">
			<QuestionBanner top={128} size={48}>
				Which face belongs on the ground when face J is on top?
			</QuestionBanner>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<PolygonTube
					faces={Q14_FACES}
					groundIndex={3}
					fold={1}
					rollSteps={0}
					faceWidth={faceW}
					originX={originX}
					groundY={groundY}
					styles={stepStyles}
					stamps={[{step: 0, label: 'D · START', color: P.cyan, opacity: 0.9}]}
					diameter={{
						from: 'J',
						to: 'G',
						progress: diamP,
						color: P.mint,
						label: 'HALFWAY = 5 STEPS',
					}}
					countArc={{
						fromIndex: 6, // J
						steps: 5,
						dir: 1, // J -> C -> F -> I -> B -> G
						progress: countP,
						color: P.cyan,
					}}
				/>
				{/* Right-hand concise visual rule readout (widened for generous padding!) */}
				<g opacity={ramp(t, 0.2, 0.5)}>
					<rect x={1190} y={290} width={615} height={140} rx={12} fill="#121d23" stroke={P.line} strokeWidth={2} />
					<text x={1226} y={342} fill={P.cyan} fontSize={22} fontWeight={800} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
						REGULAR 10-SIDED TUBE
					</text>
					<text x={1226} y={396} fill={P.ink} fontSize={32} fontWeight={750} fontFamily="Manrope Variable, Arial, sans-serif">
						Halfway round = 10 ÷ 2 = 5 steps
					</text>
				</g>
				{gTarget > 0.05 && (
					<g opacity={gTarget}>
						<rect x={1190} y={468} width={615} height={164} rx={12} fill="#122720" stroke={P.mint} strokeWidth={3} />
						<text x={1226} y={520} fill={P.mint} fontSize={24} fontWeight={850} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
							GROUND TARGET FOUND
						</text>
						<text x={1226} y={572} fill={P.ink} fontSize={35} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
							Face G ↔ Face J (opposite)
						</text>
						<text x={1226} y={608} fill={P.muted} fontSize={22} fontWeight={600} fontFamily="Manrope Variable, Arial, sans-serif">
							Land face G flat on the ground to put J on top.
						</text>
					</g>
				)}
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 06 Decisive proof: Roll the short way & count landings ============ */
export const Q14Roll = () => {
	const t = useT();
	const id = 'q14-roll';
	const tLong = at(id, 'other way takes eight');
	const tShort = at(id, 'roll the short way');
	const tFirst = at(id, 'First, face A');
	const tSecond = at(id, 'Second, face G');
	const tTop = at(id, 'Look straight up');

	const longOp = ramp(t, tLong, 0.4) * (1 - ramp(t, tFirst, 0.35));
	const roll1 = ramp(t, tFirst, 1.05);
	const roll2 = ramp(t, tSecond, 1.05);
	// Negative rollSteps pivots LEFT: D (0) -> A (-1) -> G (-2)!
	const rollSteps = -(roll1 + roll2);
	const jTopGlow = ramp(t, tTop, 0.4);

	const faceW = 102;
	const originX = 1040;
	const groundY = 710;
	const topY = groundY - 2 * (faceW / (2 * Math.tan(Math.PI / 10)));

	const stamps = [
		{step: 0, label: 'D (0)', color: P.muted, opacity: 0.9},
		...(roll1 > 0.88 ? [{step: -1, label: 'A', count: '1', color: P.mint, opacity: 1}] : []),
		...(roll2 > 0.88 ? [{step: -2, label: 'G', count: '2', color: P.mint, opacity: 1}] : []),
	];

	const styles: Record<string, FaceStyle> = {
		D: {stroke: P.muted},
		A: roll1 > 0.6 ? {fill: '#1e4a3d', glow: P.mint, textColor: P.ink} : {stroke: P.cyan},
		G: roll2 > 0.6 ? {fill: P.mint, glow: P.mint, textColor: P.bg} : {stroke: P.mint},
		J: jTopGlow > 0.2 ? {fill: P.mint, glow: P.mint, textColor: P.bg} : {fill: '#234a3f', stroke: P.mint, textColor: P.ink},
	};

	const landingCount = roll2 > 0.88 ? 2 : roll1 > 0.88 ? 1 : 0;

	return (
		<Shell subject={SUBJECT} step="06 / ROLL THE SHORT WAY">
			<QuestionBanner top={128} size={48}>
				Reset to face D (count 0), then roll the short way to face G
			</QuestionBanner>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<PolygonTube
					faces={Q14_FACES}
					groundIndex={3}
					fold={1}
					rollSteps={rollSteps}
					faceWidth={faceW}
					originX={originX}
					groundY={groundY}
					styles={styles}
					stamps={stamps}
					diameter={
						jTopGlow > 0.1
							? {from: 'G', to: 'J', progress: jTopGlow, color: P.mint, label: 'G BOTTOM · J TOP'}
							: undefined
					}
					longWayArc={{
						fromIndex: 3, // D
						steps: 8,
						dir: 1, // right around E,H,J,C,F,I,B,G
						opacity: longOp,
						label: '8 ROLLS (LONG WAY)',
					}}
				/>
				{/* Live landing counter card */}
				<g>
					<rect x={1350} y={290} width={440} height={164} rx={12} fill={landingCount === 2 ? '#122720' : '#121d23'} stroke={landingCount === 2 ? P.mint : P.cyan} strokeWidth={3} />
					<text x={1570} y={338} textAnchor="middle" fill={landingCount === 2 ? P.mint : P.cyan} fontSize={23} fontWeight={800} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
						NEW FACES LANDED
					</text>
					<text x={1570} y={422} textAnchor="middle" fill={P.ink} fontSize={84} fontWeight={900} fontFamily="Manrope Variable, Arial, sans-serif">
						{landingCount}
					</text>
				</g>
				{/* Flat-on-top proof indicator (dashed guide cleanly clear of C and H badges!) */}
				{jTopGlow > 0.05 && (
					<g opacity={jTopGlow}>
						<line x1={505} y1={topY} x2={originX - 2 * faceW - 155} y2={topY} stroke={P.mint} strokeWidth={4} strokeDasharray="10 8" />
						<rect x={125} y={topY - 40} width={375} height={78} rx={12} fill="#122720" stroke={P.mint} strokeWidth={3} />
						<text x={312} y={topY + 10} textAnchor="middle" fill={P.mint} fontSize={32} fontWeight={850} fontFamily="Manrope Variable, Arial, sans-serif">
							Face J · FLAT ON TOP ✓
						</text>
					</g>
				)}
				{/* Direction arrow during short-way cue */}
				{t >= tShort && roll1 < 0.5 && (
					<g opacity={ramp(t, tShort, 0.35)}>
						<path d="M 790 660 L 660 660" stroke={P.mint} strokeWidth={6} strokeLinecap="round" />
						<polygon points="642,660 676,642 676,678" fill={P.mint} />
						<text x={720} y={634} textAnchor="middle" fill={P.mint} fontSize={24} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
							SHORT WAY
						</text>
					</g>
				)}
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 07 Exam bridge: Check all four options ============ */
export const Q14Exam = () => {
	const t = useT();
	const id = 'q14-exam';
	const wA = ramp(t, at(id, 'Option A says one'), 0.4);
	const wC = ramp(t, at(id, 'Option C says three'), 0.4);
	const wD = ramp(t, at(id, 'Option D counts'), 0.4);
	const okB = ramp(t, at(id, 'Choose option B'), 0.45);

	const faceW = 90;
	return (
		<Shell subject={SUBJECT} step="07 / CHECK QUESTION 14">
			<Eyebrow style={{position: 'absolute', left: 110, top: 132}} color={P.muted}>
				Cortex Academy Week 6 · Question 14
			</Eyebrow>
			<QuestionBanner top={176} size={42}>
				How many other faces, excluding face ‘D’, now must come in contact with the ground?
			</QuestionBanner>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<PolygonTube
					faces={Q14_FACES}
					groundIndex={3}
					fold={1}
					rollSteps={-2}
					faceWidth={faceW}
					originX={680}
					groundY={708}
					styles={{
						G: {fill: P.mint, glow: P.mint, textColor: P.bg},
						J: {fill: P.mint, glow: P.mint, textColor: P.bg},
						A: {fill: '#1e4a3d', stroke: P.mint, textColor: P.ink},
					}}
					stamps={[
						{step: 0, label: 'D (start)', color: P.muted, opacity: 0.8},
						{step: -1, label: 'A', count: '1', color: P.mint, opacity: 1},
						{step: -2, label: 'G', count: '2', color: P.mint, opacity: 1},
					]}
					diameter={{from: 'G', to: 'J', progress: 1, color: P.mint}}
				/>
			</svg>
			<ChoiceCards
				items={Q14_CHOICES}
				x={1080}
				y={315}
				w={710}
				pick="B"
				pickP={okB}
				wrong={{A: wA, C: wC, D: wD}}
				showNotes
			/>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 08 Your turn: Fresh 8-sided octagonal tube (+ 5.0s quiet pause) ============ */
export const Q14Practice = () => {
	const t = useT();
	const id = 'q14-practice';
	const appear = ramp(t, 0, 0.7);
	const stripX = 110;
	const stripY = 385;
	const stripW = 1040;
	const cellW = stripW / 8;

	const styles: Record<string, FaceStyle> = {
		K: {fill: '#2b5867', glow: P.cyan, textColor: P.ink},
		R: {fill: '#234a3f', glow: P.mint, textColor: P.ink},
	};

	return (
		<Shell subject={SUBJECT} step="08 / YOUR TURN">
			<Eyebrow style={{position: 'absolute', left: 110, top: 122, opacity: appear}} color={P.muted}>
				Original practice · regular 8-sided tube
			</Eyebrow>
			<QuestionBanner p={appear} top={162} size={38}>
				Regular eight-sided tube. Roll from face K on the ground to put face R on top. How few other faces must land flat?
			</QuestionBanner>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<FlatNetStrip faces={Q14_PRAC_FACES} x={stripX} y={stripY} width={stripW} height={185} styles={styles} opacity={appear} />
				{/* Clear start/goal badges (zero hints!) */}
				<rect x={stripX + 1.5 * cellW - 115} y={stripY + 206} width={230} height={44} rx={8} fill="#14232a" stroke={P.cyan} strokeWidth={2} />
				<text x={stripX + 1.5 * cellW} y={stripY + 235} textAnchor="middle" fill={P.cyan} fontSize={21} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
					K starts on ground
				</text>
				<rect x={stripX + 0.5 * cellW - 95} y={stripY - 60} width={190} height={44} rx={8} fill="#122720" stroke={P.mint} strokeWidth={2} />
				<text x={stripX + 0.5 * cellW} y={stripY - 31} textAnchor="middle" fill={P.mint} fontSize={21} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
					R · goal: top
				</text>
				{/* Seam wrap cue showing S joins R — label cleanly above arc! */}
				<path
					d={`M ${stripX + 7.5 * cellW} ${stripY - 12} C ${stripX + 7.5 * cellW} ${stripY - 82}, ${stripX + 0.5 * cellW + 115} ${stripY - 82}, ${stripX + 0.5 * cellW + 100} ${stripY - 38}`}
					fill="none"
					stroke={P.muted}
					strokeWidth={2.5}
					strokeDasharray="7 7"
				/>
				<text x={stripX + 4.8 * cellW} y={stripY - 78} textAnchor="middle" fill={P.muted} fontSize={20} fontWeight={700} fontFamily="Manrope Variable, Arial, sans-serif">
					seam: face S joins face R
				</text>
				{/* Compact horizontal end-view card in open space — completely clear of strip & PauseMeter! */}
				<RegularEndBadge n={8} cx={955} cy={690} r={38} label="REGULAR 8-GON" sublabel="Equal 45° turns" compact opacity={appear} />
			</svg>
			<ChoiceCards items={PRAC_CHOICES} x={1250} y={325} w={530} show={appear} />
			<PauseMeter start={end(id) + 0.15} duration={5.0} label="PAUSE · WORK IT OUT" />
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 09 Your turn proof: Octagon fold, trap, diameter, and 3-step short roll ============ */
export const Q14PracticeAnswer = () => {
	const t = useT();
	const id = 'q14-practice-answer';
	const tTrap = at(id, 'Rolling one step');
	const tHalf = at(id, 'Halfway round eight');
	const tLong = at(id, 'long way takes five');
	const tW = at(id, 'Face W lands first');
	const tP = at(id, 'Then face P');
	const tL = at(id, 'Then face L');
	const tTwo = at(id, 'Two would miss');
	const tFour = at(id, 'Four would count');
	const tChoose = at(id, 'Choose option C');

	// Phase 1: Quick 1-step left roll onto R (shows R on floor!), then resets to K before halfway diameter
	const trapRoll = ramp(t, tTrap, 0.85) * (1 - ramp(t, tHalf - 0.3, 0.55));
	const diamP = ramp(t, tHalf, 0.85);
	const longOp = ramp(t, tLong, 0.4) * (1 - ramp(t, tW, 0.35));

	// Phase 2: Short roll RIGHT from K(1): W (+1), P (+2), L (+3)
	const r1 = ramp(t, tW, 0.85);
	const r2 = ramp(t, tP, 0.85);
	const r3 = ramp(t, tL, 0.85);
	const rollSteps = t < tW - 0.15 ? -trapRoll : r1 + r2 + r3;

	const faceW = 100;
	const originX = 480;
	const groundY = 708;

	const rimCounting = diamP > 0.05 && r1 < 0.1;
	const stamps =
		t < tW - 0.15
			? [
					...(!rimCounting ? [{step: 0, label: 'K', color: P.cyan, opacity: 0.85}] : []),
					...(trapRoll > 0.7 ? [{step: -1, label: 'R · FLOOR ✗', color: P.red, opacity: trapRoll}] : []),
			  ]
			: [
					...(!rimCounting ? [{step: 0, label: 'K (0)', color: P.muted, opacity: 0.85}] : []),
					...(r1 > 0.85 ? [{step: 1, label: 'W', count: '1', color: P.mint, opacity: 1}] : []),
					...(r2 > 0.85 ? [{step: 2, label: 'P', count: '2', color: P.mint, opacity: 1}] : []),
					...(r3 > 0.85 ? [{step: 3, label: 'L', count: '3', color: P.mint, opacity: 1}] : []),
			  ];

	const styles: Record<string, FaceStyle> = {
		K: {stroke: P.muted},
		R:
			trapRoll > 0.5
				? {fill: P.red, glow: P.red, textColor: P.bg}
				: r3 > 0.7
					? {fill: P.mint, glow: P.mint, textColor: P.bg}
					: {fill: '#234a3f', stroke: P.mint, textColor: P.ink},
		L: r3 > 0.7 || diamP > 0.7 ? {fill: P.mint, glow: P.mint, textColor: P.bg} : {stroke: P.mint},
		W: r1 > 0.7 ? {fill: '#1e4a3d', stroke: P.mint, textColor: P.ink} : {},
		P: r2 > 0.7 ? {fill: '#1e4a3d', stroke: P.mint, textColor: P.ink} : {},
	};

	const wA = ramp(t, tTrap + 0.6, 0.35);
	const wB = ramp(t, tTwo, 0.35);
	const wD = ramp(t, tFour, 0.35);
	const okC = ramp(t, tChoose, 0.45);

	return (
		<Shell subject={SUBJECT} step="08 / YOUR TURN · PROOF">
			<Eyebrow style={{position: 'absolute', left: 110, top: 126}} color={P.muted}>
				Original practice · regular 8-sided tube
			</Eyebrow>
			<QuestionBanner top={168} size={44}>
				{diamP > 0.9625
					? 'Halfway round 8 sides is 4 steps: face L goes on the ground'
					: 'Test the 8-sided tube from face K on the ground'}
			</QuestionBanner>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<PolygonTube
					faces={Q14_PRAC_FACES}
					groundIndex={1} // K
					fold={1}
					rollSteps={rollSteps}
					faceWidth={faceW}
					originX={originX}
					groundY={groundY}
					styles={styles}
					stamps={stamps}
					diameter={
						diamP > 0.05
							? {from: 'R', to: 'L', progress: diamP, color: P.mint, label: 'OPPOSITE: R ↔ L'}
							: undefined
					}
					countArc={
						diamP > 0.05 && r1 < 0.1
							? {fromIndex: 0, steps: 4, dir: 1, progress: diamP, color: P.cyan}
							: undefined
					}
					longWayArc={{
						fromIndex: 1, // K
						steps: 5,
						dir: -1, // left around R,S,M,H,L
						opacity: longOp,
						label: '5 ROLLS (LONG WAY)',
					}}
				/>
			</svg>
			<ChoiceCards
				items={PRAC_CHOICES}
				x={1160}
				y={315}
				w={640}
				pick="C"
				pickP={okC}
				wrong={{A: wA, B: wB, D: wD}}
				showNotes
			/>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 10 Pocket rule ============ */
export const Q14Pocket = () => {
	const t = useT();
	const id = 'q14-pocket';
	const ruleP = ramp(t, 0.15, 0.65);

	// Small 5-sided pentagon near-miss icon (shows corner on top when resting flat on a side!)
	const pentPts = Array.from({length: 5}, (_, i) => {
		const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
		return `${(1640 + 44 * Math.cos(a)).toFixed(1)},${(740 + 44 * Math.sin(a)).toFixed(1)}`;
	}).join(' ');

	return (
		<Shell subject={SUBJECT} step="09 / KEEP THIS">
			<Eyebrow style={{position: 'absolute', left: 110, top: 245, opacity: ruleP}} color={P.muted}>
				Next time a tube rolls
			</Eyebrow>
			<div
				style={{
					position: 'absolute',
					left: 110,
					top: 292,
					width: 960,
					fontSize: 60,
					fontWeight: 800,
					letterSpacing: -2.2,
					lineHeight: 1.16,
					opacity: ruleP,
					translate: `0 ${(1 - ruleP) * 18}px`,
				}}
			>
				Regular, even-sided tube?
				<br />
				<span style={{color: P.mint}}>Roll the shortest way to the face opposite your chosen top.</span>
				<br />
				Count each landing.
			</div>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}} opacity={ruleP}>
				<PolygonTube
					faces={Q14_FACES}
					groundIndex={3}
					fold={1}
					rollSteps={-2}
					faceWidth={72}
					originX={1495}
					groundY={520}
					groundRange={[1150, 1780]}
					styles={{
						G: {fill: P.mint, glow: P.mint, textColor: P.bg},
						J: {fill: P.mint, glow: P.mint, textColor: P.bg},
						A: {fill: '#1e4a3d', stroke: P.mint, textColor: P.ink},
					}}
					stamps={[
						{step: 0, label: 'D', color: P.muted, opacity: 0.7},
						{step: -1, label: 'A', count: '1', color: P.mint, opacity: 1},
						{step: -2, label: 'G', count: '2', color: P.mint, opacity: 1},
					]}
					diameter={{from: 'G', to: 'J', progress: 1, color: P.mint}}
				/>
				{/* Near-miss visual reminder: odd-sided pentagon has a corner on top */}
				<g>
					<rect x={1150} y={678} width={630} height={134} rx={12} fill="#141e24" stroke={P.line} strokeWidth={2} />
					<text x={1182} y={722} fill={P.red} fontSize={20} fontWeight={800} letterSpacing={2} fontFamily="Manrope Variable, Arial, sans-serif">
						CHECK THE CONDITION
					</text>
					<text x={1182} y={758} fill={P.ink} fontSize={23} fontWeight={650} fontFamily="Manrope Variable, Arial, sans-serif">
						A regular pentagon resting on a side
					</text>
					<text x={1182} y={790} fill={P.muted} fontSize={22} fontWeight={600} fontFamily="Manrope Variable, Arial, sans-serif">
						has a corner on top — not a flat face.
					</text>
					<polygon points={pentPts} fill="#1d2b32" stroke={P.red} strokeWidth={3} />
					<circle cx={1640} cy={696} r={6} fill={P.red} />
				</g>
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};
