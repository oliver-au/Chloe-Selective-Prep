import {Board,PaperTag,blue,brick,gold,ink,label,line,mix,muted,paper,progress as go,teal,text,trace,type StudyProps} from './Unit456Workshop';
import type {ReactNode} from 'react';

const faces=['#a97354','#c58d64','#915e46','#d6a787'];
function Runner({x,y,name,index}:{x:number;y:number;name:string;index:number}){
  const shirt=[teal,brick,blue,gold][index%4];
  return <g transform={`translate(${x} ${y})`}><ellipse cy="43" rx="44" ry="9" fill="#25373227"/>
    <path d="M-28 34l6-51 17-7h11l17 7 7 51z" fill={shirt} stroke={ink} strokeWidth="2"/>
    <path d="m-22-13-12 22 10 10 10-19m35-12 12 21-10 10-10-18" fill={faces[index%4]} stroke={ink} strokeWidth="2"/>
    <circle cy="-41" r="20" fill={faces[index%4]} stroke={ink} strokeWidth="2"/><path d="M-20-40q-3-25 19-24 19-2 20 17-16 3-25-9-2 12-14 16" fill="#493c36"/>
    <rect x="-13" y="-10" width="26" height="21" rx="3" fill={paper}/>{text(name==='Another'||name==='Other'?'?':name.charAt(0),0,1,16)}
    {text(name,0,76,27)}
  </g>;
}
function UnitBoard({title,children}:{title:string;children:ReactNode}){return <Board title={title} description={title} tone="umber">{children}</Board>}
function queue(t:number,answer:boolean,block:boolean){
  const names=block?['Mia','Noah','Eli']:answer?['Liam','Priya','Noah']:['Ava','Ben','Chloe'];
  const join=go(t,block?4.25:answer?.15:3,1.75),move=go(t,block?13:answer?4.6:9.4,1.55);
  const xs=block?[480+115*join+95*move,790+95*move,1110-125*join+95*move]:[445-90*move,780+42*move,1105+75*move];
  return <UnitBoard title={block?'Line-up · immediate neighbours':'Race order · earlier to later'}>
    <path d="M70 197Q810 155 1530 194V309Q800 280 70 314Z" fill="#cbaa83"/><path d="M70 214Q800 179 1530 207M70 273Q800 235 1530 266" fill="none" stroke="#faeacb" strokeWidth="3"/>
    {block?<g opacity={join}><rect x={xs[0]-78} y="84" width={xs[2]-xs[0]+156} height="216" rx="22" fill="none" stroke={teal} strokeWidth="5"/>{label('No space inside this block',(xs[0]+xs[2])/2,332)}</g>:<>{trace(`M${xs[0]} 112H${xs[1]}`,join,teal)}{trace(`M${xs[1]} 112H${xs[2]}`,go(t,answer?.6:4.5,1.25),teal)}{[0,1,2].map(i=><circle key={i} cx={xs[i]} cy="112" r="7" fill={teal}/>)}</>}
    {names.map((n,i)=><Runner key={n} name={n} index={i} x={xs[i]} y={202}/>)}
    <g opacity={move}><Runner name={block?'Other':'Another'} index={3} x={block?mix(1520,1270,move):mix(530,566,move)} y={mix(328,202,move)}/></g>
  </UnitBoard>
}
function books(t:number){
  const books=[['Red','#a75748',2.0],['Blue','#50899a',.1],['Green','#668974',5.1]] as const;
  return <UnitBoard title="Bookshelf · green takes the available side of blue">
    <rect x="205" y="290" width="1190" height="22" rx="5" fill="#946a4c"/><path d="M220 310h1160v10H220z" fill="#594e3e"/>
    {books.map(([name,colour,at],i)=>{const g=go(t,at,1.4),x=mix([320,800,1310][i],[635,800,965][i],g);return <g key={name} transform={`translate(${x} ${mix(-25,0,g)})`}><rect x="-77" y="104" width="154" height="185" rx="6" fill={colour} stroke={ink} strokeWidth="3"/><path d="M-63 107v177m7-169v161" stroke="#fff6ce" strokeOpacity=".5" strokeWidth="2"/><rect x="-47" y="171" width="106" height="46" fill={paper}/>{text(name,5,195,24)}</g>})}
  </UnitBoard>;
}
function boxes(t:number,answer:boolean){
  const xs=[360,580,800,1020,1240];
  if(answer)return <UnitBoard title="Five seats · two possible end positions">{[0,1].map(r=>{const end=r===0?0:4,neb=r===0?1:3,g=go(t,r===0?1.3:6.2,1.1),y=155+r*130;return <g key={r}>{label('Case '+(r+1),140,y)}{xs.map((x,i)=><g key={i}><rect x={x-81} y={y-37} width="162" height="74" rx="11" fill="none" stroke={muted} strokeOpacity=".48"/>{text(i+1,x,y+51,21,muted)}</g>)}<g opacity={g}><PaperTag name="Ava" x={xs[end]} y={y} w={149}/><PaperTag name="Ben" x={mix(xs[end],xs[neb],g)} y={y-29*Math.sin(Math.PI*g)} w={148} colour="#e9cba4"/></g></g>})}</UnitBoard>;
  const black=go(t,4.45,1.15),hop1=go(t,8.7,.8),hop2=go(t,10.25,.85),white=go(t,12.15,1.15);
  return <UnitBoard title="Box rail · five numbered positions">
    <path d="M205 282h1175v17H205z" fill="#8e7155"/>{xs.map((x,i)=><g key={x}><rect x={x-89} y="164" width="178" height="115" rx="6" fill="#e1d5b9" stroke="#ac9e80" strokeDasharray="9 6"/>{text(i+1,x,326,30)}</g>)}
    <g transform={`translate(0 ${mix(-68,0,black)})`} opacity={black}><rect x={xs[4]-80} y="169" width="160" height="110" rx="7" fill="#374741"/>{text('Black',xs[4],224,28,paper)}</g>
    <g opacity={hop1}><path d="M1240 149Q1130 75 1020 149M1020 149Q910 75 800 149" fill="none" stroke={gold} strokeDasharray="8 6" strokeWidth="3"/><circle cx={1240-220*(hop1+hop2)} cy={149-43*Math.sin(Math.PI*(hop2>0?hop2:hop1))} r="13" fill={brick}/></g>
    <g opacity={white} transform={`translate(0 ${mix(-53,0,white)})`}><rect x="720" y="169" width="160" height="110" rx="7" fill="#fff8e8" stroke={muted} strokeWidth="3"/>{text('White',800,224)}</g>
  </UnitBoard>;
}
function table(t:number,answer:boolean){
  const arrive=(a:number)=>go(t,a,.85);
  const rotation=answer?0:go(t,17.7,2)*Math.PI/3;
  const people=['Ava','Ben','Chloe','Dina'],times=[4.5,10.65,6.8,14.1],cx=755,cy=220;
  return <UnitBoard title={answer?'Across the table · use Ava’s own viewpoint':'Seating plan · preserve the entire arrangement'}>
   <ellipse cx={cx} cy={cy+4} rx="270" ry="89" fill="#4a443c35"/><ellipse cx={cx} cy={cy} rx="259" ry="83" fill="#a47c5b" stroke="#6e5546" strokeWidth="4"/><ellipse cx={cx} cy={cy-4} rx="234" ry="65" fill="#ba9870" stroke="#d4b489" strokeWidth="2"/>
   {people.map((n,i)=>{const a=i*Math.PI/2+rotation,x=cx+350*Math.sin(a),y=cy-126*Math.cos(a),g=answer?(i===0||i===1?1:0):arrive(times[i]);return <g key={i}><ellipse cx={x} cy={y} rx="52" ry="16" fill="#927e65" stroke={ink} strokeWidth="2"/><g opacity={g}><PaperTag x={x} y={y-7} name={n} w={151} colour={i===0?'#e9c894':'#e6ddbd'}/></g></g>})}
   {answer?<>{trace('M755 130v50m-10-11 10 11 10-11',go(t,1.2,1.35),ink,5)}{trace('M790 127Q915 121 1052 185m-18-1 18 1-10-15',go(t,3.8,1.4),brick,6)}{label('East',1230,222)}{label('Facing south',431,106)}<g opacity={go(t,4.6,1)}>{text('Her left',1025,110,27,brick)}</g></>:<g opacity={1-go(t,16.9,.6)}>{label('North seat',916,83,'start')}{text('Clockwise',1261,185,26)}{trace('M1180 205q100 5 115 68l-13-9 13 9 4-16',1,gold,5)}</g>}
  </UnitBoard>
}
function timetable(t:number,answer:boolean){
 const names=answer?['Training','Event']:['Chess','Art','Music'];const slots=answer?['Morning','Afternoon']:['Mon · morning','Mon · afternoon','Tue · morning'];
 const target=answer?[550,1040]:[405,800,1195],landing=answer?[.65,3.65]:[12.3,9.4,6.2];
 return <UnitBoard title={answer?'Hall opening · morning or afternoon':'Activities · one booking per available slot'}>
  {slots.map((n,i)=><g key={n}><rect x={target[i]-153} y="99" width="306" height="213" rx="14" fill="#e8dfc3" stroke="#92836a" strokeWidth="3"/><path d={`M${target[i]-152} 157h304`} stroke="#92836a" strokeWidth="2"/>{text(n,target[i],128,26)}{[0,1].map(k=><circle key={k} cx={target[i]+(k?127:-127)} cy="112" r="3.5" fill="#8d7958"/>)}</g>)}
  {names.map((n,i)=>{const f=go(t,landing[i],1.1);return <g key={n} opacity={f}><PaperTag x={target[i]} y={mix(78,230,f)} name={n} w={191} colour={i===0?'#e4c782':'#c7d7c2'}/></g>})}
  {answer&&<g opacity={go(t,5.1,1)}>{line(901,184,1170,280,brick,7)}{text('Afternoon only',1040,341,26,brick)}</g>}
 </UnitBoard>;
}
function lockers(t:number,answer:boolean){
 const count=answer?4:3, xs=answer?[430,675,920,1165]:[520,800,1080];
 const legend=[['Blue',blue],['Red',brick],['Green','#5d8569']] as const;
 return <UnitBoard title={answer?'Lockers · test the left boundary':'Colour and ownership · fixed locker numbers'}>
   {!answer&&<g transform="translate(115 118)">{label('Three colours',90,0)}{label('(one each)',90,26)}{legend.map(([name,col],i)=><g key={name} transform={`translate(18 ${56+i*46})`}><rect width="144" height="34" rx="6" fill={col} stroke={ink} strokeWidth="2"/>{text(name,72,17,20,paper)}</g>)}</g>}
   {xs.map((x,i)=>{const f=go(t,[7.6,13.8,17.3][i]??20,1.0),colour=[blue,brick,'#5d8569'][i];return <g key={x}>
    <rect x={x-94} y="104" width="188" height="205" rx="8" fill="#cdbea3" stroke="#5c6357" strokeWidth="4"/><rect x={x-88} y="110" width="176" height="193" rx="5" fill={answer?'#e0d6b7':colour} opacity={answer?1:f}/>{[0,1,2].map(r=><path key={r} d={`M${x-48} ${132+8*r}h97`} stroke="#3b4b42" strokeOpacity=".7" strokeWidth="3"/>)}<path d={`M${x+64} 192v30`} stroke={ink} strokeWidth="6"/>{text(i+1,x,338,26)}
    {!answer&&<g opacity={f}><rect x={x-55} y="213" width="110" height="39" rx="3" fill={paper}/>{text(['Blue','Red','Green'][i],x,232,23)}</g>}
   </g>})}
   <g opacity={go(t,answer?.1:9.1,.7)}><PaperTag x={answer?xs[0]:xs[count-1]} y={89} name={answer?'Try Ava':'Ari'} w={150}/></g>
   {answer&&<g opacity={go(t,1.8,1.2)}>{trace('M365 203H212m18-15-18 15 18 15',go(t,1.8,1.2),brick,5)}{line(198,132,198,270,brick,6)}{text('No locker',109,302,24,brick)}</g>}
 </UnitBoard>;
}
function lineups(t:number,answer:boolean){
 const filter=go(t,answer?2.0:12.4,1.5);const x=[640,865,1090];return <UnitBoard title="Two legal line-ups · test the extra clue">
   {[[ 'Ava','Ben','Cara'],['Ava','Cara','Ben']].map((row,r)=>{const y=148+135*r,keep=answer?r===0:r===1;return <g key={r} opacity={keep?1:1-filter*.56}>
   {label('Order '+(r+1),230,y)}{line(490,y+42,1240,y+42,'#aa8c68',5)}{row.map((n,i)=><PaperTag key={n} name={n} w={183} x={x[i]} y={y} colour={n==='Ava'?'#d3d9bb':n==='Cara'?'#dfbba4':'#bad0cd'}/>)}
   <g opacity={filter}>{text(keep?'Fits':'Fails',1350,y,30,keep?teal:brick)}</g></g>})}
   {!answer&&<g opacity={go(t,8.7,.8)*(1-filter)}>{[0,1].map(r=><g key={r}>{trace(`M${x[0]-90} ${148+r*135+47}h180`,1,gold,5)}</g>)}{text('Ava first fits both',805,359,24,muted)}</g>}
   {[0,1].map(r=>{const row=(r===0?['Ava','Ben','Cara']:['Ava','Cara','Ben']);const a=x[row.indexOf(answer?'Ben':'Cara')],b=x[row.indexOf(answer?'Cara':'Ben')],y=148+r*135;
    return <g key={r}>{trace(`M${a} ${y-39}Q${(a+b)/2} ${y-85} ${b} ${y-41}l${b>a?-13:13} -3`,filter,(answer?r===0:r===1)?teal:brick,5)}</g>})}
 </UnitBoard>;
}
export function OrderStudy({code,answer,t}:StudyProps){switch(code){
 case 'O1':return queue(t,answer,false);case 'O2':return answer?books(t):queue(t,false,true);case 'O3':return boxes(t,answer);case 'O4':return table(t,answer);case 'O5':return timetable(t,answer);case 'O6':return lockers(t,answer);case 'O7':return lineups(t,answer);default:return null;
}}
