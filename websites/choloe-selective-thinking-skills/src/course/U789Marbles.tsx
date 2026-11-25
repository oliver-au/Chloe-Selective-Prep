import {type Shot} from './U789Studio';
type Point = {x: number; y: number};
type Gift = {from: number; to: number; start: number; end: number; destination: Point; lift: number};
type Marble = {id: number; home: number; position: Point; gifts: Gift[]};

const centres = [394, 960, 1526];
const names = ['Ava', 'Ben', 'Chloe'];
const cream = '#f3f0e7';
const mint = '#a6e6c7';



const secondGift = 358;
const finalArrival = 487;
const position = (owner: number, offset: number, y: number): Point => ({x: centres[owner] + offset, y});
const lowerRow = [-144, -48, 48, 144];
const marbles: Marble[] = Array.from({length: 12}, (_, id) => {
  const home = Math.floor(id / 4);
  return {id, home, position: position(home, lowerRow[id % 4], 637), gifts: []};
});

// The same two glass marbles that Ava gives away later leave Ben's tray.
marbles[3].gifts = [
  {from: 0, to: 1, start: 58, end: 123, destination: position(1, 48, 529), lift: 112},
  {from: 1, to: 2, start: 389, end: 455, destination: position(2, 0, 529), lift: 91},
];
marbles[2].gifts = [
  {from: 0, to: 1, start: 89, end: 154, destination: position(1, -48, 529), lift: 127},
  {from: 1, to: 2, start: 421, end: finalArrival, destination: position(2, -96, 529), lift: 103},
];
marbles[7].gifts = [
  {from: 1, to: 2, start: secondGift, end: 424, destination: position(2, 96, 529), lift: 111},
];

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => n * n * (3 - 2 * n);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function pose(marble: Marble, frame: number) {
  let at = marble.position;
  let owner: number | null = marble.home;
  let turn = (marble.id * 37 + 7) % 180;
  for (const gift of marble.gifts) {
    if (frame <= gift.start) break;
    if (frame < gift.end) {
      const u = (frame - gift.start) / (gift.end - gift.start);
      const travel = smooth(u);
      const arc = 4 * travel * (1 - travel);
      return {
        id: marble.id, owner: null, turn: turn + 260 * travel,
        x: mix(at.x, gift.destination.x, travel),
        y: mix(at.y, gift.destination.y, travel) - gift.lift * arc,
        height: arc,
      };
    }
    owner = gift.to;
    turn += 260;
    at = gift.destination;
  }
  return {id: marble.id, owner, ...at, turn, height: 0};
}

// Each marble has one permanent core colour, three-dimensional swirl and highlight.
const glass = [
  ['#ffeac0', '#d8a15c', '#935f32', '#543b2e', '#f8d092'],
  ['#d2eef4', '#8ebdcf', '#416f88', '#253b50', '#c3e8ef'],
  ['#efd7d7', '#c68c9b', '#8a526b', '#523246', '#f3b7bc'],
  ['#c4f1ed', '#76bebe', '#2b787e', '#19474e', '#b5efe9'],
  ['#f8d5c2', '#d4987f', '#8e5b4c', '#553c39', '#f8bea5'],
  ['#dfe0fa', '#b1abd1', '#746b99', '#443f63', '#e2d8f4'],
  ['#e3eacd', '#afc092', '#657c54', '#404e39', '#e0eab4'],
  ['#ffe5ab', '#d3a14f', '#89612e', '#55412d', '#ffe299'],
  ['#c8ecdf', '#8dbfa8', '#4f856f', '#2b5146', '#c0e7ca'],
  ['#e7d7ef', '#b19bc4', '#7d628f', '#51405c', '#e5c4eb'],
  ['#fbe0ba', '#d2a574', '#956b40', '#5a4331', '#f9d49d'],
  ['#d0e0f3', '#8ba9ca', '#506d97', '#30435e', '#b9d5f1'],
];

function Definitions() {
  return <defs>
    <radialGradient id="x5-back" cx="68%" cy="31%" r="83%">
      <stop stopColor="#192c2f"/><stop offset=".62" stopColor="#101a1e"/><stop offset="1" stopColor="#0c1115"/>
    </radialGradient>
    <linearGradient id="x5-edge" x1="0" y1="0" x2=".25" y2="1" gradientUnits="objectBoundingBox">
      <stop stopColor="#657574"/><stop offset=".05" stopColor="#414e4f"/><stop offset=".5" stopColor="#253536"/><stop offset=".92" stopColor="#354344"/><stop offset="1" stopColor="#172123"/>
    </linearGradient>
    <linearGradient id="x5-surface" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop stopColor="#274343"/><stop offset="1" stopColor="#233637"/>
    </linearGradient>
    <linearGradient id="x5-well" x1="0" x2=".15" y1="0" y2="1" gradientUnits="objectBoundingBox">
      <stop stopColor="#1d3333"/><stop offset=".66" stopColor="#263c3a"/><stop offset="1" stopColor="#304542"/>
    </linearGradient>
    <radialGradient id="x5-shadow">
      <stop stopColor="#020a0b" stopOpacity=".75"/><stop offset=".63" stopColor="#050e0f" stopOpacity=".38"/><stop offset="1" stopColor="#071114" stopOpacity="0"/>
    </radialGradient>
    <pattern id="x5-grain" width="9" height="9" patternUnits="userSpaceOnUse">
      <path d="M1 2l2 1m3 3 2 1" stroke="#acbdb2" strokeWidth=".85" opacity=".13"/>
    </pattern>
    <clipPath id="x5-orb"><circle r="36"/></clipPath>
    {glass.map(([light, mid, dark, edge], id) => <radialGradient key={id} id={`x5-g${id}`} cx="34%" cy="24%" r="82%">
      <stop stopColor={light}/><stop offset=".27" stopColor={mid}/><stop offset=".66" stopColor={dark}/><stop offset=".88" stopColor={edge}/><stop offset="1" stopColor={mid}/>
    </radialGradient>)}
  </defs>;
}

function Orb({state}: {state: ReturnType<typeof pose>}) {
  const colour = glass[state.id];
  const scale = 1 + .085 * state.height;
  return <g transform={`translate(${state.x} ${state.y}) scale(${scale})`}>
    <circle r="36" fill={`url(#x5-g${state.id})`} stroke={colour[2]} strokeWidth="1.8"/>
    <g clipPath="url(#x5-orb)">
      <g transform={`rotate(${state.turn})`}>
        <path d="M-44 8C-18 28 5-19 42-17C18-9 7 19-13 23C-26 26-39 19-44 8Z" fill={colour[4]} opacity=".85"/>
        <path d="M-37 12C-15 23 5-13 36-15" fill="none" stroke={colour[0]} strokeWidth="2.3" opacity=".8"/>
        <path d="M-38 3C-10 24 3-15 39-23" fill="none" stroke={colour[3]} strokeWidth="2" opacity=".5"/>
      </g>
      <path d="M-25-13C-22-24-11-29-3-29" fill="none" stroke="#fffdf4" strokeWidth="5" opacity=".79" strokeLinecap="round"/>
      <circle cx="-26.5" cy="-5" r="2.6" fill="#fffdf4" opacity=".83"/>
      <path d="M7 29C17 28 25 20 29 12" fill="none" stroke={colour[0]} strokeWidth="2.2" opacity=".51" strokeLinecap="round"/>
    </g>
  </g>;
}

function Tray() {
  return <g>
    <rect x="106" y="381" width="1708" height="461" rx="64" fill="#060e10" opacity=".65"/>
    <rect x="106" y="365" width="1708" height="467" rx="64" fill="url(#x5-edge)" stroke="#162324" strokeWidth="2"/>
    <rect x="115" y="374" width="1690" height="444" rx="56" fill="url(#x5-surface)" stroke="#7b8d84" strokeOpacity=".47" strokeWidth="2"/>
    <rect x="115" y="374" width="1690" height="444" rx="56" fill="url(#x5-grain)"/>
    {centres.map(x => <g key={x}>
      <rect x={x - 248} y="406" width="496" height="307" rx="103" fill="url(#x5-well)" stroke="#172c2c" strokeWidth="5"/>
      <rect x={x - 244} y="410" width="488" height="299" rx="99" fill="url(#x5-grain)" stroke="#869c85" strokeWidth="1.8" strokeOpacity=".45"/>
      <path d={`M${x-173} 731h346`} stroke="#758982" strokeWidth="1.5" opacity=".55"/>
    </g>)}
  </g>;
}

// Retime the original glass-tray motion to the two gift clauses in this recording.
export function MarbleBench({t,at}:Shot) {
  const first=at('ava gives two',3.7), second=at('next ben gives three',10.3);
  const f=t<first ? 0 : t<second ? 58+96*clamp((t-first)/1.75) : 358+129*clamp((t-second)/2.45);
  const states=marbles.map(m=>pose(m,f));
  const counts=names.map((_,i)=>states.filter(s=>s.owner===i).length);
  const air=states.filter(s=>s.owner===null).length;
  const result=f>=finalArrival;
  return <svg role="img" aria-label="Track all twelve glass marbles across Ava, Ben and Chloe's trays" width="100%" height="100%" viewBox="103 346 1716 511" style={{display:'block',fontFamily:'inherit'}}>
      <Definitions/><Tray/>
      {states.map(s => <ellipse key={s.id} cx={s.x + 4 + 12 * s.height} cy={s.y + 22 + 50 * s.height}
        rx={42 + 11 * s.height} ry={20 + 6 * s.height} fill="url(#x5-shadow)" opacity={1 - .6 * s.height}/>)}
      {[...states].sort((a,b) => a.height - b.height || a.y - b.y).map(s => <Orb key={s.id} state={s}/>)}
      {centres.map((x, i) => <g key={x} fill={cream}>
        <text x={x-169} y="788" fontSize="49" fontWeight="650" letterSpacing="-1.7">{names[i]}</text>
        <text x={x+169} y="792" textAnchor="end" fontSize="66" fontWeight="740" fill={result ? mint : cream}>{counts[i]}</text>
      </g>)}
{air>0&&<text x="960" y="395" textAnchor="middle" fill={cream} fontSize="24">{air} in motion</text>}
    </svg>;
}
