import React from 'react';
import {P} from '../Shared';

export type ShapeKind =
	| 'triangle'
	| 'circle'
	| 'pentagon'
	| 'hexagon'
	| 'parallelogram'
	| 'heart'
	| 'square'
	| 'diamond';

export type ShadeKind = 'black' | 'grey' | 'white' | 'none';

export type ShapeItem = {
	shape: ShapeKind;
	shade: ShadeKind;
};

/** Exact grayscale fills verified directly from Week 6 Question 18 (RGB 40/36/33, 180/180/180, 255/255/255). */
export const SHADE_FILL: Record<ShadeKind, string> = {
	black: '#282421',
	grey: '#b4b4b4',
	white: '#ffffff',
	none: 'none',
};

export const SHADE_LABEL: Record<Exclude<ShadeKind, 'none'>, string> = {
	black: 'BLACK',
	grey: 'GREY',
	white: 'WHITE',
};

export const BOX_BG = '#f6f3ec';
export const BOX_BORDER = '#273337';

/**
 * Draw a single crisp shape centred at (cx, cy) with nominal radius `r`.
 * Carefully calibrated so nested shapes (Heart > Circle > Parallelogram > Triangle,
 * Circle > Hexagon > Triangle > Pentagon, Square > Circle > Hexagon > Diamond, etc.)
 * all fit inside one another with unmistakable margins and zero overlap!
 */
export const ShapeGlyph: React.FC<{
	shape: ShapeKind;
	shade: ShadeKind;
	cx: number;
	cy: number;
	r: number;
	stroke?: string;
	strokeWidth?: number;
	opacity?: number;
	strokeDasharray?: string;
}> = ({shape, shade, cx, cy, r, stroke = '#23201e', strokeWidth = 3.2, opacity = 1, strokeDasharray}) => {
	const fill = SHADE_FILL[shade];
	const common = {
		fill,
		stroke,
		strokeWidth,
		strokeLinejoin: 'round' as const,
		strokeDasharray,
		opacity,
	};

	switch (shape) {
		case 'circle':
			return <circle cx={cx} cy={cy} r={r * 0.94} {...common} />;
		case 'square':
			return <rect x={cx - r * 0.84} y={cy - r * 0.84} width={r * 1.68} height={r * 1.68} {...common} />;
		case 'diamond': {
			// Tall rhombus so it stays visually unmistakable from a square even at inner scale
			const rx = r * 0.68;
			const ry = r * 1.02;
			return <polygon points={`${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`} {...common} />;
		}
		case 'triangle': {
			// Equilateral-ish upright triangle with generous interior centre around cy
			const topY = cy - r * 0.95;
			const botY = cy + r * 0.72;
			const halfW = r * 0.94;
			return <polygon points={`${cx},${topY} ${cx + halfW},${botY} ${cx - halfW},${botY}`} {...common} />;
		}
		case 'pentagon': {
			const pts = Array.from({length: 5}, (_, k) => {
				const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5;
				return `${(cx + r * 0.96 * Math.cos(a)).toFixed(1)},${(cy + r * 0.96 * Math.sin(a)).toFixed(1)}`;
			}).join(' ');
			return <polygon points={pts} {...common} />;
		}
		case 'hexagon': {
			// Flat-top / flat-bottom regular hexagon matching Week 6 Q18
			const pts = Array.from({length: 6}, (_, k) => {
				const a = (k * Math.PI) / 3;
				return `${(cx + r * 0.98 * Math.cos(a)).toFixed(1)},${(cy + r * 0.92 * Math.sin(a)).toFixed(1)}`;
			}).join(' ');
			return <polygon points={pts} {...common} />;
		}
		case 'parallelogram': {
			// Right-leaning parallelogram matching Week 6 Q18
			const skew = r * 0.24;
			const hw = r * 0.72;
			const hh = r * 0.88;
			const pts = [
				`${(cx - hw + skew).toFixed(1)},${(cy - hh).toFixed(1)}`,
				`${(cx + hw + skew).toFixed(1)},${(cy - hh).toFixed(1)}`,
				`${(cx + hw - skew).toFixed(1)},${(cy + hh).toFixed(1)}`,
				`${(cx - hw - skew).toFixed(1)},${(cy + hh).toFixed(1)}`,
			].join(' ');
			return <polygon points={pts} {...common} />;
		}
		case 'heart': {
			// Full, bold symmetrical heart matching Week 6 Q18 so nested shapes sit cleanly inside its body
			const s = r / 50;
			return (
				<path
					d="M 0 46 C -34 22, -52 0, -52 -20 C -52 -39, -36 -49, -20 -49 C -8 -49, 0 -41, 0 -31 C 0 -41, 8 -49, 20 -49 C 36 -49, 52 -39, 52 -20 C 52 0, 34 22, 0 46 Z"
					transform={`translate(${cx}, ${cy}) scale(${s})`}
					{...common}
					strokeWidth={strokeWidth / s}
				/>
			);
		}
	}
};

/** Exact diagonal slot centres inside a square box of side `size` at (x, y). */
export function diagonalSlotCoords(x: number, y: number, size: number, index: number): [number, number] {
	const t = 0.165 + index * 0.223;
	return [x + size * t, y + size * t];
}

/**
 * Calibrated radii & slight vertical optical centering for 4 nested layers (outside -> inside).
 * Each layer's visual centre shifts slightly when inside a heart or triangle so nothing ever touches a wall.
 */
export function nestedLayerRadii(size: number, shapes: [ShapeKind, ShapeKind, ShapeKind, ShapeKind]) {
	const base = [0.43, 0.275, 0.168, 0.088];
	// Slightly expand inner radius when outer layer is a spacious square or circle, or tune for heart/triangle
	const scales = base.map((b, idx) => {
		let f = b;
		if (idx === 0 && shapes[0] === 'square') f = 0.405;
		if (idx === 0 && shapes[0] === 'parallelogram') f = 0.44;
		if (idx === 0 && shapes[0] === 'heart') f = 0.455;
		if (idx === 1 && shapes[0] === 'heart') f = 0.255;
		if (idx === 1 && shapes[0] === 'parallelogram') f = 0.265;
		if (idx === 1 && shapes[0] === 'diamond') f = 0.215;
		if (idx === 2 && shapes[1] === 'hexagon') f = 0.175;
		if (idx === 2 && shapes[1] === 'circle') f = shapes[2] === 'diamond' ? 0.195 : 0.165;
		if (idx === 2 && shapes[1] === 'heart') f = 0.145;
		if (idx === 3 && shapes[2] === 'triangle') f = 0.072;
		if (idx === 3 && shapes[2] === 'parallelogram') f = 0.084;
		if (idx === 3 && shapes[2] === 'hexagon') f = 0.088;
		if (idx === 3 && shapes[2] === 'diamond') f = 0.078;
		return size * f;
	});
	// Optical vertical offsets (heart belly sits slightly higher; triangle centroid sits slightly lower)
	const yOffsets = [0, 0, 0, 0];
	if (shapes[0] === 'heart') {
		yOffsets[1] = -size * 0.025;
		yOffsets[2] = -size * 0.025;
		yOffsets[3] = -size * 0.02;
	}
	if (shapes[2] === 'triangle') {
		yOffsets[3] += size * 0.028;
	}
	return {radii: scales, yOffsets};
}

/** Render a square analogy input box with 4 shapes along the top-left to bottom-right diagonal. */
export const DiagonalBox: React.FC<{
	items: [ShapeItem, ShapeItem, ShapeItem, ShapeItem];
	x: number;
	y: number;
	size: number;
	showNumbers?: boolean;
	highlightIndex?: number;
	highlightColor?: string;
	borderColor?: string;
	opacity?: number;
}> = ({items, x, y, size, showNumbers = false, highlightIndex = -1, highlightColor = P.cyan, borderColor = BOX_BORDER, opacity = 1}) => {
	const r = size * 0.118;
	return (
		<g opacity={opacity}>
			<rect x={x} y={y} width={size} height={size} rx={8} fill={BOX_BG} stroke={borderColor} strokeWidth={4} />
			{items.map((item, idx) => {
				const [cx, cy] = diagonalSlotCoords(x, y, size, idx);
				const hi = idx === highlightIndex;
				return (
					<g key={`diag-${idx}`}>
						{hi && (
							<circle
								cx={cx}
								cy={cy}
								r={r * 1.48}
								fill="none"
								stroke={highlightColor}
								strokeWidth={4.5}
								style={{filter: `drop-shadow(0 0 10px ${highlightColor})`}}
							/>
						)}
						<ShapeGlyph shape={item.shape} shade={item.shade} cx={cx} cy={cy} r={r} strokeWidth={3} />
						{showNumbers && (
							<g transform={`translate(${cx + r * 1.25}, ${cy - r * 1.05})`}>
								<circle r={14} fill={hi ? highlightColor : '#1c282e'} stroke={hi ? highlightColor : P.cyan} strokeWidth={2} />
								<text
									y={5}
									textAnchor="middle"
									fill={hi ? P.bg : P.ink}
									fontSize={17}
									fontWeight={800}
									fontFamily="Manrope Variable, Arial, sans-serif"
								>
									{idx + 1}
								</text>
							</g>
						)}
					</g>
				);
			})}
		</g>
	);
};

/** Render a square analogy output box with 4 nested shapes (outside -> inside). */
export const NestedBox: React.FC<{
	layers: [ShapeItem, ShapeItem, ShapeItem, ShapeItem];
	x: number;
	y: number;
	size: number;
	borderColor?: string;
	borderWidth?: number;
	highlightLayer?: number;
	highlightColor?: string;
	opacity?: number;
	label?: string;
	labelColor?: string;
}> = ({
	layers,
	x,
	y,
	size,
	borderColor = BOX_BORDER,
	borderWidth = 4,
	highlightLayer = -1,
	highlightColor = P.cyan,
	opacity = 1,
	label,
	labelColor = P.cyan,
}) => {
	const cx = x + size / 2;
	const cy = y + size / 2;
	const shapes = layers.map((l) => l.shape) as [ShapeKind, ShapeKind, ShapeKind, ShapeKind];
	const {radii, yOffsets} = nestedLayerRadii(size, shapes);
	return (
		<g opacity={opacity}>
			<rect
				x={x}
				y={y}
				width={size}
				height={size}
				rx={8}
				fill={BOX_BG}
				stroke={borderColor}
				strokeWidth={borderWidth}
			/>
			{layers.map((layer, idx) => (
				<ShapeGlyph
					key={`nest-${idx}`}
					shape={layer.shape}
					shade={layer.shade}
					cx={cx}
					cy={cy + yOffsets[idx]}
					r={radii[idx]}
					stroke={idx === highlightLayer ? highlightColor : '#23201e'}
					strokeWidth={idx === highlightLayer ? 5.5 : 3.4}
				/>
			))}
			{label && (
				<text
					x={cx}
					y={y + size + 42}
					textAnchor="middle"
					fill={labelColor}
					fontSize={34}
					fontWeight={850}
					fontFamily="Manrope Variable, Arial, sans-serif"
				>
					{label}
				</text>
			)}
		</g>
	);
};

/** Exact Question 18 dataset (verified pixel-for-pixel by Neon & Codex gpt-6.2-astra max). */
export const Q18_UPPER_IN: [ShapeItem, ShapeItem, ShapeItem, ShapeItem] = [
	{shape: 'triangle', shade: 'black'},
	{shape: 'circle', shade: 'white'},
	{shape: 'pentagon', shade: 'grey'},
	{shape: 'hexagon', shade: 'black'},
];

export const Q18_UPPER_OUT: [ShapeItem, ShapeItem, ShapeItem, ShapeItem] = [
	{shape: 'circle', shade: 'black'},
	{shape: 'hexagon', shade: 'white'},
	{shape: 'triangle', shade: 'grey'},
	{shape: 'pentagon', shade: 'black'},
];

export const Q18_LOWER_IN: [ShapeItem, ShapeItem, ShapeItem, ShapeItem] = [
	{shape: 'parallelogram', shade: 'grey'},
	{shape: 'heart', shade: 'black'},
	{shape: 'triangle', shade: 'white'},
	{shape: 'circle', shade: 'grey'},
];

export const Q18_OPTIONS: {k: 'A' | 'B' | 'C' | 'D'; layers: [ShapeItem, ShapeItem, ShapeItem, ShapeItem]}[] = [
	{
		k: 'A',
		layers: [
			{shape: 'parallelogram', shade: 'grey'},
			{shape: 'heart', shade: 'black'},
			{shape: 'triangle', shade: 'white'},
			{shape: 'circle', shade: 'grey'},
		],
	},
	{
		k: 'B',
		layers: [
			{shape: 'heart', shade: 'black'},
			{shape: 'circle', shade: 'grey'},
			{shape: 'parallelogram', shade: 'grey'},
			{shape: 'triangle', shade: 'white'},
		],
	},
	{
		k: 'C',
		layers: [
			{shape: 'heart', shade: 'grey'},
			{shape: 'circle', shade: 'black'},
			{shape: 'parallelogram', shade: 'white'},
			{shape: 'triangle', shade: 'grey'},
		],
	},
	{
		k: 'D',
		layers: [
			{shape: 'parallelogram', shade: 'black'},
			{shape: 'heart', shade: 'grey'},
			{shape: 'triangle', shade: 'grey'},
			{shape: 'circle', shade: 'white'},
		],
	},
];

/** Original practice analogy dataset (new rule: shapes 4-3-2-1, shades 1-2-3-4; answer D). */
export const Q18_PRAC_UPPER_IN: [ShapeItem, ShapeItem, ShapeItem, ShapeItem] = [
	{shape: 'triangle', shade: 'black'},
	{shape: 'pentagon', shade: 'white'},
	{shape: 'circle', shade: 'black'},
	{shape: 'square', shade: 'grey'},
];

export const Q18_PRAC_UPPER_OUT: [ShapeItem, ShapeItem, ShapeItem, ShapeItem] = [
	{shape: 'square', shade: 'black'},
	{shape: 'circle', shade: 'white'},
	{shape: 'pentagon', shade: 'black'},
	{shape: 'triangle', shade: 'grey'},
];

export const Q18_PRAC_LOWER_IN: [ShapeItem, ShapeItem, ShapeItem, ShapeItem] = [
	{shape: 'diamond', shade: 'grey'},
	{shape: 'hexagon', shade: 'black'},
	{shape: 'circle', shade: 'grey'},
	{shape: 'square', shade: 'white'},
];

export const Q18_PRAC_OPTIONS: {k: 'A' | 'B' | 'C' | 'D'; layers: [ShapeItem, ShapeItem, ShapeItem, ShapeItem]}[] = [
	{
		k: 'A',
		layers: [
			{shape: 'square', shade: 'white'},
			{shape: 'circle', shade: 'grey'},
			{shape: 'hexagon', shade: 'black'},
			{shape: 'diamond', shade: 'grey'},
		],
	},
	{
		k: 'B',
		layers: [
			{shape: 'square', shade: 'grey'},
			{shape: 'circle', shade: 'black'},
			{shape: 'diamond', shade: 'grey'},
			{shape: 'hexagon', shade: 'white'},
		],
	},
	{
		k: 'C',
		layers: [
			{shape: 'diamond', shade: 'white'},
			{shape: 'hexagon', shade: 'grey'},
			{shape: 'circle', shade: 'black'},
			{shape: 'square', shade: 'grey'},
		],
	},
	{
		k: 'D',
		layers: [
			{shape: 'square', shade: 'grey'},
			{shape: 'circle', shade: 'black'},
			{shape: 'hexagon', shade: 'grey'},
			{shape: 'diamond', shade: 'white'},
		],
	},
];
