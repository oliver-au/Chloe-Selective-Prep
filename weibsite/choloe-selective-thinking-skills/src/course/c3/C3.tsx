import type {CSSProperties, ReactNode, ComponentType} from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, Series, staticFile, useCurrentFrame} from 'remotion';
import '@fontsource-variable/manrope';
import tracks from './c3-audio.json';
import {Art, Band, cyan, gold, mint, paper, Pool, progress, Rover} from './Illustrations';

export const FPS=30;
const START=9;
type Clip = keyof typeof tracks;
type WordMark={word:string;startMs:number;endMs:number};
type TrackEntry=(typeof tracks)[Clip]&{words?:WordMark[]};
function cue(id:Clip,phrase:string){
 const tr=tracks[id] as TrackEntry;
 const norm=(s:string)=>s.toLowerCase().match(/[a-z0-9]+/g)??[];
 const wanted=norm(phrase);
 if(tr.words&&tr.words.length>=2&&wanted.length){
  const flat=tr.words.flatMap(w=>norm(w.word).map(tok=>({tok,ms:w.startMs})));
  const hit=flat.findIndex((_,i)=>wanted.every((w,j)=>flat[i+j]?.tok===w));
  if(hit>=0)return START/FPS + flat[hit].ms/1000;
 }
 const caption=tr.captions.find(c=>c.text.startsWith(phrase))??tr.captions.find(c=>c.text.toLowerCase().includes(phrase.toLowerCase()));
 if(!caption)throw new Error(`Missing phrase in ${id}: ${phrase}`);
 return START/FPS + caption.startMs/1000;
}
type Beat={id:Clip;name:string;pause?:number;View:ComponentType};
const frameStyle:CSSProperties={position:'absolute',left:110,top:288,width:1700,height:505};
const floating=(left:number,top:number,width:number,height?:number):CSSProperties=>({position:'absolute',left,top,width,height});
const small:CSSProperties={fontSize:27,fontWeight:750,letterSpacing:3,textTransform:'uppercase',color:cyan};
const h2:CSSProperties={fontSize:62,fontWeight:750,letterSpacing:-2.5,lineHeight:1.14,margin:0};
const useTime=()=>useCurrentFrame()/FPS;
const optionsEx=['Both photos are on display.','Ada’s photo is on display.','The artist of the displayed photo gave consent.','Leo’s photo is on display.'];
const optionsRv=['Every powered rover sends a signal.','It had power when it sent the signal.','It still has power now.','Its solar panels supplied the power.'];

function Board({children}:{children:ReactNode}){return <div style={frameStyle}>{children}</div>;}
function Paper({children,style}:{children:ReactNode;style?:CSSProperties}) {return <div style={{background:paper,color:'#24363a',borderRadius:16,padding:'32px 38px',boxSizing:'border-box',...style}}>{children}</div>;}
function Heading({children, wideShot=false}:{children:ReactNode;wideShot?:boolean}) {return <h1 style={{...floating(110,wideShot ? 110 : 145,1710),margin:0,fontWeight:770,fontSize:wideShot ? 69 : 78,letterSpacing:-3.8,lineHeight:1.08}}>{children}</h1>;}
function Tag({children}:{children:ReactNode}) {return <div style={small}>{children}</div>;}
function RuleSign(){return <Paper style={{fontSize:43,lineHeight:1.28,fontWeight:650}}><div style={{...small,color:'#546961',marginBottom:15}}>Pool rule</div>Only students wearing wristbands may enter.</Paper>;}
function Chip({children}:{children:ReactNode}){return <div style={{display:'inline-block',padding:'12px 23px',border:'2px solid #496169',borderRadius:99,fontSize:31,color:cyan,fontWeight:650}}>{children}</div>;}
function Arrow({left,right,sub='requires'}:{left:string;right:string;sub?:string}){
 return <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:48,fontSize:50,fontWeight:730,letterSpacing:-1.7}}>
 <span>{left}</span><span style={{color:gold,display:'grid',textAlign:'center'}}><span style={{fontSize:25,letterSpacing:1.4}}>{sub}</span><span style={{lineHeight:0.8}}>⟶</span></span><span style={{color:mint}}>{right}</span></div>;
}
const lerp = (a: number, b: number, amount: number) => a + (b - a) * amount;
const strideLength = 46 / .57;
const fullShot = {left: 205, top: 206, width: 1510};
const signShot = {left: 110, top: 305, width: 1060};
const comparisonShot = {left: 110, top: 316, width: 815};
type CameraFrame = typeof fullShot;

function cameraFrame(a: CameraFrame, b: CameraFrame, amount: number): CSSProperties {
 return {
  position: 'absolute',
  left: lerp(a.left,b.left,amount),
  top: lerp(a.top,b.top,amount),
  width: lerp(a.width,b.width,amount),
  aspectRatio: '9 / 4',
  overflow: 'hidden',
  borderRadius: 12,
  boxShadow: '0 10px 36px #03141850',
 };
}

// Integrate a speed curve so screen travel and the character's planted foot agree.
function crossTheGate(time: number, walkStart: number, walkDuration: number) {
 const duration = Math.max(2.6, Math.min(4.8, walkDuration));
 const elapsed = Math.max(0, Math.min(duration, time - walkStart));
 const ramp = Math.min(0.43, duration * 0.14);
 const topSpeed = 330 / (duration - ramp);
 const stopping = duration - elapsed;
 let distance = topSpeed * (elapsed - ramp / 2);
 if (elapsed < ramp) distance = topSpeed * elapsed * elapsed / (2 * ramp);
 if (stopping < ramp) distance = 330 - topSpeed * stopping * stopping / (2 * ramp);
 const speed = Math.min(1, elapsed / ramp, stopping / ramp);
 return {x: 280 + distance, phase: distance / strideLength + .21, walk: speed};
}

function PoolStage({mode}: {mode:'hook'|'predict'|'cross'}) {
 const t = useTime();
 const isPredict = mode === 'predict';
 const isCross = mode === 'cross';
 const change = progress(t, 0, .82);
 const frame = isPredict ? cameraFrame(fullShot, signShot, change)
  : isCross ? cameraFrame(signShot, fullShot, change) : cameraFrame(fullShot, fullShot, 0);
 const crossStart = cue('c3-cross', 'In one possible story');
 const crossEnd = START / FPS + tracks['c3-cross'].duration;
 const gait = isCross ? crossTheGate(t, crossStart, crossEnd - crossStart - 0.15) : {x: 280, phase: 0, walk: 0};
 const gesture = isCross ? .8 * (1 - progress(t, .32, Math.max(1.1, crossStart)))
  : isPredict ? .8 : .15 + .65 * progress(t,.18,1.55);
 const predictHold = START / FPS + tracks['c3-predict'].duration;
 const shotTime = isPredict ? Math.min(t, predictHold) + 6.1 : t;
 return <>
  <Heading wideShot>{isCross ? 'One possible afternoon' : 'Did Nina go through the gate?'}</Heading>
  <div style={frame}>
   <Pool {...gait} gesture={gesture} time={shotTime} camera={mode === 'hook' ? .72 * (1-progress(t,1.4,4.7)) : 0}/>
  </div>
  {isPredict && <div style={{...floating(1235,322,570),opacity:change,transform:`translateX(${(1-change)*65}px)`}}>
   <RuleSign/>
   <div style={{display:'flex',gap:18,marginTop:32}}><Chip>Must have</Chip><Chip>Can’t tell</Chip></div>
  </div>}
 </>;
}
const Hook = () => <PoolStage mode="hook"/>;
const Predict = () => <PoolStage mode="predict"/>;
const Cross = () => <PoolStage mode="cross"/>;

function Stay() {
 const t = useTime();
 const split = progress(t,0,.83);
 const second = progress(t,.50,1.20);
 const captionAt = 711;
 const labelStyle = (left: number, alpha: number): CSSProperties => ({
  ...floating(left,captionAt,815),opacity:alpha,fontSize:42,letterSpacing:-1,fontWeight:640,color:paper,
 });
 return <>
  <Heading wideShot>One wristband. Two possible stories.</Heading>
  <div style={cameraFrame(fullShot,comparisonShot,split)}><Pool x={610} time={t} gesture={.12}/></div>
  <div style={{...cameraFrame({left:994,top:316,width:815},{left:994,top:316,width:815},1),opacity:second,clipPath:`inset(0 ${(1-second)*100}% 0 0)`}}>
   <Pool x={280} time={t} gesture={.15+.6*progress(t,1.12,2.6)}/>
  </div>
  <div style={labelStyle(110,split)}>Nina goes inside.</div>
  <div style={labelStyle(994,second)}>Nina waits outside.</div>
 </>;
}
function Forward(){
 const t=useTime(), reveal=cue('c3-forward','A wristband.');return <><Heading>Nina entered and followed the rule.</Heading><Board>
 <div style={floating(0,25,885,403)}><Pool x={610} time={t} gesture={.12 + .7 * progress(t,reveal,reveal+.9)}/></div><div style={floating(952,36,742)}><Tag>At the moment she entered</Tag><h2 style={{...h2,marginTop:26,fontSize:55}}>What did she need?</h2>
 <div style={{opacity:progress(t,reveal,reveal+.4),marginTop:30}}><div style={{width:205,height:110}}><Band/></div><Arrow left="Entry" right="Wristband"/></div></div>
 </Board></>;
}
function Language(){
 const t=useTime();const active=t<cue('c3-language','A student may')?0:t<cue('c3-language','A student cannot')?1:2;
 const lines=['Only students wearing bands may enter.','A student may enter only if wearing a band.','A student cannot enter under the rule without wearing a band.'];
 return <><Heading>Three ways to say the same rule</Heading><Board>
 <div style={floating(0,4,1000)}>{lines.map((line,i)=><div key={line} style={{display:'flex',alignItems:'center',minHeight:115,marginBottom:12,padding:'0 28px',background:active===i?'#294045':'#1d2a30',borderLeft:'6px solid '+(active===i?gold:'#35474b'),fontSize:38,color:active===i?paper:'#bdc9c7',lineHeight:1.25}}>{line}</div>)}</div>
 <div style={floating(1058,2,622)}><Tag>For students at this pool</Tag><div style={{height:205}}><Band/></div><Arrow left="Entry" right="Band"/><div style={{marginTop:24,textAlign:'center',color:'#bacbc9',fontSize:32}}>result → requirement</div></div></Board></>;
}
function RoomDoor({search,ruled}:{search:number;ruled:number}){
 return <svg viewBox="0 0 475 450" width="100%" height="100%" role="img" aria-label="Room B and its permission record">
 <defs><linearGradient id="room-plaster" x2="1" y2=".7"><stop stopColor="#c4cdb6"/><stop offset=".72" stopColor="#84a098"/><stop offset="1" stopColor="#65857e"/></linearGradient><pattern id="room-grain" width="48" height="20" patternUnits="userSpaceOnUse"><path d="M2 6q12-2 23 0m7 8h10" fill="none" stroke="#9cbaa2" opacity=".26"/></pattern></defs>
 <rect x="2" y="2" width="471" height="442" rx="19" fill="url(#room-plaster)"/><path d="M3 337l471-28v113q0 22-22 22H23q-20 0-20-18Z" fill="#b9ab8b"/><path d="m3 341 471-30m-420 95 419-53m-109-28 92 116M241 330l48 114m-178-105-16 104" stroke="#928b77" opacity=".62" fill="none" strokeWidth="2"/>
 <path d="M37 46l218 9v275L37 344Z" fill="#496563"/><path d="M47 58l198 6v263L47 337Z" fill="#758e7f"/><path d="M57 67l177 6v245L57 327Z" fill="#5c7f76"/><path d="M57 67l177 6v245L57 327Z" fill="url(#room-grain)"/>
 <path d="M80 89l131 4v68l-131 2Z" fill="#dce1c5"/><text x="147" y="136" fill="#314b48" fontSize="25" fontWeight="750" textAnchor="middle">ROOM B</text>
 <path d="M83 186h124v109l-124 6Z" stroke="#41665e" strokeWidth="3" fill="none"/><circle cx="218" cy="221" r="8" fill="#dec28a" stroke="#7e7860" strokeWidth="2"/>
 <rect x="276" y="89" width="174" height="189" rx="7" fill="#7b6d56"/><rect x="285" y="99" width="156" height="165" rx="2" fill="#eee4c8"/><rect x="331" y="92" width="56" height="14" rx="3" fill="#48645c"/>
 <text x="363" y="139" fill="#354743" fontSize="16" fontWeight="800" textAnchor="middle">APPROVAL LOG</text><path d="M298 151h128m-128 34h128m-128 34h128" stroke="#c1b599" strokeWidth="2"/>
 <rect x={298} y={mixRoom(152,200,search)} width="127" height="20" fill="#e8b859" opacity={.42*search*(1-ruled)}/>
 <g opacity={ruled} transform={`translate(362 ${mixRoom(175,185,ruled)}) rotate(-6)`}><rect x="-66" y="-15" width="132" height="34" rx="3" fill="#f4ead2" stroke="#a15b43" strokeWidth="2.5"/><text x="0" y="8" fill="#9c543c" fontSize="14" fontWeight="750" textAnchor="middle">NO APPROVAL</text></g><path d="M92 361l153-11 56 24-178 17Z" fill="#6e7e6d" opacity=".32"/>
 </svg>;
}
const mixRoom=(a:number,b:number,n:number)=>a+(b-a)*n;
function Room(){
 const t=useTime(), search=progress(t,cue('c3-room','You may use'),cue('c3-room',"There's no approval.")), missing=cue('c3-room',"There's no approval."),reveal=cue('c3-room','That rules out');
 return <><Heading>What if the requirement is missing?</Heading><Board><div style={floating(20,0,475,450)}><RoomDoor search={search} ruled={progress(t,missing,missing+.7)}/></div>
 <div style={floating(540,-3,1125)}><Paper style={{fontSize:41,fontWeight:650}}>You may use Room B only if a teacher approves.</Paper>
 <div style={{margin:'32px 0',fontSize:39,color:gold,opacity:progress(t,missing,missing+.5)}}>Given · No teacher approval</div><div style={{opacity:progress(t,reveal,reveal+.48)}}><Arrow left="No approval" right="No permitted use" sub="implies"/><div style={{fontSize:31,color:'#b2c7c3',marginTop:28,opacity:progress(t,cue('c3-room','It tells us'),cue('c3-room','It tells us')+.5)}}>Whether anyone broke the rule is unknown.</div></div></div></Board></>;
}
function Question({rover=false,proof=false}:{rover?:boolean;proof?:boolean}){
 const t=useTime();const secondPhoto=proof&&!rover&&t>=cue('c3-exam-proof','Now try the other');const options=rover?optionsRv:optionsEx;const correct=rover?1:2;
 return <><Heading>{rover?'A message from the rover':'Two photos. One exhibition.'}</Heading><Board>
 <div style={floating(0,-15,758)}>
 <div style={{height:157,position:'relative'}}>{rover?<Rover lit={proof||t>=cue('c3-transfer','Mission Control')} battery={proof?'powered':'unknown'}/>:<Art swapped={secondPhoto}/>}
 {proof&&!rover&&<div style={{...floating(0,105,758),textAlign:'right',fontSize:24,color:mint}}>{secondPhoto?"Could be Leo’s":"Could be Ada’s"}</div>}
 </div>
 <Paper style={{fontSize:32,lineHeight:1.27,padding:'22px 28px'}}><b>{rover?'A rover cannot send a signal without power.':'A photo is displayed only if its artist gave consent.'}</b><div style={{height:12}}/>{rover?'Mission Control received a signal from this rover.':'Ada and Leo each submitted one photo. Exactly one is displayed.'}</Paper>
 <div style={{marginTop:19,textAlign:'center',fontSize:29,color:proof?mint:cyan,fontWeight:650}}>{proof?(rover?'Sending a signal → power at that moment':'Displayed photo → artist’s consent'):'Which statement must be true?'}</div></div>
 <div style={floating(810,2,875)}>{options.map((answer,i)=><div key={answer} style={{height:103,marginBottom:12,boxSizing:'border-box',borderRadius:10,border:'2px solid '+(proof&&correct===i?mint:'#44595e'),background:proof&&correct===i?'#253e38':'#18272c',display:'flex',alignItems:'center',gap:25,padding:'0 26px'}}>
 <span style={{color:proof&&correct===i?mint:cyan,fontWeight:800,fontSize:38}}>{String.fromCharCode(65+i)}</span><span style={{fontSize:36,lineHeight:1.17,fontWeight:620}}>{answer}</span></div>)}</div>
 </Board></>;
}
function Recap(){return <><Heading>What does this result need?</Heading><Board>
 <div style={floating(20,10,750,276)}><Pool x={610}/></div><div style={floating(920,-4,750,280)}><Rover lit/></div>
 <div style={floating(30,307,740)}><Arrow left="Entry" right="Band"/></div><div style={floating(907,307,765)}><Arrow left="Sending" right="Power"/></div>
 <div style={{...floating(0,435,1700),textAlign:'center',fontSize:39,color:gold,fontWeight:700}}>Point from result to requirement.</div>
 </Board></>;}
const Exam=()=><Question/>;const ExamProof=()=><Question proof/>;const Transfer=()=><Question rover/>;const TransferProof=()=><Question rover proof/>;
export const beats:Beat[]=[
 {id:'c3-hook',name:'The pool gate',View:Hook},{id:'c3-predict',name:'Make a prediction',pause:4.5,View:Predict},{id:'c3-cross',name:'Follow Nina',View:Cross},{id:'c3-stay',name:'Test a second story',View:Stay},
 {id:'c3-forward',name:'Find the requirement',View:Forward},{id:'c3-language',name:'Three ways to say it',View:Language},{id:'c3-room',name:'Room B',View:Room},
 {id:'c3-exam',name:'Exhibition question',pause:8,View:Exam},{id:'c3-exam-proof',name:'Exhibition answer',View:ExamProof},{id:'c3-transfer',name:'Rover question',pause:7,View:Transfer},
 {id:'c3-transfer-proof',name:'Rover answer',View:TransferProof},{id:'c3-recap',name:'Take it with you',View:Recap}
];
export const lengthOf=(b:Beat)=>START+Math.ceil(tracks[b.id].duration*FPS)+Math.ceil((b.pause??.58)*FPS);
export const total=beats.reduce((sum,b)=>sum+lengthOf(b),0);
export const begins=beats.map((_,i)=>beats.slice(0,i).reduce((sum,b)=>sum+lengthOf(b),0));
export function Scene({beat}:{beat:Beat}){
 const f=useCurrentFrame();const track=tracks[beat.id];const ms=(f-START)/FPS*1000;const caption=track.captions.find(c=>ms>=c.startMs&&ms<c.endMs);const held=ms>=track.duration*1000;
 return <AbsoluteFill data-scene-id={beat.id} style={{background:'radial-gradient(ellipse at 82% 34%,#1c3237 0%,#101c22 47%,#10181c 85%)',color:'#f2ede1',fontFamily:'Manrope Variable,Arial,sans-serif'}}>
 <header style={{...floating(110,52,1700),display:'flex',alignItems:'center',gap:19}}><span style={{height:15,width:15,background:'#f18c76'}}/><b style={{fontSize:29,letterSpacing:4}}>CHLOE</b><span style={{...small,fontSize:23,color:'#acbeba'}}>Thinking Studio</span><span style={{marginLeft:'auto',...small,fontSize:24,color:'#acbeba'}}>C3 · {beat.name}</span></header>
 <beat.View/>
 {caption&&<div data-caption style={{...floating(196,909,1528),textAlign:'center',fontSize:37,lineHeight:1.23,color:'#f3f1e8',padding:'11px 18px',boxSizing:'border-box',background:'#0d181be6',borderRadius:6}}>{caption.text}</div>}
 {held&&beat.pause&&<div style={{...floating(610,895,700),textAlign:'center',fontSize:26,letterSpacing:2,color:cyan}}>TIME TO THINK<div style={{height:5,background:'#385157',marginTop:14}}><div style={{height:'100%',background:cyan,width:`${100*Math.max(0,1-(ms/1000-track.duration)/beat.pause)}%`}}/></div></div>}
 <Sequence from={START} durationInFrames={Math.ceil(track.duration*FPS)}><Audio src={staticFile(track.src)}/></Sequence>
 </AbsoluteFill>;
}
export function Video(){return <Series>{beats.map(b=><Series.Sequence key={b.id} durationInFrames={lengthOf(b)}><Scene beat={b}/></Series.Sequence>)}</Series>;}
export function Catalogue(){const cfg={width:1920,height:1080,fps:FPS};return <><Composition id="C3" component={Video} durationInFrames={total} {...cfg}/>{beats.map(b=><Composition id={b.id} key={b.id} component={()=> <Scene beat={b}/>} durationInFrames={lengthOf(b)} {...cfg}/>)}</>;}
