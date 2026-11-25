import {useId, type ReactNode} from 'react';

export const ink='#233a3b', muted='#516762', teal='#377c77', gold='#b88237', brick='#a85440', paper='#f2e6c9', blue='#527c91';
export const clamp=(v:number)=>Math.min(1,Math.max(0,v));
export function progress(time:number,at:number,length=1){const u=clamp((time-at)/length);return u*u*(3-2*u);}
export const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
export function text(value:string|number,x:number,y:number,size=28,colour=ink,anchor:'start'|'middle'|'end'='middle'){
  return <text x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize={size} fontWeight={620} fill={colour}>{value}</text>;
}
export function label(value:string,x:number,y:number,anchor:'start'|'middle'|'end'='middle'){
  return <text x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize={21} letterSpacing="1.5" fontWeight={780} fill={muted}>{value.toUpperCase()}</text>;
}
export function line(x:number,y:number,x2:number,y2:number,colour=muted,w=3,dash?:string){
  return <line x1={x} y1={y} x2={x2} y2={y2} stroke={colour} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round"/>;
}
export function trace(d:string,f:number,colour=teal,width=6){
  return <path d={d} fill="none" stroke={colour} strokeWidth={width} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1-f} opacity={f>0?1:0} strokeLinecap="round" strokeLinejoin="round"/>;
}
export function PaperTag({x,y,name,w=196,colour=paper,edge=teal}:{x:number;y:number;name:string;w?:number;colour?:string;edge?:string}){
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M${-w/2} -25 l9 -9 h${w-18} l9 9 v53 l-8 8 h${-w+16} l-8 -8z`} fill="#3a4d4638" transform="translate(2 5)"/>
    <path d={`M${-w/2} -25 l9 -9 h${w-18} l9 9 v53 l-8 8 h${-w+16} l-8 -8z`} fill={colour} stroke={edge} strokeWidth="3"/>
    <path d={`M${-w/2+10} -19 v38`} stroke={edge} strokeWidth="4"/>{text(name,5,1,29)}
  </g>;
}
export function Board({title,children,description,tone='teal'}:{title:string;children:ReactNode;description:string;tone?:'teal'|'umber'|'blue'}){
  const uid=useId().replace(/[^a-zA-Z0-9_-]/g,'');
  const grad=uid+'paper',grid=uid+'grid';
  const tones={teal:['#f2e8d0','#d9debd','#397167'],umber:['#f4e7cb','#e1cdac','#947155'],blue:['#e9e9dc','#cedbce','#557883']};
  const [light,dark,edge]=tones[tone];
  return <svg viewBox="0 0 1600 390" width="100%" height="100%" role="img" data-mechanism={description} aria-label={description} style={{fontFamily:'Manrope Variable, Arial, sans-serif',display:'block'}}>
    <defs><linearGradient id={grad} x1="0" y1="0" x2=".8" y2="1" gradientUnits="objectBoundingBox"><stop stopColor={light}/><stop offset="1" stopColor={dark}/></linearGradient>
    <pattern id={grid} width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0v34" stroke={edge} strokeOpacity=".09" fill="none"/><circle cx="0" cy="0" r="1.8" fill={edge} opacity=".17"/></pattern></defs>
    <rect x="3" y="3" width="1594" height="384" rx="22" fill={'url(#'+grad+')'}/><rect x="3" y="3" width="1594" height="384" rx="22" fill={'url(#'+grid+')'}/>
    <path d="M24 54H1576" stroke={edge} strokeOpacity=".5" strokeWidth="1.5"/>{label(title,40,32,'start')}{children}
  </svg>;
}
export type StudyProps={code:string;answer:boolean;t:number};
