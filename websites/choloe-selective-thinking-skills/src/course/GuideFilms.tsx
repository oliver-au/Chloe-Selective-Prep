import type {ReactNode} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import type {Scene} from './types';
import refDurationsData from './ref-durations.json';
const refDurations: Record<string, number> = refDurationsData;

const ink='#243e42', faded='#546b65', teal='#347b74', rust='#a74f37', ochre='#d59b49', paper='#fff5dc';
const curve=(t:number,a:number,b:number)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const shift=(a:number,b:number,p:number)=>a+(b-a)*p;
function Label({x,y,children,size=37,fill=ink,weight=650,anchor='start'}:{x:number;y:number;children:ReactNode;size?:number;fill?:string;weight?:number;anchor?:'start'|'middle'|'end'}){
 return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill}>{children}</text>;
}
function Pencil({x,y,tilt=-28}:{x:number;y:number;tilt?:number}){
 return <g transform={`translate(${x} ${y}) rotate(${tilt})`}><path d="m5 7 142 -1 0 15 -142 1 -18 -8z" fill="#544d3b" opacity=".16"/><path d="M0 -9H139V9H0L-21 0Z" fill="#e6a752" stroke="#8a6839" strokeWidth="2"/><path d="M0 -9H139V-4H0Z" fill="#f6cd82"/><path d="m0 -9 -21 9 21 9z" fill="#e9cd9e"/><path d="m-15 -3 -6 3 6 3z" fill={ink}/><path d="M122 -9h10v18h-10z" fill="#a8b7ac"/><path d="M132 -9h11q6 0 6 6v6q0 6-6 6h-11z" fill="#ba7765"/></g>;
}
function Stroke({d,p,color=teal,width=7}:{d:string;p:number;color?:string;width?:number}){
 return <path d={d} pathLength="1" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset={1-p} opacity={p>0?1:0}/>;
}
function Chip({x,y,value,color=teal,scale=1}:{x:number;y:number;value:string;color?:string;scale?:number}){
 return <g transform={`translate(${x} ${y}) scale(${scale})`}><ellipse cx="3" cy="10" rx="63" ry="55" fill="#5b5944" opacity=".19"/><circle r="56" cy="5" fill="#6c6654"/><circle r="56" fill={color}/><circle r="49" fill="none" stroke="#fff5d3" strokeWidth="2" opacity=".56"/>{value==='☀'?<g stroke="#fff0b5" strokeWidth="5" strokeLinecap="round"><circle r="17" fill="#fff0b5"/>{Array.from({length:8},(_,i)=><path key={i} d="M0-28v-8" transform={`rotate(${i*45})`}/>)}</g>:value==='❧'?<g transform="rotate(-28)"><path d="M-22 21Q-43-13 29-32Q44 14-22 21Z" fill="#d1e5ae"/><path d="M-30 29Q-14 7 22-22m-32 26 1-17m10 10 16 1" fill="none" stroke="#386f57" strokeWidth="4"/></g>:<Label x={0} y={12} size={38} weight={790} fill="#fff7df" anchor="middle">{value}</Label>}</g>;
}
function Desk({children}:{children:ReactNode}){
 return <svg viewBox="0 0 1600 550" width="100%" height="100%" style={{display:'block',fontFamily:'Manrope Variable,Arial,sans-serif'}} aria-label="Animated guide demonstration">
 <defs><linearGradient id="deskwood" x2="0.95" y2=".35" gradientUnits="objectBoundingBox"><stop stopColor="#996e48"/><stop offset=".56" stopColor="#c79c6a"/><stop offset="1" stopColor="#936f4b"/></linearGradient><linearGradient id="deskpaper" x2=".88" y2="1"><stop stopColor="#fff6db"/><stop offset=".7" stopColor="#f3e8c8"/><stop offset="1" stopColor="#deccaa"/></linearGradient><pattern id="grain" width="285" height="39" patternUnits="userSpaceOnUse"><path d="M-60 31C-4 13 28 26 80 20s86-12 211-7M-19 37c65-18 88-9 134-15" fill="none" stroke="#744c32" strokeWidth="1.7" opacity=".24"/></pattern><pattern id="dots" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="1.5" fill="#657a70" opacity=".23"/></pattern></defs>
 <rect width="1600" height="550" rx="23" fill="url(#deskwood)"/><rect width="1600" height="550" rx="23" fill="url(#grain)"/>
 <path d="m60 47 1488-12 10 485L53 528Z" fill="#5d4938" opacity=".42"/><path d="m44 30 1501-8 5 481-1500 11Z" fill="#dfceac"/><path d="m47 24 1497-7 1 479-1497 12Z" fill="url(#deskpaper)"/><path d="M88 25v480" stroke="#bd8b76" strokeWidth="2" opacity=".45"/><rect x="104" y="36" width="1411" height="452" fill="url(#dots)"/>
 {children}</svg>;
}
function SheetTitle({title,caption}:{title:string;caption?:string}){
 return <><Label x={125} y={109} size={54} weight={780}>{title}</Label>{caption&&<Label x={128} y={169} size={33} fill={faded}>{caption}</Label>}</>;
}
function Race({positions,draw=1,names=['A','B']}:{positions:[number,number];draw?:number;names?:string[]}){
 return <g><Stroke d="M260 341H1318" p={draw} width={6} color="#727f73"/>{[360,800,1240].map((x,i)=><g key={x} opacity={draw}><path d={`M${x} 319v46`} stroke={faded} strokeWidth="5"/><Label x={x} y={408} anchor="middle" size={28} fill={faded}>{i+1}</Label></g>)}
 <Chip x={positions[0]} y={267} value={names[0]}/><Chip x={positions[1]} y={267} value={names[1]} color={rust}/></g>;
}
function RaceGuide({id,t}:{id:string;t:number}){
 const signal=id==='start-signal',parent=id==='end-parent-prompts', routine=id==='start-msdp';
 const close=signal?curve(t,17.85,19.3):parent?curve(t,11.9,13.6):0;
 const p=curve(t,routine?4.3:parent?2.6:1,routine?6:parent?4.6:2.7);
 const bx=shift(1090,1240,p)-440*close;
 const practice=signal&&t>=17.85?'New race clue · Ari finishes immediately before Bo.':'Race clue · Ari finishes before Bo.';
 const legend=signal?(t<8?'Must · Ari is earlier than Bo.':t<11.8?'Could · A runner can fit in the middle.':t<15.6?'Cannot · Bo cannot be earlier than Ari.':t<17.85?'Before · A gap is allowed.':'Immediately before · No gap is allowed.'):
 parent?(t<10?'Try a legal finish.':t<18?'A second legal finish · the same rule holds.':'One complete arrangement shows what could happen.'):
 (t<8.9?'Sketch three finishing places.':t<13.2?'Find the order that the clue guarantees.':'Point from the earlier runner to the later runner.');
 return <><SheetTitle title={signal?'How strong is the clue?':parent?'Try to break the claim':'One clue on the workbench'} caption={practice}/><Race positions={[shift(250,360,p),bx]} draw={p}/><Stroke d={`M430 243Q${(430+bx-68)/2} 172 ${bx-67} 242l-21-16m21 16-26 4`} p={curve(t,routine?13.2:parent?4.8:2.8,routine?14.6:parent?6.6:4.3)}/><Label x={132} y={465} size={33} fill={teal}>{legend}</Label></>;
}
function PuzzleBench({t,id}:{t:number;id:string}){
 const next=id==='end-next',ladder=id==='start-ladder';
 const start=next?6.4:ladder?8.8:11.35;
 const p=curve(t,start,start+1.8),q=curve(t,next?9.4:ladder?11.6:14.2,next?11.2:ladder?13.4:15.8);
 const z=curve(t,next?17.2:ladder?16.5:18.2,next?19.0:ladder?18:20);
 const title=next?'Can you prove your choice?':ladder?'Find the same idea in a new story':'A puzzle to try on paper';
 return <><SheetTitle title={title} caption="The sun token comes before the leaf token."/>
 <g transform="translate(190 202)"><rect width="890" height="154" rx="12" fill="#d3cbb3" stroke="#8c9182" strokeWidth="3"/>{[0,1,2].map(i=><rect key={i} x={15+i*290} y="14" width="279" height="125" rx="9" fill="#e9e0c4" stroke="#a4a18f" strokeDasharray="8 7"/>)}
 <Chip x={shift(135,153,p)} y={shift(60,78,p)} value="☀" color="#b37737"/><Chip x={shift(420,731,p)} y={shift(60,78,p)} value="❧" color={teal}/>
 <Stroke d="M234 85Q423 25 634 82l-18-16m18 16-22 3" p={q}/></g>
 <g transform={`translate(${shift(1430,1225,z)} 206) rotate(${shift(12,-4,z)})`} opacity={z}><rect x="5" y="7" width="190" height="152" rx="9" fill="#6a695a" opacity=".3"/><rect width="190" height="152" rx="7" fill={paper} stroke="#a59878"/><path d="M0 10q0-10 10-10h170q10 0 10 10v38H0Z" fill={teal}/><Label x={95} y={33} size={23} anchor="middle" fill={paper}>{ladder?'TRANSFER':'NEXT TRY'}</Label>{ladder?<><Label x={95} y={94} size={30} anchor="middle">Red train</Label><Label x={95} y={130} size={24} anchor="middle">before blue</Label></>:<Label x={95} y={105} size={33} anchor="middle">Tomorrow</Label>}</g>
 <Label x={135} y={455} size={35} fill={teal}>{z>.65?(ladder?'Change the story. Keep the relationship.':'Try a fresh puzzle from memory.'):q>.6?'The sun is earlier. There can be a gap.':'Where can the two tokens go?'}</Label>
 <g opacity={1-z}><Pencil x={shift(1200,1033,q)} y={shift(399,343,q)}/></g></>;
}
function Tool({index,p}:{index:number;p:number}){
 const color=index%2?rust:teal;
 if(index===0)return <><Chip x={-121} y={0} value="A" scale={.78}/><Chip x={121} y={0} value="B" color={rust} scale={.78}/><Stroke d="M-62 0H62l-20-14m20 14-20 14" p={p}/></>;
 if(index===1)return <><Stroke d="M-143 14h286m-255-22v43m113-43v43m113-43v43" p={p} color={color}/><Chip x={shift(-126,-112,p)} y={-36} value="1" scale={.54}/></>;
 if(index===2)return <><path d="M-72 -66h144v132H-72Zm72 0V66m-72-66H72" fill="none" stroke={faded} strokeWidth="4"/><Stroke d="m-61-36 16 16 32-40" p={p}/></>;
 if(index===3)return <><circle cx="-39" r="69" fill="#93c0b0" fillOpacity=".72" stroke={teal} strokeWidth="4"/><circle cx="39" r="69" fill="#edb490" fillOpacity=".6" stroke={rust} strokeWidth="4"/><circle r="12" fill={ink} opacity={p}/></>;
 return <g transform={`rotate(${90*p})`}><rect x="-68" y="-68" width="136" height="136" rx="6" fill="#d9ad72" stroke="#846149" strokeWidth="4"/><circle cx="-41" cy="-41" r="12" fill={ink}/></g>;
}
function Toolkit({t}:{t:number}){
 const times=[3.15,5.3,8.65,12.15,15.85],captions=['Rule','Order','Match','Overlap','Turn'];
 return <><SheetTitle title="What should I draw?" caption="Choose the smallest picture that keeps the important clue."/>
 {times.map((a,i)=>{const p=curve(t,a,a+1.1);return <g key={a} transform={`translate(${249+i*273} 303)`} opacity={.16+.84*p}><g transform="scale(.85)"><Tool index={i} p={p}/></g><Label x={0} y={139} size={32} fill={t>=a?ink:faded} anchor="middle">{captions[i]}</Label></g>;})}</>;
}
function Format({t}:{t:number}){
 const a=curve(t,6.8,8.3),b=curve(t,10.6,12.1),c=curve(t,14.9,16.7);
 return <><SheetTitle title="Thinking Skills on test day" caption="2027 placement test · Year 7 entry in 2028"/>
 <g transform="translate(165 195)"><path d="M14 0h690q14 0 14 14v197H0V14Q0 0 14 0Z" fill={ink}/><rect x="16" y="16" width="686" height="174" rx="5" fill="#d8e5d6"/><path d="M-43 211h806l-42 21H-10Z" fill="#8c9484"/>
 {Array.from({length:40},(_,i)=><rect key={i} x={38+i%10*64} y={31+Math.floor(i/10)*36} width="45" height="22" rx="4" fill={i<Math.round(a*40)?teal:'#c0cdbd'}/>)}</g>
 <Label x={957} y={253} size={47} fill={teal}>{a>.92?'40 questions':'Thinking Skills'}</Label><Label x={957} y={323} size={47} fill={rust}>{b>.92?'40 minutes':''}</Label><g opacity={c}><Label x={957} y={394} size={30}>About one minute each</Label><Label x={957} y={434} size={30}>on average.</Label></g></>;
}
function Diagnosis({t}:{t:number}){
 const p=curve(t,8.6,10.2),q=curve(t,12.0,13.7);
 return <><SheetTitle title="Count each pupil once" caption="Lee joined both clubs. Where does Lee belong?"/>
 <ellipse cx="535" cy="331" rx="270" ry="119" fill="#bfdac3" stroke={teal} strokeWidth="5"/><ellipse cx="891" cy="331" rx="270" ry="119" fill="#dfbc98" fillOpacity=".66" stroke={rust} strokeWidth="5"/>
 <Label x={373} y={286} size={30}>Art</Label><Label x={1000} y={286} size={30}>Choir</Label>
 <Chip x={shift(482,713,p)} y={335} value="Lee" scale={.81}/><g opacity={1-p}><Chip x={shift(940,713,p)} y={335} value="Lee" color={rust} scale={.81}/></g>
 <g opacity={q}><Stroke d="M833 348q180 68 358 19" p={q}/><Label x={1222} y={360} size={33}>One pupil</Label><Label x={1222} y={404} size={30} fill={faded}>Two clubs</Label></g></>;
}
function Transfer({t}:{t:number}){
 const p=curve(t,4.6,6.2),q=curve(t,8.1,9.4),r=curve(t,12.3,13.7),v=curve(t,15.0,16.5);
 return <><SheetTitle title="Keep the word that changes the rule"/>
 <Label x={175} y={194} size={43}>On race day, Ari finished immediately before Bo.</Label>
 <Stroke d="M679 207H1075" p={p} color={ochre}/><Label x={176} y={291} size={38} fill={teal}>{q>.6?'Keep “immediately before”.':''}</Label>
 <g opacity={r}><Chip x={shift(544,685,v)} y={388} value="A" scale={.69}/><Chip x={shift(1070,815,v)} y={388} value="B" color={rust} scale={.69}/><path d="M635 443h229" stroke={teal} strokeWidth="5"/><Label x={927} y={407} size={32} fill={faded}>{v>.8?'No runner between them.':''}</Label></g></>;
}
function Journal({t}:{t:number}){
 const times=[.5,4.35,8.5,13.8],titles=['With help','New puzzle','Mix & time','A week later'];
 return <><SheetTitle title="What can she do from memory?" caption="Keep a dated note of the question and the reason she gave."/>
 <path d="M254 318H1349" fill="none" stroke="#c4bba0" strokeWidth="10" strokeLinecap="round"/>{times.map((start,i)=>{const p=curve(t,start,start+1.35),x=255+i*357;return <g key={start}><circle cx={x} cy="318" r="20" fill={p>.7?teal:'#bdbba4'}/><g opacity={p} transform={`translate(0 ${(1-p)*27})`}><Label x={x} y={255} anchor="middle" size={36}>{titles[i]}</Label><Stroke d={`m${x-17} 380 12 12 27-36`} p={p}/></g></g>;})}<Label x={133} y={459} size={31} fill={faded}>Record the explanation as well as the answer.</Label></>;
}
function MapLimits({t}:{t:number}){
 const p=curve(t,2.55,4.1),q=curve(t,5.8,7.05),r=curve(t,10.3,12.0);
 return <><SheetTitle title="What does this map tell us?" caption="Only the connections are given."/>
 <g transform="translate(165 207)"><path d="m2 13 346-18 350 29 327-25 5 195-328 19-353-30-339 17z" fill="#d4dcc0" stroke="#a4af93" strokeWidth="3"/>
 <Stroke d="M116 125 467 34 888 151" p={p} color={teal} width={9}/><Stroke d="M116 125 488 159 888 151" p={p} color={rust} width={8}/>{[[116,125,'Pool'],[467,34,'Park'],[488,159,'Bridge'],[888,151,'Hall']].map(([x,y,name])=><g transform={`translate(${x} ${y})`} key={name}><circle r="13" fill={rust}/><Label x={name==='Pool'?-17:15} y={name==='Bridge'?36:-17} size={29} anchor={name==='Pool'?'end':'start'}>{name}</Label></g>)}</g>
 <g opacity={q} transform={`translate(${shift(1138,1060,r)} ${shift(327,399,r)}) rotate(-16)`}><rect width="314" height="50" rx="5" fill="#d5ad65" stroke="#8f733f" strokeWidth="2"/>{Array.from({length:23},(_,i)=><path key={i} d={`M${11+i*13} 0v${i%5?12:23}`} stroke={ink} strokeWidth="2"/>)}</g><Label x={138} y={466} size={33} fill={teal}>{r>.7?'Connected? Yes. Shortest distance? We need lengths.':'Trace the connections from one place to the next.'}</Label></>;
}
export function GuideFilm({scene}:{scene:Scene}){
 const {fps}=useVideoConfig();
 const rawT=useCurrentFrame()/fps;
 const actualSec=(scene.audioFrames||1)/fps;
 const refSec=refDurations[scene.id]??actualSec;
 const scale=Math.max(0.65,Math.min(1.55,refSec/Math.max(1,actualSec)));
 const t=Math.min(refSec+1.5,rawT*scale);
 let shot:ReactNode;
 switch(scene.id){
 case 'start-welcome':case 'start-ladder':case 'end-next': shot=<PuzzleBench t={t} id={scene.id}/>;break;
 case 'start-msdp':case 'start-signal':case 'end-parent-prompts':shot=<RaceGuide t={t} id={scene.id}/>;break;
 case 'start-toolkit':shot=<Toolkit t={t}/>;break;
 case 'start-format':shot=<Format t={t}/>;break;
 case 'end-diagnose':shot=<Diagnosis t={t}/>;break;
 case 'end-transfer':shot=<Transfer t={t}/>;break;
 case 'end-mastery':shot=<Journal t={t}/>;break;
 case 'end-boundaries':shot=<MapLimits t={t}/>;break;
 default:throw new Error('Unknown guide chapter '+scene.id);
 }
 return <Desk>{shot}</Desk>;
}
