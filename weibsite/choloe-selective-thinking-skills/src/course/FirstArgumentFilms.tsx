import {ink,ivory,teal,amber,brick,blue,leaf,faded,ease,mix,Letter,Stamp,Sheet,Trail,Place,Person,Cup} from './FirstFilmArt';
import type {Shot} from './FirstFilmArt';

function Scores({t,spelling=false}:{t:number;spelling?:boolean}){
 const after=ease(t,spelling?11.8:4,.95),start=spelling?1:ease(t,10.3,1),alternative=spelling?0:ease(t,12.5,1.6);
 const begin1=mix(224,150,alternative),begin2=224;
 return <><Letter x={57} y={50} align="start" size={31}>{spelling?'Test the spelling claim':'Compare two possible starting points'}</Letter>
 <Place x={50} y={75} w={917} h={241}/><Letter x={373} y={111} size={23} fill={faded}>Before</Letter><Letter x={770} y={111} size={23} fill={faded}>After</Letter>
 <path d="M126 280V134m0 146h711" fill="none" stroke="#9e9c83" strokeWidth={3}/><Letter x={139} y={151} align="start" size={19} fill={faded}>higher</Letter>
 <path d="M373 123v156m397-156v156" stroke="#b3ad91" strokeDasharray="6 7" strokeWidth={2}/>
 {[{y:begin2,end:218,c:blue},{y:begin1,end:154,c:teal}].map((r,i)=><g key={i}><g opacity={start}><circle cx={373} cy={r.y+(i===0?4:-4)} r={8} fill={r.c}/></g><path d={`M373 ${r.y+(i===0?4:-4)}L770 ${r.end}`} pathLength="1" strokeDasharray="1" strokeDashoffset={1-(spelling?after:start)} stroke={r.c} strokeWidth="5" opacity={start*after} fill="none"/><circle cx={spelling?mix(373,770,after):770} cy={spelling?mix(r.y+(i===0?4:-4),r.end,after):r.end} r={10} fill={r.c} opacity={after}/></g>)}
 <Letter x={370} y={258} size={21} fill={faded}>{spelling?'Similar starting levels':start>.6?'Possible starting levels':'Starting levels unknown'}</Letter>
 <Letter x={780} y={302} size={19} fill={faded}>Illustrative scores</Letter>
 <Place x={995} y={75} w={393} h={241}/><g transform="translate(1021 124)"><circle r={10} fill={teal}/><Letter x={24} y={9} align="start" size={25}>{spelling?'Daily review class':'Maths club members'}</Letter></g>
 <g transform="translate(1021 176)"><circle r={10} fill={blue}/><Letter x={24} y={9} align="start" size={25}>{spelling?'Usual spelling class':'Other pupils'}</Letter></g>
 <g opacity={spelling?ease(t,8.9,1):alternative}><path d="M1021 204h334" stroke="#b9aa8b" strokeWidth={2}/><Letter x={1190} y={254} size={23}>{spelling?'Same spelling test':'Could the gap predate club?'}</Letter></g></>;
}
function Homework({t}:{t:number}){
 const reminder=ease(t,.5,1.1),fall=ease(t,1.8,1.8),call=ease(t,5.8,1.5),compare=ease(t,10.6,1.6);
 return <><Letter x={55} y={50} align="start" size={32}>One change in homework, two possible reasons</Letter>
 <Place x={50} y={78} w={883} h={235}/><path d="M112 275h762" stroke="#948c73" strokeWidth={3}/><path d="M433 111v165" stroke={amber} strokeWidth={4} strokeDasharray="8 7"/><Letter x={435} y={302} size={20} fill={faded}>{call>.6?'Both changes start here':'Reminders start'}</Letter>
 <path d="M104 149h318" stroke={ink} strokeWidth={8} strokeLinecap="round"/><Trail d="M422 149h70c96 0 117 78 224 78h151" show={fall} color={teal} w={8}/><Letter x={191} y={119} size={22}>More late work</Letter><g opacity={fall}><Letter x={780} y={196} size={23}>Less late work</Letter></g>
 <g opacity={reminder}><circle cx={433} cy={149} r={12} fill={amber} stroke={ivory} strokeWidth={4}/></g>
 <g opacity={call} transform={`translate(${mix(1095,433,call)} ${mix(211,227,call)})`}><circle r={14} fill={brick} stroke={ivory} strokeWidth={3}/><path d="M-6-6q-4 1 0 7t9 5l2-3-4-3-2 1-3-4 1-2z" fill={ivory}/></g>
 <Place x={964} y={78} w={427} h={235}/><g opacity={reminder}><path d="M1011 128l24-15 27 15v40h-51z" fill={amber} stroke="#8c714f" strokeWidth={2}/><path d="m1013 131 23 17 23-17" fill="none" stroke="#8c714f" strokeWidth={3}/><Letter x={1084} y={151} align="start" size={25}>School reminders</Letter></g>
 <g transform={`translate(${35*(1-call)} 0)`} opacity={call}><path d="M1017 198q-10 1-7 10 9 31 44 40 10 0 9-7l-3-11-12-3-4 6q-15-8-19-17l6-5-5-12z" fill={teal}/><Letter x={1084} y={228} align="start" size={25}>Calls to parents</Letter></g><g opacity={compare}><path d="M1012 265h341" stroke="#b0a78b" strokeWidth={2}/><Letter x={1182} y={293} size={21} fill={faded}>The drop cannot separate them.</Letter></g></>;
}
function Award({t}:{t:number}){
 const checked=ease(t,3.3,1.4),direction=ease(t,8.2,1.8),reverse=ease(t,11.7,1.7);
 return <><Letter x={60} y={52} align="start" size={31}>Workshop register and prize list</Letter><Place x={82} y={72} w={1275} h={238}/>
 <Cup x={306} y={197} s={1.25}/><Letter x={307} y={262} size={27}>Prize winner</Letter>
 <Sheet x={1044} y={186} w={277} h={158} label="Workshop" sub="Attendance register"/><g opacity={checked}><Stamp x={1028} y={259} w={224}>Noah attended</Stamp></g>
 <Trail d="M467 146h358" show={direction} color={teal} w={8}/><path d="m806 129 27 17-27 17" fill="none" stroke={teal} strokeWidth={7} opacity={direction}/>
 <g opacity={reverse}><Trail d="M826 216H568" show={1} color={brick} w={6} dash/><path d="m518 200 31 32m0-32-31 32" stroke={brick} strokeWidth={7}/><Letter x={688} y={266} size={23} fill={faded}>Reverse is unproved</Letter></g></>;
}
function Cycle({t}:{t:number}){
 const arrive=ease(t,6.9,2),remove=ease(t,11.7,1.8),stall=ease(t,14.6,1);
 function bike(x:number,y:number){return <g transform={`translate(${x} ${y})`}><g fill="none" stroke={ink} strokeWidth={4}><circle cx={-47} cy={0} r={26}/><circle cx={45} cy={0} r={26}/></g><path d="m-47 0 22-39L6 0h-53l54-30 38 30-16-52h15m-69 10-5-8h-14" fill="none" stroke={brick} strokeWidth={5} strokeLinejoin="round"/></g>;}
 return <><Letter x={58} y={52} align="start" size={32}>Why would secure storage add riders?</Letter>
 <rect x={46} y={90} width={892} height={193} rx={9} fill="#bfccb4"/><path d="M46 234q345-42 894-3v52H46Z" fill="#aba88c"/><path d="M112 225h752" stroke="#868e7d" strokeWidth={4}/>
 <g transform="translate(561 124)">{[0,1,2].map(i=><path key={i} d={`M${i*70} 96v-38a14 14 0 0 1 28 0v38`} fill="none" stroke="#5d8077" strokeWidth={8}/>)}</g>
 <g opacity={arrive*(1-remove)}>{bike(mix(147,565,arrive),224)}</g><Letter x={513} y={307} size={22} fill={faded}>Secure bike storage</Letter>
 <Place x={968} y={79} w={421} h={223}/><Letter x={1180} y={124} size={27}>{remove>.5?'Try the opposite':'The council needs a rider'}</Letter><Letter x={1180} y={174} size={24}>{remove>.5?'Nobody held back because':'Someone held back because'}</Letter><Letter x={1180} y={209} size={24}>storage was missing.</Letter><Stamp x={1180} y={262} w={333} color={brick} show={stall}>No extra rider explained</Stamp></>;
}
function Book({x,y,colour=teal,angle=0,s=1}:{x:number;y:number;colour?:string;angle?:number;s?:number}){return <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}><path d="M-50-44h101v116H-52q-10-4 2-13Z" fill="#d1bea0" stroke="#8a795e" strokeWidth={2}/><path d="M-55-54h100v115H-55q-6-1-6-6v-102q0-7 6-7Z" fill={colour}/><path d="M-47-50V56m10-78h58m-54 11h48" stroke="#c0cba9" strokeWidth={3}/><path d="M5-4l6 12 13 2-10 9 2 13-11-6-12 6 3-13-10-9 13-2Z" fill={amber}/></g>;}
function Reading({t}:{t:number}){
 const forward=ease(t,3.2,2),back=ease(t,6.8,3),both=ease(t,14,1.4);
 return <><Letter x={58} y={49} align="start" size={32}>Which way could the effect run?</Letter>
 <Place x={72} y={73} w={1289} h={225}/>{[0,1,2].map(i=><Book key={i} x={245+i*18} y={174-i*4} colour={[blue,leaf,brick][i]} angle={[-13,-3,6][i]} s={.77}/>)}
 <Letter x={276} y={266} size={26}>More reading</Letter><Sheet x={1156} y={169} w={262} h={127} label="More words" sub="A larger vocabulary"/>
 <g opacity={forward}><Trail d="M412 150Q710 97 993 152" show={forward} color={teal}/><path d="m974 138 23 15-28 7" fill="none" stroke={teal} strokeWidth={6}/><Letter x={712} y={105} size={22}>Reading may teach words</Letter></g>
 <g opacity={back}><Trail d="M1000 209Q704 256 416 207" show={back} color={brick}/><path d="m438 199-25 7 18 19" fill="none" stroke={brick} strokeWidth={6}/><Letter x={703} y={278} size={22}>Knowing words may lead to reading</Letter></g><g opacity={both}><Letter x={717} y={319} size={20} fill={faded}>Both directions could operate. The survey cannot choose.</Letter></g></>;
}
function Survey({t}:{t:number}){
 const chosen=ease(t,.9,2.6),scope=ease(t,7.7,2.1);
 return <><Letter x={55} y={54} align="start" size={31}>Who actually answered?</Letter>
 <Place x={58} y={75} w={1295} h={226} fill="#dfd9be"/><Letter x={280} y={115} size={25}>{chosen>.95?'Other school pupils':'School pupils'}</Letter><Letter x={1098} y={115} size={25}>Chess club sample</Letter>
 {Array.from({length:12},(_,i)=>{const club=[2,5,8,11].indexOf(i);const x=156+i%6*115,y=190+Math.floor(i/6)*78,tx=club<0?x:mix(x,931+club*100,chosen);return <g key={i} opacity={club<0?mix(.42,1,scope):1}><Person x={tx} y={club<0?y:mix(y,235,chosen)} s={.57} color={club<0?'#9f9e83':teal} skin={['#956c55','#bd886b','#a1785a'][i%3]}/>{club>=0&&<g opacity={chosen}><circle cx={tx+20} cy={170} r={12} fill={ivory} stroke={teal} strokeWidth={2}/><path d={`M${tx+15} 175h11l-3-6 2-5-4-3-3 2-1 6z`} fill={teal}/></g>}</g>;})}
 <path d="M854 124v147" stroke={teal} strokeWidth={3} strokeDasharray="7 8"/><g opacity={scope}><Letter x={392} y={320} size={23} fill={faded}>These pupils’ preferences were never collected.</Letter></g></>;
}
function Traffic({t}:{t:number}){
 const trips=ease(t,6.9,1.4),rate=ease(t,10.6,2.7);
 return <><Letter x={55} y={51} align="start" size={31}>Road records · compare the same exposure</Letter>
 {[{label:'Road A',total:40,trips:'4,000',rate:1,c:teal},{label:'Road B',total:20,trips:'1,000',rate:2,c:brick}].map((r,i)=>{const y=116+i*106;return <g key={r.label}><Letter x={125} y={y+26} size={28}>{r.label}</Letter><rect x={225} y={y-9} width={540} height={44} rx={10} fill="#526965"/><path d={`M244 ${y+14}h498`} stroke="white" opacity=".57" strokeWidth={2} strokeDasharray="14 12"/><rect x={225} y={y-8} width={mix(r.total*13,r.rate*245,rate)} height={41} rx={8} fill={r.c}/><Letter x={807} y={y+24} size={31} fill={r.c}>{rate>.98?r.rate:rate<.01?r.total:'…'}</Letter><g opacity={trips}><Letter x={900} y={y+23} align="start" size={26}>{r.total} crashes ÷ {r.trips} trips</Letter></g></g>;})}
 <Letter x={490} y={309} size={23} fill={faded}>{rate>.98?'Crashes per 100 trips':rate>.01?'Changing to the same unit…':'Number of recorded crashes'}</Letter><g opacity={rate}><Stamp x={1125} y={302} w={349}>Per 100 trips · A 1, B 2</Stamp></g></>;
}
function Frog({x,y,c}:{x:number;y:number;c:string}){return <g transform={`translate(${x} ${y})`}><ellipse cx={3} cy={12} rx={37} ry={8} fill="#2e5140" opacity=".35"/><path d="M-21 2q-21 8-17 15l24-7m37-8q20 8 18 15L18 10" fill={c}/><ellipse rx={25} ry={16} fill={c}/><ellipse cy={-10} rx={20} ry={12} fill={c}/>{[-11,11].map(n=><g key={n}><circle cx={n} cy={-20} r={6} fill={c}/><circle cx={n+1} cy={-21} r={2.5} fill={ink}/></g>)}</g>;}
function Habitat({t}:{t:number}){
 const scene=ease(t,6.3,1.4),sweep=ease(t,9.4,2.7),equal=ease(t,15.1,1.3);
 return <><Letter x={57} y={51} align="start" size={31}>A field observer’s notebook</Letter><Place x={53} y={78} w={411} h={226}/><Letter x={258} y={128} size={27}>Recorded sightings</Letter><Letter x={258} y={197} size={35} fill={brick}>113 red</Letter><Letter x={258} y={249} size={35} fill={teal}>15 green</Letter>
 <rect x={493} y={75} width={889} height={228} rx={12} fill="#719470"/><g>{[0,1,2,3,4].map(i=><path key={i} d={`M${535+166*i} 265q14-118 114-151q-20 81-99 118q47-6 69-24`} fill={i%2?'#527e57':'#61885d'} stroke="#729368" strokeWidth={4}/>)}</g>
 <g opacity={scene}>{[{x:630,y:198,c:'#c77255'},{x:807,y:162,c:'#64835d'},{x:1012,y:218,c:'#c77255'},{x:1215,y:166,c:'#64835d'}].map(a=><Frog key={a.x} {...a}/>)}</g>
 <g opacity={Math.sin(Math.PI*sweep)} transform={`translate(${mix(542,1302,sweep)} 166)`}><circle r={61} fill="#f4e4b4" fillOpacity=".1" stroke="#e2cba0" strokeWidth={6}/><path d="m43 42 31 34" stroke="#795d45" strokeWidth={12} strokeLinecap="round"/></g>
 <g opacity={equal}><Stamp x={939} y={268} w={459}>Possible pond · 2 red and 2 green</Stamp></g></>;
}
export const argumentsFilms:Record<string,Shot>={A0:Scores,A1:({t})=><Scores t={t} spelling/>,A2:Homework,A3:Award,A4:Cycle,A5:Reading,A6:Survey,A7:Traffic,A8:Habitat};
