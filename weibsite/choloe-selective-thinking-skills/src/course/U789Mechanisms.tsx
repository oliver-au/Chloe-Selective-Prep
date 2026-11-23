import type {ComponentType,ReactNode} from 'react';
import {Codebook,PositionLock,BeadRail,DisplayFault,CornerPress,MessageTurn} from './U789CodeFilms';
import {Calendar,TankRate,EqualParts,KitBench,ReversiblePress,MatchDraw,ClubRoll,PassGate,ScoreRuler,PagePrinter,CardPacks} from './U789QuantityFilms';
import {WorstDraw,Switchboard,DogParade,NewWhole,BirdTest,CleanerTrial} from './U789ExperimentFilms';
import {MarbleBench} from './U789Marbles';
import {sceneShot,type Shot} from './U789Studio';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Palette, Scene} from './types';

const clamp = {extrapolateLeft:'clamp', extrapolateRight:'clamp'} as const;
const paper = '#f6f0da', ink = '#243b39', muted = '#526c64', mint = '#479272', blue = '#4586a0', coral = '#bb6548';
const dark = '#10252b', cream = '#e8efdc';
const ids = [
  'u7-p3-worked','u7-p3-reveal','u7-p4-explain','u7-p4-worked','u7-p4-practice','u7-p4-reveal',
  'u7-p5-worked','u8-q2-worked','u8-q3-worked','u8-q3-reveal','u8-q7-worked','u8-q7-reveal',
  'u8-q8-worked','u8-q8-practice','u8-q8-reveal',
  'u9-x3-worked','u9-x4-worked','u9-x4-practice','u9-x4-reveal',
];
const workedFilms:Record<string,ComponentType<Shot>> = {
  'u7-p1-worked':Codebook, 'u7-p2-worked':PositionLock, 'u7-p3-worked':BeadRail,
  'u7-p4-worked':DisplayFault, 'u7-p5-worked':CornerPress, 'u7-p6-worked':MessageTurn,
  'u8-q1-worked':Calendar, 'u8-q2-worked':TankRate, 'u8-q3-worked':EqualParts,
  'u8-q4-worked':KitBench, 'u8-q5-worked':ReversiblePress, 'u8-q6-worked':MatchDraw,
  'u8-q7-worked':ClubRoll, 'u8-q8-worked':PassGate, 'u8-q9-worked':ScoreRuler,
  'u8-q10-worked':PagePrinter, 'u8-q11-worked':CardPacks,
  'u9-x1-worked':WorstDraw, 'u9-x2-worked':Switchboard, 'u9-x3-worked':DogParade,
  'u9-x4-worked':NewWhole, 'u9-x5-worked':MarbleBench, 'u9-x6-worked':BirdTest,
  'u9-x7-worked':CleanerTrial,
};
export const u789MechanismIds = new Set([...ids,...Object.keys(workedFilms)]);
const smooth = (amount:number) => amount * amount * (3-2*amount);
const norm = (t:number, start:number, duration=.6) => interpolate(t,[start,start+duration],[0,1],clamp);
function words(value:string){return value.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];}
/** Match phrases against exact word timestamps first (falling back to captions). */
function cue(scene:Scene, phrase:string, fraction:number, fps:number) {
  const needle = words(phrase);
  if (scene.words && scene.words.length >= needle.length) {
    const wt = scene.words.flatMap((w) => words(w.word).map((tok) => ({word: tok, ms: w.startMs})));
    const wi = wt.findIndex((_, j) => needle.every((w, k) => wt[j + k]?.word === w));
    if (wi >= 0) return .25 + wt[wi].ms / 1000;
  }
  const timeline = scene.captions.flatMap(c=>{
    const tokens=words(c.text);
    return tokens.map((word,i)=>({word,ms:c.startMs+(c.endMs-c.startMs)*i/tokens.length}));
  });
  const i=timeline.findIndex((_,j)=>needle.every((w,k)=>timeline[j+k]?.word===w));
  return .25+(i<0 ? scene.audioFrames/fps*fraction : timeline[i].ms/1000);
}
function type(value:ReactNode,x:number,y:number,size=28,colour=ink,anchor:'start'|'middle'|'end'='middle',weight=620){
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={colour} fontWeight={weight}>{value}</text>;
}
function paperFrame(content:ReactNode){
  return <><rect x="5" y="5" width="1590" height="350" rx="23" fill={paper}/>{content}</>;
}
function split(x:number){return <line x1={x} y1="37" x2={x} y2="321" stroke="#bccbb7" strokeWidth="2"/>;}
type Timings = (phrase:string,fraction:number)=>number;

const segmentEdges: Record<string, [number,number,number,number]> = {
  a:[-26,-63,26,-63], b:[37,-51,37,-10], c:[37,10,37,51], d:[26,63,-26,63],
  e:[-37,51,-37,10], f:[-37,-10,-37,-51], g:[-26,0,26,0],
};
function pixelDigit(lit:string[],broken:string[],size=1) {
  return <g transform={`scale(${size})`}>{Object.entries(segmentEdges).map(([k,[ax,ay,bx,by]])=>{
    const cx=(ax+bx)/2,cy=(ay+by)/2;
    return <g key={k}>
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke={lit.includes(k)?'#bdf9aa':'#33454b'} strokeWidth="12" strokeLinecap="round"/>
      {broken.includes(k)&&<line x1={cx-6} y1={cy+7} x2={cx+6} y2={cy-7} stroke="#ffa38b" strokeWidth="4" strokeLinecap="round"/>}
    </g>;
  })}</g>;
}
function segmentDisplay(scene:Scene,t:number,at:Timings) {
  const digits=scene.display.visual?.digits || [];
  const n=digits.length;
  return paperFrame(<>
    {type('SEVEN-SEGMENT DISPLAY',53,60,25,muted,'start')}
    {type(n===1?'Each bar has its own position':scene.kind==='quiz'?'Both digits shown before the fault': 'Compare the bars in each digit',53,111,37,ink,'start')}
    {type(n===1?'a top · b upper right · c lower right':n===4?'The same two bars fail every time':'Broken bars: upper-left and middle',53,178,25,muted,'start')}
    {type(n===1?'d bottom · e lower left · f upper left':n===4?'A peach slash marks a faulty bar.':scene.kind==='quiz'?'Predict what will still light up.':'Count the remaining lit bars.',53,220,25,muted,'start')}
    {n===1&&type('g middle',53,262,25,muted,'start')}
    {split(680)}
    {digits.map((digit:{label:string;lit:string[];broken:string[]},i:number)=>{
      const w=Math.min(196,825/n),x=1130+(i-(n-1)/2)*w;
      const shown=n===4?norm(t,i<2?0:at('when a nine',.38),.5):1;
      return <g key={i} opacity={shown}><rect x={x-w*.45} y="47" width={w*.9} height="216" rx="20" fill={dark}/>
        <g transform={`translate(${x} 157)`}>{pixelDigit(digit.lit,digit.broken,n===1?1.34:1.15)}
          {n===1&&Object.entries(segmentEdges).map(([key,[ax,ay,bx,by]])=>{
            const mx=(ax+bx)/2,my=(ay+by)/2;
            return <g key={key}>{type(key,mx*1.85,my*1.35+(key==='a'?-10:key==='d'?17:key==='g'?23:6),18,'#f2ddba')}</g>;
          })}</g>
        {type(digit.label,x,301,n===4?24:28)}</g>;
    })}
  </>);
}

function colouredCycle(scene:Scene,t:number,at:Timings){
  const worked=scene.id.endsWith('worked'), target=worked?1:3;
  const colours=[['Red','#c66c51'],['Blue','#4a87a4'],['Green','#568c68'],['Yellow','#d5a448']];
  const choose=worked?norm(t,at('second place for blue',.76),.55):norm(t,at('is yellow',.06),.55);
  return paperFrame(<>
    {type('Skip the first six groups',58,91,35,ink,'start')}
    {type('Positions 1–24',58,161,43,ink,'start')}
    {type('6 groups of 4 beads',58,219,32,muted,'start')}
    {split(615)}
    <path d="M754 150 Q1082 178 1408 150" fill="none" stroke="#99866c" strokeWidth="6"/>
    {colours.map(([name,fill],i)=>{const x=759+i*214,y=149+(i===1||i===2?11:0);return <g key={name}>
      <circle cx={x} cy={y} r="45" fill={fill}/><path d={`M${x-27} ${y-13}q5-14 19-16`} stroke="white" strokeOpacity=".6" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {i===target&&<circle cx={x} cy={y} r="59" opacity={choose} fill="none" stroke={ink} strokeWidth="4"/>}
      {type(String(25+i),x,74,31)}{type(name,x,264,31)}
    </g>})}
  </>);
}

function cornerBoard(t:number,at:Timings){
  const moments=[at('goes clockwise',.20),at('after two moves',.36),at('after four',.55)-.8,at('after four',.55)];
  // If a cue straddles a caption boundary, preserve strictly ordered motion.
  for(let i=1;i<moments.length;i++)moments[i]=Math.max(moments[i-1]+.55,moments[i]);
  const points=[[185,84],[525,84],[525,265],[185,265],[185,84]];
  let x=points[0][0],y=points[0][1],step=0;
  moments.forEach((moment,i)=>{const p=smooth(norm(t,moment,.48));x+=p*(points[i+1][0]-points[i][0]);y+=p*(points[i+1][1]-points[i][1]);if(p>=.99)step=i+1;});
  const corners=['Top left','Top right','Bottom right','Bottom left','Top left'];
  return paperFrame(<>
    <path d="M185 84 H525 V265 H185 Z" stroke="#b4c7b5" strokeWidth="8" fill="none"/>
    {points.slice(0,4).map(([px,py],i)=><circle key={i} cx={px} cy={py} r="10" fill={paper} stroke={muted} strokeWidth="4"/>)}
    <path d="M342 72l14 12-14 12 M537 165l-12 14-12-14 M368 253l-14 12 14 12 M173 184l12-14 12 14" fill="none" stroke={muted} strokeWidth="4"/>
    <g transform={`translate(${x} ${y})`}><circle r="31" fill={blue} stroke="white" strokeWidth="4"/><path d="m0-18 14 21H6v12H-6V3h-8Z" fill="white"/></g>
    {split(680)}
    {type('AFTER '+step+(step===1?' MOVE':' MOVES'),755,84,26,muted,'start')}
    {type(corners[step],755,154,50,ink,'start')}
    {Array.from({length:5},(_,i)=><circle key={i} cx={785+i*70} cy="227" r="20" fill={i<=step?coral:'none'} stroke={i<=step?coral:'#b6c3af'} strokeWidth="3"/>)}
    {type((step+1)+(step===0?' dot':' dots'),755,301,30,ink,'start')}
  </>);
}
function tapComparison(t:number,at:Timings){
  const rows=[
    {label:'Both taps',n:5,mark:at('fill five tubs',.43),colour:blue},
    {label:'Tap A',n:3,mark:at('fill three',.55),colour:mint},
    {label:'Tap B',n:2,mark:at('leaves two tubs',.68),colour:coral},
  ];
  return paperFrame(<>
    {type('SAME SIXTY MINUTES',55,82,29,muted,'start')}{type('How many tubs?',55,153,52,ink,'start')}
    {type('Both together: 1 tub per 12 min',55,218,28,ink,'start')}{type('Tap A alone: 1 tub per 20 min',55,268,28,ink,'start')}{split(595)}
    {rows.map((r,i)=><g key={r.label}>{type(r.label,775,80+i*99,31,ink,'end')}
      {Array.from({length:r.n},(_,j)=>{const x=825+j*122,y=40+i*99,p=smooth(norm(t,r.mark+j*.09,.45));return <g key={j}>
        <path d={`M${x} ${y}l8 63h80l8-63`} stroke="#9aafa6" strokeWidth="3" fill="none"/>
        <rect x={x+12} y={y+58-47*p} width="72" height={47*p} rx="4" fill={r.colour}/>
      </g>})}</g>)}
  </>);
}

function ratioParts(scene:Scene,t:number,at:Timings){
  if(scene.id.endsWith('worked')){
    const one=norm(t,at('one part equals four',.40),.6);
    const result=norm(t,at('twelve blue counters',.57),.6);
    return paperFrame(<>
      {type('2 red parts',261,112,36,ink,'end')}{type('3 blue parts',261,253,36,ink,'end')}
      {[2,3].map((count,row)=><g key={row}>{Array.from({length:count},(_,j)=>{
        const x=342+j*265,y=46+row*142,colour=row===0?coral:blue;
        return <g key={j}><rect x={x} y={y} width="233" height="104" rx="17" fill="none" stroke={colour} strokeWidth="3"/>
          {Array.from({length:4},(_,k)=><circle key={k} opacity={row===0?1:one} cx={x+43+k*49} cy={y+52} r="17" fill={colour}/>)}</g>;
      })}</g>)}
      {split(1160)}{type('8 red',1340,115,42,coral)}
      <g opacity={result}>{type('12 blue',1340,257,42,blue)}</g>
    </>);
  }
  const reveal=norm(t,at('first fraction covers fifteen',.44),.65);
  const reveal2=norm(t,at('second fraction covers fourteen',.58),.65);
  return paperFrame(<>
    {type('Two equal wholes, each split into 24',800,60,34)}
    {[[15,'5/8',mint,reveal],[14,'7/12',blue,reveal2]].map(([n,title,c,progress],i)=><g key={i}>
      {type(String(title),180,152+i*108,41)}
      {Array.from({length:24},(_,j)=><rect key={j} x={307+j*41} y={107+i*108} width="39" height="64" rx="3"
        fill={j<Number(n)?String(c):paper} fillOpacity={j<Number(n)?Number(progress):1} stroke={muted} strokeWidth="1.8"/>)}
      <g opacity={Number(progress)}>{type(String(n)+'/24',1420,152+i*108,36)}</g>
    </g>)}
  </>);
}

function overlap(scene:Scene,t:number,at:Timings){
  const v=scene.display.visual!;
  const practice=scene.id.endsWith('reveal');
  const milestones=practice?[at('four counted twice',.35),at('separate regions',.58),at('separate regions',.58),at('three in neither',.45)]
    :[at('put seven',.32),at('tennis has eleven',.42),at('soccer has eight',.50),at('five play no sport',.23)];
  const values=[v.both,v.a,v.b,v.neither], coords=[[606,205],[407,205],[798,205],[1090,205]];
  return paperFrame(<>
    <rect x="125" y="25" width="1350" height="309" rx="16" fill="none" stroke="#a8b9a8" strokeWidth="2"/>
    <ellipse cx="508" cy="183" rx="202" ry="119" fill={mint} fillOpacity=".20" stroke={mint} strokeWidth="3"/>
    <ellipse cx="704" cy="183" rx="202" ry="119" fill={blue} fillOpacity=".20" stroke={blue} strokeWidth="3"/>
    {type(v.left,410,61,26,muted)}{type(v.right,803,61,26,muted)}{type('Neither',1090,138,30,muted)}
    {values.map((v,i)=><g key={i} opacity={norm(t,milestones[i],.55)}>{type(v,coords[i][0],coords[i][1],56)}</g>)}
  </>);
}
const groups = [{n:2,start:10,end:13},{n:3,start:11,end:14},{n:4,start:13,end:16}];
function timeWindow(scene:Scene,t:number,at:Timings){
  const prediction=scene.kind==='quiz', original=scene.id.endsWith('worked');
  const target=original?12.5:14.5, X=(h:number)=>360+(h-10)*174;
  const show=original?norm(t,at('mark half past twelve',.63),.6):1;
  const prove=prediction?0:original?norm(t,at('first two groups',.71),.7):norm(t,at('first two windows',.2),.7);
  const timeLabel=original?'12:30':'14:30';
  return paperFrame(<>
    {[10,11,12,13,14,15,16].map(h=><g key={h}><line x1={X(h)} y1="59" x2={X(h)} y2="302" stroke="#d1dac8" strokeWidth="2"/>
      {type(String(h).padStart(2,'0')+':00',X(h),331,23,muted)}</g>)}
    {groups.map((g,i)=>{const y=108+i*76,eligible=g.start<=target&&target<g.end;
      return <g key={g.start}>{type(g.n+' visitors',250,y+9,30,ink,'end')}
        <line x1={X(g.start)} y1={y} x2={X(g.end)} y2={y} stroke={blue} strokeWidth="11" strokeLinecap="round"/>
        <circle cx={X(g.start)} cy={y} r="8" fill={blue}/><circle cx={X(g.end)} cy={y} r="10" fill={paper} stroke={blue} strokeWidth="4"/>
        {eligible&&<circle opacity={prove} cx={X(target)} cy={y} r="14" fill={mint} stroke="white" strokeWidth="4"/>}
      </g>;})}
    <g opacity={show}><line x1={X(target)} y1="63" x2={X(target)} y2="294" stroke={coral} strokeWidth="3" strokeDasharray="7 8"/>
      <rect x={X(target)-52} y="22" width="104" height="39" rx="10" fill={ink}/>{type(timeLabel,X(target),50,25,'white')}</g>
  </>);
}
function dog(extra=false){
  const coat=extra?'#b97348':'#8c6b52';
  return <g><path d="m-19-3-8-12" stroke={coat} strokeWidth="6" strokeLinecap="round"/>
    {[-15,-8,9,16].map((x,i)=><path key={x} d={`M${x} 3v${i%2?17:14}`} stroke={i%2?coat:'#674f43'} strokeWidth="5" strokeLinecap="round"/>)}
    <ellipse cy="-1" rx="22" ry="11" fill={coat}/><circle cx="18" cy="-15" r="11" fill={coat}/>
    <path d="m13-23-5-6-1 14Z" fill="#654a3a"/><path d="m23-16 13 3q0 6-12 5Z" fill={coat}/><circle cx="24" cy="-18" r="1.7" fill={ink}/>
  </g>;
}
function dogOwners(t:number,at:Timings){
  const one=norm(t,at('give each person one dog',.61),.65);
  const extra=norm(t,at('three people have a second dog',.78),.75);
  return paperFrame(<>
    {type('8 people · each brings 1 or 2 dogs',800,60,34)}
    {Array.from({length:8},(_,i)=>{const x=187+i*173;return <g key={i} transform={`translate(${x} 123)`}>
      <circle r="18" cy="-9" fill="#af876e"/><path d="M-22 45q1-43 22-43t22 43Z" fill={i%2?blue:mint}/>
      <path d="M-11 44v40m22-40v40" stroke={ink} strokeWidth="9" strokeLinecap="round"/>
      <g opacity={one} transform="translate(-17 133)">{dog()}</g>
      {i<3&&<g opacity={extra} transform="translate(39 111) scale(.84)">{dog(true)}</g>}
    </g>;})}
    <g opacity={extra}>{type('3 bring two dogs',361,324,31,coral)}{type('5 bring one dog',1055,324,31,muted)}</g>
  </>);
}
const piePalette=[mint,blue,coral];
function point(cx:number,cy:number,r:number,angle:number){const a=angle*Math.PI/180;return [cx+r*Math.sin(a),cy-r*Math.cos(a)];}
function sector(cx:number,cy:number,r:number,a:number,b:number){const [sx,sy]=point(cx,cy,r,a),[ex,ey]=point(cx,cy,r,b);return `M${cx} ${cy}L${sx} ${sy}A${r} ${r} 0 ${b-a>180?1:0} 1 ${ex} ${ey}Z`;}
function pie(cx:number,values:number[],radius:number,glow=-1){
  const total=values.reduce((a,b)=>a+b,0);let angle=0;
  return <>{values.map((n,i)=>{const next=angle+n/total*360;const d=sector(cx,174,radius,angle,next);angle=next;
    return <path key={i} d={d} fill={piePalette[i]} fillOpacity={glow<0||glow===i?1:.48} stroke={paper} strokeWidth="3"/>;})}</>;
}
function chartPie(scene:Scene,t:number,at:Timings){
  const worked=scene.id.endsWith('worked'), quiz=scene.kind==='quiz';
  if(worked){
    const shown=norm(t,at('make a second chart',.44),.65);
    return paperFrame(<>
      {pie(335,[12,8,4],105)}<g opacity={shown}>{pie(902,[12,8],105)}</g>
      {type('All 24 people',335,321,30)}<g opacity={shown}>{type('20 in tennis or swimming',902,321,30)}</g>
      <path d="M530 174h175m-20-14 20 14-20 14" fill="none" stroke={muted} strokeWidth="4" opacity={shown}/>
      {split(1160)}
      {['12 tennis','8 swimming','4 running'].map((v,i)=><g key={v}><circle cx="1222" cy={93+i*68} r="13" fill={piePalette[i]}/>{type(v,1255,103+i*68,27,ink,'start')}</g>)}
    </>);
  }
  const show=quiz?0:norm(t,at('two fifths',.17),.7), angle=quiz?0:norm(t,at('one hundred and forty',.58),.7);
  return paperFrame(<>
    {type('Tennis and swimming only',67,91,41,ink,'start')}{type('12 tennis players',70,167,32,mint,'start')}{type('8 swimmers',70,218,32,blue,'start')}
    {type('One full turn = 360°',70,284,28,muted,'start')}{split(675)}
    <circle cx="950" cy="174" r="115" fill="none" stroke={muted} strokeWidth="3"/>
    {!quiz&&<g opacity={show}>{pie(950,[12,8],115,1)}</g>}
    <g opacity={angle}>{type('2/5 of 360°',1270,155,38)}{type('144°',1270,221,53,blue)}</g>
    {quiz&&type('Swimming slice?',1280,190,32)}
  </>);
}
export function U789Mechanism({scene}:{scene:Scene;palette?:Palette}) {
  const frame=useCurrentFrame(), {fps}=useVideoConfig(), t=frame/fps;
  const Film=workedFilms[scene.id];
  if(Film)return <Film {...sceneShot(scene,frame,fps)}/>;
  const at:Timings=(phrase,fraction)=>cue(scene,phrase,fraction,fps);
  let body:ReactNode;
  if(scene.id.includes('-p3-'))body=colouredCycle(scene,t,at);
  else if(scene.id.includes('-p4-'))body=segmentDisplay(scene,t,at);
  else if(scene.id.includes('-p5-'))body=cornerBoard(t,at);
  else if(scene.id.includes('-q2-'))body=tapComparison(t,at);
  else if(scene.id.includes('-q3-'))body=ratioParts(scene,t,at);
  else if(scene.id.includes('-q7-'))body=overlap(scene,t,at);
  else if(scene.id.includes('-q8-'))body=timeWindow(scene,t,at);
  else if(scene.id.includes('-x3-'))body=dogOwners(t,at);
  else body=chartPie(scene,t,at);
  return <svg role="img" aria-label={scene.title} viewBox="0 0 1600 360" width="100%" height="100%" style={{display:'block',fontFamily:'inherit',background:'transparent',color:cream}}>{body}</svg>;
}
