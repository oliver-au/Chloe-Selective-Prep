import React from 'react';
import {P} from '../Shared';

export const PAPER = '#eae5d8';
export const PAPER_SHADE = '#d5cec0';
export const INKD = '#222d32';
export const TUBE_DARK = '#1b262c';
export const TUBE_MID = '#2c3c44';

export type FaceStyle = {
	fill?: string;
	stroke?: string;
	textColor?: string;
	glow?: string;
	badge?: string;
	dim?: number;
};

/**
 * Pure 2D+3D-extruded regular N-sided prism folding & rolling engine.
 *
 * Folding mode (`fold` 0 -> 1):
 *   Starts as a flat horizontal strip of N equal faces resting on `groundIndex`,
 *   then curls symmetrically hinge-by-hinge around `groundIndex` until the two
 *   ends snap shut into a closed regular N-gon tube!
 *
 * Rolling mode (`rollSteps` real number):
 *   When `fold === 1`, the tube pivots STRICTLY around each grounded corner
 *   (zero sliding, zero floor penetration, zero floating!).
 *   - Positive `rollSteps` rolls RIGHT (clockwise), landing `groundIndex + 1, +2, ...`
 *   - Negative `rollSteps` rolls LEFT (counter-clockwise), landing `groundIndex - 1, -2, ...`
 */
export type PolygonTubeProps = {
	faces: string[];
	groundIndex: number;
	/** 0 = completely flat strip, 1 = closed regular N-gon tube */
	fold: number;
	/** Number of faces rolled from groundIndex (+ = right/CW, - = left/CCW). Requires fold=1. */
	rollSteps?: number;
	/** Side length of each face in px */
	faceWidth: number;
	/** Centre X of the starting ground face on screen */
	originX: number;
	/** Y coordinate of the ground plane on screen */
	groundY: number;
	/** 3D extrusion offset (dx, dy) for depth barrel behind front cross-section */
	depth?: [number, number];
	/** Optional face styles keyed by face letter */
	styles?: Record<string, FaceStyle>;
	/** Optional diameter chord connecting two face letters across the centre */
	diameter?: {from: string; to: string; progress: number; color?: string; label?: string};
	/** Optional ground stamps recorded at step offsets (e.g. {step: -1, label: 'A', count: '1'}) */
	stamps?: {step: number; label: string; count?: string; color?: string; opacity?: number}[];
	/** Optional horizontal [x1, x2] bounds for the ground line (default [120, 1800]) */
	groundRange?: [number, number];
	/** Show subtle seam badge between last and first face when fold is near 1 */
	highlightSeam?: number;
	/** Show face indices / arrows along curved outside arc */
	countArc?: {fromIndex: number; steps: number; dir: 1 | -1; progress: number; color?: string};
	/** Show dotted long-way hint arc */
	longWayArc?: {fromIndex: number; steps: number; dir: 1 | -1; opacity: number; label?: string};
	/** Dim entire tube */
	opacity?: number;
};

type Pt = [number, number];

/** Compute exact hinge-by-hinge vertices for a folding strip anchored at groundIndex. */
function foldedChainVertices(
	n: number,
	groundIndex: number,
	fold: number,
	w: number,
	originX: number,
	groundY: number,
): {edges: {a: Pt; b: Pt; mid: Pt; normal: Pt; angleRad: number; idx: number}[]} {
	const turn = ((2 * Math.PI) / n) * Math.max(0, Math.min(1, fold));
	const edges: {a: Pt; b: Pt; mid: Pt; normal: Pt; angleRad: number; idx: number}[] = new Array(n);

	// Anchor groundIndex flat on groundY, from (originX - w/2, groundY) to (originX + w/2, groundY)
	const left0: Pt = [originX - w / 2, groundY];
	const right0: Pt = [originX + w / 2, groundY];
	edges[groundIndex] = makeEdge(left0, right0, groundIndex);

	// Walk RIGHT from groundIndex: each hinge turns UP-LEFT (angle decreases by `turn` in SVG coords)
	let curPt: Pt = right0;
	let dirAngle = 0; // pointing right (+x)
	for (let i = groundIndex + 1; i < n; i++) {
		dirAngle -= turn;
		const nextPt: Pt = [curPt[0] + w * Math.cos(dirAngle), curPt[1] + w * Math.sin(dirAngle)];
		edges[i] = makeEdge(curPt, nextPt, i);
		curPt = nextPt;
	}

	// Walk LEFT from groundIndex: each hinge turns UP-RIGHT (going backwards, vector angle increases by `turn`)
	curPt = left0;
	dirAngle = Math.PI; // pointing left (-x)
	for (let i = groundIndex - 1; i >= 0; i--) {
		dirAngle += turn;
		const prevPt: Pt = [curPt[0] + w * Math.cos(dirAngle), curPt[1] + w * Math.sin(dirAngle)];
		// Keep edge orientation consistent (left-to-right along the net strip)
		edges[i] = makeEdge(prevPt, curPt, i);
		curPt = prevPt;
	}

	return {edges};
}

function makeEdge(a: Pt, b: Pt, idx: number) {
	const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
	const dx = b[0] - a[0];
	const dy = b[1] - a[1];
	const len = Math.hypot(dx, dy) || 1;
	// For an edge going left->right at bottom (dx>0, dy=0), outward normal points DOWN (+y): (-dy/len, dx/len)
	const normal: Pt = [-dy / len, dx / len];
	const angleRad = Math.atan2(dy, dx);
	return {a, b, mid, normal, angleRad, idx};
}

/**
 * Exact corner-pivoting rolling geometry for a closed regular N-gon.
 * Zero sliding, zero floor penetration.
 */
function rolledPolygon(
	n: number,
	groundIndex: number,
	rollSteps: number,
	w: number,
	originX: number,
	groundY: number,
): {
	cx: number;
	cy: number;
	r: number;
	R: number;
	rotRad: number;
	edges: {a: Pt; b: Pt; mid: Pt; normal: Pt; angleRad: number; idx: number}[];
} {
	const dTheta = (2 * Math.PI) / n;
	const r = w / (2 * Math.tan(Math.PI / n));
	const R = w / (2 * Math.sin(Math.PI / n));

	// Split rollSteps into completed integer step `baseStep` and fractional pivot `frac` in [0, 1)
	const baseStep = Math.floor(rollSteps);
	const frac = rollSteps - baseStep;

	// Resting centre at integer step `baseStep`: face (groundIndex + baseStep) mod n is flat on ground
	const baseCenterX = originX + baseStep * w;
	// Pivot is the right bottom corner of `baseStep` face
	const pivotX = baseCenterX + w / 2;
	const pivotY = groundY;
	// At frac=0, vector pivot -> centre has angle (-pi/2 - pi/n). Rotating CW adds +frac * dTheta.
	const phi = -Math.PI / 2 - Math.PI / n + frac * dTheta;
	const cx = pivotX + R * Math.cos(phi);
	const cy = pivotY + R * Math.sin(phi);

	// Total clockwise rotation angle of polygon from its initial orientation
	const rotRad = rollSteps * dTheta;

	// Build each face i: at rollSteps=0, face `groundIndex` has outward normal at +pi/2 (bottom).
	// Face `i` has initial outward normal angle = +pi/2 - (i - groundIndex) * dTheta.
	// After rolling CW by rotRad, outward normal angle = +pi/2 - (i - groundIndex) * dTheta + rotRad.
	const edges = [];
	for (let i = 0; i < n; i++) {
		const normAng = Math.PI / 2 - (i - groundIndex) * dTheta + rotRad;
		const aAng = normAng + Math.PI / n; // left vertex (looking from inside? Wait: check!)
		const bAng = normAng - Math.PI / n;
		// Verify for i = groundIndex, rotRad = 0:
		// normAng = +pi/2.
		// aAng = pi/2 + pi/n -> cos < 0 (left), sin = cos(pi/n) > 0 (bottom) -> (cx - w/2, cy + r) = left bottom!
		// bAng = pi/2 - pi/n -> cos > 0 (right), sin = cos(pi/n) > 0 (bottom) -> (cx + w/2, cy + r) = right bottom!
		const a: Pt = [cx + R * Math.cos(aAng), cy + R * Math.sin(aAng)];
		const b: Pt = [cx + R * Math.cos(bAng), cy + R * Math.sin(bAng)];
		edges.push(makeEdge(a, b, i));
	}

	return {cx, cy, r, R, rotRad, edges};
}

export const PolygonTube: React.FC<PolygonTubeProps> = ({
	faces,
	groundIndex,
	fold,
	rollSteps = 0,
	faceWidth: w,
	originX,
	groundY,
	depth = [54, -34],
	styles = {},
	diameter,
	stamps = [],
	groundRange = [120, 1800],
	highlightSeam = 0,
	countArc,
	longWayArc,
	opacity = 1,
}) => {
	const n = faces.length;
	const isClosed = fold >= 0.999;
	const closedGeom = isClosed ? rolledPolygon(n, groundIndex, rollSteps, w, originX, groundY) : null;
	const {edges} = closedGeom ?? foldedChainVertices(n, groundIndex, fold, w, originX, groundY);

	const r = w / (2 * Math.tan(Math.PI / n));
	const cx = closedGeom ? closedGeom.cx : originX;
	const cy = closedGeom ? closedGeom.cy : groundY - r;

	const [dx3, dy3] = [depth[0] * fold, depth[1] * fold];
	const frontPoly = edges.map((e) => `${e.a[0].toFixed(1)},${e.a[1].toFixed(1)}`).join(' ');
	const backPoly = edges.map((e) => `${(e.a[0] + dx3).toFixed(1)},${(e.a[1] + dy3).toFixed(1)}`).join(' ');

	// Sort extruded side quads so back-facing/farther ones draw behind closer ones
	const sideQuads = edges.map((e, i) => {
		const faceLetter = faces[i];
		const st = styles[faceLetter] ?? {};
		// Determine whether this side wall faces the 3D extrusion direction
		const dot = e.normal[0] * dx3 + e.normal[1] * dy3;
		return {e, i, faceLetter, st, dot, depthKey: e.mid[1] - e.mid[0] * 0.3};
	});

	// Seam point between face n-1 (end b) and face 0 (start a)
	const seamA = edges[0].a;
	const seamB = edges[n - 1].b;

	return (
		<g opacity={opacity}>
			{/* Ground plane & subtle contact shadow */}
			<line x1={groundRange[0]} y1={groundY} x2={groundRange[1]} y2={groundY} stroke={P.line} strokeWidth={4} />
			<line x1={groundRange[0]} y1={groundY + 2} x2={groundRange[1]} y2={groundY + 2} stroke="#070b0e" strokeWidth={6} opacity={0.6} />

			{/* Ground stamps from rolling (spaced clearly below bottom tube face badge at groundY+34) */}
			{stamps.map((s) => {
				const sx = originX + s.step * w;
				const col = s.color ?? P.mint;
				const op = s.opacity ?? 1;
				return (
					<g key={`stamp-${s.step}-${s.label}`} opacity={op}>
						<rect
							x={sx - w * 0.46}
							y={groundY - 4}
							width={w * 0.92}
							height={10}
							rx={5}
							fill={col}
							style={{filter: `drop-shadow(0 0 8px ${col}aa)`}}
						/>
						<text
							x={sx}
							y={groundY + 84}
							textAnchor="middle"
							fill={col}
							fontSize={24}
							fontWeight={800}
							fontFamily="Manrope Variable, Arial, sans-serif"
						>
							{s.label}
						</text>
						{s.count && (
							<g transform={`translate(${sx}, ${groundY + 118})`}>
								<circle r={18} fill={col} />
								<text
									y={6}
									textAnchor="middle"
									fill={P.bg}
									fontSize={21}
									fontWeight={900}
									fontFamily="Manrope Variable, Arial, sans-serif"
								>
									{s.count}
								</text>
							</g>
						)}
					</g>
				);
			})}

			{/* 3D tube interior & extruded walls (visible as fold increases) */}
			{fold > 0.08 && (
				<g opacity={Math.min(1, fold * 1.4)}>
					{/* Back opening silhouette */}
					{isClosed && (
						<polygon points={backPoly} fill="#10181d" stroke="#293840" strokeWidth={2} />
					)}
					{/* Extruded rectangular tube faces */}
					{sideQuads.map(({e, faceLetter, st, dot}) => {
						const p1 = e.a;
						const p2 = e.b;
						const p3: Pt = [e.b[0] + dx3, e.b[1] + dy3];
						const p4: Pt = [e.a[0] + dx3, e.a[1] + dy3];
						const isHighlight = Boolean(st.fill || st.glow);
						const wallFill = st.fill
							? st.fill
							: dot > 0
								? '#4c5f69'
								: '#243138';
						const wallOp = (st.dim ?? 1) * (dot > 0 ? 0.92 : 0.45);
						return (
							<polygon
								key={`wall-${faceLetter}`}
								points={`${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)} ${p3[0].toFixed(1)},${p3[1].toFixed(1)} ${p4[0].toFixed(1)},${p4[1].toFixed(1)}`}
								fill={wallFill}
								fillOpacity={isHighlight ? 0.52 * (st.dim ?? 1) : wallOp}
								stroke={st.stroke ?? '#50646e'}
								strokeWidth={isHighlight ? 2.5 : 1.5}
							/>
						);
					})}
					{/* Hollow tube inner rim */}
					{isClosed && (
						<polygon
							points={frontPoly}
							fill="#121b20"
							fillOpacity={0.82}
							stroke="none"
						/>
					)}
				</g>
			)}

			{/* Front cross-section face segments + crisp upright labels */}
			{edges.map((e, i) => {
				const letter = faces[i];
				const st = styles[letter] ?? {};
				const dim = st.dim ?? 1;
				const baseStroke = st.stroke ?? (st.glow ? st.glow : '#c8d2d5');
				const strokeW = st.glow || st.stroke ? 8 : 5;
				// Label placed slightly outside the face along its outward normal
				const labelOffset = fold < 0.35 ? -w * 0.42 : 34;
				const lx = e.mid[0] + e.normal[0] * (fold < 0.35 ? 0 : labelOffset);
				const ly = e.mid[1] + (fold < 0.35 ? labelOffset : e.normal[1] * labelOffset);
				// When flat (fold < 0.35), also draw the grey rectangular flat strip panels above groundY!
				const flatPanelH = w * 1.45;
				return (
					<g key={`edge-${letter}`} opacity={dim}>
						{fold < 0.45 && (
							<g opacity={1 - fold / 0.45}>
								<polygon
									points={`${e.a[0]},${e.a[1]} ${e.b[0]},${e.b[1]} ${e.b[0] - e.normal[0] * flatPanelH},${e.b[1] - e.normal[1] * flatPanelH} ${e.a[0] - e.normal[0] * flatPanelH},${e.a[1] - e.normal[1] * flatPanelH}`}
									fill={st.fill ?? '#9da2a5'}
									fillOpacity={st.fill ? 0.88 : 0.92}
									stroke={st.glow ?? '#f3f0e7'}
									strokeWidth={st.glow ? 4 : 2.5}
								/>
							</g>
						)}
						{/* Crisp thick face segment */}
						<line
							x1={e.a[0]}
							y1={e.a[1]}
							x2={e.b[0]}
							y2={e.b[1]}
							stroke={baseStroke}
							strokeWidth={strokeW}
							strokeLinecap="round"
							style={st.glow ? {filter: `drop-shadow(0 0 10px ${st.glow})`} : undefined}
						/>
						{/* Corner hinge dot */}
						<circle cx={e.a[0]} cy={e.a[1]} r={4.5} fill={P.ink} opacity={0.75} />
						<circle cx={e.b[0]} cy={e.b[1]} r={4.5} fill={P.ink} opacity={0.75} />

						{/* Upright, high-legibility face letter chip */}
						<g
							transform={`translate(${
								fold < 0.35
									? e.mid[0] - e.normal[0] * (flatPanelH * 0.5)
									: lx
							}, ${
								fold < 0.35
									? e.mid[1] - e.normal[1] * (flatPanelH * 0.5)
									: ly
							})`}
						>
							{fold >= 0.35 && (
								<circle
									r={23}
									fill={st.fill ?? '#142026'}
									stroke={st.glow ?? st.stroke ?? '#4b5f68'}
									strokeWidth={st.glow ? 3.5 : 2}
								/>
							)}
							<text
								y={10}
								textAnchor="middle"
								fill={st.textColor ?? (st.fill && st.fill !== '#142026' ? P.bg : P.ink)}
								fontSize={fold < 0.35 ? 34 : 29}
								fontWeight={850}
								fontFamily="Manrope Variable, Arial, sans-serif"
							>
								{letter}
							</text>
						</g>
					</g>
				);
			})}

			{/* Seam flash where last face joins first face */}
			{highlightSeam > 0.01 && (
				<g opacity={highlightSeam}>
					<circle
						cx={(seamA[0] + seamB[0]) / 2}
						cy={(seamA[1] + seamB[1]) / 2}
						r={16}
						fill="none"
						stroke={P.cyan}
						strokeWidth={4}
						style={{filter: `drop-shadow(0 0 10px ${P.cyan})`}}
					/>
					<circle
						cx={(seamA[0] + seamB[0]) / 2}
						cy={(seamA[1] + seamB[1]) / 2}
						r={6}
						fill={P.cyan}
					/>
				</g>
			)}

			{/* Opposite diameter chord through centre */}
			{isClosed && diameter && diameter.progress > 0.01 && (() => {
				const idxA = faces.indexOf(diameter.from);
				const idxB = faces.indexOf(diameter.to);
				if (idxA < 0 || idxB < 0) return null;
				const a = edges[idxA].mid;
				const b = edges[idxB].mid;
				const col = diameter.color ?? P.mint;
				const x2 = a[0] + (b[0] - a[0]) * diameter.progress;
				const y2 = a[1] + (b[1] - a[1]) * diameter.progress;
				return (
					<g>
						<line
							x1={a[0]}
							y1={a[1]}
							x2={x2}
							y2={y2}
							stroke={col}
							strokeWidth={6}
							strokeDasharray="12 8"
							strokeLinecap="round"
							style={{filter: `drop-shadow(0 0 10px ${col}aa)`}}
						/>
						<circle cx={cx} cy={cy} r={8} fill={col} />
						<circle cx={a[0]} cy={a[1]} r={9} fill={col} />
						{diameter.progress > 0.92 && <circle cx={b[0]} cy={b[1]} r={9} fill={col} />}
						{diameter.label && diameter.progress > 0.7 && (() => {
							const pillW = Math.max(210, diameter.label.length * 14 + 36);
							return (
								<g transform={`translate(${cx}, ${cy - 22})`} opacity={(diameter.progress - 0.7) / 0.3}>
									<rect x={-pillW / 2} y={-21} width={pillW} height={38} rx={8} fill="#0c1115f0" stroke={col} strokeWidth={2.5} />
									<text
										y={5}
										textAnchor="middle"
										fill={col}
										fontSize={20}
										fontWeight={800}
										letterSpacing={1.8}
										fontFamily="Manrope Variable, Arial, sans-serif"
									>
										{diameter.label}
									</text>
								</g>
							);
						})()}
					</g>
				);
			})()}

			{/* Step-counting outside arc (e.g. counting 5 steps around from J to G) */}
			{isClosed && countArc && countArc.progress > 0.01 && (() => {
				const col = countArc.color ?? P.cyan;
				const dTheta = (2 * Math.PI) / n;
				const arcR = closedGeom!.r + 74;
				const stepsShown = countArc.progress * countArc.steps;
				const dots = [];
				for (let s = 1; s <= countArc.steps; s++) {
					const stepOp = Math.max(0, Math.min(1, stepsShown - (s - 1)));
					if (stepOp <= 0) continue;
					const prevIdx = (countArc.fromIndex + countArc.dir * (s - 1) + n * 10) % n;
					const a0 = Math.PI / 2 - (prevIdx - groundIndex) * dTheta + closedGeom!.rotRad;
					// Direction: increasing index moves CCW (decreasing SVG angle by dTheta)
					const delta = -countArc.dir * dTheta;
					const a1 = a0 + delta * stepOp;
					const p0: Pt = [cx + arcR * Math.cos(a0), cy + arcR * Math.sin(a0)];
					const p1: Pt = [cx + arcR * Math.cos(a1), cy + arcR * Math.sin(a1)];
					const sweep = delta > 0 ? 1 : 0;
					const numPt: Pt = [cx + (arcR + 26) * Math.cos(a0 + delta), cy + (arcR + 26) * Math.sin(a0 + delta)];
					dots.push(
						<g key={`arc-step-${s}`}>
							<path
								d={`M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A ${arcR} ${arcR} 0 0 ${sweep} ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`}
								fill="none"
								stroke={col}
								strokeWidth={5}
								strokeLinecap="round"
							/>
							{stepOp > 0.85 && (
								<g transform={`translate(${numPt[0].toFixed(1)}, ${numPt[1].toFixed(1)})`}>
									<circle r={15} fill={s === countArc.steps ? P.mint : '#142026'} stroke={s === countArc.steps ? P.mint : col} strokeWidth={2.5} />
									<text
										y={6}
										textAnchor="middle"
										fill={s === countArc.steps ? P.bg : col}
										fontSize={18}
										fontWeight={800}
										fontFamily="Manrope Variable, Arial, sans-serif"
									>
										{s}
									</text>
								</g>
							)}
						</g>,
					);
				}
				return <g>{dots}</g>;
			})()}

			{/* Optional dotted long-way path indicator */}
			{isClosed && longWayArc && longWayArc.opacity > 0.01 && (() => {
				const dTheta = (2 * Math.PI) / n;
				const arcR = closedGeom!.r + 74;
				const a0 = Math.PI / 2 - (longWayArc.fromIndex - groundIndex) * dTheta + closedGeom!.rotRad;
				const totalDelta = -longWayArc.dir * longWayArc.steps * dTheta;
				const aEnd = a0 + totalDelta;
				const p0: Pt = [cx + arcR * Math.cos(a0), cy + arcR * Math.sin(a0)];
				const p1: Pt = [cx + arcR * Math.cos(aEnd), cy + arcR * Math.sin(aEnd)];
				const largeArc = Math.abs(totalDelta) > Math.PI ? 1 : 0;
				const sweep = totalDelta > 0 ? 1 : 0;
				const midA = a0 + totalDelta * 0.5;
				return (
					<g opacity={longWayArc.opacity}>
						<path
							d={`M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A ${arcR} ${arcR} 0 ${largeArc} ${sweep} ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`}
							fill="none"
							stroke={P.red}
							strokeWidth={4}
							strokeDasharray="10 10"
							strokeLinecap="round"
						/>
						{longWayArc.label && (
							<text
								x={cx + (arcR + 34) * Math.cos(midA)}
								y={cy + (arcR + 34) * Math.sin(midA)}
								textAnchor="middle"
								fill={P.red}
								fontSize={24}
								fontWeight={800}
								fontFamily="Manrope Variable, Arial, sans-serif"
							>
								{longWayArc.label}
							</text>
						)}
					</g>
				);
			})()}
		</g>
	);
};

/**
 * Clean flat net strip (exact Week 6 Q14 look) for cold open, prediction, and practice frames.
 */
export const FlatNetStrip: React.FC<{
	faces: string[];
	x: number;
	y: number;
	width: number;
	height: number;
	styles?: Record<string, FaceStyle>;
	opacity?: number;
}> = ({faces, x, y, width, height, styles = {}, opacity = 1}) => {
	const cellW = width / faces.length;
	return (
		<g opacity={opacity}>
			{faces.map((letter, i) => {
				const st = styles[letter] ?? {};
				const cx = x + i * cellW;
				const dim = st.dim ?? 1;
				return (
					<g key={`strip-${letter}-${i}`} opacity={dim}>
						<rect
							x={cx}
							y={y}
							width={cellW}
							height={height}
							fill={st.fill ?? '#9da2a5'}
							stroke={st.glow ?? '#eae5d8'}
							strokeWidth={st.glow ? 5 : 2.5}
							style={st.glow ? {filter: `drop-shadow(0 0 12px ${st.glow}99)`} : undefined}
						/>
						<text
							x={cx + cellW / 2}
							y={y + height / 2 + 13}
							textAnchor="middle"
							fill={st.textColor ?? (st.fill ? P.bg : '#ffffff')}
							fontSize={40}
							fontWeight={850}
							fontFamily="Manrope Variable, Arial, sans-serif"
						>
							{letter}
						</text>
						{st.badge && (
							<g transform={`translate(${cx + cellW / 2}, ${y - 24})`}>
								<text
									textAnchor="middle"
									fill={st.glow ?? P.cyan}
									fontSize={21}
									fontWeight={800}
									letterSpacing={1.5}
									fontFamily="Manrope Variable, Arial, sans-serif"
								>
									{st.badge}
								</text>
							</g>
						)}
					</g>
				);
			})}
		</g>
	);
};
