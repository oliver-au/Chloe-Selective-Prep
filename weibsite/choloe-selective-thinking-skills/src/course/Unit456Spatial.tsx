import {Board,blue,brick,gold,ink,label,line,mix,muted,paper,progress as go,teal,text,trace,type StudyProps} from './Unit456Workshop';
const rad=(degrees:number)=>degrees*Math.PI/180;
function LShape(ghost=false){return <g opacity={ghost?.34:1}><path d="M-66-78h44V38h84v39H-66Z" fill={ghost?'none':'#459b90'} stroke={ghost?muted:ink} strokeWidth="3" strokeDasharray={ghost?'6 5':undefined}/><circle cx="-44" cy="-58" r="10" fill={ghost?'none':'#e7ad58'} stroke={ink} strokeWidth="2.5"/></g>;}
function pin(x:number,y:number){return <g><circle cx={x} cy={y} r="9" fill={paper} stroke={ink} strokeWidth="2.5"/>{line(x-5,y,x+5,y,ink,2)}{line(x,y-5,x,y+5,ink,2)}</g>}
function transform(t:number,answer:boolean,mirror:boolean){
 const start=mirror?(answer?.2:3.95):(answer?.55:3.4),a=go(t,start,2.75),cx=789,cy=221;
 if(mirror){const offset=232,sx=1-2*a;
  return <Board title="Mirror bench · follow the high marker" description="A marked L reflects across the vertical line, keeping its high marker level. A separate half-turn illustrates the contrast." tone="blue">
   {line(715,91,715,332,blue,4,'8 5')}{text('Mirror',715,353,23,blue)}{line(399,cy-58,1011,cy-58,muted,2,'9 7')}
   <g transform={`translate(${715-offset} ${cy})`}>{LShape(true)}</g><g transform={`translate(${715-offset*sx} ${cy}) scale(${sx} 1)`}>{LShape()}</g>
   <g opacity={go(t,answer?3.1:12.35,1)}>{line(1102,96,1102,328,muted,2)}{label('Compare a half-turn',1321,99)}<g transform={`translate(1321 228) rotate(${180*go(t,answer?3.5:12.7,2.15)})`}>{LShape()}</g>{pin(1321,228)}</g>
  </Board>;
 }
 const angle=(answer?180:90)*a,r=Math.hypot(44,58),end=rad(angle),dx=-44*Math.cos(end)+58*Math.sin(end),dy=-44*Math.sin(end)-58*Math.cos(end);
 return <Board title="Turning table · the page rotates around one pin" description="The hinged silhouette and its marker move as one rigid object, with the centre and radius fixed." tone="blue">
  <circle cx={cx} cy={cy} r="130" fill="#cfd6be" stroke="#839694" strokeWidth="3"/>{[0,1,2,3].map(i=><path key={i} d={`M${cx} ${cy-126}v12`} transform={`rotate(${90*i} ${cx} ${cy})`} stroke={ink} strokeWidth="3"/>)}
  <g transform={`translate(${cx} ${cy})`}>{LShape(true)}<g transform={`rotate(${angle})`}>{LShape()}</g></g>{pin(cx,cy)}
  {trace(`M${cx-44} ${cy-58}A${r} ${r} 0 0 1 ${cx+dx} ${cy+dy}`,a>0?1:0,gold,4)}{line(cx,cy,cx+dx,cy+dy,ink,2,'5 5')}
  {text('Turning centre',485,cy,26)}{line(583,cy,642,cy,muted,2)}{label(answer?'Half-turn':'Quarter-turn',1080,145,'start')}<g opacity={a}>{text(answer?'Lower right':'Upper right',1080,213,35,teal,'start')}</g>
 </Board>;
}
type Vec=[number,number,number];type Point=[number,number];
function projectStack(v:Vec,front:number,above:number):Point{
 const [x,y,z]=v;
 const side=1-front;
 const fromX=752+(x-1.5)*77+(z-1)*41*side;
 const fromY=312-y*77+(z-1)*31*side+(x-1.5)*9*side;
 return [mix(fromX,752+(x-1.5)*85,above),mix(fromY,217+(z-1)*85,above)];
}
function elevation(t:number,answer:boolean){
 const heights=[[2,3,2],[1,2,1]];
 const front=answer?0:go(t,6.55,2.8),above=answer?go(t,.5,2.9):0;
 const cubes=[];for(let z=0;z<2;z++)for(let x=2;x>=0;x--)for(let y=0;y<heights[z][x];y++){
  const faces:Vec[][]=[[[x,y,z],[x,y+1,z],[x,y+1,z+1],[x,y,z+1]],[[x,y,z+1],[x+1,y,z+1],[x+1,y+1,z+1],[x,y+1,z+1]],[[x,y+1,z],[x+1,y+1,z],[x+1,y+1,z+1],[x,y+1,z+1]]];
  cubes.push(<g key={[x,y,z].join('-')}>{faces.map((face,i)=><polygon key={i} points={face.map(v=>projectStack(v,front,above).join(',')).join(' ')} fill={(z===0?['#78958c','#acbd9e','#d1d9aa']:['#bc926a','#d5ab73','#f2cf91'])[i]} stroke={ink} strokeWidth="2.5" strokeLinejoin="round"/>)}</g>);
 }
 return <Board title={answer?'Turn to the top view':'Turn to the front view'} description="Camera projection moves from the two-row stack to its frontal silhouette or six-cell overhead footprint." tone="blue">
  {cubes}{label(answer?'Height map':'Front row',239,133)}{text(answer?'3 columns':'1   2   1',239,182,35)}{label(answer?'Occupied rows':'Back row',239,247)}{text(answer?'2 rows':'2   3   2',239,290,35)}
  <g opacity={go(t,answer?3.0:9.8,1)}>{label(answer?'Footprint':'Visible heights',1221,169)}{text(answer?'6 squares':'2   3   2',1221,235,43,teal)}</g>
 </Board>;
}
function fold(t:number,answer:boolean){
 const side=answer?1:go(t,5.15,1.7),top=answer?1:go(t,7.05,1.6);const openY=go(t,answer?4.9:13,1.95),openX=go(t,answer?1.2:17.3,1.95);
 // The worked fold order is reversed to reopen. The boundary case may test either reflection first.
 const xf=side*(1-openX),yf=top*(1-openY),cell=58,left=616,upper=97;
 function point(c:number,r:number):Point{return [left+cell*(c>2?2+(c-2)*Math.cos(Math.PI*xf):c),upper+cell*(r<2?2-(2-r)*Math.cos(Math.PI*yf):r)];}
 const columns=[0,1,2,3],rows=[0,1,3,2];
 const holes=answer?[[2,3.5],[2,.5]]:[[.5,3.5],[.5,.5],[3.5,3.5],[3.5,.5]];
 return <Board title={answer?'Unfold at a crease · count distinct centres':'Paper-folding bench · keep the hole attached to its square'} description="Individual paper squares hinge on both creases. The drill makes a hole through the stack, whose centres move with the opening panels." tone="blue">
   {columns.map(c=><g key={c}>{text(c+1,left+cell*(c+.5),upper-19,21)}{text('ABCD'[c],left-29,upper+cell*(c+.5),21)}</g>)}
   {rows.flatMap(r=>columns.map(c=>{const poly=[point(c,r),point(c+1,r),point(c+1,r+1),point(c,r+1)];return <polygon key={c+':'+r} points={poly.map(p=>p.join(',')).join(' ')} stroke="#797c62" strokeWidth="1.4" fill={c>1?'#d4c597':r<2?'#e0cf9b':'#f1dca7'}/>;}))}
   {line(left+cell*2,upper,left+cell*2,upper+cell*4,blue,2,'5 4')}{line(left,upper+cell*2,left+4*cell,upper+cell*2,blue,2,'5 4')}
   <g opacity={answer?1:go(t,9.9,.65)}>{holes.map(([c,r],i)=>{const [x,y]=point(c,r);return <g key={i}><circle cx={x} cy={y} r="8.5" fill={ink}/><circle cx={x-1} cy={y-1} r="5" fill="#657967"/></g>})}</g>
   {label('Crease lines',355,159)}{line(307,192,404,192,blue,4,'8 6')}
   <g opacity={go(t,answer?6.3:12.6,1)}>{label('Hole centres',1100,152)}{text(answer?(openY>.98?'2 distinct centres':'1 on the fold'):(openX>.98?'D1 · A1 · D4 · A4':'D1 and A1'),1100,220,31,teal)}</g>
 </Board>;
}
const faceColours:Record<string,string>={A:'#e7c583',B:'#a7c2b6',C:'#e5d6ae',D:'#89b5af',E:'#d99b79',F:'#baa9c5'};
function netVertices(face:string,u:number,v:number,ang:number):Vec{
 const c=Math.cos(ang),s=Math.sin(ang);
 switch(face){
 case 'C':return [u,v,0];
 case 'B':return [-.5-(.5-u)*c,v,(.5-u)*s];
 case 'D':return [.5+(.5+u)*c,v,(.5+u)*s];
 case 'E':return [.5+c+(.5+u)*Math.cos(2*ang),v,s+(.5+u)*Math.sin(2*ang)];
 case 'A':return [u,-.5-(.5-v)*c,(.5-v)*s];
 default:return [u,.5+(.5+v)*c,(.5+v)*s];
 }}
function net(t:number,answer:boolean){
 const p=go(t,answer?1.1:4.2,answer?4.35:4.4),ang=p*Math.PI/2,view=go(t,answer?.4:3.5,3);
 const yaw=.60*view,pitch=.42*view;
 const vertical=(v:Vec)=>v[1]*Math.cos(pitch)+(v[0]*Math.sin(yaw)+v[2]*Math.cos(yaw))*Math.sin(pitch);
 const surfaces='ABCDEF'.split('').map(name=>({name,centre:netVertices(name,0,0,ang),vertices:[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]].map(([x,y])=>netVertices(name,x,y,ang))}));
 const heights=surfaces.flatMap(f=>f.vertices.map(vertical)),top=Math.min(...heights),bottom=Math.max(...heights);
 const scale=Math.min(91+54*view,283/(bottom-top));
 const project=(v:Vec):Point=>[773+scale*(v[0]*Math.cos(yaw)-v[2]*Math.sin(yaw)),218+scale*(vertical(v)-(bottom+top)/2)];
 const faces=surfaces.map(({name,centre,vertices})=>({name,depth:centre[0]*Math.sin(yaw)*Math.cos(pitch)-centre[1]*Math.sin(pitch)+centre[2]*Math.cos(yaw)*Math.cos(pitch),centre:project(centre),corners:vertices.map(v=>project(v).join(',')).join(' ')})).sort((a,b)=>a.depth-b.depth);
 const pairs=[['C','E'],['A','F'],['B','D']];
 return <Board title="Folding bench · six hinged faces" description="A continuous three-dimensional fold keeps E attached to D as it closes opposite C; the final visible faces are A, D and E." tone="blue">
  {faces.map(({name,corners,centre})=><g key={name}><polygon points={corners} fill={faceColours[name]} stroke={ink} strokeWidth="3.2" strokeLinejoin="round"/>{text(name,centre[0],centre[1],31)}</g>)}
  {label(answer?'Opposite flaps':'Net centre',205,134)}{text(answer?'A and F':'C',205,194,41)}
  {answer?<g opacity={go(t,9,.9)}>{label('Visible corner',1210,140)}{['A','D','E'].map((f,i)=><g key={f} opacity={go(t,10.7+i*1.5,.7)}><rect x={1090+i*89} y="193" width="69" height="63" fill={faceColours[f]} stroke={ink} strokeWidth="2"/>{text(f,1125+i*89,224,32)}</g>)}</g>:
  <>{label('Opposite faces',1240,105)}{pairs.map(([a,b],i)=><g key={a} opacity={go(t,[8.8,11.45,16][i],.95)}>{[a,b].map((f,k)=><g key={f}><rect x={1119+k*140} y={134+i*66} width="94" height="48" rx="6" fill={faceColours[f]} stroke={muted} strokeWidth="2"/>{text(f,1166+k*140,158+i*66,27)}</g>)}{line(1217,158+i*66,1253,158+i*66,muted,2)}</g>)}</>}
 </Board>
}
function dieShape(cx:number,angle:number){
 const rotate=(v:Vec):Vec=>[v[0]*Math.cos(angle)-v[2]*Math.sin(angle),v[1],v[0]*Math.sin(angle)+v[2]*Math.cos(angle)];
 const point=(v:Vec):Point=>[cx+(v[0]-v[2])*60,204+(v[0]+v[2]-2*v[1])*60/Math.sqrt(3)];
 const faces:{n:Vec;u:Vec;v:Vec;number:number;fill:string}[]=[
 {n:[0,1,0],u:[1,0,0],v:[0,0,1],number:1,fill:'#ecd5a1'},{n:[0,-1,0],u:[1,0,0],v:[0,0,1],number:6,fill:paper},
 {n:[0,0,1],u:[1,0,0],v:[0,1,0],number:2,fill:'#8bb9b0'},{n:[0,0,-1],u:[1,0,0],v:[0,1,0],number:5,fill:'#bdad89'},
 {n:[1,0,0],u:[0,0,1],v:[0,1,0],number:3,fill:'#d7a685'},{n:[-1,0,0],u:[0,0,1],v:[0,1,0],number:4,fill:'#a6bec5'}];
 const pips:Record<number,number[][]>={1:[[0,0]],2:[[-.48,-.48],[.48,.48]],3:[[-.48,-.48],[0,0],[.48,.48]],4:[[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]],5:[[-.48,-.48],[.48,-.48],[0,0],[-.48,.48],[.48,.48]],6:[[-.48,-.5],[-.48,0],[-.48,.5],[.48,-.5],[.48,0],[.48,.5]]};
 return faces.map(f=>{const normal=rotate(f.n);if(normal[0]+normal[1]+normal[2]<.001)return null;const at=(u:number,v:number)=>point(rotate(f.n.map((n,i)=>n+u*f.u[i]+v*f.v[i]) as Vec));
  const [a,b,c]=[at(0,0),at(1,0),at(0,1)],mat=`matrix(${b[0]-a[0]} ${b[1]-a[1]} ${c[0]-a[0]} ${c[1]-a[1]} ${a[0]} ${a[1]})`;
  return <g key={f.number} transform={mat}><rect x="-1" y="-1" width="2" height="2" fill={f.fill} stroke={ink} strokeWidth=".036" rx=".045"/>{pips[f.number].map(([x,y],i)=><circle key={i} cx={x} cy={y} r=".15" fill={ink}/>)}</g>});
}
function die(t:number,answer:boolean){
 const f=go(t,answer?.7:9.15,answer?2.6:3.6);
 return <Board title="Rotation test · hold the top face steady" description="Each pip stays on its face as the real cube turns through a quarter-turn; five emerges from around the back to the right." tone="blue">
  {dieShape(465,0)}{dieShape(1100,f*Math.PI/2)}{label('Given die',465,363)}{label('Same die',1100,363)}
  {trace('M680 203Q790 169 887 202m-20 2 20-2-11-17',go(t,answer?.3:8.75,1.2),gold,6)}
  <g opacity={go(t,answer?3.7:14.1,1)}>{text('Right face',1409,189,23,muted)}{text('5',1409,239,42,teal)}</g>
 </Board>;
}
function piece(t:number,answer:boolean){
 const gap=[[1,0],[2,0],[2,1]],fixed=[[0,0],[0,1],[1,1]],s=78,x0=520,y0=135;
 const f=go(t,answer?.7:9,2.2),test=go(t,answer?4.3:14.3,2);
 const cell=(c:number,r:number,fill:string,edge=ink)=> <rect key={c+':'+r} x={x0+c*s} y={y0+r*s} width={s} height={s} fill={fill} stroke={edge} strokeWidth="3"/>;
 return <Board title={answer?'Try the straight strip against the gap':'Tiling bench · track the three missing cells'} description="A rigid tromino moves to the open cells. A straight candidate cannot cover the bent boundary." tone="blue">
   {[0,1].flatMap(r=>[0,1,2].map(c=>cell(c,r,'#ebdfc5','#8a8d76')))}{fixed.map(([c,r])=>cell(c,r,'#acaf95'))}
   {answer?<><g transform={`translate(${mix(334,0,f)} 0)`}>{[0,1,2].map(c=>cell(c,0,'#e5be7f'))}</g><g opacity={test}><rect x={x0} y={y0} width={s} height={s} fill={brick} opacity=".42"/><rect x={x0+s*2+5} y={y0+s+5} width={s-10} height={s-10} fill="none" stroke={brick} strokeWidth="4" strokeDasharray="7 5"/>{text('Overlap',x0+s*.5,y0-29,22,brick)}{text('Gap',x0+s*2.5,y0+2*s+28,22,brick)}</g></>:
   <g transform={`translate(${mix(354,0,f)} ${-Math.sin(Math.PI*f)*38})`}>{gap.map(([c,r])=>cell(c,r,'#85b6a6'))}</g>}
   {label('Fixed base',274,193)}{line(373,193,511,193,muted,2)}<g opacity={answer?test:go(t,14.55,1)}>{label('Straight strip',1195,100)}<g transform={`rotate(${answer?90*go(t,6.7,1.65):0} 1194 212)`}>{[0,1,2].map(i=><rect key={i} x={1106+i*59} y="183" width="59" height="59" fill="#e4c292" stroke={ink} strokeWidth="3"/>)}</g></g>
 </Board>;
}
function cards(t:number,answer:boolean){
 const ids=answer?['P','Q','R']:['A','B','C'];const dirs=answer?[-90,0,90]:[0,90,180],xs=[456,800,1144];
 const swap=go(t,answer?.15:1.9,1.65),turn=go(t,answer?3.7:9.6,1.55);
 return <Board title="Card rail · move first, then turn" description="The first two labelled cards follow separate crossing paths, preserving the arrows. Only the new outside cards then rotate." tone="blue">
 {xs.map((x,i)=><g key={x}><rect x={x-110} y="163" width="220" height="131" rx="12" fill="none" stroke={muted} strokeWidth="2" strokeDasharray="7 8"/>{label('Position '+(i+1),x,349)}</g>)}
 {ids.map((n,i)=>{const x=xs[i]+(i===0?344:i===1?-344:0)*swap,y=213+Math.sin(Math.PI*swap)*(i===0?-76:i===1?76:0);const angle=dirs[i]+(i===1||i===2?90*turn:0);return <g key={n} transform={`translate(${x} ${y})`}>
  <rect x="-77" y="-60" width="154" height="122" rx="11" fill={['#d6c196','#a6c6b6','#d5a993'][i]} stroke={ink} strokeWidth="3"/><path d="M-61-48h38" stroke={muted} strokeWidth="2"/>{text(n,0,-31,24)}
  <path d="M0 21v-48m-16 17 16-17 16 17" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" transform={`translate(0 18) rotate(${angle})`}/>
 </g>})}
 </Board>;
}
function map(t:number,answer:boolean){
 const f=go(t,4.35,2.35),g=go(t,7.1,1.7),turn=go(t,.8,2.6);
 if(answer)return <Board title="Compass · turn on the spot" description="A brass direction needle turns from west to north while its central map pin remains fixed." tone="blue">
  <circle cx="800" cy="222" r="111" fill="#ddd1af" stroke="#8c7456" strokeWidth="8"/><circle cx="800" cy="222" r="99" fill="none" stroke={muted} strokeWidth="2"/>
  {['N','E','S','W'].map((n,i)=>{const a=rad(i*90);return <g key={n}>{text(n,800+Math.sin(a)*153,222-Math.cos(a)*141,29)}</g>})}
  <g transform={`translate(800 222) rotate(${-90+90*turn})`}><path d="M0-92 18 13 0 6-18 13z" fill={brick} stroke={ink} strokeWidth="3"/><path d="M0 76-13 3 0 9 13 3z" fill={blue}/></g>{pin(800,222)}
  {label('Fixed position',1160,205)}{line(974,219,1057,219,muted,2)}
 </Board>;
 return <Board title="Route map · separate position and direction" description="A map pin travels east and then north. A diagonal comparison joins the original and final positions without assuming equal distances." tone="blue">
  <path d="M160 289q420-19 1040 4m-150-220q-20 100 8 260" fill="none" stroke="#b8ad88" strokeWidth="22"/>
  {trace('M397 279h651',f,teal,7)}{trace('M1048 279V109',g,teal,7)}
  {[[397,279,'Library'],[1048,279,'Park'],[1048,109,'Museum']].map(([x,y,n])=><g key={n}><circle cx={x} cy={y} r="11" fill={paper} stroke={ink} strokeWidth="3"/>{text(n,Number(x)+(n==='Museum'?100:0),Number(y)+(n==='Museum'?-13:48),26)}</g>)}
  {trace('M398 267 1027 106',go(t,9.3,1.6),gold,4)}<g transform={`translate(${397+651*f} ${279-170*g})`}><path d="M0-3q-21-21-15-32 5-12 15-12 20 0 17 18Q10-10 0-3z" fill={brick} stroke={ink} strokeWidth="2"/></g>
  {label('N',1370,110)}{line(1370,221,1370,141,ink,4)}<path d="m1359 154 11-15 11 15" stroke={ink} fill="none" strokeWidth="4"/>
 </Board>;
}
export function SpatialStudy({code,answer,t}:StudyProps){switch(code){
 case 'S1':return transform(t,answer,true);case 'S2':return transform(t,answer,false);case 'S3':return elevation(t,answer);case 'S4':return fold(t,answer);case 'S5':return net(t,answer);case 'S6':return die(t,answer);case 'S7':return piece(t,answer);case 'S8':return cards(t,answer);case 'S9':return map(t,answer);default:return null;
}}
