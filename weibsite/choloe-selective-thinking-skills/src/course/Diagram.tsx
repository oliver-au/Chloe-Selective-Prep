import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Palette, Visual} from './types';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const WIDTH = 1600;
const HEIGHT = 360;

/** Centred, wrapped text: long labels retain every word rather than being clipped. */
function label(value: unknown, x: number, y: number, color: string, size = 36, maxChars = 24) {
  const glyph=String(value??'').trim();
  if(['○','●','□','■','△','▲','◇','◆'].includes(glyph)){
    const r=Math.max(26,size*.8),filled=['●','■','▲','◆'].includes(glyph),fill=filled?color:'none';
    if(['○','●'].includes(glyph))return <circle cx={x} cy={y} r={r} fill={fill} stroke={color} strokeWidth={4}/>;
    if(['□','■'].includes(glyph))return <rect x={x-r} y={y-r} width={r*2} height={r*2} fill={fill} stroke={color} strokeWidth={4}/>;
    return <polygon points={['△','▲'].includes(glyph)?`${x},${y-r} ${x+r},${y+r} ${x-r},${y+r}`:`${x},${y-r} ${x+r},${y} ${x},${y+r} ${x-r},${y}`} fill={fill} stroke={color} strokeWidth={4}/>;
  }
  const words = String(value ?? '').split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if (current && `${current} ${word}`.length > maxChars) {
      lines.push(current);
      current = word;
    } else current += `${current ? ' ' : ''}${word}`;
  }
  if (current) lines.push(current);
  const lineHeight = size * 1.18;
  return <text x={x} y={y - (lines.length - 1) * lineHeight / 2 + size * .34} fill={color} fontSize={size} textAnchor="middle" fontWeight="650">
    {lines.map((line, i) => <tspan key={i} x={x} dy={i ? lineHeight : 0}>{line}</tspan>)}
  </text>;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
type V3 = [number, number, number];
const add3 = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale3 = (a: V3, s: number): V3 => [a[0] * s, a[1] * s, a[2] * s];

type FoldFace = {index: number; center: V3; u: V3; v: V3};
/** The fixed source net is A above C, F below C, B left, D right, E beyond D.
 * Each face rotates about its shared hinge. E's hinge travels with D first.
 * At 90°: C/E are z=0/1, B/D are x=-.5/.5, A/F are y=.5/-.5.
 */
function cubeFaces(sideAngle: number, closingAngle: number): FoldFace[] {
  const c = Math.cos(sideAngle), s = Math.sin(sideAngle);
  const ec = Math.cos(sideAngle + closingAngle), es = Math.sin(sideAngle + closingAngle);
  return [
    {index: 0, center: [0, .5 + .5 * c, .5 * s], u: [1, 0, 0], v: [0, c, s]},
    {index: 1, center: [-.5 - .5 * c, 0, .5 * s], u: [c, 0, -s], v: [0, 1, 0]},
    {index: 2, center: [0, 0, 0], u: [1, 0, 0], v: [0, 1, 0]},
    {index: 3, center: [.5 + .5 * c, 0, .5 * s], u: [c, 0, s], v: [0, 1, 0]},
    {index: 4, center: [.5 + c + .5 * ec, 0, s + .5 * es], u: [ec, 0, es], v: [0, 1, 0]},
    {index: 5, center: [0, -.5 - .5 * c, .5 * s], u: [1, 0, 0], v: [0, c, -s]},
  ];
}

export const Diagram = ({visual: v, palette: p}: {visual: Visual; palette: Palette}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = (from: number, to: number) => interpolate(frame, [from * fps, to * fps], [0, 1], clamp);
  const enter = (index: number) => progress(.35 + index * .55, .8 + index * .55);
  const type = v.type;
  let body: React.ReactNode;

  if (type === 'chain' || type === 'slots' || type === 'cycle') {
    const items: unknown[] = v.nodes || v.items || [];
    const count = Math.max(items.length, 1);
    const gap = type === 'chain' ? 64 : 22;
    const cardWidth = Math.min(620, (1480 - gap * (count - 1)) / count);
    const total = count * cardWidth + gap * (count - 1);
    const start = (WIDTH - total) / 2;
    const y = type === 'cycle' ? 78 : 88;
    const cardHeight = 150;
    const font = count > 5 ? 30 : count > 3 ? 34 : 40;
    body = <>
      {items.map((item, i) => {
        const x = start + i * (cardWidth + gap);
        const reveal = enter(i);
        const selected = i === v.index;
        return <g key={i}>
          {type === 'slots' && <rect x={x} y={y} width={cardWidth} height={cardHeight} rx={13} fill="none" stroke={p.line} strokeWidth={2} strokeDasharray="7 7"/>}
          <g opacity={reveal} transform={`translate(0 ${type === 'slots' ? (1 - reveal) * -35 : 0})`}>
            <rect x={x} y={y} width={cardWidth} height={cardHeight} rx={type === 'slots' ? 13 : 26} fill={selected ? p.accent : p.panel} stroke={selected ? p.accent : p.second} strokeWidth={3}/>
            {label(item, x + cardWidth / 2, y + cardHeight / 2, selected ? p.panel : p.ink, font, Math.max(8, Math.floor((cardWidth - 32) / (font * .57))))}
          </g>
          {type === 'slots' && v.numbered !== false && label(i + 1, x + cardWidth / 2, 287, p.muted, 28)}
          {type === 'chain' && i < count - 1 && <g opacity={progress(.7 + i * .55, 1.1 + i * .55)}>
            <path d={`M${x + cardWidth + 10} ${y + cardHeight / 2}h${gap - 20}`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress(.65 + i * .55, 1.05 + i * .55)} stroke={p.accent} strokeWidth={4} fill="none"/>
            <path d={`M${x + cardWidth + gap - 23} ${y + cardHeight / 2 - 9}l13 9-13 9`} stroke={p.accent} strokeWidth={4} fill="none"/>
          </g>}
        </g>;
      })}
      {type === 'cycle' && count > 1 && <g opacity={progress(1, 2)}>
        <path d={`M${start + total - cardWidth / 2} 238V270Q${start + total - cardWidth / 2} 303 ${start + total - cardWidth / 2 - 34} 303H${start + cardWidth / 2 + 34}Q${start + cardWidth / 2} 303 ${start + cardWidth / 2} 270V238`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress(1, 2.5)} stroke={p.second} strokeWidth={4} fill="none"/>
        <path d={`M${start + cardWidth / 2 - 9} 251l9-13 9 13`} opacity={progress(2.3, 2.5)} stroke={p.second} strokeWidth={4} fill="none"/>
      </g>}
    </>;
  } else if (type === 'equation') {
    const text = String(v.text || '');
    const size = text.length > 58 ? 48 : text.length > 38 ? 55 : 66;
    body = <g opacity={progress(.15, .65)}>
      <rect x={60} y={48} width={1480} height={244} rx={26} fill={p.panel} stroke={p.line} strokeWidth={2}/>
      {label(text, 800, 170, p.ink, size, Math.floor(1370 / (size * .55)))}
      <path d={`M${800 - 430 * progress(.65, 1.6)} 310H${800 + 430 * progress(.65, 1.6)}`} stroke={p.accent} strokeWidth={4}/>
    </g>;
  } else if (type === 'set') {
    body = <>
      <ellipse cx={800} cy={177} rx={680} ry={165} fill={p.panel} stroke={p.second} strokeWidth={3}/>
      {label(v.outer, 800, 55, p.ink, 38, 42)}
      <g opacity={progress(.8, 1.5)}>
        <ellipse cx={800} cy={217} rx={435} ry={94} fill={p.accent + '18'} stroke={p.accent} strokeWidth={4} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress(.8, 2)}/>
        {label(v.inner, 800, 218, p.ink, 42, 34)}
      </g>
    </>;
  } else if (type === 'overlap') {
    body = <>
      <rect x={160} y={12} width={1280} height={335} rx={20} fill="none" stroke={p.line} strokeWidth={2}/>
      <circle cx={630} cy={185} r={148} fill={p.accent + '20'} stroke={p.accent} strokeWidth={4}/>
      <circle cx={840} cy={185} r={148} fill={p.second + '20'} stroke={p.second} strokeWidth={4}/>
      {label(v.left, 460, 42, p.accent, 34)}{label(v.right, 1020, 42, p.second, 34)}
      <g opacity={enter(0)}>{label(v.a, 554, 185, p.ink, 56)}</g>
      <g opacity={enter(1)}>{label(v.both, 735, 185, p.ink, 56)}</g>
      <g opacity={enter(2)}>{label(v.b, 915, 185, p.ink, 56)}</g>
      {v.neither !== undefined && <g opacity={enter(3)}>{label(`Neither: ${v.neither}`, 1210, 277, p.muted, 32)}</g>}
    </>;
  } else if (type === 'compare' || type === 'bars') {
    const values: number[] = v.values || [];
    const max = Math.max(...values.map(Number), 1);
    const rowHeight = Math.min(91, 285 / Math.max(values.length, 1));
    const top = (300 - values.length * rowHeight) / 2 + 8;
    body = <>
      <line x1={425} y1={top - 8} x2={425} y2={top + values.length * rowHeight} stroke={p.line} strokeWidth={2}/>
      {values.map((value, i) => <g key={i} opacity={enter(i)}>
        {label(v.labels?.[i] || String(i + 1), 215, top + (i + .5) * rowHeight, p.ink, 34, 21)}
        <rect x={425} y={top + i * rowHeight + 12} width={900 * value / max * enter(i)} height={rowHeight - 24} rx={9} fill={i % 2 ? p.second : p.accent}/>
        {label(value, 1430, top + (i + .5) * rowHeight, p.ink, 39)}
      </g>)}
      {v.unit && label(v.unit, 900, 332, p.muted, 28, 70)}
    </>;
  } else if (type === 'grid') {
    const rows: string[] = v.rows || [], cols: string[] = v.cols || [], cells: unknown[][] = v.cells || [];
    const paperBoard = rows.join(',') === 'A,B,C,D' && cols.join(',') === '1,2,3,4';
    const tilingBoard = rows.join(',') === 'Top,Bottom' && cells.flat().every(value => ['Fixed','Gap','Fill'].includes(String(value)));
    if (paperBoard || tilingBoard) {
      // These are geometric boards, not data tables: every shared cell edge
      // has the same length horizontally and vertically, with no gutters.
      const side = Math.min(130, 270 / Math.max(rows.length, 1));
      const left = 800 - cols.length * side / 2, top = 70;
      body = <>
        {cols.map((col,j) => <g key={j}>{label(col,left+(j+.5)*side,34,p.second,paperBoard?28:30,9)}</g>)}
        {rows.map((row,i) => <g key={i}>
          {label(row,left-(paperBoard?45:95),top+(i+.5)*side,p.ink,30)}
          {cols.map((_,j) => {
            const value = cells[i]?.[j] ?? '';
            const cellReveal = progress(.45+i*.95+j*.22,.85+i*.95+j*.22);
            return <g key={j}>
              <rect x={left+j*side} y={top+i*side} width={side} height={side} fill={p.panel} stroke={p.second} strokeWidth={2}/>
              <g opacity={cellReveal}>
                {(value==='Fixed'||value==='Fill')&&<rect x={left+j*side+1} y={top+i*side+1} width={side-2} height={side-2} fill={(value==='Fill'?p.accent:p.second)+'30'}/>}
                {value==='●'
                  ? <circle cx={left+(j+.5)*side} cy={top+(i+.5)*side} r={10} fill={p.ink}/>
                  : label(value,left+(j+.5)*side,top+(i+.5)*side,value==='Fill'?p.accent:p.ink,paperBoard?37:32,8)}
              </g>
            </g>;
          })}
        </g>)}
      </>;
    } else {
    const left = 330, top = 72, tableWidth = 1190;
    const cw = tableWidth / Math.max(cols.length, 1), rh = 270 / Math.max(rows.length, 1);
    const cellFont = rows.length > 3 ? 31 : 35;
    body = <>
      {cols.map((col, j) => <g key={j}>{label(col, left + (j + .5) * cw, 33, p.second, cols.length > 3 ? 30 : 34, Math.floor(cw / 19))}</g>)}
      {rows.map((row, i) => <g key={i}>
        {label(row, 166, top + (i + .5) * rh, p.ink, rows.length > 3 ? 29 : 33, 18)}
        {cols.map((_, j) => {
          const value = cells[i]?.[j] ?? '?';
          const cellReveal = progress(.45 + i * .95 + j * .22, .85 + i * .95 + j * .22);
          const positive = value === '✓';
          const negative = value === '×';
          return <g key={j}>
            <rect x={left + j * cw} y={top + i * rh} width={cw - 5} height={rh - 5} rx={9} fill={p.panel} stroke={p.line} strokeWidth={1.5}/>
            <g opacity={cellReveal}>
              {positive && <rect x={left + j * cw + 2} y={top + i * rh + 2} width={cw - 9} height={rh - 9} rx={7} fill={p.accent + '20'} stroke={p.accent} strokeWidth={2}/>} 
              {value==='●'
                ? <circle cx={left+(j+.5)*cw-2.5} cy={top+(i+.5)*rh-2.5} r={10} fill={p.ink}/>
                : label(value, left + (j + .5) * cw - 2.5, top + (i + .5) * rh - 2.5, positive ? p.accent : negative ? p.muted : p.ink, cellFont, Math.max(7, Math.floor((cw - 26) / (cellFont * .56))))}
            </g>
          </g>;
        })}
      </g>)}
    </>;
    }
  } else if (type === 'rotation') {
    const turns = Number(v.turns ?? 1);
    const angle = turns * 90 * progress(1.1, 3.6);
    const originalX = 340, resultX = 1260, cy = 170, mirrorX = 800;
    const shape = (fill: string, ghost = false) => <>
      <path d="M-70-90V84H76V26H-12V-90Z" fill={ghost ? 'none' : fill} stroke={fill} strokeWidth={ghost ? 2 : 1.5} strokeDasharray={ghost ? '7 6' : undefined}/>
      <circle cx={-42} cy={-64} r={12} fill={ghost ? 'none' : p.second} stroke={p.second} strokeWidth={ghost ? 2 : 0}/>
    </>;
    const pivot = (x: number) => <g aria-label="Marked turning centre"><circle cx={x} cy={cy} r={12} fill={p.panel} stroke={p.ink} strokeWidth={2}/><path d={`M${x - 7} ${cy}h14M${x} ${cy - 7}v14`} stroke={p.ink} strokeWidth={2}/></g>;
    const angleRadians = angle * Math.PI / 180;
    const radius = 126;
    const endX = resultX + radius * Math.sin(angleRadians), endY = cy - radius * Math.cos(angleRadians);
    body = <>
      <g transform={`translate(${originalX} ${cy})`}>{shape(p.accent)}</g>
      {v.showPivot !== false && pivot(originalX)}
      {label(v.showPivot === false ? 'Original' : 'Original · centre marked', originalX, 325, p.muted, 29, 34)}
      {v.mirror ? <>
        <path d={`M${mirrorX} 20V282`} stroke={p.second} strokeWidth={3} strokeDasharray="10 8"/>
        {label('Vertical mirror', mirrorX, 325, p.second, 28)}
      </> : <>
        <path d="M660 170H940m-20-14 20 14-20 14" stroke={p.second} strokeWidth={4} fill="none"/>
        {v.showResult !== false && label(`${Math.abs(turns * 90)}°`, 800, 125, p.second, 40)}
      </>}
      {v.showResult === false ? <>
        {label('?', resultX, 170, p.ink, 106)}
        {label('Your prediction', resultX, 325, p.muted, 29)}
      </> : v.mirror ? <>
        {/* Corresponding points cross a fixed mirror line at equal height; no fake 3D flip. */}
        <path d={`M${originalX - 42} ${cy - 64}H${lerp(originalX - 42, resultX + 42, progress(.9, 2.5))}`} stroke={p.second} strokeWidth={2} strokeDasharray="6 7" fill="none"/>
        <g opacity={progress(2, 3)} transform={`translate(${resultX} ${cy}) scale(-1 1)`}>{shape(p.accent)}</g>
        {label('Reflected · same height', resultX, 325, p.muted, 29, 32)}
      </> : <>
        <g opacity={.3} transform={`translate(${resultX} ${cy})`}>{shape(p.muted, true)}</g>
        {Math.abs(angle) > .1 && Math.abs(angle) < 360 && <path d={`M${resultX} ${cy - radius}A${radius} ${radius} 0 ${Math.abs(angle) > 180 ? 1 : 0} ${angle >= 0 ? 1 : 0} ${endX} ${endY}`} stroke={p.second} strokeWidth={3} fill="none"/>}
        <g transform={`translate(${resultX} ${cy}) rotate(${angle})`}>{shape(p.accent)}</g>
        {v.showPivot !== false && pivot(resultX)}
        {label(turns === 2 ? 'Half-turn · 180°' : turns === 1 ? 'Quarter-turn clockwise' : turns === 3 ? '270° clockwise' : turns === 0 ? 'Original' : `${turns * 90}° turn`, resultX, 325, p.muted, 29, 34)}
      </>}
    </>;
  } else if (type === 'compass') {
    const raw: [number, number][] = [[0, 0]];
    for (const direction of v.path || []) {
      const [x, y] = raw[raw.length - 1];
      raw.push([x + (direction === 'E' ? 1 : direction === 'W' ? -1 : 0), y + (direction === 'S' ? 1 : direction === 'N' ? -1 : 0)]);
    }
    const xs = raw.map(a => a[0]), ys = raw.map(a => a[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const unit = Math.min(155, 700 / Math.max(maxX - minX, 1), 205 / Math.max(maxY - minY, 1));
    const points = raw.map(([x, y]) => [600 + (x - (minX + maxX) / 2) * unit, 165 + (y - (minY + maxY) / 2) * unit]);
    const journey = progress(.6, .6 + Math.max(1, points.length - 1) * 1.25) * (points.length - 1);
    const segment = Math.min(Math.floor(journey), Math.max(0, points.length - 2));
    const amount = journey - segment;
    const a = points[segment], b = points[Math.min(segment + 1, points.length - 1)];
    body = <>
      <path d="M1320 53V267M1213 160H1427" stroke={p.line} strokeWidth={3}/>
      {label('N', 1320, 27, p.second, 31)}{label('S', 1320, 294, p.muted, 31)}{label('W', 1170, 160, p.muted, 31)}{label('E', 1470, 160, p.muted, 31)}
      <polyline points={points.map(point => point.join(',')).join(' ')} fill="none" stroke={p.line} strokeWidth={5} strokeDasharray="7 7"/>
      {points.slice(1).map((point, i) => <line key={i} x1={points[i][0]} y1={points[i][1]} x2={lerp(points[i][0], point[0], Math.max(0, Math.min(1, journey - i)))} y2={lerp(points[i][1], point[1], Math.max(0, Math.min(1, journey - i)))} stroke={p.accent} strokeWidth={8} strokeLinecap="round"/>)}
      {points.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i ? 8 : 11} fill={p.accent} opacity={i === 0 ? 1 : Math.max(0, Math.min(1, journey - i + .15))}/>)}
      <circle cx={lerp(a[0], b[0], amount)} cy={lerp(a[1], b[1], amount)} r={14} fill={p.second}/>
      {label('Start', points[0][0] - 65, points[0][1] + 30, p.ink, 28)}
      {label('Direction sketch · not to scale', 600, 334, p.muted, 27, 50)}
    </>;
  } else if (type === 'toggles') {
    const sequence: boolean[][]=v.stateSequence||[v.states||[]];const step=Math.max(0,(v.stepSeconds||[0]).filter((t:number)=>frame>=t*fps).length-1);const states: boolean[]=sequence[step];
    const gap = Math.min(310, 1350 / Math.max(states.length, 1));
    body = <>{states.map((state, i) => {
      const x = 800 + (i - (states.length - 1) / 2) * gap;
      const colour=v.colours?.[i]||p.accent;return <g key={i} opacity={enter(i)}>{label(v.labels?.[i]||`Light ${i+1}`,x,42,colour,32)}<circle cx={x} cy={148} r={71} fill={state ? colour : p.panel} stroke={colour} strokeWidth={3}/>{label(state ? 'ON' : 'OFF', x, 260, p.ink, 39)}</g>;
    })}{v.stepLabels&&label(v.stepLabels[step],800,333,p.muted,27)}</>;
  } else if (type === 'segments') {
    const digits: any[] = v.digits || [];
    const segments: Record<string, number[]> = {a: [-32,-65,32,-65], b: [40,-55,40,-5], c: [40,5,40,55], d: [32,65,-32,65], e: [-40,55,-40,5], f: [-40,-5,-40,-55], g: [-32,0,32,0]};
    const letters: Record<string, number[]> = {a: [0,-87], b: [65,-28], c: [65,34], d: [0,100], e: [-65,34], f: [-65,-28], g: [0,26]};
    body = <>
      {digits.map((digit, i) => {
        const x = (i + .5) * WIDTH / digits.length;
        return <g key={i} aria-label={digit.label} opacity={enter(i)}>
          <g transform={`translate(${x} 150) scale(1.1)`}>
            {Object.entries(segments).map(([name, [x1,y1,x2,y2]]) => <g key={name}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={p.accent} strokeWidth={10} strokeLinecap="round" opacity={digit.lit.includes(name) ? 1 : .13}/>
              {digit.broken?.includes(name) && <line x1={(x1+x2)/2-11} y1={(y1+y2)/2+11} x2={(x1+x2)/2+11} y2={(y1+y2)/2-11} stroke="#ffc6b0" strokeWidth={5}/>} 
              <text x={letters[name][0]} y={letters[name][1]} fill={digit.broken?.includes(name) ? '#ffc6b0' : p.muted} textAnchor="middle" fontSize={21}>{name}</text>
            </g>)}
          </g>
          {label(digit.label, x, 291, p.ink, 30, Math.floor((WIDTH / digits.length - 20) / 17))}
        </g>;
      })}
      {digits.some(digit => digit.broken?.length) && label('Peach slashes mark the fixed broken segments.', 800, 341, p.muted, 24, 95)}
    </>;
  } else if (type === 'cubeNet') {
    const labels = v.labels || ['1', '2', '3', '4', '5', '6'];
    const net = [[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]];
    const colors = v.showResult === false ? Array<string>(6).fill(p.ink) : [p.second, p.ink, p.accent, p.ink, p.accent, p.second];
    const sides = progress(1, 3.2) * Math.PI / 2;
    const closing = progress(3.2, 4.8) * Math.PI / 2;
    const faces = cubeFaces(sides, closing);
    const faceCorners = (face: FoldFace) => [[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]].map(([u,w]) => add3(face.center, add3(scale3(face.u,u),scale3(face.v,w))));
    const projectUnit = ([x,y,z]: V3) => [x-z, (x-2*y+z)/Math.sqrt(3)];
    const projectedCorners = faces.flatMap(face => faceCorners(face).map(projectUnit));
    const minX = Math.min(...projectedCorners.map(point => point[0])), maxX = Math.max(...projectedCorners.map(point => point[0]));
    const minY = Math.min(...projectedCorners.map(point => point[1])), maxY = Math.max(...projectedCorners.map(point => point[1]));
    // Fit the entire moving mesh, including E before it closes, inside the panel.
    const foldScale = Math.min(490/(maxX-minX), 275/(maxY-minY));
    const projection = (point: V3) => {
      const [x,y] = projectUnit(point);
      return [940+(x-(minX+maxX)/2)*foldScale, 164+(y-(minY+maxY)/2)*foldScale];
    };
    // Painter's order for an orthographic camera looking from (+x,+y,+z).
    const sorted = [...faces].sort((a, b) => a.center.reduce((s,n) => s+n, 0) - b.center.reduce((s,n) => s+n, 0));
    body = <>
      {net.map(([x,y], i) => <g key={i}>
        <rect x={65+x*88} y={34+y*88} width={85} height={85} rx={5} fill={p.panel} stroke={colors[i]} strokeWidth={3}/>
        {label(labels[i], 107.5+x*88, 76.5+y*88, colors[i], 36)}
      </g>)}
      {label('Flat net', 242, 334, p.muted, 27)}
      <path d="M490 165H610m-18-12 18 12-18 12" stroke={p.second} strokeWidth={4} fill="none"/>
      {v.showResult === false ? label('Your fold?', 950, 170, p.ink, 46) : <>
        {sorted.map(face => {
          const corners = faceCorners(face).map(projection);
          const center = projection(face.center);
          return <g key={face.index}>
            <polygon points={corners.map(point => point.join(',')).join(' ')} fill={p.panel} stroke={colors[face.index]} strokeWidth={3} strokeLinejoin="round"/>
            {label(labels[face.index], center[0], center[1], colors[face.index], 31)}
          </g>;
        })}
        {label(closing >= Math.PI/2 ? 'Folded cube' : sides < Math.PI/2 ? 'Fold the four sides' : 'Close the final face', 940, 334, p.muted, 27, 36)}
        <g opacity={progress(4.8, 5.5)}>
          {label('Opposite pairs', 1390, 52, p.muted, 29)}
          {[[2,4],[0,5],[1,3]].map(([a,b], i) => <g key={i}>{label(`${labels[a]} ↔ ${labels[b]}`, 1390, 116 + i*80, colors[a], 44)}</g>)}
        </g>
      </>}
    </>;
  } else {
    body = label(v.text || 'Model → Structure → Decide → Prove', 800, 180, p.ink, 46, 55);
  }

  return <svg data-diagram={type} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height="100%" style={{overflow: 'visible', fontFamily: 'Manrope Variable, Manrope, Arial, sans-serif'}}>{body}</svg>;
};
