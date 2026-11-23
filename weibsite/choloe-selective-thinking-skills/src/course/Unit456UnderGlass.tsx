import {useCurrentFrame,useVideoConfig} from 'remotion';
import {ink,progress,text} from './Unit456Workshop';

const metal='#b37734',glass='#447d83';
const corners=[[-225,-130],[225,-130],[225,130],[-225,130]] as const;

function MarkedKey(){
 return <g transform="translate(-110 -57)" strokeLinejoin="round" strokeLinecap="round">
  <path d="M-10-8H56L67 0L56 9H47V26H34V9H-10Z" fill="#dfb451" stroke="#674627" strokeWidth="4"/>
  <circle cx="-32" r="24" fill="none" stroke="#674627" strokeWidth="14"/>
  <circle cx="-32" r="24" fill="none" stroke="#dfb451" strokeWidth="8"/>
  <path d="M-9-4h55" fill="none" stroke="#f8dd82" strokeWidth="3"/>
 </g>;
}
function Pane({cx,angle}:{cx:number;angle:number}){
 const side=Math.cos(angle),depth=Math.sin(angle);
 return <g transform={'translate('+cx+' 273)'}>
  <ellipse cy="151" rx={Math.max(16,Math.abs(side)*216)} ry={8+depth*3} fill="#485849" opacity=".17"/>
  <path d={'M'+(-225*side)+' -130H'+225*side+'v260H'+(-225*side)+'z'} fill="#a5d8d3" fillOpacity=".42" stroke={glass} strokeWidth="3"/>
  <g transform={'scale('+side+' 1)'}>
   {[-150,-75,0,75,150].map(x=><path key={x} d={'M'+x+' -125v252'} stroke="#739b92" strokeWidth="1.5" opacity=".58"/>)}
   {[-65,0,65].map(y=><path key={y} d={'M-222 '+y+'h444'} stroke="#739b92" strokeWidth="1.5" opacity=".58"/>)}
   <path d="m-193 108 35-44m-25 50 18-22m303-123 34-43" stroke="#fffced" strokeWidth="5" opacity=".68"/>
   <MarkedKey/>
   <path d="M-225-130H225" stroke="#754622" strokeWidth="13"/><path d="M-224-132H224" stroke="#d5a55d" strokeWidth="7"/>
   {corners.map(([x,y])=><circle key={x+':'+y} cx={x>0?x-8:x+8} cy={y>0?y-8:y+8} r="4" fill={y<0?metal:glass}/>)}
  </g>
  {depth>.01&&<path d={'M'+225*side+' -128v256'} stroke="#3f6e70" strokeWidth={2+depth*8} strokeLinecap="round"/>}
 </g>;
}
export function UnderGlassHabit(){
 const t=useCurrentFrame()/useVideoConfig().fps,turn=progress(t,4.15,2.95),explain=progress(t,7.15,.55);
 return <div style={{position:'absolute',left:103,right:103,top:139}}>
  <div style={{fontSize:26,fontWeight:760,letterSpacing:3.2,color:'#efc47b',textTransform:'uppercase'}}>Try it on your next question</div>
  <h1 data-title style={{fontSize:73,fontWeight:730,letterSpacing:-3,lineHeight:1.1,margin:'20px 0 19px'}}>Look through the glass</h1>
  <p style={{margin:'0 0 30px',fontSize:40,color:'#d7e3da'}}>Keep the copper edge at the top. From underneath, where will the key point?</p>
  <svg role="img" aria-label={turn<1?"A transparent sheet has a key near its upper left, pointing right, with a tooth pointing down. Predict its position and direction from below while the copper edge stays at the top.":"Viewed from underneath the sheet, the key is now near the upper right and points left. Its tooth still points down."} data-mechanism="An upper-left key reverses horizontally when the viewpoint changes sides and the marked top edge is held fixed." style={{display:'block',width:'100%',height:'auto',fontFamily:'Manrope Variable,Arial,sans-serif'}} viewBox="0 0 1600 482">
   <defs><linearGradient id="s1gl" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f1ecda"/><stop offset="1" stopColor="#cfdccf"/></linearGradient></defs>
   <rect x="2" y="2" width="1596" height="478" rx="25" fill="url(#s1gl)"/>
   <path d="M800 42v386" stroke="#98a99a" strokeWidth="2"/>
   {text('Original view from above',409,66,41,ink)}
   {text(turn===0?'Your view from above':turn===1?'Your view from underneath':'Moving underneath',1189,66,41,ink)}
   <Pane cx={409} angle={0}/><Pane cx={1189} angle={Math.PI*turn}/>
   {text('Top edge',409,112,24,'#71512e')}{text('Top edge',1189,112,24,'#71512e')}
  </svg>
  <div aria-live="off" style={{position:'relative',marginTop:29,fontSize:39,lineHeight:1.22,color:'#a4dfbf',fontWeight:650}}>
   <div style={{opacity:1-progress(t,4.03,.38)}}>Picture the reverse side before the view changes.</div>
   <div style={{opacity:explain,position:'absolute',left:0,top:0}}>Upper right, pointing left. The tooth still points down.</div>
  </div>
 </div>;
}
