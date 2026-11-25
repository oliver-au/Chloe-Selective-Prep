import {Board,PaperTag,blue,brick,gold,ink,label,line,mix,muted,paper,progress as go,teal,text,trace,type StudyProps} from './Unit456Workshop';

function item(kind:string,x:number,y:number,scale=1){
 const shapes:Record<string,React.ReactNode>={
  Camera:<><rect x="-35" y="-17" width="70" height="45" rx="7" fill={blue}/><path d="M-20-17l6-12H5l8 12" fill={blue}/><circle cx="4" cy="5" r="15" fill={paper} stroke={ink} strokeWidth="4"/><circle cx="4" cy="5" r="8" fill={ink}/></>,
  Compass:<><circle r="31" fill="#ebd59b" stroke="#856b44" strokeWidth="6"/><path d="m0-23 8 23-8 23-8-23z" fill={brick}/><path d="m0 23-8-23h16z" fill={blue}/><circle r="4" fill={ink}/></>,
  Torch:<g transform="rotate(32)"><path d="M-10 34v-38l-11-13v-13h42v13L10-4v38z" fill="#8a9c76" stroke={ink} strokeWidth="3"/><path d="M-19-24h38" stroke={paper} strokeWidth="5"/></g>,
  Cat:<><path d="m-27 8 1-34 20 14q8-3 15 0l16-15 3 36q-25 32-55-1" fill="#b48366" stroke={ink} strokeWidth="3"/><circle cx="-10" cy="5" r="3"/><circle cx="12" cy="5" r="3"/></>,
  Dog:<><path d="M-23-17q24-20 46 1v26q-20 28-45 0z" fill="#ba946d" stroke={ink} strokeWidth="3"/><path d="m-20-16-13 4-5 24 13 2 11-27m31-2 12 2 6 24-12 2-12-25" fill="#765b47"/><ellipse cy="9" rx="6" ry="4" fill={ink}/></>,
  Fish:<><path d="M-34 0q25-37 56 0-30 38-56 0Zm54 0 18-17v34z" fill="#789eab" stroke={ink} strokeWidth="3"/><circle cx="-18" cy="-3" r="4" fill={ink}/></>,
 };
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>{shapes[kind]}</g>;
}
function matching(t:number,answer:boolean){
 const objects=answer?['Cat','Dog','Fish']:['Camera','Compass','Torch'],owners=answer?['Ana','Bo','Cy']:['Kai','Mila','Noah'],assign=answer?[1,0,2]:[1,2,0],at=answer?[11.1,7.4,.25]:[15.6,7.7,12.1],xs=[405,800,1195];
 return <Board title={answer?'Pet register · one owner per animal':'Expedition equipment · one item per person'} description="Each persistent object is moved from its supply slot to the owner confirmed by elimination.">
  {xs.map((x,i)=><g key={x}><rect x={x-145} y="87" width="290" height="102" rx="12" fill="#f2e7cb" stroke="#a6997e"/>{text(objects[i],x,109,22,muted)}<rect x={x-145} y="248" width="290" height="91" rx="15" fill="#c0cbb4" stroke="#677c6a" strokeWidth="3"/>{text(owners[i],x,316,26)}</g>)}
  {!answer&&[0,1].map((owner,i)=><g key={owner} opacity={go(t,4.6+i*.7,.4)*(1-go(t,9.7,.5))}>{text('× compass',xs[owner],267,22,brick)}</g>)}
  {(!answer)&&<g opacity={go(t,9.8,.5)*(1-go(t,12.5,.5))}>{text('× camera',xs[0],267,22,brick)}</g>}
  {answer&&<g opacity={go(t,4.5,.5)*(1-go(t,7.6,.5))}>{text('× cat',xs[0],267,22,brick)}</g>}
  {objects.map((ob,i)=>{const f=go(t,at[i],1.35);return <g key={ob}>{item(ob,mix(xs[i],xs[assign[i]],f),mix(156,270,f)-Math.sin(f*Math.PI)*25,.95)}</g>})}
 </Board>;
}
function stamp(ok:boolean,x:number,y:number,f:number){return <g opacity={f} transform={`translate(${x} ${y}) scale(${mix(1.3,1,f)})`}><circle r="18" fill={ok?'#c5d7b7':'#edd0b3'} stroke={ok?teal:brick} strokeWidth="3"/>{ok?<path d="m-9 0 6 6 13-15" stroke={teal} strokeWidth="4" fill="none"/>:<path d="m-7-7 14 14m0-14-14 14" stroke={brick} strokeWidth="4"/>}</g>}
function options(t:number,answer:boolean){
 const states=[[1,0],[0,1],[1,1],[0,0]], people=answer?['Red pen','Blue pen']:['Leo','Maya'];const labels=['First only','Second only','Both','Neither'];
 const start=answer?[6.1,6.6,.1,3.2]:[2.5,5.1,8.0,11.2];
 return <Board title={answer?'Pen case · at least one':'Selection desk · exactly one'} description="Four pairings show which selections satisfy the given rule.">
  {states.map((pair,i)=>{const x=237+i*375,check=go(t,start[i],.9);return <g key={i}><rect x={x-153} y="94" width="306" height="235" rx="16" fill="#eee6cc" stroke={muted} strokeOpacity=".65" strokeWidth="2"/>
   {text(labels[i],x,130,29)}{pair.map((v,k)=>{const y=187+k*53;const switched=go(t,Math.max(0,start[i]-.9)+k*.22,.54);return <g key={k}><rect x={x-112} y={y-14} width="54" height="28" rx="14" fill={v&&switched>.5?teal:'#a7ae9e'}/><circle cx={x-97+v*25*switched} cy={y} r="11" fill={paper}/>{text(people[k],x-33,y,24,ink,'start')}</g>})}
   {stamp(answer?i!==3:i<2,x,296,check)}</g>})}
 </Board>;
}
function possibilities(t:number,answer:boolean){
 const rows=answer?[['Red switch','Bell rings'],['Blue switch','Lamp lights']]:[['Leo joins','Nina joins'],['Maya joins','Omar joins']];
 const f=[go(t,answer?.9:5.85,1.9),go(t,answer?2.5:9.1,1.9)];
 return <Board title={answer?'Circuit trials · follow each switch':'Two legal trials · follow the requirement'} description="In each separate trial a brass tracer travels along its requirement route and lights the confirmed result.">
  {rows.map((row,i)=>{const y=145+130*i;return <g key={i}>{label('Trial '+(i+1),153,y)}<PaperTag x={405} y={y} name={row[0]} colour={i?'#bcd1cb':'#dfbc9e'}/>
    <path d={`M505 ${y}h383`} stroke="#9c9b85" strokeWidth="7" fill="none"/>{trace(`M505 ${y}h383`,f[i],gold,7)}
    <circle cx={505+383*f[i]} cy={y} r="11" fill={gold} stroke={ink} strokeWidth="2" opacity={f[i]>0?1:0}/>
    <PaperTag x={1025} y={y} name={row[1]} w={247} colour={f[i]>.92?'#d9db99':'#e5deca'}/>
    {stamp(true,1214,y,go(t,answer?2+i*1.5:7.2+i*3.2,.65))}
   </g>})}<g opacity={go(t,answer?7.5:15.3,1)}>{text('The other outcome is still possible.',808,352,25,muted)}</g>
 </Board>;
}
function orderTest(t:number,answer:boolean){
 const names=answer?['Ben','Cara','Ava']:['Cara','Ava','Ben'],xs=[445,810,1175];const start=answer?.25:4.6;
 const ax=xs[names.indexOf('Ava')],bx=xs[names.indexOf('Ben')],cx=xs[names.indexOf('Cara')],dir=Math.sign(bx-ax);
 const first=go(t,start+.55,1.5),second=go(t,answer?2.65:8.6,1.35);
 return <Board title="Finish-line inspection · test both rules" description="An ordered track checks Ava against Ben and then checks Cara against the last position.">
  {xs.map((x,i)=><g key={i}><rect x={x-130} y="132" width="260" height="116" rx="10" fill="#d4c9aa" stroke="#8c886f"/>{label('Position '+(i+1),x,277)}<g opacity={go(t,start+i*.2,.6)}><PaperTag name={names[i]} x={x} y={191} colour={['#c0d2bf','#e3c997','#d8b3a3'][i]}/></g></g>)}
  {trace(`M${ax} 131Q${(ax+bx)/2} 40 ${bx} 130l${-dir*17} 4m${dir*17} -4 ${-dir*10} -15`,first,answer?brick:teal,5)}
  {stamp(!answer,1456,121,first)}{text('Ava before Ben',1385,160,22)}{trace(`M${cx} 246v61H1175`,second,gold,4)}{stamp(true,1456,263,second)}{text('Cara is not last',1385,303,22)}
 </Board>
}
function truths(t:number,answer:boolean){
 const order=answer?['Blue','Red','Green']:['Cara','Ava','Ben'],statements=answer?['Red','Blue','Not red']:['Ben won','Cara won','Ben lost'];
 const tr=answer?[[false,true,true],[true,false,false],[false,false,true]]:[[false,true,true],[false,false,true],[true,false,false]];
 const times=answer?[.3,9.65,10.8]:[9.25,16.65,18.1];
 return <Board title={answer?'Prize colour · count the true statements':'Race reports · count the false statements'} description="Three separate candidate trials flip truth indicators, then count the match against the given total.">
  {label(answer?'Try this colour':'Try this winner',267,91)}{statements.map((s,i)=>{const show=answer?1:go(t,[3.2,5.15,6.5][i],.72);return <g key={s} transform={`translate(0 ${(1-show)*-12})`} opacity={show}>{label(s,584+238*i,91)}</g>})}{label(answer?'True':'False',1344,91)}
  {order.map((n,r)=>{const y=151+r*85,f=go(t,times[r],.95);return <g key={n}><rect x="133" y={y-32} width="1334" height="68" rx="10" fill={r===0?'#d0dac1':'#e3dcc4'} stroke="#9eaa92"/>
    <g opacity={f}><PaperTag x={270} y={y} w={189} name={n} colour="#f0dcc0"/></g>{tr[r].map((v,c)=>{const f2=go(t,times[r]+(r===0?1.3+c*1.15:.3+c*.24),.5);return <g key={c}>{stamp(v,584+238*c,y,f2)}<g opacity={f2}>{text(v?'True':'False',641+238*c,y,21,v?teal:brick)}</g></g>})}
    <g opacity={go(t,times[r]+(r===0?4.4:1.3),.6)}>{text(answer?tr[r].filter(Boolean).length:tr[r].filter(v=>!v).length,1344,y,34,r===0?teal:muted)}</g>
  </g>})}
 </Board>;
}
function sets(t:number,answer:boolean){
 if(answer)return <Board title="Membership rule · an empty set is possible" description="The swimmer boundary nests inside the club. The separate under-eight boundary cannot contain a swimmer; the rings do not require real members.">
  <ellipse cx="625" cy="221" rx="387" ry="128" fill="#c0d2bc" stroke={teal} strokeWidth="4"/>{label('Club members',565,121)}
  <g transform={`translate(${mix(-110,0,go(t,.1,1.5))} 0)`}><ellipse cx="630" cy="235" rx="201" ry="68" fill="#e8dfbc" stroke={blue} strokeWidth="4"/>{text('Swimmers',630,227,31)}<g opacity={go(t,4.6,1)}>{text('May be empty',630,270,23,muted)}</g></g>
  <ellipse cx="1257" cy="223" rx="172" ry="97" fill="none" stroke={brick} strokeWidth="4"/>{text('Under eight',1257,224,27)}
 </Board>;
 const f=go(t,3.15,2.8),g=go(t,8.9,2);return <Board title="One real person · follow the same witness" description="The marked witness is in musicians and dancers together and remains outside X when the disjoint set is introduced.">
  <ellipse cx="686" cy="221" rx="236" ry="122" fill="#c5d3af" stroke={teal} strokeWidth="4"/><ellipse cx="969" cy="221" rx="247" ry="122" fill="#d8c8a4" fillOpacity=".55" stroke={gold} strokeWidth="4"/>
  {text('Musicians',623,141,28)}{text('Dancers',1027,141,28)}
  <g opacity={g}><ellipse cx="407" cy="220" rx="186" ry="104" fill="none" stroke={brick} strokeWidth="4" strokeDasharray="10 6"/>{text('Group X',379,218,26,brick)}</g>
  <g opacity={go(t,2.5,.4)} transform={`translate(${mix(822,817,f)} ${mix(80,218,f)})`}><circle r="21" fill="#e5b44e" stroke={ink} strokeWidth="4"/><circle r="5" fill={ink}/></g>
  <g opacity={go(t,12.1,1.2)}>{trace('M817 244v54h254',1,teal,3)}{text('One person in both groups',1200,321,23,teal)}</g>
 </Board>;
}
function codes(t:number,answer:boolean){
 const ids=answer?[12,13]:[12,13,24,34],from=answer?[646,950]:[480,690,900,1110],dest=answer?[483,1110]:[393,592,1002,1199];
 return <Board title={answer?'Code sorter · ends in 2?':'Code sorter · below 20?'} description="Candidate codes travel into one of two trays. The number remaining in each tray answers the question.">
   {[0,1].map((k)=><g key={k}><path d={`M${185+k*635} 221h568l-30 99H${215+k*635}z`} fill={k?'#ddc1a4':'#c5d8bc'} stroke={muted} strokeWidth="3"/>{label(k?'NO':'YES',468+k*635,346)}</g>)}
   {ids.map((n,i)=>{const yes=answer?i===0:i<2;const f=go(t,answer?.6+i*.65:yes?6.0+i*.34:8.65+(i-2)*.35,1.5);
    return <PaperTag key={n} x={mix(from[i],dest[i],f)} y={mix(124,253,f)-Math.sin(Math.PI*f)*24} name={String(n)} w={152} edge={yes?teal:gold}/>
   })}
   <g opacity={go(t,answer?4.5:13,.8)}>{text(answer?'One code in each tray':'Two codes in each tray',800,83,24,muted)}</g>
 </Board>;
}
function route(t:number,answer:boolean){
 const f=go(t,answer?.2:8.65,1.6),travel=go(t,answer?1.7:11.45,answer?3.0:4.5);
 const pts=[[220,260],[624,130],[961,238],[1355,128]];const names=answer?['A','B','C','D']:['Library','Park','School','Pool'];
 const g=travel*3,idx=Math.min(2,Math.floor(g)),portion=g-idx;
 const [x,y]=[mix(pts[idx][0],pts[idx+1][0],portion),mix(pts[idx][1],pts[idx+1][1],portion)];
 return <Board title="Route map · two-way connections" description="The two disconnected routes gain a bridge. A traveller then covers all three edges in order.">
    <path d="M753 57q-73 76-21 134t-24 148l-29 47h95q66-82 36-149t48-180z" fill="#9ebfc0" opacity=".9"/><path d="M769 61q-64 75-16 131t-21 150" stroke="#d9e6d5" strokeWidth="3" fill="none"/>
    {[0,2].map(i=><g key={i}>{line(...pts[i] as [number,number],...pts[i+1] as [number,number],ink,13)}{line(...pts[i] as [number,number],...pts[i+1] as [number,number],paper,4,'12 9')}</g>)}
    {trace('M624 130L961 238',f,ink,22)}{trace('M624 130L961 238',f,'#b38d63',13)}
    {pts.map(([xx,yy],i)=><g key={i}><circle cx={xx} cy={yy} r="21" fill={paper} stroke={teal} strokeWidth="5"/><PaperTag x={xx} y={yy+68} w={answer?92:166} name={names[i]}/></g>)}
    <g transform={`translate(${x} ${y})`}><ellipse cy="3" rx="12" ry="6" fill="#45473580"/><path d="M0 0q-25-26-18-40 6-15 18-15 23 0 21 21Q20-23 0 0Z" fill={brick} stroke={ink} strokeWidth="2"/><circle cy="-35" r="7" fill={paper}/></g>
 </Board>;
}
export function DeductionStudy({code,answer,t}:StudyProps){switch(code){
 case 'D1':return matching(t,answer);case 'D2':return options(t,answer);case 'D3':return possibilities(t,answer);case 'D4':return orderTest(t,answer);case 'D5':return truths(t,answer);case 'D6':return sets(t,answer);case 'D7':return codes(t,answer);case 'D8':return route(t,answer);default:return null;
}}
