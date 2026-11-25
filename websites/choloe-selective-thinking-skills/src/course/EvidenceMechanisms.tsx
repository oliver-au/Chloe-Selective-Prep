import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {palette as p} from './LessonScene';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const mechanismIds=new Set(['01-c8-worked','03-a0-worked','03-a2-worked','03-a4-worked']);
export function EvidenceMechanism({id}:{id:string}){
 const f=useCurrentFrame();const {fps}=useVideoConfig();const appear=(at:number)=>interpolate(f,[at*fps,(at+.7)*fps],[0,1],clamp);
 const box=(x:number,y:number,w:number,lines:string[],color=p.accent)=> <g><rect x={x} y={y} width={w} height={108} rx={12} stroke={color} strokeWidth={2} fill={p.panel}/>{lines.map((line,i)=><text key={i} x={x+w/2} y={y+45+i*38} textAnchor="middle" fill={p.ink} fontSize={31} fontWeight={650}>{line}</text>)}</g>;
 const arrow=(x:number,y:number,dx:number,dy:number,at:number,color=p.accent)=><g opacity={appear(at)}><path d={`M${x} ${y} l${dx} ${dy}`} stroke={color} strokeWidth={4} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1-appear(at)}/><path d={`M${x+dx-14} ${y+dy-10} l14 10 -14 10`} fill="none" stroke={color} strokeWidth={4}/></g>;
 return <svg viewBox="0 0 1600 360" width="100%" height="100%" style={{fontFamily:'Manrope Variable,Arial,sans-serif'}}>
 {id==='01-c8-worked'?<>
  {box(55,45,450,['At least 15 points'])}{box(55,205,450,['Fair Play'])}{box(1115,125,400,['Qualified'])}
  {arrow(505,99,600,70,.5)}{arrow(505,259,600,-70,1)}
  <g opacity={appear(4)}><path d="M220 70l120 58m0-58-120 58" stroke="#ff6756" strokeWidth={7}/><text x={700} y={85} fontSize={32} fill="#ff6756">13 points: this route fails</text></g>
  <g opacity={appear(7)}><rect x={50} y={200} width={460} height={118} rx={15} fill="none" stroke={p.second} strokeWidth={5}/><text x={700} y={285} fontSize={32} fill={p.second}>The only remaining route</text></g>
  <text x={800} y={350} textAnchor="middle" fill={p.muted} fontSize={26}>These are explicitly the only two routes.</text>
 </>:id==='03-a0-worked'?<>
  {box(55,80,440,['Club members','scored higher'])}{box(1105,80,440,['The club caused','higher scores'])}
  <path d="M500 134H1090" stroke={p.line} strokeWidth={4} strokeDasharray="14 12"/>
  <g opacity={appear(3)}><text x={800} y={116} textAnchor="middle" fontSize={45} fill="#ff6756">?</text><text x={800} y={165} textAnchor="middle" fontSize={28} fill={p.second}>Were the groups comparable?</text></g>
  <g opacity={appear(7)}>{box(495,235,610,['Perhaps stronger students','joined first'],p.second)}<path d="M800 235V190" stroke={p.second} strokeWidth={3} strokeDasharray="7 7"/></g>
  <text x={275} y={50} textAnchor="middle" fontSize={24} fill={p.muted}>EVIDENCE</text><text x={1325} y={50} textAnchor="middle" fontSize={24} fill={p.muted}>CAUSAL CLAIM</text>
 </>:id==='03-a2-worked'?<>
  {box(60,35,460,['New reminder system'])}{box(1100,125,450,['Fewer late submissions'])}{arrow(520,89,570,85,.5)}<text x={780} y={80} textAnchor="middle" fontSize={27} fill={p.muted}>Claimed cause</text>
  <g opacity={appear(6)}>{box(60,215,460,['New calls to parents'],p.second)}{arrow(520,269,570,-85,6,p.second)}<text x={780} y={280} textAnchor="middle" fontSize={27} fill={p.muted}>Possible alternative</text></g>
  <g opacity={appear(9)}><text x={800} y={340} textAnchor="middle" fontSize={30} fill={p.second}>Two changes. Which caused the fall?</text></g>
 </>:<>
  {box(40,125,430,['Secure bike storage'])}{box(1100,125,450,['More cycling?'])}
  <g opacity={appear(2)}>{box(570,125,410,['Removes a real','storage barrier'],p.second)}{arrow(470,179,90,0,2)}{arrow(980,179,110,0,3)}<text x={775} y={55} textAnchor="middle" fontSize={27} fill={p.muted}>Needs: some people are deterred</text></g>
  <g opacity={appear(7)}><path d="M490 162l50 34m0-34-50 34" stroke="#ff6756" strokeWidth={5}/><text x={775} y={100} textAnchor="middle" fill="#ff6756" fontSize={31}>Negation: nobody is deterred</text><text x={775} y={302} textAnchor="middle" fill={p.second} fontSize={30}>The proposed mechanism loses its support.</text></g>
 </>}
 </svg>
}
