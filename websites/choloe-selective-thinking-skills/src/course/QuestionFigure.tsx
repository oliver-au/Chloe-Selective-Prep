import React from 'react';

const color = {paper:'#f9faf4',ink:'#184a43',muted:'#678d79',line:'#ccd9cd',fill:'#dfeade'};
const directions:Record<string,[number,number]>={east:[1,0],right:[1,0],west:[-1,0],left:[-1,0],north:[0,1],up:[0,1],south:[0,-1],down:[0,-1],northeast:[1,1],northwest:[-1,1],southeast:[1,-1],southwest:[-1,-1]};
function text(value:unknown,x:number,y:number,size=18,fill=color.ink,anchor:'start'|'middle'|'end'='middle'){
 return <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontFamily="inherit">{String(value??'')}</text>;
}
/** Arrow centred on the given point. SVG y points down, but input vectors point north/up. */
function arrow(x:number,y:number,direction:string,length=32){
 const v=directions[direction?.toLowerCase()];if(!v)return null;
 const size=Math.hypot(...v),dx=v[0]/size,dy=-v[1]/size;
 const end=[x+dx*length/2,y+dy*length/2];
 return <g><line x1={x-dx*length/2} y1={y-dy*length/2} x2={end[0]} y2={end[1]} stroke={color.ink} strokeWidth={3}/><path d={`M${end[0]-dx*9-dy*5} ${end[1]-dy*9+dx*5}L${end[0]} ${end[1]}L${end[0]-dx*9+dy*5} ${end[1]-dy*9-dx*5}`} fill="none" stroke={color.ink} strokeWidth={3}/></g>;
}
function coordinateGiven(d:any){
 const pts:any[]=d.points||[];const pivot=d.pivot;const mirror=d.mirrorLine;
 const extraXs:number[]=d.extraXs||[],extraYs:number[]=d.extraYs||[];
 const xs=[0,...pts.map(p=>p.x),...(pivot?[pivot[0]]:[]),...extraXs],ys=[0,...pts.map(p=>p.y),...(pivot?[pivot[1]]:[]),...extraYs];
 if(mirror?.axis==='x')xs.push(mirror.value);if(mirror?.axis==='y')ys.push(mirror.value);
 const minX=Math.min(-2,...xs)-(extraXs.length?1:2),maxX=Math.max(2,...xs)+(extraXs.length?1:2),minY=Math.min(-2,...ys)-(extraYs.length?1:2),maxY=Math.max(2,...ys)+(extraYs.length?1:2);
 const scale=Math.min(264/(maxX-minX),254/(maxY-minY));const x0=225-(minX+maxX)/2*scale,y0=154+(minY+maxY)/2*scale;
 const X=(x:number)=>x0+x*scale,Y=(y:number)=>y0-y*scale;
 return <>
  <rect x={X(minX)} y={Y(maxY)} width={(maxX-minX)*scale} height={(maxY-minY)*scale} fill="white" stroke={color.line}/>
  {Array.from({length:maxX-minX+1},(_,i)=>i+minX).map(x=><g key={'x'+x}><line x1={X(x)} x2={X(x)} y1={Y(minY)} y2={Y(maxY)} stroke={x===0?color.muted:color.line} strokeWidth={x===0?1.6:1}/>{x!==0&&text(x,X(x),Y(0)+15,10,color.muted)}</g>)}
  {Array.from({length:maxY-minY+1},(_,i)=>i+minY).map(y=><g key={'y'+y}><line x1={X(minX)} x2={X(maxX)} y1={Y(y)} y2={Y(y)} stroke={y===0?color.muted:color.line} strokeWidth={y===0?1.6:1}/>{y!==0&&text(y,X(0)-8,Y(y)+3,10,color.muted,'end')}</g>)}
  {text('x →',X(maxX)+18,Y(0)+4,13,color.muted)}{text('y ↑',X(0),Y(maxY)-9,13,color.muted)}
  {mirror?.axis==='x'&&<line x1={X(mirror.value)} x2={X(mirror.value)} y1={Y(minY)} y2={Y(maxY)} stroke={color.ink} strokeWidth={2.5} strokeDasharray="6 5"/>}
  {mirror?.axis==='y'&&<line x1={X(minX)} x2={X(maxX)} y1={Y(mirror.value)} y2={Y(mirror.value)} stroke={color.ink} strokeWidth={2.5} strokeDasharray="6 5"/>}
  {pivot&&<g><circle cx={X(pivot[0])} cy={Y(pivot[1])} r={7} fill={color.paper} stroke={color.ink} strokeWidth={2}/><path d={`M${X(pivot[0])-4} ${Y(pivot[1])}h8M${X(pivot[0])} ${Y(pivot[1])-4}v8`} stroke={color.ink}/></g>}
  {pts.map((p,i)=><g key={i}>{arrow(X(p.x),Y(p.y),p.direction,34)}<circle cx={X(p.x)} cy={Y(p.y)} r={3.2} fill={color.ink}/></g>)}
  {text('GIVEN STARTING STATE',480,54,14,color.muted,'start')}
  {pts.map((p,i)=><g key={i}>{text(`${p.label||'Point'}: (${p.x}, ${p.y})`,480,88+i*48,17,color.ink,'start')}{p.direction&&text(`Points ${p.direction}`,480,110+i*48,16,color.muted,'start')}</g>)}
  {pivot&&text(`Turning centre: (${pivot[0]}, ${pivot[1]})`,480,190,17,color.ink,'start')}
  {mirror&&text(`Mirror line: ${mirror.axis} = ${mirror.value}`,480,190,17,color.ink,'start')}
  {text('x increases right; y increases up.',480,235,15,color.muted,'start')}
  {text('Only the initial position is shown.',480,264,15,color.muted,'start')}
 </>;
}

/** Static task givens only. No transformed positions, opposite-pair derivation,
 * completed route, silhouette, answer option or unfolding result is rendered. */
export function QuestionFigure({diagram:d}:{diagram:any}){
 if(!d||typeof d.type!=='string')return null;
 let body:React.ReactNode;
 if(d.type==='coordinateGrid')body=coordinateGiven(d);
 else if(d.type==='heightMap'){
  const rows=d.rows||[],cols=d.columns||[],h=d.heights||[];const cw=Math.min(155,440/Math.max(1,cols.length)),rh=Math.min(62,205/Math.max(1,rows.length));const x=220,y=65;
  body=<>{text('GIVEN STACK HEIGHTS',400,25,15,color.muted)}{cols.map((c:string,j:number)=><g key={j}>{text(c,x+(j+.5)*cw,52,17)}</g>)}{rows.map((r:string,i:number)=><g key={i}>{text(r,x-22,y+(i+.5)*rh+6,17,color.ink,'end')}{cols.map((_:any,j:number)=><g key={j}><rect x={x+j*cw} y={y+i*rh} width={cw-4} height={rh-4} rx={5} fill="white" stroke={color.line}/>{text(h[i]?.[j]??'',x+(j+.5)*cw-2,y+(i+.5)*rh+7,23)}</g>)}</g>)}{text(`Requested view: ${d.view}. The table is the height map, not the answer.`,400,305,15,color.muted)}</>;
 }else if(d.type==='cubeNet'){
  const faces=d.faces||[];if(!faces.length)return null;const xs=faces.map((f:any)=>f.x),ys=faces.map((f:any)=>f.y);const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);const s=Math.min(72,570/(maxX-minX+1),240/(maxY-minY+1));
  const X=(x:number)=>400+(x-(minX+maxX)/2)*s,Y=(y:number)=>155-(y-(minY+maxY)/2)*s;
  body=<>{text('GIVEN NET · FLAT, BEFORE FOLDING',400,22,15,color.muted)}{faces.map((f:any)=><g key={f.label}><rect x={X(f.x)-s/2} y={Y(f.y)-s/2} width={s} height={s} fill="white" stroke={color.ink} strokeWidth={1.8}/>{text(f.label,X(f.x),Y(f.y)+1,25)}{text(`(${f.x},${f.y})`,X(f.x),Y(f.y)+21,12,color.muted)}</g>)}{text('Coordinates mark square centres. x → right; y ↑ up.',400,310,15,color.muted)}</>;
 }else if(d.type==='cellGrid'){
  const cols=d.columns,rows=d.rows;if(!cols||!rows)return null;const s=Math.min(69,520/cols,230/rows),x=400-cols*s/2,y=155-rows*s/2;const fixed=new Set((d.fixedCells||[]).map((p:any)=>p.join(',')));
  body=<>{Array.from({length:cols},(_,j)=><g key={j}>{text(j+1,x+(j+.5)*s,y-12,16,color.muted)}</g>)}{Array.from({length:rows},(_,i)=><g key={i}>{text(i+1,x-18,y+(i+.5)*s+5,16,color.muted)}{Array.from({length:cols},(_,j)=><g key={j}><rect x={x+j*s} y={y+i*s} width={s} height={s} fill={fixed.has(`${j+1},${i+1}`)?color.fill:'white'} stroke={color.ink} strokeWidth={1.5}/>{fixed.has(`${j+1},${i+1}`)&&text('Fixed',x+(j+.5)*s,y+(i+.5)*s+5,14)}</g>)}</g>)}{text('Shaded cells are fixed. Empty cells are the given gap.',400,307,15,color.muted)}</>;
 }else if(d.type==='cubeViews'){
  const initial=d.initial;if(!initial)return null;
  body=<>{text('GIVEN INITIAL VIEW',225,25,15,color.muted)}<polygon points="225,47 335,103 225,159 115,103" fill={color.fill} stroke={color.ink} strokeWidth={2}/><polygon points="115,103 225,159 225,280 115,224" fill="white" stroke={color.ink} strokeWidth={2}/><polygon points="225,159 335,103 335,224 225,280" fill="#edf2e7" stroke={color.ink} strokeWidth={2}/>{text(initial.top,225,112,31)}{text(initial.front,170,200,31)}{text(initial.right,280,200,31)}{text('front',125,258,13,color.muted)}{text('right',333,258,13,color.muted)}{text('Given opposite pairs',520,75,19)}{(d.opposites||[]).map((pair:any,i:number)=><g key={i}>{text(pair.join(' – '),520,115+i*47,24)}</g>)}{d.fixedTop!==undefined&&text(`Keep ${d.fixedTop} on top.`,520,285,17,color.muted)}</>;
 }else if(d.type==='sequence'){
  const initial=d.initial||[],n=initial.length,cw=Math.min(210,700/Math.max(n,1));
  body=<>{text('START · BEFORE EITHER OPERATION',400,30,15,color.muted)}{initial.map((item:any,i:number)=>{const x=400+(i-(n-1)/2)*cw;return <g key={i}><rect x={x-cw/2+10} y={65} width={cw-20} height={150} rx={10} fill="white" stroke={color.line}/>{text(item.label,x,100,24)}{arrow(x,155,item.direction,56)}{text(`Position ${i+1}`,x,250,16,color.muted)}</g>})}{text('Apply the operations in the order stated in the question.',400,300,16,color.muted)}</>;
 }else if(d.type==='seating'){
  const seats:Record<string,[number,number]>={north:[250,60],east:[360,160],south:[250,260],west:[140,160]};
  body=<><circle cx={250} cy={160} r={65} fill={color.fill} stroke={color.line}/>{text('Table',250,165,20)}{Object.entries(seats).map(([name,[x,y]])=>{const f=(d.fixed||[]).find((f:any)=>f.seat===name);const dirs:Record<string,string>={north:f?.facing==='outward'?'north':'south',east:f?.facing==='outward'?'east':'west',south:f?.facing==='outward'?'south':'north',west:f?.facing==='outward'?'west':'east'};return <g key={name}><rect x={x-42} y={y-25} width={84} height={50} rx={10} fill="white" stroke={color.ink}/>{text(f?.name||'?',x,y+6,19)}{text(name,x,y+(name==='north'?-35:41),13,color.muted)}{f&&arrow(x+(name==='east'?58:name==='west'?-58:0),y+(name==='north'?42:name==='south'?-42:0),dirs[name],25)}</g>})}{text('Only fixed seats are filled.',570,120,18)}{text('Use each person’s facing direction.',570,158,16,color.muted)}{text('Place the others using the clues.',570,196,16,color.muted)}</>;
 }else if(d.type==='foldCoordinates'){
  const [minX,maxX,minY,maxY]=d.bounds||[-4,4,-4,4];const s=Math.min(250/(maxX-minX),240/(maxY-minY)),X=(x:number)=>225+(x-(minX+maxX)/2)*s,Y=(y:number)=>155-(y-(minY+maxY)/2)*s;
  body=<><rect x={X(minX)} y={Y(maxY)} width={(maxX-minX)*s} height={(maxY-minY)*s} fill="white" stroke={color.ink} strokeWidth={2}/>{(d.folds||[]).map((f:any,i:number)=><g key={i}>{f.axis==='x'?<line x1={X(f.value)} x2={X(f.value)} y1={Y(minY)} y2={Y(maxY)} stroke={color.muted} strokeWidth={2} strokeDasharray="6 5"/>:<line x1={X(minX)} x2={X(maxX)} y1={Y(f.value)} y2={Y(f.value)} stroke={color.muted} strokeWidth={2} strokeDasharray="6 5"/>}{text(`Fold ${i+1}: ${f.axis} = ${f.value}`,470,78+i*37,18,color.ink,'start')}</g>)}<circle cx={X(d.punch[0])} cy={Y(d.punch[1])} r={5} fill={color.ink}/>{text(`Punch centre: (${d.punch.join(', ')})`,470,180,18,color.ink,'start')}{text('The punch occurs after folding.',470,215,15,color.muted,'start')}{text('Final unfolded holes are not shown.',470,245,15,color.muted,'start')}{text('x → right; y ↑ up',225,308,14,color.muted)}</>;
 }else if(d.type==='coordinateRoute'){
  const start=d.start||{x:0,y:0};
  // Compute route bounds silently from both legs and operations so the empty grid covers every step (without drawing the route).
  const headings=['north','east','south','west'];
  let dirIdx=Math.max(0,headings.indexOf(String(start.facing||'north').toLowerCase()));
  let cx=Number(start.x||0),cy=Number(start.y||0);
  const extraXs:number[]=[cx],extraYs:number[]=[cy];
  for(const leg of d.legs||[]){
   const v=directions[String(leg.direction||'').toLowerCase()];
   if(v&&typeof leg.distance==='number'){cx+=v[0]*leg.distance;cy+=v[1]*leg.distance;extraXs.push(cx);extraYs.push(cy);}
  }
  for(const op of d.operations||[]){
   if(typeof op.turnDegreesClockwise==='number'){dirIdx=((dirIdx+Math.round(op.turnDegreesClockwise/90))%4+4)%4;}
   if(typeof op.walk==='number'){
    const [dx,dy]=[[0,1],[1,0],[0,-1],[-1,0]][dirIdx];
    cx+=dx*op.walk;cy+=dy*op.walk;extraXs.push(cx);extraYs.push(cy);
   }
  }
  body=coordinateGiven({points:[{label:start.label||'Start',x:start.x,y:start.y,direction:start.facing}],extraXs,extraYs});
 }else return null;
 return <figure style={{margin:'18px 0',padding:8,border:`1px solid ${color.line}`,borderRadius:12,background:color.paper}}><svg role="img" aria-label={`Given diagram: ${d.type}; no solution is shown`} viewBox="0 0 800 330" width="100%" style={{display:'block',maxHeight:320,fontFamily:'inherit'}}>{body}</svg></figure>;
}
