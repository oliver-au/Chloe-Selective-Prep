import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Eyebrow, Narration, P, PauseMeter, Shell} from '../Shared';
import {
	BOX_BG,
	BOX_BORDER,
	DiagonalBox,
	diagonalSlotCoords,
	NestedBox,
	nestedLayerRadii,
	Q18_LOWER_IN,
	Q18_OPTIONS,
	Q18_PRAC_LOWER_IN,
	Q18_PRAC_OPTIONS,
	Q18_PRAC_UPPER_IN,
	Q18_PRAC_UPPER_OUT,
	Q18_UPPER_IN,
	Q18_UPPER_OUT,
	SHADE_FILL,
	SHADE_LABEL,
	ShapeGlyph,
	ShapeItem,
	ShapeKind,
} from './AnalogyShapes';
import {at, dur, LEAD, lerp, ramp} from './timing';

const SUBJECT = 'Thinking skills · Q18';
const useT = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	return f / fps;
};
const end = (id: string) => LEAD + dur(id);

const Heading: React.FC<{children: React.ReactNode; p?: number; top?: number; size?: number}> = ({
	children,
	p = 1,
	top = 128,
	size = 50,
}) => (
	<div
		style={{
			position: 'absolute',
			left: 110,
			right: 110,
			top,
			fontSize: size,
			fontWeight: 750,
			letterSpacing: -1.6,
			lineHeight: 1.15,
			opacity: p,
			translate: `0 ${(1 - p) * 14}px`,
		}}
	>
		{children}
	</div>
);

const IsToBadge: React.FC<{x: number; y: number; text?: string; opacity?: number}> = ({x, y, text = 'IS TO', opacity = 1}) => (
	<g opacity={opacity}>
		<text x={x} y={y + 8} textAnchor="middle" fill={P.muted} fontSize={26} fontWeight={800} letterSpacing={3} fontFamily="Manrope Variable, Arial, sans-serif">
			{text}
		</text>
		<line x1={x - 36} y1={y + 24} x2={x + 28} y2={y + 24} stroke={P.line} strokeWidth={3} />
		<polygon points={`${x + 38},${y + 24} ${x + 24},${y + 16} ${x + 24},${y + 32}`} fill={P.muted} />
	</g>
);

const QuestionBox: React.FC<{x: number; y: number; size: number; opacity?: number}> = ({x, y, size, opacity = 1}) => (
	<g opacity={opacity}>
		<rect x={x} y={y} width={size} height={size} rx={10} fill="#121d24" stroke={P.cyan} strokeWidth={3.5} strokeDasharray="10 8" />
		<text
			x={x + size / 2}
			y={y + size / 2 + 34}
			textAnchor="middle"
			fill={P.cyan}
			fontSize={96}
			fontWeight={850}
			fontFamily="Manrope Variable, Arial, sans-serif"
		>
			?
		</text>
	</g>
);

/** Reusable Split-Track animated builder: lifts outlines from input box, nests them by `shapeOrder`, then slides paint swatches into layers by `shadeOrder`. */
const SplitTrackStage: React.FC<{
	input: [ShapeItem, ShapeItem, ShapeItem, ShapeItem];
	shapeOrder: [number, number, number, number]; // indices into input, outside -> inside
	shadeOrder: [number, number, number, number]; // indices into input, outside -> inside
	inX: number;
	inY: number;
	inSize: number;
	outX: number;
	outY: number;
	outSize: number;
	/** 0..1 lift outlines off fills */
	liftP: number;
	/** 0..4 outlines gliding one by one into nested target box */
	outlineSteps: number;
	/** 0..4 paint swatches sliding one by one into nested layers */
	shadeSteps: number;
	/** Optional highlight ring on a specific nested layer (0..3) */
	highlightLayer?: number;
}> = ({
	input,
	shapeOrder,
	shadeOrder,
	inX,
	inY,
	inSize,
	outX,
	outY,
	outSize,
	liftP,
	outlineSteps,
	shadeSteps,
	highlightLayer = -1,
}) => {
	const outCx = outX + outSize / 2;
	const outCy = outY + outSize / 2;
	const orderedShapes = shapeOrder.map((idx) => input[idx].shape) as [ShapeKind, ShapeKind, ShapeKind, ShapeKind];
	const {radii, yOffsets} = nestedLayerRadii(outSize, orderedShapes);

	// Swatch tray below the input box
	const swatchY = inY + inSize + 58;
	const swatchSpacing = inSize / 4;

	return (
		<g>
			{/* Source input box */}
			<rect x={inX} y={inY} width={inSize} height={inSize} rx={8} fill={BOX_BG} stroke={BOX_BORDER} strokeWidth={4} />
			{/* Diagonal direction arrow top-left -> bottom-right */}
			<line
				x1={inX + 22}
				y1={inY + inSize - 24}
				x2={inX + inSize - 24}
				y2={inY + inSize - 24}
				stroke="#8c989d"
				strokeWidth={2}
				opacity={0.45}
			/>
			{/* Static ghost fills remaining in input box as outlines lift away */}
			{input.map((item, idx) => {
				const [sx, sy] = diagonalSlotCoords(inX, inY, inSize, idx);
				const r = inSize * 0.118;
				return (
					<g key={`base-slot-${idx}`}>
						{/* Original paint circle swatch left behind */}
						<circle
							cx={sx}
							cy={sy}
							r={r * 0.72}
							fill={SHADE_FILL[item.shade]}
							stroke="#23201e"
							strokeWidth={2.5}
							opacity={0.28 + 0.72 * (1 - liftP)}
						/>
						{/* Position badge 1..4 */}
						<g transform={`translate(${sx + r * 1.28}, ${sy - r * 1.05})`}>
							<circle r={14} fill="#18252c" stroke={P.cyan} strokeWidth={2} />
							<text y={5} textAnchor="middle" fill={P.ink} fontSize={17} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
								{idx + 1}
							</text>
						</g>
					</g>
				);
			})}

			{/* Swatch strip below input box showing the 4 extracted shades 1, 2, 3, 4 */}
			<g opacity={Math.min(1, liftP * 1.4)}>
				<text x={inX} y={swatchY - 26} fill={P.muted} fontSize={inSize < 290 ? 15 : 18} fontWeight={800} letterSpacing={2} fontFamily="Manrope Variable, Arial, sans-serif">
					SHADES LEFT BEHIND (1 → 4)
				</text>
				{input.map((item, idx) => {
					const swX = inX + swatchSpacing * (idx + 0.5);
					const swW = Math.min(56, swatchSpacing - 10);
					const shadeLayerIdx = shadeOrder.indexOf(idx);
					const used = shadeSteps > shadeLayerIdx + 0.75;
					const shortLbl = item.shade === 'black' ? 'BLK' : item.shade === 'grey' ? 'GRY' : item.shade === 'white' ? 'WHT' : '';
					return (
						<g key={`swatch-${idx}`} opacity={used ? 0.4 : 1}>
							<rect x={swX - swW / 2} y={swatchY - 14} width={swW} height={40} rx={8} fill={SHADE_FILL[item.shade]} stroke={P.cyan} strokeWidth={2.5} />
							<text x={swX} y={swatchY + 46} textAnchor="middle" fill={P.muted} fontSize={inSize < 290 ? 14 : 17} fontWeight={750} fontFamily="Manrope Variable, Arial, sans-serif">
								{inSize < 290 ? `${idx + 1}·${shortLbl}` : `${idx + 1} · ${item.shade !== 'none' ? SHADE_LABEL[item.shade] : ''}`}
							</text>
						</g>
					);
				})}
			</g>

			{/* Target nested output box */}
			<rect x={outX} y={outY} width={outSize} height={outSize} rx={10} fill={BOX_BG} stroke={P.cyan} strokeWidth={4} />

			{/* Animated layers (outside -> inside): first glide as crisp outlines, then receive paint fills! */}
			{shapeOrder.map((srcIdx, layerIdx) => {
				const moveP = Math.max(0, Math.min(1, outlineSteps - layerIdx));
				const fillP = Math.max(0, Math.min(1, shadeSteps - layerIdx));
				const [sx, sy] = diagonalSlotCoords(inX, inY, inSize, srcIdx);
				const liftedY = sy - liftP * 26;
				const tx = outCx;
				const ty = outCy + yOffsets[layerIdx];
				const cx = lerp(sx, tx, moveP);
				const cy = lerp(liftedY, ty, moveP);
				const r = lerp(inSize * 0.118, radii[layerIdx], moveP);
				const targetShade = input[shadeOrder[layerIdx]].shade;
				const showFill = fillP > 0.55;
				const isHi = highlightLayer === layerIdx;
				return (
					<g key={`moving-layer-${layerIdx}`}>
						{/* Faint original fill only while unlifted */}
						{liftP < 0.95 && moveP < 0.05 && (
							<ShapeGlyph
								shape={input[srcIdx].shape}
								shade={input[srcIdx].shade}
								cx={sx}
								cy={sy}
								r={inSize * 0.118}
								opacity={1 - liftP}
							/>
						)}
						{/* High-contrast bright cyan/cream halo behind travelling outline across the dark canvas gap (>10:1 contrast!) */}
						{moveP > 0.02 && moveP < 0.96 && !showFill && (
							<ShapeGlyph
								shape={input[srcIdx].shape}
								shade="none"
								cx={cx}
								cy={cy}
								r={r}
								stroke={P.cyan}
								strokeWidth={11}
								opacity={0.92}
							/>
						)}
						{/* Crisp outline gliding from lifted source position into nested ring */}
						<ShapeGlyph
							shape={input[srcIdx].shape}
							shade={showFill ? targetShade : 'none'}
							cx={cx}
							cy={cy}
							r={r}
							stroke={isHi ? P.mint : moveP > 0.02 && moveP < 0.96 && !showFill ? '#f3f0e7' : moveP > 0.05 && !showFill ? '#16232a' : '#23201e'}
							strokeWidth={isHi ? 6 : moveP > 0.02 && moveP < 0.96 && !showFill ? 4.5 : moveP > 0.05 && !showFill ? 4 : 3}
						/>
						{/* Traveling paint drop swatch gliding from tray into this layer */}
						{fillP > 0.02 && fillP < 0.92 && (() => {
							const swIdx = shadeOrder[layerIdx];
							const swX = inX + swatchSpacing * (swIdx + 0.5);
							const px = lerp(swX, tx, fillP);
							const py = lerp(swatchY + 7, ty, fillP);
							return (
								<circle
									cx={px}
									cy={py}
									r={20 * (1 - fillP * 0.35)}
									fill={SHADE_FILL[targetShade]}
									stroke={P.mint}
									strokeWidth={3.5}
								/>
							);
						})()}
					</g>
				);
			})}
		</g>
	);
};

/** ============ 01 Cold open (zero spoilers, <= 5.5 s!) ============ */
export const Q18Hook = () => {
	const t = useT();
	const id = 'q18-hook';
	const appear = 1;
	const topHi = ramp(t, at(id, 'Look at the top'), 0.4);
	const botHi = ramp(t, at(id, 'four shapes below'), 0.4);

	return (
		<Shell subject={SUBJECT} step="01 / THE PUZZLE">
			<Heading p={appear} top={124} size={56}>
				Which picture fits?
			</Heading>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}} opacity={appear}>
				{/* Top worked pair */}
				<DiagonalBox items={Q18_UPPER_IN} x={470} y={240} size={270} borderColor={topHi > 0.3 ? P.cyan : BOX_BORDER} />
				<IsToBadge x={855} y={375} />
				<NestedBox layers={Q18_UPPER_OUT} x={970} y={240} size={270} borderColor={topHi > 0.3 ? P.cyan : BOX_BORDER} />
				<text x={855} y={548} textAnchor="middle" fill={P.muted} fontSize={26} fontWeight={800} letterSpacing={4} fontFamily="Manrope Variable, Arial, sans-serif">
					AS
				</text>
				{/* Bottom test pair */}
				<DiagonalBox items={Q18_LOWER_IN} x={470} y={580} size={270} borderColor={botHi > 0.3 ? P.cyan : BOX_BORDER} />
				<IsToBadge x={855} y={715} />
				<QuestionBox x={970} y={580} size={270} />
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 02 Commit (Prediction + 4.5s quiet pause — ZERO glows or spoilers!) ============ */
export const Q18Predict = () => {
	const t = useT();
	const id = 'q18-predict';
	const opts = ramp(t, 0.1, 0.7);

	return (
		<Shell subject={SUBJECT} step="02 / YOUR GUESS">
			<Heading top={122} size={52}>
				Which picture fits?
			</Heading>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				{/* Complete worked pair + lower input kept visible on left */}
				<DiagonalBox items={Q18_UPPER_IN} x={130} y={225} size={255} />
				<IsToBadge x={455} y={352} />
				<NestedBox layers={Q18_UPPER_OUT} x={525} y={225} size={255} />

				<text x={455} y={518} textAnchor="middle" fill={P.muted} fontSize={24} fontWeight={800} letterSpacing={4} fontFamily="Manrope Variable, Arial, sans-serif">
					AS
				</text>

				<DiagonalBox items={Q18_LOWER_IN} x={130} y={545} size={255} />
				<IsToBadge x={455} y={672} />
				<QuestionBox x={525} y={545} size={255} />

				{/* Four completely neutral options A, B, C, D on right (clean buffer above PauseMeter) */}
				{Q18_OPTIONS.map((opt, idx) => {
					const col = idx % 2;
					const row = Math.floor(idx / 2);
					const ox = 1040 + col * 360;
					const oy = 205 + row * 305;
					const p = Math.max(0, Math.min(1, opts * 4 - idx));
					return <NestedBox key={opt.k} layers={opt.layers} x={ox} y={oy} size={234} label={opt.k} opacity={p} />;
				})}
			</svg>
			<PauseMeter start={end(id) + 0.15} duration={4.5} label="PAUSE · LOCK IN YOUR ANSWER" />
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 03 Visible contradiction: The sticky-paint trap ============ */
export const Q18Trap = () => {
	const t = useT();
	const id = 'q18-trap';
	const tWhite = at(id, 'circle started white');
	const tBlack = at(id, "Now it's black");
	const tTrap = at(id, 'sticky-paint trap');

	const pullP = ramp(t, tWhite, 0.9);
	const clashP = ramp(t, tBlack, 0.45);
	const trapTitle = ramp(t, tTrap, 0.45);

	// White input circle starts at Pos 2 inside Q18_UPPER_IN at (130, 270, size=310)
	const [srcCx, srcCy] = diagonalSlotCoords(130, 270, 310, 1);
	const copyX = lerp(srcCx, 1185, pullP);
	const copyY = lerp(srcCy, 445, pullP);
	const copyR = lerp(310 * 0.118, 96, pullP);

	return (
		<Shell subject={SUBJECT} step="03 / THE TRAP">
			{trapTitle > 0.05 ? (
				<Heading p={trapTitle} top={120} size={62}>
					<span style={{color: P.red}}>The sticky-paint trap</span>
				</Heading>
			) : (
				<Heading top={124} size={48}>
					Test that idea on the top example
				</Heading>
			)}
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				{/* Keep complete worked pair visible on left */}
				<DiagonalBox items={Q18_UPPER_IN} x={130} y={270} size={310} highlightIndex={1} highlightColor={P.cyan} />
				<IsToBadge x={515} y={425} />
				<NestedBox layers={Q18_UPPER_OUT} x={590} y={270} size={310} highlightLayer={0} highlightColor={clashP > 0.3 ? P.red : P.cyan} />

				{/* Side-by-side comparison stage on right */}
				<rect x={1020} y={250} width={770} height={470} rx={16} fill="#111a20" stroke={clashP > 0.3 ? P.red : P.line} strokeWidth={3} opacity={Math.min(1, pullP * 1.5)} />
				<text x={1405} y={306} textAnchor="middle" fill={P.muted} fontSize={22} fontWeight={800} letterSpacing={3} opacity={pullP} fontFamily="Manrope Variable, Arial, sans-serif">
					COMPARE THE CIRCLE’S SHADE
				</text>

				{/* Copy of white input circle pulled over */}
				{pullP > 0.02 && (
					<g>
						<ShapeGlyph shape="circle" shade="white" cx={copyX} cy={copyY} r={copyR} stroke={P.cyan} strokeWidth={4} />
						<text x={1185} y={592} textAnchor="middle" fill={P.ink} fontSize={26} fontWeight={800} opacity={pullP} fontFamily="Manrope Variable, Arial, sans-serif">
							Started WHITE
						</text>
					</g>
				)}

				{/* Black outer circle from worked example beside it */}
				{clashP > 0.02 && (
					<g opacity={clashP}>
						<text x={1405} y={462} textAnchor="middle" fill={P.red} fontSize={68} fontWeight={900} fontFamily="Manrope Variable, Arial, sans-serif">
							≠
						</text>
						<ShapeGlyph shape="circle" shade="black" cx={1625} cy={445} r={96} stroke={P.red} strokeWidth={5} />
						<text x={1625} y={592} textAnchor="middle" fill={P.red} fontSize={26} fontWeight={850} fontFamily="Manrope Variable, Arial, sans-serif">
							Now BLACK!
						</text>
						<text x={1405} y={668} textAnchor="middle" fill="#e8b6b0" fontSize={25} fontWeight={650} fontFamily="Manrope Variable, Arial, sans-serif">
							In this puzzle, paint did not stick to its shape.
						</text>
					</g>
				)}
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 04 Mechanism Part 1: Lift outlines & track shape order (2, 4, 1, 3) ============ */
export const Q18Shapes = () => {
	const t = useT();
	const id = 'q18-shapes';
	const tLift = at(id, 'lift just the outlines');
	const tOrder = at(id, 'two, four, one, three');
	const liftP = ramp(t, tLift, 0.9);
	const stepSpan = 0.85;
	const outlineSteps =
		ramp(t, tOrder, stepSpan) +
		ramp(t, tOrder + stepSpan * 0.9, stepSpan) +
		ramp(t, tOrder + stepSpan * 1.8, stepSpan) +
		ramp(t, tOrder + stepSpan * 2.7, stepSpan);

	const orderLabels = ['2 · Circle', '4 · Hexagon', '1 · Triangle', '3 · Pentagon'];

	return (
		<Shell subject={SUBJECT} step="04 / TRACK THE SHAPES">
			<Heading top={124} size={46}>
				Track 1 · Follow only the outlines (outside → in)
			</Heading>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<SplitTrackStage
					input={Q18_UPPER_IN}
					shapeOrder={[1, 3, 0, 2]}
					shadeOrder={[0, 1, 2, 3]}
					inX={140}
					inY={260}
					inSize={330}
					outX={760}
					outY={260}
					outSize={330}
					liftP={liftP}
					outlineSteps={outlineSteps}
					shadeSteps={0}
				/>
				{/* Keep actual worked example visible on the right for side-by-side inspection */}
				<g>
					<text x={1565} y={242} textAnchor="middle" fill={P.muted} fontSize={21} fontWeight={800} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
						WORKED EXAMPLE
					</text>
					<NestedBox layers={Q18_UPPER_OUT} x={1400} y={260} size={330} />
				</g>
				{/* Shape order readout chips */}
				<g transform="translate(760, 645)">
					<text x={0} y={0} fill={P.cyan} fontSize={22} fontWeight={850} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
						OUTLINE ORDER (OUTSIDE → IN)
					</text>
					{orderLabels.map((lbl, idx) => {
						const op = Math.max(0, Math.min(1, outlineSteps - idx));
						return (
							<g key={lbl} transform={`translate(${idx * 255}, 24)`} opacity={op}>
								<rect width={236} height={54} rx={8} fill="#14232b" stroke={P.cyan} strokeWidth={2.5} />
								<text x={118} y={35} textAnchor="middle" fill={P.ink} fontSize={24} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
									{lbl}
								</text>
							</g>
						);
					})}
				</g>
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 05 Mechanism Part 2: Slide shades in order (1, 2, 3, 4) & match worked example ============ */
export const Q18Shades = () => {
	const t = useT();
	const id = 'q18-shades';
	const tFill = at(id, 'fill the layers');
	const tMatch = at(id, 'Every layer matches');
	const stepSpan = 0.85;
	const shadeSteps =
		ramp(t, tFill, stepSpan) +
		ramp(t, tFill + stepSpan * 0.85, stepSpan) +
		ramp(t, tFill + stepSpan * 1.7, stepSpan) +
		ramp(t, tFill + stepSpan * 2.55, stepSpan);
	const matchP = ramp(t, tMatch, 0.45);

	const shadeLabels = ['1 · Black', '2 · White', '3 · Grey', '4 · Black'];

	return (
		<Shell subject={SUBJECT} step="05 / TRACK THE SHADES">
			<Heading top={124} size={46}>
				Track 2 · Drop the left-behind shades in order (1 → 4)
			</Heading>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<SplitTrackStage
					input={Q18_UPPER_IN}
					shapeOrder={[1, 3, 0, 2]}
					shadeOrder={[0, 1, 2, 3]}
					inX={140}
					inY={260}
					inSize={330}
					outX={760}
					outY={260}
					outSize={330}
					liftP={1}
					outlineSteps={4}
					shadeSteps={shadeSteps}
				/>
				{/* Equals confirmation beside the worked example */}
				<g opacity={matchP}>
					<circle cx={1245} cy={425} r={44} fill="#122720" stroke={P.mint} strokeWidth={4} />
					<text x={1245} y={442} textAnchor="middle" fill={P.mint} fontSize={54} fontWeight={900} fontFamily="Manrope Variable, Arial, sans-serif">
						=
					</text>
					<text x={1245} y={505} textAnchor="middle" fill={P.mint} fontSize={22} fontWeight={850} letterSpacing={2} fontFamily="Manrope Variable, Arial, sans-serif">
						EXACT MATCH
					</text>
				</g>
				<g>
					<text x={1565} y={242} textAnchor="middle" fill={P.muted} fontSize={21} fontWeight={800} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
						WORKED EXAMPLE
					</text>
					<NestedBox layers={Q18_UPPER_OUT} x={1400} y={260} size={330} borderColor={matchP > 0.3 ? P.mint : BOX_BORDER} />
				</g>
				{/* Shade order readout chips */}
				<g transform="translate(760, 645)">
					<text x={0} y={0} fill={P.mint} fontSize={22} fontWeight={850} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
						SHADE ORDER (OUTSIDE → IN)
					</text>
					{shadeLabels.map((lbl, idx) => {
						const op = Math.max(0, Math.min(1, shadeSteps - idx));
						return (
							<g key={lbl} transform={`translate(${idx * 255}, 24)`} opacity={op}>
								<rect width={236} height={54} rx={8} fill="#122720" stroke={P.mint} strokeWidth={2.5} />
								<text x={118} y={35} textAnchor="middle" fill={P.ink} fontSize={24} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
									{lbl}
								</text>
							</g>
						);
					})}
				</g>
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 06 Apply both tracks to Q18's bottom box ============ */
export const Q18Apply = () => {
	const t = useT();
	const id = 'q18-apply';
	const tOut = at(id, 'Outlines go two');
	const tShades = at(id, 'Shades stay one');
	const liftP = ramp(t, 0.25, 0.7);

	const outStep = Math.max(0.75, (tShades - tOut - 0.3) / 4);
	const outlineSteps =
		ramp(t, tOut, outStep) +
		ramp(t, tOut + outStep, outStep) +
		ramp(t, tOut + outStep * 2, outStep) +
		ramp(t, tOut + outStep * 3, outStep);

	const shStep = 0.85;
	const shadeSteps =
		ramp(t, tShades, shStep) +
		ramp(t, tShades + shStep * 0.9, shStep) +
		ramp(t, tShades + shStep * 1.8, shStep) +
		ramp(t, tShades + shStep * 2.7, shStep);

	const builtChips = [
		{layer: '1 · Outer', shape: 'Heart (2)', shade: 'Grey (1)'},
		{layer: '2 · Next', shape: 'Circle (4)', shade: 'Black (2)'},
		{layer: '3 · Next', shape: 'Parallelogram (1)', shade: 'White (3)'},
		{layer: '4 · Inner', shape: 'Triangle (3)', shade: 'Grey (4)'},
	];

	return (
		<Shell subject={SUBJECT} step="06 / BUILD THE ANSWER">
			<Heading top={124} size={46}>
				Run both orders on the bottom box
			</Heading>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				<SplitTrackStage
					input={Q18_LOWER_IN}
					shapeOrder={[1, 3, 0, 2]}
					shadeOrder={[0, 1, 2, 3]}
					inX={140}
					inY={260}
					inSize={330}
					outX={720}
					outY={260}
					outSize={350}
					liftP={liftP}
					outlineSteps={outlineSteps}
					shadeSteps={shadeSteps}
				/>
				{/* Friendly Year 5 label pointing at parallelogram */}
				<g opacity={ramp(t, 0.2, 0.5)}>
					<text x={245} y={244} textAnchor="middle" fill={P.cyan} fontSize={20} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
						1 = parallelogram
					</text>
				</g>
				{/* Clean 4-layer ledger on right showing both tracks combining */}
				<g transform="translate(1170, 260)">
					<text x={0} y={-14} fill={P.cyan} fontSize={22} fontWeight={850} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
						SHAPES 2–4–1–3 · SHADES 1–2–3–4
					</text>
					{builtChips.map((c, idx) => {
						const hasShape = outlineSteps > idx + 0.4;
						const hasShade = shadeSteps > idx + 0.5;
						return (
							<g key={c.layer} transform={`translate(0, ${idx * 102 + 12})`} opacity={hasShape ? 1 : 0.3}>
								<rect
									width={600}
									height={82}
									rx={10}
									fill={hasShade ? '#122720' : '#132028'}
									stroke={hasShade ? P.mint : hasShape ? P.cyan : P.line}
									strokeWidth={2.5}
								/>
								<text x={24} y={50} fill={P.muted} fontSize={22} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
									{c.layer}
								</text>
								<text x={175} y={50} fill={P.ink} fontSize={26} fontWeight={800} fontFamily="Manrope Variable, Arial, sans-serif">
									{c.shape}
								</text>
								{hasShade && (
									<text x={445} y={50} fill={P.mint} fontSize={25} fontWeight={850} fontFamily="Manrope Variable, Arial, sans-serif">
										+ {c.shade}
									</text>
								)}
							</g>
						);
					})}
				</g>
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 07 Exam bridge: Check all four options A, B, C, D ============ */
export const Q18Exam = () => {
	const t = useT();
	const id = 'q18-exam';
	const wAD = ramp(t, at(id, 'Options A and D'), 0.45);
	const wB = ramp(t, at(id, 'Option B has'), 0.45);
	const okC = ramp(t, at(id, 'Choose option C'), 0.45);

	const notes: Record<string, {bad: number; good: number; text: string}> = {
		A: {bad: wAD, good: 0, text: 'parallelogram outside'},
		B: {bad: wB, good: 0, text: 'black outer heart'},
		C: {bad: 0, good: okC, text: 'grey heart · matches both ✓'},
		D: {bad: wAD, good: 0, text: 'parallelogram outside'},
	};

	return (
		<Shell subject={SUBJECT} step="07 / CHECK QUESTION 18">
			<Eyebrow style={{position: 'absolute', left: 110, top: 126}} color={P.muted}>
				Cortex Academy Week 6 · Question 18
			</Eyebrow>
			<Heading top={170} size={46}>
				Shapes 2–4–1–3 · Shades 1–2–3–4
			</Heading>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				{Q18_OPTIONS.map((opt, idx) => {
					const ox = 155 + idx * 415;
					const oy = 315;
					const size = 340;
					const st = notes[opt.k];
					const dim = st.bad > 0.4 ? 0.5 : 1;
					return (
						<g key={opt.k}>
							<NestedBox
								layers={opt.layers}
								x={ox}
								y={oy}
								size={size}
								borderColor={st.good > 0.3 ? P.mint : st.bad > 0.3 ? P.red : BOX_BORDER}
								borderWidth={st.good > 0.3 ? 8 : 4}
								opacity={dim}
								label={opt.k}
								labelColor={st.good > 0.3 ? P.mint : st.bad > 0.3 ? P.red : P.cyan}
							/>
							{st.bad > 0.05 && (
								<g opacity={st.bad}>
									<path
										d={`M ${ox + 50} ${oy + 50} L ${ox + size - 50} ${oy + size - 50} M ${ox + size - 50} ${oy + 50} L ${ox + 50} ${oy + size - 50}`}
										stroke={P.red}
										strokeWidth={14}
										strokeLinecap="round"
									/>
									<text x={ox + size / 2} y={oy + size + 84} textAnchor="middle" fill="#f1a198" fontSize={23} fontWeight={700} fontFamily="Manrope Variable, Arial, sans-serif">
										{st.text}
									</text>
								</g>
							)}
							{st.good > 0.05 && (
								<g opacity={st.good}>
									<rect x={ox + 4} y={oy + size + 58} width={size - 8} height={46} rx={8} fill="#122720" stroke={P.mint} strokeWidth={2.5} />
									<text x={ox + size / 2} y={oy + size + 88} textAnchor="middle" fill={P.mint} fontSize={21} fontWeight={850} fontFamily="Manrope Variable, Arial, sans-serif">
										{st.text}
									</text>
								</g>
							)}
						</g>
					);
				})}
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 08 Your turn: Fresh original analogy (+ 5.0s quiet pause, zero hints!) ============ */
export const Q18Practice = () => {
	const t = useT();
	const id = 'q18-practice';
	const appear = ramp(t, 0, 0.7);

	return (
		<Shell subject={SUBJECT} step="08 / YOUR TURN">
			<Eyebrow style={{position: 'absolute', left: 110, top: 118, opacity: appear}} color={P.muted}>
				Original practice · use the top pair to match the bottom box
			</Eyebrow>
			<Heading p={appear} top={158} size={48}>
				Which picture fits?
			</Heading>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}} opacity={appear}>
				<DiagonalBox items={Q18_PRAC_UPPER_IN} x={130} y={248} size={245} />
				<IsToBadge x={442} y={370} />
				<NestedBox layers={Q18_PRAC_UPPER_OUT} x={510} y={248} size={245} />

				<text x={442} y={530} textAnchor="middle" fill={P.muted} fontSize={24} fontWeight={800} letterSpacing={4} fontFamily="Manrope Variable, Arial, sans-serif">
					AS
				</text>

				<DiagonalBox items={Q18_PRAC_LOWER_IN} x={130} y={554} size={245} />
				<IsToBadge x={442} y={676} />
				<QuestionBox x={510} y={554} size={245} />

				{/* Completely neutral options A, B, C, D (clean buffer above PauseMeter) */}
				{Q18_PRAC_OPTIONS.map((opt, idx) => {
					const col = idx % 2;
					const row = Math.floor(idx / 2);
					const ox = 1040 + col * 360;
					const oy = 216 + row * 302;
					return <NestedBox key={opt.k} layers={opt.layers} x={ox} y={oy} size={228} label={opt.k} />;
				})}
			</svg>
			<PauseMeter start={end(id) + 0.15} duration={5.0} label="PAUSE · WORK IT OUT" />
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 09 Your turn proof: Reverse shapes (4-3-2-1) + Shades (1-2-3-4), Layer 3 decides B vs D ============ */
export const Q18PracticeAnswer = () => {
	const t = useT();
	const id = 'q18-practice-answer';
	const tRev = at(id, 'outlines reverse');
	const tShades = at(id, 'shades stay in order');
	const tBuild = at(id, 'On the bottom box');
	const tOptA = at(id, 'Option A keeps');
	const tOptB = at(id, 'Option B puts');
	const tOptC = at(id, 'Option C puts');
	const tOptD = at(id, 'Choose option D');

	const liftP = ramp(t, tRev, 0.55);
	const outStep = Math.max(0.55, (tShades - tRev) / 4);
	const outlineSteps =
		ramp(t, tBuild, 0.55) +
		ramp(t, tBuild + 0.55, 0.55) +
		ramp(t, tBuild + 1.1, 0.55) +
		ramp(t, tBuild + 1.65, 0.55);
	const shadeSteps =
		ramp(t, tBuild + 0.4, 0.55) +
		ramp(t, tBuild + 0.95, 0.55) +
		ramp(t, tBuild + 1.5, 0.55) +
		ramp(t, tBuild + 2.05, 0.55);

	const wA = ramp(t, tOptA, 0.35);
	const wB = ramp(t, tOptB, 0.35);
	const wC = ramp(t, tOptC, 0.35);
	const okD = ramp(t, tOptD, 0.45);
	void outStep;

	const optMarks: Record<string, {bad: number; good: number; note: string; hiLayer?: number}> = {
		A: {bad: wA, good: 0, note: 'square stayed white'},
		B: {bad: wB, good: 0, note: 'diamond 3rd (need hexagon)', hiLayer: 2},
		C: {bad: wC, good: 0, note: 'diamond outside'},
		D: {bad: 0, good: okD, note: 'both orders match ✓', hiLayer: 2},
	};

	return (
		<Shell subject={SUBJECT} step="08 / YOUR TURN · PROOF">
			<Eyebrow style={{position: 'absolute', left: 110, top: 120}} color={P.muted}>
				Original practice · reverse shapes (4–3–2–1) · shades stay (1–2–3–4)
			</Eyebrow>
			<Heading top={160} size={42}>
				{shadeSteps > 2.55 || wB > 0.1
					? 'Layer 3 decides between B and D: we need the grey hexagon third'
					: 'Check both orders on the new puzzle'}
			</Heading>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
				{/* Compact worked-rule bar on top-left */}
				<g opacity={ramp(t, 0, 0.4)}>
					<DiagonalBox items={Q18_PRAC_UPPER_IN} x={115} y={240} size={160} showNumbers />
					<IsToBadge x={318} y={320} text="→" />
					<NestedBox layers={Q18_PRAC_UPPER_OUT} x={360} y={240} size={160} />
					<rect x={545} y={248} width={355} height={144} rx={10} fill="#121e25" stroke={P.cyan} strokeWidth={2.5} />
					<text x={570} y={295} fill={P.cyan} fontSize={23} fontWeight={850} fontFamily="Manrope Variable, Arial, sans-serif">
						SHAPES: 4 → 3 → 2 → 1
					</text>
					<text x={570} y={336} fill={P.mint} fontSize={23} fontWeight={850} fontFamily="Manrope Variable, Arial, sans-serif">
						SHADES: 1 → 2 → 3 → 4
					</text>
					<text x={570} y={372} fill={P.muted} fontSize={20} fontWeight={650} fontFamily="Manrope Variable, Arial, sans-serif">
						Check all four layers outside → in
					</text>
				</g>

				{/* Animated bottom build on lower-left */}
				<SplitTrackStage
					input={Q18_PRAC_LOWER_IN}
					shapeOrder={[3, 2, 1, 0]}
					shadeOrder={[0, 1, 2, 3]}
					inX={115}
					inY={440}
					inSize={255}
					outX={545}
					outY={440}
					outSize={285}
					liftP={liftP}
					outlineSteps={outlineSteps}
					shadeSteps={shadeSteps}
					highlightLayer={wB > 0.2 ? 2 : -1}
				/>

				{/* Right 2x2 option verification grid */}
				{Q18_PRAC_OPTIONS.map((opt, idx) => {
					const col = idx % 2;
					const row = Math.floor(idx / 2);
					const ox = 1040 + col * 380;
					const oy = 232 + row * 324;
					const size = 212;
					const m = optMarks[opt.k];
					return (
						<g key={opt.k}>
							<NestedBox
								layers={opt.layers}
								x={ox}
								y={oy}
								size={size}
								borderColor={m.good > 0.3 ? P.mint : m.bad > 0.3 ? P.red : BOX_BORDER}
								borderWidth={m.good > 0.3 ? 7 : 4}
								highlightLayer={m.hiLayer !== undefined && (m.bad > 0.3 || m.good > 0.3) ? m.hiLayer : -1}
								highlightColor={m.good > 0.3 ? P.mint : P.red}
								opacity={m.bad > 0.4 ? 0.6 : 1}
								label={opt.k}
								labelColor={m.good > 0.3 ? P.mint : m.bad > 0.3 ? P.red : P.cyan}
							/>
							{m.bad > 0.05 && (
								<g opacity={m.bad}>
									{/* Crisp top-right corner rejection badge — leaves inner diamond/hexagon 100% visible for direct comparison! */}
									<circle cx={ox + size - 18} cy={oy + 18} r={22} fill={P.red} stroke="#0c1115" strokeWidth={3} />
									<text x={ox + size - 18} y={oy + 27} textAnchor="middle" fill={P.bg} fontSize={28} fontWeight={900} fontFamily="Manrope Variable, Arial, sans-serif">
										✗
									</text>
									<text x={ox + size / 2} y={oy + size + 74} textAnchor="middle" fill="#f1a198" fontSize={20} fontWeight={700} fontFamily="Manrope Variable, Arial, sans-serif">
										{m.note}
									</text>
								</g>
							)}
							{m.good > 0.05 && (
								<g opacity={m.good}>
									<text x={ox + size / 2} y={oy + size + 74} textAnchor="middle" fill={P.mint} fontSize={22} fontWeight={850} fontFamily="Manrope Variable, Arial, sans-serif">
										{m.note}
									</text>
								</g>
							)}
						</g>
					);
				})}
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};

/** ============ 10 Pocket rule ============ */
export const Q18Pocket = () => {
	const t = useT();
	const id = 'q18-pocket';
	const ruleP = ramp(t, 0.15, 0.65);

	return (
		<Shell subject={SUBJECT} step="09 / KEEP THIS">
			<Eyebrow style={{position: 'absolute', left: 110, top: 265, opacity: ruleP}} color={P.muted}>
				Next time you see nested shapes
			</Eyebrow>
			<div
				style={{
					position: 'absolute',
					left: 110,
					top: 325,
					width: 960,
					fontSize: 66,
					fontWeight: 800,
					letterSpacing: -2.4,
					lineHeight: 1.16,
					opacity: ruleP,
					translate: `0 ${(1 - ruleP) * 18}px`,
				}}
			>
				Use the example to find both orders.
				<br />
				<span style={{color: P.mint}}>Check shapes and shades from the outside in.</span>
			</div>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}} opacity={ruleP}>
				<rect x={1135} y={295} width={655} height={150} rx={14} fill="#122129" stroke={P.cyan} strokeWidth={3} />
				<text x={1172} y={352} fill={P.cyan} fontSize={23} fontWeight={850} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
					TRACK 1 · SHAPES
				</text>
				<text x={1172} y={406} fill={P.ink} fontSize={30} fontWeight={750} fontFamily="Manrope Variable, Arial, sans-serif">
					Which outline goes into each layer?
				</text>

				<rect x={1135} y={480} width={655} height={150} rx={14} fill="#122720" stroke={P.mint} strokeWidth={3} />
				<text x={1172} y={537} fill={P.mint} fontSize={23} fontWeight={850} letterSpacing={2.5} fontFamily="Manrope Variable, Arial, sans-serif">
					TRACK 2 · SHADES
				</text>
				<text x={1172} y={591} fill={P.ink} fontSize={30} fontWeight={750} fontFamily="Manrope Variable, Arial, sans-serif">
					Which shade fills each layer?
				</text>

				<text x={1462} y={690} textAnchor="middle" fill={P.muted} fontSize={24} fontWeight={700} fontFamily="Manrope Variable, Arial, sans-serif">
					Works whether shades move, stay, or change!
				</text>
			</svg>
			<Narration id={id} from={LEAD} />
		</Shell>
	);
};
