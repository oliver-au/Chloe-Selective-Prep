import type {ReactNode} from 'react';
import {AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import '@fontsource-variable/manrope';
import {Diagram} from './Diagram';
import {GuideFilm} from './GuideFilms';
import {UnderGlassHabit} from './Unit456UnderGlass';
import {firstUnitFilmIds, FirstUnitFilm} from './FirstUnitFilms';
import {EvidenceMechanism,mechanismIds} from './EvidenceMechanisms';
import {StudioObjects} from './StudioObjects';
import {PolishedLogic,polishedLogicIds} from './PolishedLogic';
import {mechanismIds456,UnitMechanism456} from './UnitMechanisms456';
import {U789Mechanism,u789MechanismIds} from './U789Mechanisms';
import {beats,Scene as PoolScene} from './c3/C3';
import type {Scene} from './types';

export const palette={ink:'#f4efe2',muted:'#a9bdb7',accent:'#a4dfbf',second:'#efc47b',panel:'#203638',line:'#425b59'};
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export type LessonMeta={id:string;unit:number;title:string;hook:string;takeaway:string;steps:string[];pitfall:string};
export type CourseScene=Scene&{phase?:string;audioRevision?:string;silent?:boolean;ready?:boolean};
const name=(s:CourseScene)=>s.kind==='quiz'?'Your prediction':s.kind==='answer'?'The proof':s.kind==='hook'?'Opening question':s.kind==='habit'?'Keep this habit':s.kind==='rate'?'Compare rates':s.id.includes('worked')?'Worked example':'Build the model';
const tag={fontSize:25,fontWeight:720,letterSpacing:3.5,textTransform:'uppercase'} as const;
function Frame({children}:{children:ReactNode}){return <AbsoluteFill style={{background:'radial-gradient(ellipse at 85% 17%, #273e41, #122227 55%, #0f191d 96%)',color:palette.ink,fontFamily:'Manrope Variable,Arial,sans-serif',overflow:'hidden'}}>{children}</AbsoluteFill>;}
function LessonBoard({scene:s}:{scene:CourseScene}){
 if(firstUnitFilmIds.has(s.id)) return <FirstUnitFilm scene={s}/>;
 if(mechanismIds456.has(s.id)) return <UnitMechanism456 id={s.id} scene={s} audioFrames={s.audioFrames}/>;
 if(polishedLogicIds.has(s.id)) return <PolishedLogic id={s.id} scene={s}/>;
 if(u789MechanismIds.has(s.id)) return <U789Mechanism scene={s}/>;
 if(mechanismIds.has(s.id)) return <EvidenceMechanism id={s.id}/>;
 return s.display.visual?<Diagram visual={s.display.visual} palette={palette}/>:null;
}
function StandardScene({scene:s,meta}:{scene:CourseScene;meta:LessonMeta}){
 const frame=useCurrentFrame(),{fps}=useVideoConfig();
 const quiz=s.kind==='quiz',habit=s.kind==='habit',hook=s.kind==='hook',guide=meta.unit===0||meta.unit===10;
 const customBoard=firstUnitFilmIds.has(s.id)||mechanismIds456.has(s.id)||polishedLogicIds.has(s.id)||u789MechanismIds.has(s.id)||mechanismIds.has(s.id);
 const board=!!s.display.visual||customBoard;
 const lines=s.display.lines;
 // On custom animated worked/answer boards, the board itself already carries the
 // step-by-step visual proof; suppress redundant bottom bullets so they never
 // flash unreadably for a fraction of a second before scene cuts.
 const hideSummaryBullets=customBoard&&(s.id.includes('worked')||s.kind==='answer');
 const questionLine=quiz?lines.reduce((last,line,i)=>line.trim().endsWith('?')?i:last,-1):-1;
 const featured=questionLine>=0?questionLine:lines.length-1;
 const voiceFrame=Math.round(.25*fps),audioMs=(frame-voiceFrame)*1000/fps;
 const caption=s.captions.find(c=>audioMs>=c.startMs&&audioMs<c.endMs);
 const thinking=quiz&&frame>=voiceFrame+s.audioFrames;
 const title=guide?s.title:meta.title;
 const reveal=(i:number)=>{
  if(hideSummaryBullets)return 0;
  if(quiz||habit||!i)return 1;
  const cue=Math.min(s.audioFrames*.55,Math.max(fps*1.4,s.audioFrames*.58/Math.max(1,lines.length-1))*i);
  return interpolate(frame,[cue,cue+fps*.45],[0,1],clamp);
 };
 return <div data-scene-id={s.id}><Frame>
 <header style={{position:'absolute',left:102,right:102,top:46,display:'flex',alignItems:'center',gap:16}}>
  <span style={{width:15,height:15,background:'#ee947a'}}/><b style={{fontSize:29,letterSpacing:4}}>CHLOE</b>
  <span style={{...tag,fontSize:23,color:palette.muted}}>Thinking Studio</span>
  <span style={{marginLeft:'auto',...tag,fontSize:22,color:palette.muted}}>{meta.id} · {guide?s.title:name(s)}</span>
 </header>
 {guide?<><h1 data-title style={{position:'absolute',top:116,left:102,right:100,margin:0,fontSize:65,lineHeight:1.12,letterSpacing:-2.7}}>{s.title}</h1>
  <div style={{position:'absolute',left:100,right:100,top:221,height:603,borderRadius:24,overflow:'hidden',boxShadow:'0 16px 36px #07151866'}}><GuideFilm scene={s}/></div></>:hook?<div style={{position:'absolute',left:104,right:104,top:189,bottom:240,display:'grid',gridTemplateColumns:'.92fr 1.14fr',gap:80,alignItems:'center'}}>
  <div><div style={{...tag,color:palette.second,marginBottom:32}}>What do you think?</div>
  <h1 style={{fontSize:meta.hook.length>85?68:78,lineHeight:1.115,letterSpacing:-3.5,margin:0,fontWeight:720}}>{meta.hook}</h1></div>
  <div style={{aspectRatio:'430/290',borderRadius:24,overflow:'hidden',boxShadow:'0 18px 42px #06121566'}}><StudioObjects model={meta.id}/></div>
 </div>:s.id==='s1-habit'?<UnderGlassHabit/>:habit?<div style={{position:'absolute',left:105,right:105,top:155}}>
  <div style={{...tag,color:palette.second}}>Try it on your next question</div>
  <h1 style={{fontSize:meta.takeaway.length>95?60:71,letterSpacing:-2.7,lineHeight:1.12,margin:'30px 0 53px',maxWidth:1630}}>{meta.takeaway}</h1>
  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:32}}>{meta.steps.map((x,i)=><div key={i} style={{borderTop:'3px solid #9ac5ae',padding:'24px 18px 24px 0',fontSize:36,lineHeight:1.34}}><span style={{display:'block',color:palette.accent,fontSize:25,marginBottom:13}}>{i+1}</span>{x}</div>)}</div>
  <p style={{fontSize:32,color:palette.muted,lineHeight:1.35,marginTop:42}}><b style={{color:palette.second}}>Watch for </b>{meta.pitfall}</p>
 </div>:<>
  <h1 data-title style={{position:'absolute',left:105,right:105,top:126,margin:0,fontSize:title.length>51?59:68,letterSpacing:-2.8,lineHeight:1.12,fontWeight:730}}>{title}</h1>
  {board?<><div style={{position:'absolute',left:93,top:hideSummaryBullets?265:231,width:1734,height:hideSummaryBullets?530:441,background:'linear-gradient(117deg,#23383a,#192c30)',borderRadius:24,boxShadow:'inset 0 0 0 1px #54746a66,0 13px 27px #09141866',padding:'10px 13px',boxSizing:'border-box'}}><LessonBoard scene={s}/></div>
   {!hideSummaryBullets&&<div style={{position:'absolute',left:105,right:105,top:703,display:'grid',gridTemplateColumns:lines.length>1?'1fr 1fr':'1fr',gap:'17px 48px'}}>{lines.map((line,i)=><div key={i} data-proof-line style={{opacity:reveal(i),fontSize:31,lineHeight:1.27,display:'flex',gap:17}}><span aria-hidden style={{height:3,minWidth:19,background:quiz?'#92aba5':palette.accent,marginTop:20}}/><span>{line}</span></div>)}</div>}
  </>:<div style={{position:'absolute',left:106,right:106,top:251,display:'grid',gridTemplateColumns:'1.4fr .86fr',gap:58,alignItems:'center'}}>
   <div style={{minHeight:480,display:'flex',flexDirection:'column',justifyContent:'center',gap:lines.length>3?14:22}}>{lines.map((line,i)=>i===featured?null:<div key={i} data-proof-line style={{opacity:reveal(i),borderLeft:'4px solid '+(quiz?'#a1bdb2':i===lines.length-1?palette.second:palette.accent),padding:'10px 24px',fontSize:lines.join('').length>155?37:43,letterSpacing:-.6,lineHeight:1.25}}>{line}</div>)}</div>
   <div data-proof-line style={{position:'relative',alignSelf:'center',minHeight:295,display:'flex',flexDirection:'column',justifyContent:'center',boxSizing:'border-box',background:'linear-gradient(128deg,#f2edd8,#dcd9bf)',color:'#233b3d',borderRadius:14,borderBottom:'5px solid #adac97',boxShadow:'0 12px 32px #07171a66',padding:'42px 48px',opacity:reveal(featured)}}>
    <div style={{...tag,fontSize:23,color:'#506860',marginBottom:27}}>{questionLine>=0?'Your question':quiz?'Given':s.kind==='answer'?'Check the proof':guide?'Remember':'Look closely'}</div>
    <div style={{fontSize:lines[featured].length>94?39:47,lineHeight:1.19,letterSpacing:-1.2,fontWeight:690}}>{lines[featured]}</div></div>
  </div>}
 </>}
 {thinking&&<div style={{position:'absolute',top:900,left:105,right:105,textAlign:'center',...tag,fontSize:25,color:palette.second}}>Pause here · What can you prove?</div>}
 {s.audio&&s.ready&&<Sequence from={voiceFrame} durationInFrames={s.audioFrames} premountFor={fps}><Audio src={staticFile(s.audio)+(s.audioRevision?'?v='+s.audioRevision:'')} premountFor={fps}/></Sequence>}
 {caption&&<div data-caption style={{position:'absolute',top:906,left:136,right:136,height:120,textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{background:'#0c181bdd',borderRadius:9,padding:'10px 24px',fontSize:37,lineHeight:1.24,maxWidth:1550}}>{caption.text}</span></div>}
 </Frame></div>;
}
export function LessonScene({scene,meta}:{scene:CourseScene;meta:LessonMeta}){
 if(meta.id==='C3'){const beat=beats.find(b=>b.id===scene.id);if(!beat)throw new Error('Missing C3 beat '+scene.id);return <PoolScene beat={beat}/>;}
 return <StandardScene scene={scene} meta={meta}/>;
}
