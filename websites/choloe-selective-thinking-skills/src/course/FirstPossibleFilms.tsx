import {ink,teal,ivory,blue,brick,sea,leaf,faded,ease,mix,Letter,Place,Stamp,Person} from './FirstFilmArt';

function Line({t}:{t:number}){
 const descend=ease(t,6.3,.75),insert=ease(t,7.05,2.3),rise=ease(t,9.35,.8);
 return <><Letter x={56} y={55} size={32} align="start">Who could stand first?</Letter>
 <path d="M58 194h1317" stroke="#aa9a79" strokeWidth={6}/><path d="M58 291h1317" stroke="#c2b18b" strokeWidth={3} strokeDasharray="18 12"/>
 {['Ava','Ben','Chen','Dani'].map((n,i)=>{const x=i===3?mix(1191,235,insert):mix(235+i*318,553+i*318,insert);const y=i===3?193+100*(descend-rise):193;return <g transform={`translate(${x} ${y})`} key={n}><Person x={0} y={0} s={.65} color={[teal,blue,'#986e64',leaf][i]} skin={['#966e50','#bb8967','#ab7c60','#926950'][i]}/><rect x={-58} y={7} width={116} height={36} rx={10} fill={ivory} stroke="#ad9f80" strokeWidth={2}/><Letter x={0} y={34} size={25}>{n}</Letter></g>;})}
 <g opacity={ease(t,10,1)}><Stamp x={1104} y={58} w={355}>Dani can stand first</Stamp></g></>;
}
function Week({t}:{t:number}){
 const times=[4.2,9.6,99,10.2,4.9];
 return <><Letter x={59} y={54} size={31} align="start">A five-day shopfront</Letter>
 <path d="M46 285h1347" stroke="#998668" strokeWidth={7}/>
 {['Monday','Tuesday','Wednesday','Thursday','Friday'].map((n,i)=>{const x=64+264*i,up=ease(t,times[i],1.15),height=111*(1-up);return <g key={n} transform={`translate(${x} 0)`}><rect x={0} y={90} width={243} height={185} fill={['#cdc4a5','#d8b391','#d0bc9c','#d9bf9d','#c9c4a4'][i]} stroke="#ac9c7e" strokeWidth={2}/><rect x={22} y={139} width={199} height={116} fill="#47726d"/><path d="m23 243 75-103m9 110 76-109" stroke="#c7ddc2" opacity=".23" strokeWidth={13}/><Letter x={121} y={123} size={25}>{n}</Letter><Letter x={121} y={209} fill={ivory} size={29}>Open</Letter><svg x={22} y={137} width={199} height={height+1} overflow="hidden"><rect width={199} height={116} fill="#888c7b"/>{[0,1,2,3,4,5].map(j=><path key={j} d={`M0 ${j*19+6}h199`} stroke="#627169" strokeWidth={2}/>)}</svg><rect x={18} y={133+height} width={207} height={9} fill="#676f62"/><rect x={-4} y={81} width={251} height={10} fill={ink}/>{i===0||i===4?<Letter x={121} y={322} size={22} fill={teal}>Required</Letter>:null}</g>;})}
 <g opacity={ease(t,11.3,1)}><Stamp x={1100} y={51} w={258}>Four days open</Stamp></g></>;
}
function Car({x,y,color}:{x:number;y:number;color:string}){return <g transform={`translate(${x} ${y})`}><rect x={-30} y={-49} width={63} height={102} rx={17} fill="#2d413f" opacity=".25"/><path d="M-37-36h8v23h-8zm65 0h8v23h-8zM-37 17h8v23h-8zm65 0h8v23h-8z" fill="#314040"/><rect x={-31} y={-53} width={62} height={106} rx={17} fill={color} stroke="#445954" strokeWidth={2}/><path d="m-20-37 40 0 5 19-50 0zM-22 24h44l-4 12h-36z" fill="#4b6365"/><path d="M-19-43h9m20 0h9" stroke={ivory} strokeWidth={4} strokeLinecap="round"/></g>;}
function Parking({t}:{t:number}){
 const first=[1.0,1.8,2.65],four=ease(t,4.2,1.4)*(1-ease(t,11.9,1.7));
 return <><Letter x={56} y={54} align="start" size={31}>Five spaces · exactly three cars</Letter><rect x={48} y={93} width={1100} height={211} rx={16} fill="#526762"/><path d="M64 275h1067" stroke="#b6bb94" strokeDasharray="25 17" strokeWidth={4}/>
 {[0,1,2,3,4].map(i=><g key={i}><path d={`M${75+i*211} 227v-115h179v115`} fill="none" stroke="#d7d7b5" strokeWidth={4}/><Letter x={165+i*211} y={144} size={20} fill={ivory}>{i+1}</Letter></g>)}
 {first.map((s,i)=>{const p=ease(t,s,1.1);return <g opacity={p} key={s}><Car x={165+i*211} y={mix(293,184,p)} color={[sea,'#bb9864',skyColor][i]}/></g>;})}
 <g opacity={four}><Car x={798} y={mix(292,184,four)} color="#ce8273"/></g>
 <Letter x={1260} y={153} size={25}>Occupied</Letter><Letter x={1260} y={236} size={65} fill={four>.75?brick:teal}>{first.filter(n=>t>n+.85).length+(four>.75?1:0)}</Letter><Letter x={1260} y={281} size={22}>{four>.75?'Breaks the rule':'Limit · 3'}</Letter></>;
}
const skyColor='#8ba9af';
function Roll({t}:{t:number}){
 const all=ease(t,4.2,1.1),first=ease(t,9.2,1),rest=ease(t,12.7,1.8);
 return <><Letter x={55} y={55} align="start" size={32}>Choir rehearsal · possible roll calls</Letter>
 <Place x={51} y={81} w={1330} h={191}/>{['Ada','Ben','Chen','Dani','Eli'].map((n,i)=>{const cross=i===2?first:rest;return <g key={n} transform={`translate(${183+i*261} 0)`}><Letter x={0} y={129} size={26}>{n}</Letter><rect x={-40} y={150} width={80} height={75} rx={9} stroke="#9d987a" fill="#e4debe" strokeWidth={2}/><path d="M-24 187l17 16 33-39" fill="none" stroke={teal} strokeWidth={9} strokeLinecap="round" opacity={all*(1-ease(cross,0,.4))}/><g opacity={ease(cross,.49,.51)}><path d="M-17 170l34 33m0-33-34 33" stroke={brick} strokeWidth={7} strokeLinecap="round"/></g></g>;})}
 <Letter x={720} y={316} size={26} fill={faded}>{rest>.7?'Every singer absent also fits “not all came”.':first>.65?'One absentee is enough for “not all came”.':all>.5?'Test: every singer present. This contradicts the words.':'Test the words “not all came”.'}</Letter></>;
}
function Heights({t}:{t:number}){
 const above=ease(t,7.2,2.4),below=ease(t,13.8,2.5),x=359,y=mix(177,86,above)+211*below;
 return <><Letter x={57} y={51} align="start" size={32}>Possible orders · tallest at the top</Letter>
 <path d="M718 80v214" stroke="#9a957d" strokeWidth={6}/>{['Nina','Leo','Max'].map((n,i)=><g key={n}><path d={`M690 ${130+i*57}h54`} stroke={teal} strokeWidth={5}/><rect x={570} y={111+i*57} width={125} height={39} rx={15} fill={['#639c8a','#718f9b','#ab8972'][i]}/><Letter x={631} y={138+i*57} size={24} fill={ivory}>{n}</Letter></g>)}
 <g transform={`translate(${x} ${y})`}><rect x={-62} y={-23} width={124} height={46} rx={20} fill={brick}/><Letter x={0} y={10} size={27} fill={ivory}>Sam</Letter></g>
 <path d={`M${x+70} ${y}H557`} stroke={brick} strokeWidth={3} strokeDasharray="7 7" opacity={above}/><Letter x={1162} y={159} size={30}>{below>.97?'Nina is tallest.':below>.01?'Move Sam lower':above>.97?'Sam is tallest.':'Three fixed ranks'}</Letter><Letter x={1162} y={202} size={24} fill={faded}>{below>.97?'The original order still holds.':below>.01?'Keep the three fixed ranks.':above>.97?'This fits the clues.':'Nina above Leo above Max.'}</Letter></>;
}
export const possibilities={M1:Line,M2:Week,M3:Parking,M4:Roll,M5:Heights};
