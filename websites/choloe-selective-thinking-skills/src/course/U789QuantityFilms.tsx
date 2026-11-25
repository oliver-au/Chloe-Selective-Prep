import {Board,Caption,Chip,Divider,Plate,Text,coral,cream,ease,gold,green,ink,lerp,mute,pathPose,teal,type Shot} from './U789Studio';

export function Calendar({t,at}:Shot){
 const moves=[at('move one day',4),at('a second',5.4),at('and a third',6.8)];
 const step=moves.reduce((sum,s)=>sum+ease(t,s,.68),0);
 const second=ease(t,at('one full seven day week',10),1.3),again=ease(t,at('same weekday shift',14.4),1.3);
 const cols=['Tue','Wed','Thu','Fri','Sat','Sun','Mon'];
 return <Board name="Moving a meeting on two weeks of a calendar"><Caption x={76} y={56}>MEETING CALENDAR</Caption>
 {cols.map((v,i)=><g key={v}><Text x={367+i*174} y={98} size={28}>{v}</Text>{[0,1].map(w=><g key={w}><Plate x={295+i*174} y={116+w*100} w={144} h={77} fill={w?'#dfddc6':cream}/><Text x={309+i*174} y={144+w*100} anchor="start" size={20} color={mute}>+{w*7+i}d</Text></g>)}</g>)}
 <Text x={214} y={163} anchor="end">Week 1</Text><Text x={214} y={263} anchor="end">Week 2</Text>
 <g transform={`translate(${367+step*174} 165)`}><Chip x={0} y={0} r={19} color={coral}/></g>
 <g opacity={second} transform={`translate(${367+3*174*again} ${165+100*second})`}><Chip x={0} y={0} r={18} color={teal}/></g>
 <g opacity={again}><path d="M919 166v96" fill="none" stroke={teal} strokeWidth="3" strokeDasharray="6 5"/><Text x={800} y={327} size={26}>10 days = one week and three days</Text></g></Board>;
}
function Vessel({x,y,p,color}:{x:number;y:number;p:number;color:string}){
 return <g transform={`translate(${x} ${y})`}><rect x="-43" y="-24" width="86" height="54" rx="7" fill="#e9eade" stroke="#9aaba0" strokeWidth="3"/><rect x="-39" y={26-46*p} width="78" height={46*p} rx="4" fill={color}/>{p>.01&&<path d={`M-37 ${26-46*p}q12-4 24 0t24 0t24 0`} stroke={cream} fill="none" strokeWidth="2"/>}<path d="M-48-25h96" stroke={mute} strokeWidth="5" strokeLinecap="round"/></g>;
}
export function TankRate({t,at}:Shot){
 const n=[5,3,2],starts=[at('fill five tubs',11.3),at('fill three',14),at('leaves two',15.6)];
 return <Board name="Measuring two steady taps for the same hour"><Caption x={76} y={53}>TUBS FILLED IN THE SAME 60 MINUTES</Caption>
 {['Both taps','Tap A','Tap B'].map((v,i)=><g key={v}><Text x={301} y={117+i*90} anchor="end" size={34}>{v}</Text><path d={`M335 ${95+i*90}h28q12 0 12 13v6`} fill="none" stroke="#9c845c" strokeWidth="12"/>{Array.from({length:5},(_,j)=><Vessel key={j} x={475+j*150} y={105+i*90} p={j<n[i]?ease(t,starts[i]+j*.15,.7):0} color={[teal,green,coral][i]}/>)}</g>)}
 <Divider x={1190}/><Caption x={1245} y={94}>TAP B ALONE</Caption><g opacity={ease(t,starts[2]+.75,.6)}><Text x={1368} y={169} size={35}>2 tubs / 1 hour</Text></g><g opacity={ease(t,at('one tub in thirty',20.35),.6)}><Text x={1368} y={243} size={41} color={teal}>30 minutes</Text><Text x={1368} y={285} size={24}>for a single tub</Text></g></Board>;
}
export function EqualParts({t,at}:Shot){
 const red=at('there are eight red',4),blue=at('blue has three parts',8.3),total=ease(t,at('altogether',12.7),.8);
 return <Board name="Sorting counters into five equal trays"><Caption x={76} y={54}>SORT THE COUNTERS INTO EQUAL PARTS</Caption>
 {Array.from({length:5},(_,g)=>{const x=118+g*288;return <g key={g}><Plate x={x-40} y={115} w={257} h={141} fill={g<2?'#e4c4a8':'#c9d7cb'}/>
 {Array.from({length:4},(_,i)=>{const p=ease(t,(g<2?red:blue)+(g<2?g:g-2)*.26+i*.09,.85),endX=x+22+i*49;return <g key={i} opacity={p} transform={pathPose(endX-32,80,endX,183,p,6)}><Chip x={0} y={0} r={19} color={g<2?coral:teal}/></g>;})}<Text x={x+86} y={286} size={24}>{g<2?'Red':'Blue'} part {g<2?g+1:g-1}</Text></g>;})}
 <g opacity={total}><path d="M84 300v10h1431v-10" fill="none" stroke={ink} strokeWidth="3"/><Text x={800} y={340} size={24}>The whole has 5 equal parts · 2 of those 5 are red</Text></g></Board>;
}
function pencil(x:number,y:number){return <g transform={`translate(${x} ${y}) rotate(-7)`}><path d="M-5 7v-52h10V7L0 19Z" fill="#dba746" stroke="#79653d" strokeWidth="1.5"/><path d="m-5 7 5 12 5-12" fill="#e7c399"/><path d="m-2 14 2 5 2-5" fill={ink}/><path d="M-2-42V6" stroke="#fce3a1" strokeWidth="2"/></g>;}
export function KitBench({t,at}:Shot){
 const pens=at('pencils can support nine',6),stars=at('stickers support seven',8.1),fail=ease(t,at('an eighth would need',11.4),.65);
 return <Board name="Packing complete gift kits"><Caption x={76} y={57}>EACH ENVELOPE NEEDS TWO PENCILS AND THREE STICKERS</Caption>
 {Array.from({length:9},(_,g)=>{const x=134+g*166;return <g key={g}><path d={`M${x-66} 140l66-32 66 32v119h-132Z`} fill="#d9bd87" stroke="#98835d" strokeWidth="2"/>
 {[0,1].map(i=>{const p=ease(t,pens+g*.09+i*.08,.65);return <g key={i} opacity={p} transform={pathPose(x-24+i*34,92,x-20+i*34,171,p,0)}>{pencil(0,0)}</g>;})}
 <path d={`M${x-66} 158l66 26 66-26v101h-132Z`} fill="#ead29e" stroke="#a38a63" strokeWidth="2"/>
 {[0,1,2].map(i=>{const p=g<7?ease(t,stars+g*.1+i*.06,.52):0;return <g key={i}><circle cx={x-34+i*34} cy="221" r="13" fill="none" stroke="#ab996f" strokeDasharray="3 4"/><g opacity={p} transform={pathPose(x-36+i*34,178,x-34+i*34,221,p,0)}><Chip x={0} y={0} r={13} color={teal}/></g></g>;})}<Text x={x} y={294} size={24}>Kit {g+1}</Text>{g===7&&<rect x={x-72} y="195" width="144" height="49" rx="8" fill="none" stroke={coral} strokeWidth="4" opacity={fail}/>}</g>;})}
 <g opacity={fail}><Text x={800} y={337} size={25}>The eighth envelope is three stickers short.</Text></g></Board>;
}
export function ReversiblePress({t,at}:Shot){
 const moves=[at('take away the last eight',5.6),at('split twenty six into two equal groups',8.25),at('put back the five',10.7),at('subtracting five gives',15.1),at('double thirteen to get twenty six',17),at('adding eight brings',19.4)];
 const pos=[3,2,1,0,1,2,3],vals=[34,26,13,18,13,26,34],x0=220,gap=384;
 let x=x0+3*gap,value=34;
 moves.forEach((when,i)=>{const p=ease(t,when,.95);x+=(pos[i+1]-pos[i])*gap*p;if(p>=.94)value=vals[i+1];});
 return <Board name="Running a number through reversible presses"><Caption x={76} y={56}>NUMBER MACHINE</Caption><path d="M176 226H1423" stroke="#998766" strokeWidth="18"/><path d="M176 221H1423" stroke="#d0b991" strokeWidth="10"/>
 {['−5','×2','+8'].map((label,i)=><g key={label}><Plate x={x0+gap*i+119} y={84} w={146} h={169} fill="#c3c9b0"/><Text x={x0+gap*i+192} y={135} size={37}>{label}</Text><path d={`M${x0+gap*i+145} 173h88m-12-9 12 9-12 9`} stroke={mute} strokeWidth="3" fill="none"/></g>)}
 <g transform={`translate(${x} 224)`}><rect x="-53" y="-41" width="106" height="64" rx="10" fill="#ecad6d" stroke="#775934" strokeWidth="3"/><circle cx="-32" cy="27" r="9" fill={ink}/><circle cx="32" cy="27" r="9" fill={ink}/><Text x={0} y={5} size={38}>{value}</Text></g>
 <Text x={800} y={321} size={31}>{t<moves[0]?'The machine finished at 34':t<moves[3]?'Read backwards: subtract 8, divide by 2, add 5':'Check forwards: subtract 5, double, add 8'}</Text></Board>;
}
export function MatchDraw({t,at}:Shot){
 const build=ease(t,at('five opponents',3.7),1.35),fold=ease(t,at('every match appears twice',7.15),2.2),result=ease(t,at('there are fifteen',13),.65);
 const gx=502,gy=81,sx=99,sy=41;const teams='ABCDEF';
 return <Board name="Folding duplicate match entries onto the same pair"><Caption x={78} y={55}>FIXTURE REGISTER</Caption>
 {Array.from(teams,(v,i)=><g key={v}><Text x={gx+i*sx} y={45} size={22}>{v}</Text><Text x={427} y={gy+i*sy+8} size={22}>{v}</Text></g>)}
 {Array.from(teams,(_,r)=>Array.from(teams,(_,c)=>{if(r===c)return <path key={r+'-'+c} d={`M${gx+c*sx-9} ${gy+r*sy}h18`} stroke="#a69b83" strokeWidth="3"/>;const p=r>c?fold:0;
 return <g key={r+'-'+c} opacity={build} transform={`translate(${gx+lerp(c,r,p)*sx} ${gy+lerp(r,c,p)*sy})`}><rect x="-32" y="-15" width="64" height="30" rx="7" fill={r<c?'#b0c9b4':'#e4bd88'} stroke={ink} strokeWidth="1.4"/><Text x={0} y={7} size={19}>{teams[Math.min(r,c)]}·{teams[Math.max(r,c)]}</Text></g>;}))}
 <Divider x={1104}/><Text x={1322} y={124} size={35}>6 teams × 5</Text><Text x={1322} y={178} size={27}>30 team entries</Text><g opacity={result}><Text x={1322} y={257} size={43} color={green}>15 matches</Text></g></Board>;
}
export function ClubRoll({t,at}:Shot){
 const groups=[{n:7,x:661,y:157,start:at('put seven in the overlap',7.2),w:4,c:gold},{n:11,x:473,y:141,start:at('tennis has eleven',8.8),w:4,c:green},{n:8,x:843,y:158,start:at('soccer has eight',10.9),w:4,c:teal},{n:5,x:1193,y:160,start:at('five outside the circles',18),w:3,c:coral}];
 return <Board name="Placing every student in one disjoint region"><Caption x={79} y={56}>CLASS ROLL · ONE COUNTER FOR EACH STUDENT</Caption>
 <ellipse cx="579" cy="192" rx="197" ry="113" fill="#94bca2" fillOpacity=".36" stroke={green} strokeWidth="4"/><ellipse cx="779" cy="192" rx="197" ry="113" fill="#9abfc5" fillOpacity=".33" stroke={teal} strokeWidth="4"/>
 <Text x={469} y={105} size={23}>Tennis</Text><Text x={867} y={105} size={23}>Soccer</Text><Text x={1252} y={109} size={24}>Neither</Text>
 {groups.map((g,j)=><g key={g.n}>{Array.from({length:g.n},(_,i)=>{const p=ease(t,g.start+i*.05,.68),x=g.x+(i%g.w)*23,y=g.y+Math.floor(i/g.w)*30;return <g key={i} opacity={p} transform={pathPose(220,181+j*12,x,y,p,28)}><Chip x={0} y={0} r={10.5} color={g.c}/></g>;})}<g opacity={ease(t,g.start+1,.35)}><Text x={g.x+32} y={283} size={27}>{g.n}</Text></g></g>)}
 <g opacity={ease(t,at('class total to thirty',21),.5)}><Text x={800} y={331} size={26}>11 + 7 + 8 + 5 = 31 students</Text></g></Board>;
}
export function PassGate({t,at}:Shot){
 const groups=[[10,13,2],[11,14,3],[13,16,4]],x=(h:number)=>382+(h-10)*160;
 const sweep=ease(t,at('mark half past twelve',14.4),1.55),h=10+2.5*sweep;
 return <Board name="Reading visitor passes on half-open time windows"><Caption x={77} y={58}>PASS OFFICE</Caption>
 {groups.map(([a,b,n],i)=>{const y=102+i*76,p=ease(t,[.3,at('three have passes',4.1),at('four have passes',7)][i],1.25);return <g key={a}><Text x={281} y={y+10} size={30} anchor="end">{n} visitors</Text>
 <path d={`M${x(a)} ${y}H${lerp(x(a),x(b),p)}`} stroke={[green,teal,coral][i]} strokeWidth="14" strokeLinecap="round"/><circle cx={x(a)} cy={y} r="9" fill={ink}/><circle cx={lerp(x(a),x(b),p)} cy={y} r="10" stroke={ink} fill={cream} strokeWidth="3"/>
 {h>=a&&h<b&&<circle cx={x(h)} cy={y} r="14" fill={gold} stroke={ink} strokeWidth="2" opacity={sweep}/>}</g>;})}
 {Array.from({length:7},(_,i)=><Text key={i} x={x(i+10)} y={309} size={23}>{i+10}:00</Text>)}
 <g opacity={sweep}><path d={`M${x(h)} 70v207`} stroke={ink} fill="none" strokeWidth="3" strokeDasharray="5 6"/><Text x={x(h)} y={52} size={27}>12:30</Text></g>
 <g opacity={ease(t,at('five possible visitors',21.8),.5)}><Text x={1320} y={54} size={29}>2 + 3 = 5</Text></g></Board>;
}
export function ScoreRuler({t,at}:Shot){
 const rows=[[52,68],[71,82],[63,77]], span=ease(t,at('their gains',9.2),1.1),align=ease(t,at('sixteen eleven and fourteen',10.1)+.9,1.8);
 const x=(n:number)=>330+(n-50)*31;
 return <Board name="Measuring changes and aligning their starting edges"><Caption x={76} y={51}>POINTS GAINED</Caption>
 {rows.map(([a,b],i)=>{const y=102+i*78,travel=ease(t,3.7+i*1.5,.95),width=(b-a)*31,left=lerp(x(a),342,align);
 return <g key={a}><Text x={141} y={y+17} size={34}>{'ABC'[i]}</Text><path d={`M273 ${y+3}h1115`} stroke="#d3c5a6" strokeWidth="3"/>
 <circle cx={x(a)} cy={y+2} r="6" fill={mute} opacity={1-align}/><g opacity={1-align}><Text x={x(a)} y={y-15} size={22} color={mute}>{a}</Text></g>
 <rect x={left} y={y-3} width={Math.max(.1,width*travel)} height="18" rx="7" fill={[green,teal,coral][i]}/>
 <g opacity={1-align}><Text x={x(b)} y={y-15} size={23} color={ink}>{b}</Text></g><g opacity={span}><Text x={left+width+41} y={y+22} size={24}>+{b-a}</Text></g></g>;})}
 <g opacity={align}><path d="M342 79v204" stroke={ink} strokeWidth="3" strokeDasharray="4 6"/><Text x={342} y={294} size={22}>0</Text><Text x={782} y={329} size={27}>Align the starts to compare the gains.</Text></g></Board>;
}
export function PagePrinter({t,at}:Shot){
 const nine=ease(t,at('first nine pages',5.9),1.35),ninety=ease(t,at('ninety pages',9),2.1),rest=ease(t,at('eighty more pages',19.7),1.5);
 const meter=(9*nine+180*ninety+240*rest)/429,part=[[9,'1–9',coral,nine],[180,'10–99',teal,ninety],[240,'100–179',green,rest]] as const;
 const start=at('each new page now needs three',16),triple=ease(t,start,1.15);
 const printed=String(rest>0?99+Math.ceil(rest*80):triple>.05?100:ninety>.01?9+Math.ceil(ninety*90):Math.max(1,Math.ceil(nine*9)));
 return <Board name="Type-setting a numbered book from a 429-digit budget"><Caption x={76} y={55}>TYPESETTER'S DIGIT BUDGET · 429 DIGITS</Caption>
 <Plate x={78} y={82} w={875} h={153}/><Text x={106} y={128} size={24} anchor="start" color={mute}>Digits used</Text><rect x="107" y="153" width="812" height="36" rx="10" fill="#d6c9a9"/>
 {part.map(([n,label,color,p],i)=>{const before=[0,9,189][i];return <rect key={label} x={107+812*before/429} y="153" width={812*n/429*p} height="36" fill={color}/>;})}
 <Text x={895} y={129} size={32} anchor="end">{Math.round(meter*429)} / 429</Text>
 <Text x={105} y={277} anchor="start" size={26}>{rest>.1?'Last block':ninety>.1?'Pages 10–99':'Pages 1–9'}</Text>
 <Text x={105} y={319} anchor="start" size={28}>{rest>.1?'80 pages × 3 digits = 240':ninety>.1?'90 pages × 2 digits = 180':'9 pages × 1 digit = 9'}</Text>
 <Divider x={1006}/><Caption x={1045} y={62}>ON THE PRINTING BED</Caption>
 <Plate x={1076} y={91} w={401} h={175}/>{Array.from(printed,(digit,i)=><g key={i}><rect x={1278-printed.length*47+i*94+4} y="132" width="83" height="98" rx="9" fill={ink}/><Text x={1278-printed.length*47+i*94+46} y={202} size={59} color={cream}>{digit}</Text></g>)}
 <Text x={1274} y={312} size={27}>{rest===1?'Final numbered page':'Page number'}</Text></Board>;
}
export function CardPacks({t,at}:Shot){
 const extra=ease(t,at('pair of small packs',11.5),1.2),big=ease(t,at('one large pack meets',14.5),.95),save=ease(t,at('saves two dollars',18),.7);
 const pack=(x:number,y:number,w:number,label:string,color:string)=> <g><rect x={x} y={y+7} width={w} height="52" rx="7" fill="#9b987c" stroke={ink} strokeWidth="1.7"/><rect x={x} y={y} width={w} height="52" rx="7" fill={color} stroke={ink} strokeWidth="2"/><path d={`M${x+w*.52} ${y}v52`} stroke={cream} strokeWidth="13" opacity=".55"/><Text x={x+w*.23} y={y+35} size={24}>{label}</Text></g>;
 return <Board name="Comparing pack prices at a fixed minimum"><Caption x={75} y={55}>AT LEAST 67 CARDS · SPARE CARDS ALLOWED</Caption>
 <Text x={259} y={141} anchor="end">Small packs</Text><Text x={259} y={252} anchor="end">Large pack</Text>
 <path d="M306 167h777m-777 109h777" stroke="#ab9c7d" strokeWidth="3" fill="none"/>
 {pack(311,97,350,'50', '#ddba83')}<g opacity={extra} transform={`translate(${(1-extra)*135} ${(1-extra)*-30})`}>{pack(661,97,350,'50','#ddba83')}</g>
 <g opacity={big} transform={`translate(${(1-big)*-76} 0)`}>{pack(311,207,700,'100','#a8c3b3')}</g>
 <path d="M780 73v211" stroke={coral} strokeWidth="3" strokeDasharray="6 6"/><Text x={780} y={321} size={25}>67-card target</Text>
 <Divider x={1138}/><Text x={1342} y={140} size={42}>{extra>.98?'$20':'$10'}</Text><g opacity={big}><Text x={1342} y={248} size={42}>$18</Text></g><g opacity={save}><Text x={1342} y={313} size={26} color={green}>Save $2</Text></g></Board>;
}
