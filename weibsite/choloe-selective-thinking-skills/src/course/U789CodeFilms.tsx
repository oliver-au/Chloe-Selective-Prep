import {Board,Caption,Chip,Divider,Plate,Text,coral,cream,ease,gold,green,ink,lerp,mute,pathPose,teal,type Shot} from './U789Studio';
const colours=[coral,teal,green,gold];
function shape(i:number){return i===0?<path d="M0-27 29 24H-29Z" fill={coral} stroke={ink} strokeWidth="3"/>:i===1?<Chip x={0} y={0} r={24}/>:<rect x="-23" y="-23" width="46" height="46" rx="4" fill={green} stroke={ink} strokeWidth="3"/>;}
export function Codebook({t,at}:Shot){
 const symbols=[0,1,1,2],ys=[91,185,276];
 const moments=[at('a triangle goes first',10.3),at('next come two circles',12),at('one for each middle',13),at('last space takes',16)];
 return <Board name="Encoding MOON with a three-symbol key"><Caption x={74} y={51}>THE CODE KEY</Caption><Divider x={476}/>
 {['M','O','N'].map((v,i)=><g key={v}><Plate x={73} y={ys[i]-30} w={331} h={65}/><Text x={143} y={ys[i]+15} size={44}>{v}</Text><path d={`M195 ${ys[i]}h55m-11-8 11 8-11 8`} stroke={mute} fill="none" strokeWidth="3"/><g transform={`translate(323 ${ys[i]})`}>{shape(i)}</g></g>)}
 <Caption x={565} y={51}>COMPOSING THE MESSAGE</Caption>{['M','O','O','N'].map((v,i)=>{const x=680+i*226,p=ease(t,moments[i],.88);return <g key={i}><Text x={x} y={120} size={47}>{v}</Text><Plate x={x-79} y={159} w={158} h={119}/><circle cx={x} cy="218" r="32" fill="none" stroke="#cabb99" strokeDasharray="4 8"/>{p>0&&<g transform={pathPose(323,ys[symbols[i]],x,218,p,45)}>{shape(symbols[i])}</g>}</g>;})}</Board>;
}
export function PositionLock({t,at}:Shot){
 const letters=['C','R','A'],start=[175,273,371],dest=[671,1317,994],leave=[at('put c in box one',10),at('so it goes in box three',14.2),at('a fills the remaining',16.7)];
 const reject=ease(t,at('r cannot use box one',12),.5);
 return <Board name="Fitting the three letters in a combination lock"><Caption x={75} y={61}>AVAILABLE KEYS</Caption><Caption x={544} y={61}>ONE LETTER IN EACH SOCKET</Caption><Divider x={477}/>
 {['1','2','3'].map((n,i)=><g key={n}><Plate x={552+i*323} y={105} w={238} h={166} fill="#d5caaa"/><rect x={603+i*323} y="147" width="136" height="83" rx="13" fill="#f6ead0" stroke="#8c9278" strokeWidth="3"/><Text x={671+i*323} y={309} size={26}>Position {n}</Text></g>)}
 <g opacity={reject*(1-ease(t,leave[1]+.65,.3))}><path d="m951 157 84 62m0-62-84 62" stroke={coral} strokeWidth="7"/><Text x={997} y={118} size={22}>R cannot go here</Text></g>
 {letters.map((v,i)=>{const p=ease(t,leave[i],1);return <g key={v} transform={pathPose(start[i],192,dest[i],188,p,98)}><rect x="-40" y="-40" width="80" height="84" rx="13" fill="#8f714a"/><rect x="-40" y="-44" width="80" height="81" rx="13" fill={['#dda66e','#8fb7b4','#d6bf82'][i]} stroke="#8e7857" strokeWidth="2"/><Text x={0} y={13} size={48}>{v}</Text></g>;})}</Board>;
}
export function BeadRail({t,at}:Shot){
 const sweep=ease(t,at('six complete groups',6),2.65);
 const red=ease(t,at('one more place for red',9.2),.75),blue=ease(t,at('second place for blue',10.9),.75);
 return <Board name="Counting six complete groups on a bead frame"><Caption x={80} y={59}>FOUR BEADS IN EACH GROUP</Caption><path d="M70 160Q775 174 1525 160" stroke="#947653" fill="none" strokeWidth="6"/>
 {Array.from({length:28},(_,i)=>{const group=Math.floor(i/4),x=89+group*214+i%4*43;return <g key={i}><Chip x={x} y={161+Math.sin(i/27*Math.PI)*7} r={18} color={colours[i%4]}/>{[0,23,24,25].includes(i)&&<Text x={x} y={119} size={23}>{i+1}</Text>}</g>;})}
 {Array.from({length:6},(_,g)=><g key={g} opacity={Math.min(1,Math.max(0,sweep*6-g))}><path d={`M${74+g*214} 196v17h164v-17`} stroke={ink} strokeWidth="3" fill="none"/><Text x={156+g*214} y={253} size={24}>Group {g+1}</Text></g>)}
 <g opacity={red}><path d={`M${1373+blue*43} 194l-10 18h20Z`} fill={ink}/><Text x={1395} y={266} size={28}>{blue>.96?'26 · blue':'25 · red'}</Text></g>
 <g opacity={sweep}><Text x={80} y={319} anchor="start" size={29}>6 × 4 = 24</Text></g></Board>;
}
const seg:Record<string,[number,number,number,number]>={a:[-26,-55,26,-55],b:[34,-46,34,-9],c:[34,9,34,46],d:[-26,55,26,55],e:[-34,9,-34,46],f:[-34,-46,-34,-9],g:[-26,0,26,0]};
const bars:Record<string,string>={'8':'abcdefg','9':'abcdfg','6':'acdefg'};
function led(d:string,loss=0){return <>{Object.entries(seg).map(([name,[x1,y1,x2,y2]])=><g key={name}><line {...{x1,y1,x2,y2}} stroke="#263e3a" strokeWidth="11" strokeLinecap="round"/>{bars[d]?.includes(name)&&<line {...{x1,y1,x2,y2}} stroke="#c9efac" strokeWidth="10" opacity={name==='f'||name==='g'?1-loss:1} strokeLinecap="round"/>}</g>)}</>;}
export function DisplayFault({t,at}:Shot){
 const a=ease(t,at('an eight therefore loses',6),1.1),nine=ease(t,at('when a nine',9),.7),b=ease(t,at('remove the same two',10.4),1.15);
 return <Board name="Testing the same missing contacts on two light displays"><Caption x={78} y={65}>PERMANENT FAULT · UPPER LEFT AND MIDDLE</Caption>
 {[{x:195,d:'8',fault:0},{x:510,d:'8',fault:a},{x:963,d:'9',fault:0},{x:1278,d:'9',fault:b}].map(({x,d,fault},i)=><g key={x} opacity={i<2?1:nine}><Plate x={x-93} y={87} w={186} h={183} fill="#233733"/><g transform={`translate(${x} 178) scale(1.19)`}>{i%2===1?<g opacity={fault}>{led(d,1)}</g>:led(d)}{i%2===1&&['f','g'].map(k=>{const [x1,y1,x2,y2]=seg[k],px=(x1+x2)/2,py=(y1+y2)/2;return <path key={k} d={`M${px-6} ${py+7}l12-14`} stroke="#f89d76" strokeWidth="4" opacity={fault}/>;})}</g><Text x={x} y={314} size={27}>{i%2?'Same broken bars':'Requested '+d}</Text></g>)}
 <g transform={`translate(${lerp(510,1278,ease(t,at('when a nine',9)-.4,1.05))} 91)`}><rect x="-51" y="-9" width="102" height="16" rx="5" fill="url(#u789-metal)" stroke="#846942" strokeWidth="2"/>{[-20,19].map(x=><path key={x} d={`M${x} 7v17`} stroke="#daaa6b" strokeWidth="5"/>)}</g>
 {[355,1123].map((x,i)=><path key={x} d={`M${x-48} 178h96m-13-11 13 11-13 11`} stroke={mute} strokeWidth="5" fill="none" opacity={i?nine:1}/>)}<Divider x={742}/></Board>;
}
export function CornerPress({t,at}:Shot){
 const anchor=at('after four',13),times=[at('goes clockwise',5),at('after two moves',8.8),anchor-1,anchor], pts=[[194,98],[615,98],[615,249],[194,249],[194,98]];
 let x=pts[0][0],y=pts[0][1],step=0;times.forEach((start,i)=>{const p=ease(t,start,.83);x+=p*(pts[i+1][0]-pts[i][0]);y+=p*(pts[i+1][1]-pts[i][1]);if(p>=.99)step=i+1;});
 return <Board name="Tracking a corner arrow and an independent dot counter"><Caption x={74} y={51}>CLOCKWISE TRACK</Caption><path d="M194 98H615V249H194Z" fill="none" stroke="#b4a282" strokeWidth="15" strokeLinejoin="round"/><path d="M194 98H615V249H194Z" fill="none" stroke="#f3dfb4" strokeWidth="5"/>
 {pts.slice(0,4).map(([px,py],i)=><circle key={i} cx={px} cy={py} r="11" fill={gold} stroke={ink} strokeWidth="2"/>)}<g transform={`translate(${x} ${y})`}><Chip x={0} y={0} r={32}/><path d="m0-19 14 21H6v14H-6V2h-8Z" fill={cream}/></g>
 <Divider x={773}/><Caption x={835} y={73}>DOT REGISTER</Caption><Text x={839} y={140} anchor="start" size={36}>After {step} {step===1?'move':'moves'}</Text>
 {Array.from({length:5},(_,i)=>{const p=i===0?1:ease(t,times[i-1]+.45,.4);return <g key={i}><circle cx={914+i*132} cy="223" r="35" fill="none" stroke="#b7aa90" strokeWidth="3"/><g opacity={p} transform={pathPose(914+i*132,180,914+i*132,223,p,0)}><Chip x={0} y={0} r={28} color={coral}/></g></g>;})}
 <Text x={394} y={327} size={27}>{['Top left','Top right','Bottom right','Bottom left','Top left'][step]}</Text></Board>;
}
export function MessageTurn({t,at}:Shot){
 const order=ease(t,at('first reverse the order',4),2),turn=ease(t,at('then transform each symbol',7.7),2.4);
 return <Board name="Reversing positions and rotating a symmetrical code font"><Caption x={77} y={55}>THE WHOLE MESSAGE · HALF TURN</Caption>
 <path d="M421 194H1168" stroke="#a99777" strokeWidth="4" strokeDasharray="7 11"/>
 {['1','6','8'].map((d,i)=>{const x=485+i*315,xEnd=1115-i*315,y=191+(i-1)*Math.sin(order*Math.PI)*95;return <g key={d} transform={`translate(${lerp(x,xEnd,order)} ${y}) scale(${1-.48*Math.sin(order*Math.PI)}) rotate(${180*turn})`}><rect x="-75" y="-84" width="150" height="168" rx="15" fill="#253b39" stroke="#917c5b" strokeWidth="4"/>{d==='1'?<path d="M0-55v110" stroke="#c9efac" strokeWidth="12" strokeLinecap="round"/>:led(d)}</g>;})}
 <Text x={800} y={332} size={29}>{turn>=.99?'The turned symbols read 8 · 9 · 1':order>=.99?'The order is now 8 · 6 · 1':'Each end trades places with the opposite end'}</Text></Board>;
}
