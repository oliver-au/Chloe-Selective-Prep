import {useCurrentFrame, useVideoConfig} from 'remotion';
import refDurationsData from './ref-durations.json';
import type {Scene} from './types';
const refDurations: Record<string, number> = refDurationsData;

const colour = {paper:'#f5f0df', muted:'#a5b5b2', mint:'#91e6bd', sky:'#79cce4', orange:'#ff986f', dark:'#142429', line:'#394d50'};
const type = {fontFamily:'Manrope Variable, Arial, sans-serif'};
const motion = (t:number, from:number, to:number) => {
  const u = Math.max(0, Math.min(1, (t - from) / (to - from)));
  return u*u*(3-2*u);
};

function Label({x,y,children,size=34,fill=colour.paper,anchor='start'}:{x:number;y:number;children:React.ReactNode;size?:number;fill?:string;anchor?:'start'|'middle'|'end'}) {
  return <text x={x} y={y} fill={fill} fontSize={size} fontWeight={650} textAnchor={anchor}>{children}</text>;
}
function Panel({x,y,w,h}:{x:number;y:number;w:number;h:number}) {
  return <rect x={x} y={y} width={w} height={h} rx={22} fill={colour.dark} stroke={colour.line} strokeWidth={2}/>;
}

function Scanner({t,silent}:{t:number;silent:boolean}) {
  const move=motion(t,1,3.6),open=motion(t,4.5,6);
  return <>
    <Panel x={22} y={15} w={1556} h={355}/>
    <Label x={70} y={80} size={30} fill={colour.sky}>{silent?'SCANNER TEST':'BLUE CARD SCANNER'}</Label>
    <path d="M90 293H1502" stroke={colour.line} strokeWidth={5}/>
    <g transform="translate(900 90)">
      <path d="M0 200V30C0 8 13 0 30 0H355C372 0 385 8 385 30V200" fill="none" stroke="#72908b" strokeWidth={12}/>
      {!silent&&[0,1].map((side)=><g key={side} transform={`translate(${side===0?-92*open:92*open} 0)`}>
        <rect x={17+side*176} y={18} width={174} height={182} rx={6} fill="#265054" stroke={colour.sky} strokeWidth={3}/>
        {[0,1,2].map(n=><path key={n} d={`M${37+side*176+n*24} 136l58 -76`} stroke="#4d747b" strokeWidth={7}/>)}
      </g>)}
    </g>
    <rect x={640} y={165} width={152} height={70} rx={15} fill="#3b5559" stroke="#8da6a3" strokeWidth={4}/>
    <rect x={662} y={181} width={108} height={18} rx={8} fill={silent?'#48565c':open>.1?colour.mint:colour.sky}/>
    {silent?<>
       <Label x={100} y={192} size={51}>No beep in this trial</Label>
       <path d="M102 220h440" stroke={colour.sky} strokeWidth={5}/>
       <Label x={70} y={342} size={30}>A valid scan would have produced a beep.</Label>
    </>:<>
      <g transform={`translate(${150+454*move} ${126-36*move}) rotate(${-5+5*move})`}>
        <rect width={190} height={105} rx={12} fill={colour.sky} stroke="#d3eef3" strokeWidth={3}/>
        <rect x={19} y={22} width={34} height={26} rx={5} fill="#346275"/>
        <path d="M20 72h89m-89 13h55" stroke="#477e8c" strokeWidth={4}/>
      </g>
      <g opacity={motion(t,3.7,4.4)}><circle cx={794} cy={141} r={8} fill={colour.mint}/><circle cx={794} cy={141} r={17} fill="none" stroke={colour.mint} strokeWidth={2}/></g>
      <Label x={70} y={342} size={30}>When this blue card is scanned, the gate must open.</Label>
    </>}
  </>;
}

const personColours:Record<string,string>={Ava:'#a5e5c4',Ben:'#91cadd',Chen:'#dbb99a',Dani:'#e79b82'};
function LineUp({t,answer}:{t:number;answer:boolean}) {
 const middle=answer?['Ava','Ben','Chen','Dani']:['Ava','Dani','Ben','Chen'];
 const finish=answer?middle:['Dani','Ava','Ben','Chen'];
 const progress=answer?1:motion(t,7.5,9.1);
 return <>
   <Panel x={22} y={15} w={1556} h={355}/>
   <Label x={65} y={75} size={30} fill={colour.sky}>Ava before Ben · Ben before Chen</Label>
   {[0,1,2,3].map(i=><g key={i}><rect x={90+i*370} y={114} width={310} height={129} rx={18} fill="#192b2e" stroke={colour.line} strokeWidth={2}/><Label x={245+i*370} y={285} size={27} anchor="middle" fill={colour.muted}>{['First','Second','Third','Fourth'][i]}</Label></g>)}
   {middle.map((name,i)=>{
     const distance=finish.indexOf(name)-i;
     const hop=name==='Dani'&&!answer?-36*Math.sin(Math.PI*progress):0;
     return <g key={name} transform={`translate(${100+370*(i+progress*distance)} ${125+hop})`}><rect width={290} height={106} rx={14} fill={personColours[name]}/><circle cx={56} cy={53} r={25} fill="#203639"/><text x={56} y={62} fontSize={27} fill={personColours[name]} fontWeight={700} textAnchor="middle">{name[0]}</text><text x={103} y={68} fill="#203639" fontWeight={750} fontSize={44}>{name}</text></g>
   })}
   <Label x={65} y={345} size={30}>{answer?'Both ordering rules hold. Chen is third in this line.':'Dani can move without changing the order of Ava, Ben and Chen.'}</Label>
 </>;
}
function Week({t}:{t:number}) {
 const days=['Monday','Tuesday','Wednesday','Thursday','Friday'];
 const time=[1.5,6,0,7.5,2.4];
 return <>
   <Panel x={22} y={15} w={1556} h={355}/>
   <Label x={65} y={76} size={33}>Exactly four open weekdays</Label>
   {days.map((s,i)=>{
     const closed=i===2,fade=motion(t,closed?9:time[i],closed?9.4:time[i]+.5);
     return <g key={s}><rect x={75+i*296} y={110} width={269} height={153} rx={15} fill="#213638" stroke={colour.line} strokeWidth={3}/><Label x={210+i*296} y={162} size={30} anchor="middle">{s}</Label><g opacity={fade}><rect x={102+i*296} y={183} width={214} height={51} rx={8} fill={closed?'#35464a':'#224e40'}/><Label x={210+i*296} y={220} size={30} anchor="middle" fill={closed?colour.muted:colour.mint}>{closed?'Closed':'Open'}</Label></g></g>;
   })}
   <Label x={65} y={331} size={29} fill={colour.sky}>Monday and Friday must open. Choose two more open days.</Label>
 </>;
}
function Car({x,y,fill}:{x:number;y:number;fill:string}) {
 return <g transform={`translate(${x} ${y})`}><rect x={-5} y={23} width={9} height={28} rx={4} fill="#0b1518"/><rect x={89} y={23} width={9} height={28} rx={4} fill="#0b1518"/><rect width={93} height={137} rx={23} fill={fill}/><path d="M10 33Q46 18 83 33L73 56H20Z" fill="#263e45"/><rect x={21} y={64} width={52} height={37} rx={8} fill="#b9dacf" opacity={.3}/><path d="M15 112Q46 123 78 112" fill="none" stroke="#2b4749" strokeWidth={6}/><path d="M12 12l14 -3m41 0l14 3" stroke="#f6edcf" strokeWidth={6}/></g>;
}
function Parking({t}:{t:number}) {
 const extra=motion(t,4.1,5.4)*(1-motion(t,7.7,9));
 return <>
   <Panel x={22} y={15} w={1556} h={355}/>
   <Label x={65} y={70} size={32}>Exactly three occupied spaces</Label>
   {[0,1,2,3,4].map(i=><g key={i}><path d={`M${200+i*260} 116v157h194V116`} stroke="#78918b" strokeWidth={5} strokeLinecap="round" fill="none"/><Label x={297+i*260} y={316} anchor="middle" size={25} fill={colour.muted}>{i+1}</Label></g>)}
   {[0,1,2].map((i)=><Car key={i} x={252+i*260} y={113} fill={[colour.sky,colour.mint,'#d7b890'][i]}/>)}
   <g opacity={extra}><Car x={1032} y={57+56*extra} fill={colour.orange}/><Label x={1454} y={191} size={29} anchor="end" fill={colour.orange}>4 breaks</Label><Label x={1454} y={228} size={29} anchor="end" fill={colour.orange}>the rule</Label></g>
 </>;
}
function Traffic({t}:{t:number}) {
 const normalized=motion(t,8.4,10), showTrips=motion(t,4.7,5.4);
 return <>
   <Panel x={22} y={15} w={1556} h={355}/>
   <Label x={65} y={73} size={31} fill={colour.sky}>{normalized>.5?'Crashes per 100 trips':'Recorded crashes'}</Label>
   {[{name:'Road A',raw:40,trips:'4,000',rate:1,col:colour.sky},{name:'Road B',raw:20,trips:'1,000',rate:2,col:colour.mint}].map((r,i)=>{
      const y=111+i*88,w=r.raw*13*(1-normalized)+r.rate*260*normalized;
      return <g key={r.name}><Label x={70} y={y+44} size={36}>{r.name}</Label><rect x={256} y={y+7} width={560} height={45} rx={9} fill="#25383b"/><rect x={256} y={y+7} width={w} height={45} rx={9} fill={r.col}/><Label x={843} y={y+43} size={36} fill={r.col}>{normalized>.5?r.rate:r.raw}</Label><g opacity={showTrips}><Label x={1030} y={y+41} size={31} fill={colour.muted}>{r.raw} crashes / {r.trips} trips</Label></g></g>;
   })}
   <Label x={70} y={326} size={29} fill={colour.muted}>{showTrips>.1?'Suppose these were the trip counts. Compare the same number of trips.':'We have the totals. The number of trips is missing.'}</Label>
 </>;
}
function Frog({x,y,fill}:{x:number;y:number;fill:string}) {
 return <g transform={`translate(${x} ${y})`}><path d="M-29 15q-28 16 -37 10q9 -16 25 -29m68 19q28 16 37 10q-8 -16 -25 -29" fill={fill}/><ellipse cy={1} rx={32} ry={23} fill={fill}/><ellipse cy={-16} rx={29} ry={19} fill={fill}/><circle cx={-17} cy={-28} r={9} fill={fill}/><circle cx={17} cy={-28} r={9} fill={fill}/><circle cx={-17} cy={-30} r={3.8} fill="#203131"/><circle cx={17} cy={-30} r={3.8} fill="#203131"/></g>;
}
function Sightings({t}:{t:number}) {
 const example=motion(t,4.8,6);
 return <>
   <Panel x={22} y={15} w={1556} h={355}/>
   <Label x={68} y={75} size={30} fill={colour.sky}>Observer’s tally</Label>
   <Label x={68} y={149} size={46}>113 red sightings</Label>
   <Label x={68} y={219} size={46}>15 green sightings</Label>
   <g opacity={example}><rect x={690} y={73} width={830} height={183} rx={20} fill="#395e4b"/>
     <path d="M720 242q170-145 400-149m-238 69 13-48m85 12 17-29m-41 45 52 4m192 77q130-121 273-130m-132 65-9-36m43 14 44 2" stroke="#4d7357" strokeWidth={9} opacity={.8} fill="none"/>
     <Frog x={817} y={150} fill="#e17d61"/><Frog x={982} y={192} fill="#456b50"/><Frog x={1179} y={171} fill="#e17d61"/><Frog x={1396} y={146} fill="#456b50"/>
     <Label x={1100} y={302} size={25} anchor="middle" fill={colour.muted}>Example habitat · two frogs of each colour</Label></g>
   <Label x={68} y={330} size={29}>A sighting counts a time a frog was seen.</Label>
 </>;
}
export const polishedLogicIds=new Set(['01-c1-worked','01-c4-worked','02-m1-worked','02-m1-answer','02-m2-worked','02-m3-worked','03-a7-worked','03-a8-worked']);
export function PolishedLogic({id,scene}:{id:string;scene?:Scene}) {
 const frame=useCurrentFrame(),{fps}=useVideoConfig();
 const actualSec=Math.max(1,(scene?.audioFrames||fps)/fps);
 const refSec=refDurations[id]??actualSec;
 const scale=scene?.audioFrames?Math.max(0.65,Math.min(1.55,refSec/actualSec)):1;
 const t=Math.min(refSec+1,(frame/fps)*scale);
 let art;
 switch(id){
  case '01-c1-worked':case '01-c4-worked':art=<Scanner t={t} silent={id.includes('c4')}/>;break;
  case '02-m1-worked':case '02-m1-answer':art=<LineUp t={t} answer={id.endsWith('answer')}/>;break;
  case '02-m2-worked':art=<Week t={t}/>;break;
  case '02-m3-worked':art=<Parking t={t}/>;break;
  case '03-a7-worked':art=<Traffic t={t}/>;break;
  case '03-a8-worked':art=<Sightings t={t}/>;break;
  default:return null;
 }
 return <svg viewBox="0 0 1600 380" width="100%" height="100%" aria-label={id+' reasoning illustration'} style={type}>{art}</svg>;
}
