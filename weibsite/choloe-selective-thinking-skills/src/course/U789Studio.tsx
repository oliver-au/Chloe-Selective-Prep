import type {ReactNode} from 'react';
import type {Scene} from './types';

export const ink='#233d3b', green='#40836c', teal='#47879b', coral='#ca7558', gold='#d6a54c', indigo='#53658a', cream='#fff2d4', mute='#61746b';
export interface Shot {t:number; at:(words:string,fallback:number)=>number}
export const ease=(t:number,start:number,seconds=.85)=>{
  const u=Math.min(1,Math.max(0,(t-start)/seconds));return u*u*(3-2*u);
};
export const lerp=(a:number,b:number,u:number)=>a+(b-a)*u;
export function sceneShot(scene:Scene,frame:number,fps:number):Shot {
  const words=(s:string)=>s.toLowerCase().match(/[a-z0-9]+/g)??[];
  const beats=scene.words&&scene.words.length>=2
    ? scene.words.flatMap(w=>words(w.word).map(token=>({word:token,ms:w.startMs})))
    : scene.captions.flatMap(c=>{const tokens=words(c.text);return tokens.map((word,i)=>({word,ms:c.startMs+(c.endMs-c.startMs)*i/tokens.length}));});
  return {t:frame/fps,at:(text,fallback)=>{
    const wanted=words(text);const hit=beats.findIndex((_,i)=>wanted.every((w,j)=>beats[i+j]?.word===w));
    return .25+(hit<0?fallback:beats[hit].ms/1000);
  }};
}
export function Text({x,y,children,size=30,color=ink,anchor='middle',weight=650}:{x:number;y:number;children:ReactNode;size?:number;color?:string;anchor?:'start'|'end'|'middle';weight?:number}){
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={color} fontWeight={weight} style={{fontVariantNumeric:'tabular-nums'}}>{children}</text>;
}
export function Caption({x,y,children}:{x:number;y:number;children:ReactNode}){return <text x={x} y={y} textAnchor="start" fontSize="20" fill={mute} fontWeight="730" letterSpacing="2.4">{children}</text>;}
export function Board({name,children}:{name:string;children:ReactNode}){
  return <svg width="100%" height="100%" viewBox="0 0 1600 370" role="img" aria-label={name} style={{display:'block',fontFamily:'inherit'}}>
    <defs>
      <linearGradient id="u789-wood" x2=".12" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#ba9670"/><stop offset=".13" stopColor="#e1c39c"/><stop offset=".88" stopColor="#c6a379"/><stop offset="1" stopColor="#987756"/></linearGradient>
      <linearGradient id="u789-sheet" x2=".9" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#fff5dc"/><stop offset=".55" stopColor="#f4e8cc"/><stop offset="1" stopColor="#e3d3b1"/></linearGradient>
      <linearGradient id="u789-metal" x2=".1" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#eed99f"/><stop offset=".38" stopColor="#bc9654"/><stop offset="1" stopColor="#826636"/></linearGradient>
      <pattern id="u789-fibre" width="23" height="29" patternUnits="userSpaceOnUse"><path d="m1 3 5 1m8 8 3-1m-9 11 2 .4" fill="none" stroke="#745c43" strokeWidth=".9" opacity=".13"/></pattern>
    </defs>
    <rect x="3" y="3" width="1594" height="364" rx="22" fill="url(#u789-wood)"/>
    <rect x="16" y="14" width="1568" height="341" rx="14" fill="url(#u789-sheet)" stroke="#a58f70" strokeWidth="2"/>
    <rect x="16" y="14" width="1568" height="341" rx="14" fill="url(#u789-fibre)"/>
    {[35,1564].map(x=><g key={x}><circle cx={x} cy="35" r="7.5" fill="url(#u789-metal)"/><path d={`M${x-4} 38l8-6`} stroke="#7b6748" strokeWidth="1.6"/></g>)}
    {children}
  </svg>;
}
export function pathPose(x1:number,y1:number,x2:number,y2:number,p:number,lift=42){return `translate(${lerp(x1,x2,p)} ${lerp(y1,y2,p)-4*p*(1-p)*lift})`;}
export function Chip({x,y,r=19,color=teal}:{x:number;y:number;r?:number;color?:string}){
  return <g transform={`translate(${x} ${y})`}><ellipse cy={r*.85} rx={r*1.02} ry={r*.27} fill={ink} opacity=".18"/>
    <circle r={r} fill={color} stroke={ink} strokeWidth={r*.075}/><path d={`M${-r*.64} ${-r*.2}q${r*.12} ${-r*.53} ${r*.69} ${-r*.54}`} stroke={cream} strokeWidth={r*.13} opacity=".78" fill="none" strokeLinecap="round"/><path d={`M${r*.58} ${r*.26}q${-r*.14} ${r*.32} ${-r*.45} ${r*.39}`} stroke={ink} strokeWidth={r*.09} opacity=".4" fill="none" strokeLinecap="round"/></g>;
}
export function Plate({x,y,w,h,fill=cream}:{x:number;y:number;w:number;h:number;fill?:string}){return <g><rect x={x+1} y={y+4} width={w} height={h} rx="11" fill="#806f53" opacity=".25"/><rect x={x} y={y} width={w} height={h} rx="11" fill={fill} stroke="#ab9979" strokeWidth="2"/></g>;}
export function Divider({x}:{x:number}){return <path d={`M${x} 54V322`} stroke="#b9ae92" strokeWidth="2"/>;}
