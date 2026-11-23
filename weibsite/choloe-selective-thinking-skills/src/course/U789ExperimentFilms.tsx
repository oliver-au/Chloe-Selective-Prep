import {Board,Caption,Chip,Divider,Plate,Text,coral,cream,ease,gold,green,ink,lerp,pathPose,teal,type Shot} from './U789Studio';

const hues=[coral,teal,green];
export function WorstDraw({t,at}:Shot){
 const first=at('draw one of each colour',9.1),fourth=at('a fourth must repeat',13.1);
 return <Board name="Drawing marbles without replacement"><Caption x={76} y={57}>THE BAG · FOUR OF EACH COLOUR</Caption>
 <path d="M133 101q153 21 302 0l-11 34q78 164-21 173H162q-101-9-22-170Z" fill="#dbca9e" stroke="#95805a" strokeWidth="4"/><path d="M139 124q143 17 296 0" fill="none" stroke="#9a7445" strokeWidth="6"/><Divider x={566}/>
 <Caption x={643} y={63}>ONE POSSIBLE DRAW</Caption>{['1','2','3','4'].map((n,i)=><g key={n}><Plate x={632+i*213} y={136} w={164} h={110}/><Text x={714+i*213} y={283} size={27}>Draw {n}</Text></g>)}
 {Array.from({length:12},(_,i)=>{const c=Math.floor(i/4),j=i%4,target=j===0?c:i===1?3:-1,when=target===3?fourth: first+target*.52;
 const p=target<0?0:ease(t,when,.92),x=197+j*57,y=172+c*52;return <g key={i} transform={pathPose(x,y,target<0?x:714+target*213,191,p,74)}><Chip x={0} y={0} r={22} color={hues[c]}/></g>;})}
 <g opacity={ease(t,fourth+1,.5)}><path d="M710 119v-16h638v16" fill="none" stroke={ink} strokeWidth="3"/><Text x={1057} y={328} size={24}>Any fourth marble repeats a colour already drawn.</Text></g></Board>;
}
export function Switchboard({t,at}:Shot){
 const one=ease(t,at('after switch one',6.1),.9),two=ease(t,at('after switch two',9.4),.9);
 const lit=[one,one*(1-two),two],colors=['#ec8a6f','#8fcb96','#7bc3d0'];
 return <Board name="Tracing two switches to the lamps they reverse"><Caption x={77} y={54}>TWO TOGGLES · THREE LAMPS</Caption>
 <Plate x={68} y={78} w={1449} h={233} fill="#d0c7aa"/>
 {[0,1].map(i=>{const p=i?two:one;return <g key={i}><rect x="122" y={110+i*110} width="242" height="66" rx="15" fill="#324a45"/><Text x={205} y={153+i*110} color={cream} size={27}>Switch {i+1}</Text><path d={`M286 ${143+i*110}l${lerp(-18,18,p)} -23`} stroke={gold} strokeWidth="10" strokeLinecap="round"/></g>;})}
 {[[0,0],[0,1],[1,1],[1,2]].map(([sw,lamp],i)=>{const p=sw?two:one,x=705+lamp*311,y=143+sw*110,lane=89+i*12,d=`M360 ${y}H${425+i*28}V${lane}H${x}V168`;return <g key={i}><path d={d} fill="none" stroke="#8d947d" strokeWidth="4"/><path d={d} pathLength="1" strokeDasharray={`${p} 1`} stroke={sw?coral:teal} fill="none" strokeWidth="5"/></g>;})}
 {['Red','Green','Blue'].map((name,i)=><g key={name} transform={`translate(${705+i*311} 198)`}><circle r="54" fill="#314743" stroke="#9a8f6d" strokeWidth="8"/><circle r="42" fill={colors[i]} opacity={lit[i]}/><path d="M-27-9q4-18 20-21" stroke={cream} strokeWidth="4" fill="none" opacity=".65"/><Text x={0} y={84} size={25}>{name} · {lit[i]>.5?'on':'off'}</Text></g>)}</Board>;
}
function dog(trot:number,color:string){
 return <g><path d="m-16-2q-12-8-15-17" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"/>{[-14,-7,8,16].map((x,i)=><path key={i} d={`M${x} 3l${trot*(i%2?5:-5)} 16`} stroke={i%2?color:'#604f43'} strokeWidth="5" strokeLinecap="round"/>)}<ellipse rx="24" ry="13" fill={color}/><circle cx="18" cy="-15" r="12" fill={color}/><path d="m12-23-8 1 6 14Z" fill="#72563e"/><path d="m24-17 13 4q-1 7-14 4" fill={color}/><circle cx="24" cy="-18" r="2" fill={ink}/></g>;
}
export function DogParade({t,at}:Shot){
 const a=at('give each person one dog',13.7),b=at('three people have a second dog',17.6),num=ease(t,at('eleven dogs',12),.55);
 return <Board name="Leading eleven dogs to eight owners"><Caption x={76} y={54}>MEETING AT THE DOG PARK</Caption><path d="M67 259q712 16 1463 0v45H67Z" fill="#cfceb1"/>
 {Array.from({length:8},(_,i)=>{const x=176+i*176;return <g key={i} transform={`translate(${x} 117)`}><ellipse cy="128" rx="47" ry="6" fill={ink} opacity=".17"/><circle cy="1" r="16" fill={i%2?'#bd9068':'#ac7f62'}/><path d="M-15-2q-3-20 18-15l11 7-11 3q-10-4-18 8" fill="#514941"/><path d="M-14 22q13-11 28 0l10 43h-47Z" fill={i%2?teal:green}/><path d="M-12 69l-5 55m28-55 4 55" fill="none" stroke={ink} strokeWidth="10" strokeLinecap="round"/></g>;})}
 {Array.from({length:11},(_,i)=>{const extra=i>=8,n=extra?i-8:i,p=ease(t,(extra?b:a)+n*(extra?.2:.12),1),x0=113+(i%6)*47,y0=282-Math.floor(i/6)*29,x1=176+n*176+(extra?43:-26),y1=extra?248:258;
 return <g key={i} opacity={num} transform={pathPose(x0,y0,x1,y1,p,9)}><g transform={`scale(${lerp(.6,.83,p)})`}><ellipse cy="19" rx="25" ry="3.8" opacity=".16" fill={ink}/>{dog(p>0&&p<1?Math.sin(p*Math.PI*8):0,extra?'#b97648':'#92785e')}</g></g>;})}
 <g opacity={ease(t,b+1.5,.65)}><Text x={354} y={332} size={26}>3 people with two dogs</Text><Text x={1100} y={332} size={26}>5 people with one dog</Text></g></Board>;
}
function sector(cx:number,cy:number,r:number,a:number,b:number){const xy=(f:number)=>[cx+r*Math.sin(2*Math.PI*f),cy-r*Math.cos(2*Math.PI*f)];const s=xy(a),e=xy(b);return `M${cx} ${cy}L${s[0]} ${s[1]}A${r} ${r} 0 ${b-a>.5?1:0} 1 ${e[0]} ${e[1]}Z`;}
export function NewWhole({t,at}:Shot){
 const leave=ease(t,at('for tennis and swimming only',11.8),1.3),change=ease(t,at('new whole is twenty',15.3),1.65);
 const fractions=[0,lerp(.5,.6,change),lerp(20/24,1,change),1];
 return <Board name="Removing four runners changes the denominator"><Caption x={76} y={54}>MEMBERSHIP REGISTER</Caption>
 {['Tennis','Swimming','Running'].map((name,i)=><g key={name}><Text x={256} y={120+i*88} size={29} anchor="end">{name}</Text>
 {Array.from({length:[12,8,4][i]},(_,j)=>{const x=313+j*42,yp=110+i*88;return <g key={j} transform={`translate(${i===2?leave*143:0} ${i===2?leave*29:0})`} opacity={i===2?1-leave*.76:1}><Chip x={x} y={yp} r={14} color={[green,teal,coral][i]}/></g>;})}</g>)}
 <Divider x={884}/>{[0,1,2].map((_,i)=>{if(fractions[i+1]-fractions[i]<.0001)return null;return <path key={i} d={sector(1162,183,107,fractions[i],fractions[i+1])} fill={[green,teal,coral][i]} stroke={cream} strokeWidth="3"/>;})}
 <Text x={1391} y={156} size={30}>Tennis</Text><Text x={1391} y={217} size={42}>{change===1?'12 / 20':'12 / 24'}</Text><Text x={1162} y={325} size={27}>{change===1?'60% of the smaller club':'50% of the full club'}</Text></Board>;
}
function Bird({peck}:{peck:number}){return <g><path d="M-54-5-98-31l17 48 57 11" fill="#677f77"/><path d="m-24 27-5 34m27-30 4 31m-41 0h22m6 0h24" stroke="#7e674d" strokeWidth="5" fill="none" strokeLinecap="round"/><ellipse cx="-8" cy="0" rx="64" ry="41" fill="#92a898"/><path d="M-52-12q40-23 73 11-30 27-63 15" fill="#617f79"/><g transform={`rotate(${peck*64} 16 3)`}><circle cx="38" cy="-37" r="33" fill="#9bae98"/><path d="m61-43 27 9-28 6" fill="#bb914d"/><circle cx="49" cy="-45" r="4.2" fill={ink}/></g></g>;}
export function BirdTest({t,at}:Shot){
 const seesSeeds=at('seeing our bird eat seeds',11.2);
 const seesBerry=at('seeing it eat a berry',14.1);
 const otherSighting=at('if all we see',17.2);
 const seed=ease(t,seesSeeds,1.1),berry=ease(t,seesBerry,1.2);
 const approach=ease(t,seesBerry-.7,.7), alternate=ease(t,otherSighting,.55);
 const hopAway=ease(t,otherSighting+.5,1.3);
 const exclusion=berry*(1-alternate);
 return <Board name="Two separate sightings test which bird types are possible">
  <Caption x={75} y={55}>{alternate>.5?'ANOTHER POSSIBLE SIGHTING':'BIRD HIDE · TWO POSSIBLE TYPES'}</Caption>
  <path d="M75 265q315-25 617 0v28H75Z" fill="#ad9670"/><path d="M83 258q311-19 594 0" stroke="#8e805b" strokeWidth="5" fill="none"/>
  <g opacity={1-alternate}>
   <g transform={`translate(${271+approach*153} ${193-Math.sin(approach*Math.PI)*18})`}><Bird peck={Math.sin(seed*Math.PI)+Math.sin(berry*Math.PI)}/></g>
   <ellipse cx="350" cy="244" rx="10" ry="6" fill={gold} opacity={1-ease(seed,.45,.18)}/>
   <circle cx="507" cy="243" r="11" fill={coral} opacity={1-ease(berry,.45,.18)}/>
  </g>
  <g opacity={alternate}>
   <circle cx="507" cy="243" r="11" fill={coral}/>
   <g transform={`translate(${417-138*hopAway} ${193-24*Math.sin(hopAway*Math.PI)}) scale(-1 1)`}><Bird peck={0}/></g>
  </g>
  <Divider x={737}/><Text x={1138} y={94} size={31}>Which bird could we have seen?</Text>
  {['Type A','Type B'].map((name,i)=><g key={name}>
   <Plate x={818+i*358} y={128} w={312} h={136} fill={i&&exclusion>.65?'#dbc8b2':'#d4dfc8'}/>
   <Text x={975+i*358} y={180} size={37}>{name}</Text>
   <Text x={975+i*358} y={225} size={24}>{i?'Seeds · never berries':'Seeds · can eat berries'}</Text>
   {i===1&&<path opacity={exclusion} d="m1198 253 266-113" stroke={coral} strokeWidth="5"/>}
  </g>)}
  <g opacity={exclusion}><Text x={1142} y={316} size={25}>Eating the berry rules out type B.</Text></g>
  <g opacity={ease(t,otherSighting+1.25,.6)}><Text x={1142} y={316} size={25}>Untouched fruit fits either type.</Text></g>
 </Board>;
}
function Stain({x,y}:{x:number;y:number}){return <g transform={`translate(${x} ${y})`}><path d="M-33-11q-16-29 10-21 12-26 28-2 27-11 26 12 26 24-2 30-3 25-28 13-19 14-25-7-26 0-9-25Z" fill="#a36d47" opacity=".83"/><circle cx="38" cy="23" r="5" fill="#a36d47" opacity=".55"/></g>;}
export function CleanerTrial({t,at}:Shot){
 const use=at('it was used correctly',6.6),sweep=ease(t,use,.96),clear=ease(t,at('but the stain remained',8.7),.86),control=ease(t,at('when no cleaner was used',15),.55);
 return <Board name="A correctly treated stain tests the cleaner's promise"><Caption x={75} y={53}>TESTING THE PROMISE · FOLLOW THE DIRECTIONS</Caption>
 {[370,1180].map((x,i)=><g key={x} opacity={i?.52+.48*control:1}><rect x={x-251} y="85" width="502" height="175" rx="5" fill="#e8dbbc" stroke="#9b957e" strokeWidth="2"/><rect x={x-240} y="95" width="480" height="155" rx="4" fill="none" stroke="#b8a989" strokeWidth="2" strokeDasharray="8 6"/><Stain x={x} y={180}/><Text x={x} y={305} size={28}>{i?'Untreated comparison':sweep>.8?'Cleaner used as directed':'Test patch'}</Text></g>)}
 <Divider x={783}/><g opacity={sweep*(1-clear)}><circle cx="370" cy="179" r={22+43*sweep} fill={teal} opacity=".22"/>{[0,1,2,3,4].map(i=><circle key={i} cx={341+i*13} cy={146+(i%2)*13} r="6" fill={cream} opacity=".83"/>)}</g>
 <g transform={`translate(${lerp(142,270,sweep)-clear*92} ${118+clear*19})`} opacity={1-clear}><path d="M-31 21h52l9 57h-69Z" fill={teal} stroke={ink} strokeWidth="3"/><path d="M-10 19V1h44l19 10-5 9-29-6-1 8" fill="#c3ab76" stroke={ink} strokeWidth="3"/><path d="m50 19 40 18m-38-14 32 25m-43-20 25 26" fill="none" stroke={teal} strokeWidth="4" opacity={Math.sin(sweep*Math.PI)}/></g>
 <g opacity={clear}><path d="M462 148q-12 0-37 19" fill="none" stroke={ink} strokeWidth="3"/><Text x={613} y={148} size={23} anchor="end">Stain remains</Text></g></Board>;
}
