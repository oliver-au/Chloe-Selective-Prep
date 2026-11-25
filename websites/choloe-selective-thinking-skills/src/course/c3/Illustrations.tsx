import {useId} from 'react';
import {interpolate} from 'remotion';
import {Nina} from './Nina';

export const paper = '#efe8d6';
export const mint = '#c3ecd8';
export const cyan = '#98dce5';
export const gold = '#f3bb66';
export const coral = '#f08978';
export const progress = (time:number, from:number, to:number) => {
 const t = interpolate(time,[from,to],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return t*t*(3-2*t);
};

type PoolProps = {
 x?: number;
 step?: number;
 phase?: number;
 walk?: number;
 gesture?: number;
 time?: number;
 camera?: number;
 view?: 'full' | 'opening';
};

function usePrefix() {
 return 'c3-' + useId().replace(/[^a-z0-9-]/gi, '');
}

function SceneDefs({prefix}: {prefix: string}) {
 return <defs>
  <linearGradient id={prefix+'-sky'} x2=".35" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#8ebdc1"/><stop offset=".65" stopColor="#dce5d4"/><stop offset="1" stopColor="#f6e3be"/></linearGradient>
  <radialGradient id={prefix+'-sun'}><stop stopColor="#fff1c1" stopOpacity=".85"/><stop offset=".55" stopColor="#fff0c6" stopOpacity=".35"/><stop offset="1" stopColor="#fff0c6" stopOpacity="0"/></radialGradient>
  <linearGradient id={prefix+'-water'} x2=".2" y2="1"><stop stopColor="#91c9b9"/><stop offset=".48" stopColor="#64adb0"/><stop offset="1" stopColor="#437e8e"/></linearGradient>
  <linearGradient id={prefix+'-paving'} x1=".15" y1=".1" x2=".72" y2="1"><stop stopColor="#ebd7b2"/><stop offset=".5" stopColor="#eddfc2"/><stop offset="1" stopColor="#d0bfa1"/></linearGradient>
  <linearGradient id={prefix+'-plaster'} x2="1" y2=".6"><stop stopColor="#dec59b"/><stop offset=".53" stopColor="#f2e2bc"/><stop offset="1" stopColor="#efdbaf"/></linearGradient>
  <linearGradient id={prefix+'-teal'} x2=".85" y2="1"><stop stopColor="#396f6d"/><stop offset=".55" stopColor="#497b72"/><stop offset="1" stopColor="#285453"/></linearGradient>
  <linearGradient id={prefix+'-glass'} x2=".8" y2="1"><stop stopColor="#86aaa0"/><stop offset=".52" stopColor="#507d78"/><stop offset="1" stopColor="#294e51"/></linearGradient>
  <pattern id={prefix+'-paper'} patternUnits="userSpaceOnUse" width="43" height="41">
   <path d="m4 4 1.5 -.4m7 12 2 .4m12 -11 1.8 -.8m9 11 1.5 .6m-30 15 1.8 .1m12 4 1.9 -.5m8 -10 1.4 .1m8 11 2 -.6" fill="none" stroke="#423b36" strokeWidth=".8" opacity=".35"/>
   <path d="m8 8 1 .6m11 5 1 .2m8 6 .9 -.4m-23 6 1.4 -.5m26 6 1.5 .4" stroke="#fff5df" strokeWidth="1.2" opacity=".55"/>
  </pattern>
  <pattern id={prefix+'-fluting'} patternUnits="userSpaceOnUse" width="6" height="50"><path d="M1 0V50" stroke="#104244" opacity=".18" strokeWidth="1.2"/><path d="M3 0V50" stroke="#e7e3b9" opacity=".15"/></pattern>
  <pattern id={prefix+'-tiles'} patternUnits="userSpaceOnUse" width="21" height="10"><path d="M0 0H21V10" fill="none" stroke="#d5e4cd" opacity=".72" strokeWidth="1.2"/></pattern>
  <clipPath id={prefix+'-scene'}><rect width="900" height="400" rx="13"/></clipPath>
  <clipPath id={prefix+'-pool'}><path d="M506 211 900 207 900 267 542 269Z"/></clipPath>
 </defs>;
}

function Landscape({prefix}: {prefix: string}) {
 return <>
  <rect width="900" height="400" fill={`url(#${prefix}-sky)`}/>
  <circle cx="711" cy="84" r="173" fill={`url(#${prefix}-sun)`}/>
  <circle cx="711" cy="84" r="24" fill="#fff1c9"/>
  <path d="M-8 148C73 120 86 132 132 124S225 106 272 125 370 138 414 116 467 125 501 122 568 139 634 123 723 132 772 127 837 119 909 127V187H0Z" fill="#a5c4b8"/>
  <path d="M0 159C67 154 110 134 143 134s66 12 89 9 46-8 75 1 53-5 88-3 61 11 104 4 75-6 116 2 80 0 124-4 99 6 165-4v53H0Z" fill="#8baea5"/>
  <path d="M573 153q37 -2 96 0t95 0 140 -1v37H557Z" fill="#add0c3"/>
  <path d="M637 160q26 -1 62 0m32 3 44 -1m28 0 48 -1" stroke="#d8e6d3" strokeWidth="1.7" strokeLinecap="round"/>
  <path d="M0 168 900 168 900 192 0 196Z" fill="#9bb09d"/>
  <path d="M0 173 900 173" stroke="#d5d6b6" strokeWidth="3"/>
 </>;
}

// Painted eucalyptus crowns share the shapes and warm, peeling bark of a single tree.
function Gum({x,y,scale=1,flip=false}:{x:number;y:number;scale?:number;flip?:boolean}) {
 return <g transform={`translate(${x} ${y}) scale(${flip?-scale:scale} ${scale})`}>
  <path d="M-8 9Q-1 -42 -7 -75q-5 -29 -19 -50l7-2Q1 -99 2 -82q8 -17 14 -36l6 2Q12 -80 5 -62q-1 36 6 71Z" fill="#a89373"/>
  <path d="M-5 8Q2 -38 -3 -64l5 -8q-3 47 4 80Z" fill="#e0cdb0"/>
  <g fill="none" stroke="#9d927b" strokeWidth="3.2" strokeLinecap="round">
   <path d="M-1 -60Q-21 -86 -53 -103m42 31q-8 -27 -6 -51M8 -87q34 -20 51 -52M14 -97q22 -28 20 -50M-9 -85q-23 -26 -53 -38"/>
  </g>
  <path d="M-81 -119q5 -11 19 -15 -4 -10 11 -14 9 -9 23 -6 9 -14 25 -8 8 9 4 21 -11 9 -21 8 -9 10 -20 10 -13 14 -24 10 -9 4 -17 -6Z" fill="#608881"/>
  <path d="M-10 -141q7 -16 22 -14 5 -18 20 -15 11 -7 19 1 13 -11 24 -3 13 6 7 13 -5 10 -19 12 -8 9 -22 8 -15 12 -24 7 -13 3 -27 -9Z" fill="#72998b"/>
  <path d="M-69 -108q8 -13 24 -10 7 -10 21 -10 10 -4 16 3 4 7 -4 12 -13 3 -21 10 -11 8 -23 7 -13 2 -13 -12Z" fill="#769b87"/>
  <path d="M19 -115q8 -16 25 -14 12 -11 25 -6 12 -6 18 1 5 8 -4 12 -7 7 -17 6 -10 9 -22 5 -11 9 -25 -4Z" fill="#638f80"/>
  <g fill="#95ad93"><path d="M-61 -133q8 -8 20 -9 -6 8 -20 9Z"/><path d="M-35 -145q9 -10 15 -8 -4 8 -15 8Z"/><path d="M20 -150q13 -11 21 -10 -7 9 -21 10Z"/><path d="M51 -151q11 -7 18 -6 -7 7 -18 6Z"/></g>
  <g stroke="#afbe9e" opacity=".67" strokeWidth="1.4" strokeLinecap="round"><path d="m-58 -107 8 -3m9 -27 10 -5m13 -5 6 -4m58 35 7 -3m10 -7 7 -2m-25 -31 6 -3"/></g>
 </g>;
}

function DistantDeck(){
 return <>
  <g opacity=".8">
   <Gum x={33} y={185} scale={.8}/><Gum x={138} y={180} scale={.49} flip/><Gum x={871} y={180} scale={.85}/>
  </g>
  <path d="M0 183 900 177V200L0 210Z" fill="#dfcbab"/>
  <path d="M0 183 900 177" stroke="#f4e4c4" strokeWidth="3"/>
  <g stroke="#5b7d76" fill="none" opacity=".83">
   <path d="M0 172 900 166M0 181 900 175" strokeWidth="1.6"/>
   {Array.from({length:24},(_,i)=><path key={i} d={`M${i*41} ${167-i*.28}v20`} strokeWidth="2"/>)}
  </g>
  <g transform="translate(738 158)">
   <path d="M-2 2v35" stroke="#816954" strokeWidth="3"/>
   <path d="M-52 4Q-26 -7 -1 -22Q26 -7 49 4q-11 -2 -18 1 -11 -2 -19 1 -11 -2 -19 1 -12 -2 -21 0 -12 -3 -24 -3Z" fill="#d6a381"/>
   <path d="M-28 6 -1 -22 10 5Q-.5 4 -6.5 7Z" fill="#edceaa"/><path d="M-51 4 -1 -22 -33 4Z" fill="#eac5a2"/><path d="m-1 -22 33 27 17 -1Z" fill="#c48971"/>
   <path d="m-31 28 29 0 8 -10m-31 7 23 0 10 -10m-37 14 -3 6m31 -6 2 5" fill="none" stroke="#526b65" strokeWidth="2.3" strokeLinecap="round"/>
  </g>
 </>;
}

function Water({prefix,time}:{prefix:string;time:number}) {
 return <>
  <path d="M497 204 900 201V282L535 284Z" fill="#fbefd0"/>
  <path d="M506 211 900 207 900 271 542 273Z" fill={`url(#${prefix}-water)`}/>
  <g clipPath={`url(#${prefix}-pool)`}>
   <path d="M506 213 900 209v9l-388 5Z" fill="#598f90"/>
   <path d="m528 222 365 -4m-358 13 365 -4m-362 18 362 -4" stroke="#91c3b6" strokeWidth="2"/>
   {[0,1,2,3,4,5,6].map((j)=>
    <g key={j} transform={`translate(${Math.sin(time*.64+j*1.7)*(2+j*.45)} 0)`}>
     {[0,1,2,3].map(i=>{
      const x=526+i*106+((j*23+i*7)%48);
      const y=222+j*6.65-i*.65;
      return <path key={i} d={`M${x} ${y}q9 -2.8 16 -.4t18 -.7m14 -1.1 10 .2`} fill="none" stroke={j%2?'#cae5ce':'#dff1db'} opacity={.38+(j%3)*.12} strokeWidth={1+j*.13} strokeLinecap="round"/>;
     })}
    </g>
   )}
   <path d="M530 244 900 239" stroke="#507f82" strokeWidth="2.6" opacity=".42"/>
   <path d="M530 242 900 237" stroke="#e5e6c9" strokeWidth="2.6" strokeDasharray="13 4"/>
   <path d="M530 242 900 237" stroke="#c78366" strokeWidth="2.8" strokeDasharray="7 27"/>
  </g>
  <path d="M540 269 900 264v9l-360 5Z" fill="#6fabb0"/>
  <path d="M540 269 900 264v9l-360 5Z" fill={`url(#${prefix}-tiles)`}/>
  <path d="m535 282 365 -5" stroke="#c1ae90" strokeWidth="2"/>
  <g transform="translate(828 267)" strokeLinecap="round" strokeLinejoin="round" fill="none">
   <path d="M0 5v-19q0 -14 -8 -13 -8 1 -8 13v10m44 8v-19q0 -13 -8 -12 -8 1 -8 13v9" stroke="#516f6c" strokeWidth="4.2"/>
   <path d="M-1 4v-19q0 -12 -7 -11m35 29v-19q0 -11 -7 -11" stroke="#f5e7c8" strokeWidth="1.7"/>
  </g>
 </>;
}

function Paving({prefix}:{prefix:string}) {
 return <>
  <path d="M0 196 900 190v210H0Z" fill={`url(#${prefix}-paving)`}/>
  <g fill="none" stroke="#ab997f" opacity=".29" strokeWidth="1.35">
   <path d="M0 284 900 272M0 342 900 330M0 398 900 383M39 201 0 234m117 -33 -117 133m216-136L70 400m235-201L207 400m211-200 -34 200m171-203 29 203m74-204 98 204m4-207 140 200"/>
  </g>
  <path d="M0 251 128 241 173 251 90 270 29 266 0 272Z" fill="#79988e" opacity=".18"/>
  <path d="M0 324 48 301 82 304 69 316 98 307 118 311 75 337 47 335 0 360Z" fill="#708d83" opacity=".17"/>
 </>;
}

function Pavilion({prefix}:{prefix:string}) {
 return <>
  {/* A roofed entrance booth sits behind the crossing. Back and front jambs
      share a ground-plane axis; the front jamb is composited after Nina. */}
  <path d="m330 249 108 -2 31 29 -80 3 -74 -19Z" fill="#67887f" opacity=".19"/>
  <path d="M335 131 397 129 397 246 336 251Z" fill={`url(#${prefix}-plaster)`}/>
  <path d="M397 129 417 143 416 254 397 247Z" fill="#b89773"/>
  <path d="M335 132 397 130 397 147 335 151Z" fill="#cdb795"/>
  <path d="M344 150 387 149 387 197 344 199Z" fill="#345958"/>
  <path d="M347 153 383 152 383 193 347 195Z" fill={`url(#${prefix}-glass)`}/>
  <path d="m347 155 15 -.6 -15 24Zm34 -3 -18 41h-7l17 -41Z" fill="#d3d6ad" opacity=".4"/>
  <path d="M367 152v43" stroke="#355657" strokeWidth="2.8"/>
  <path d="M339 200 391 198l4 3 -56 3Z" fill="#f1ddba"/>
  <path d="M339 203 395 201v4l-56 3Z" fill="#997f67"/>
  <path d="M335 240 398 237v11l-63 4Z" fill="#7b9486"/>
  <path d="M335 240 398 237" stroke="#a7b69f" strokeWidth="2"/>
  <g stroke="#396a61" fill="none">
   <path d="m397 243 -53 -48m53 19 -53 -39" strokeWidth="2.7"/>
   {[0,1,2,3,4,5].map(i=><path key={i} d={`M${348+i*8.5} ${178+i*6.15}v${20+i*1.5}`} strokeWidth="1.7"/>)}
  </g>
  <path d="M399 117h7v140l-7 4Z" fill="#365f58"/><path d="M399 117h2.2v143l-2.2 1Z" fill="#799281"/>
  <path d="m316 87 122 -5 60 35 -127 8Z" fill="#ced5b8"/>
  <path d="m316 88 55 37v26l-55 -39Z" fill="#385c56"/>
  <path d="m371 124 127 -7v27l-127 8Z" fill={`url(#${prefix}-teal)`}/>
  <path d="m371 124 127 -7v27l-127 8Z" fill={`url(#${prefix}-fluting)`}/>
  <path d="m315 86 124 -5 60 35 -128 8Z" fill="#e7dbb5"/>
  <path d="m316 89 55 37 128 -8" fill="none" stroke="#b4bc9f" strokeWidth="3"/>
  <path d="m372 150 126 -8v4l-126 8Z" fill="#2c5050"/>
  <g transform="translate(402 144) skewY(-3.4)">
   <text fill="#faf0d5" fontSize="18.5" fontWeight={780} letterSpacing="2.2" fontFamily="Manrope Variable, Arial, sans-serif">POOL</text>
   <path d="M71 -7h12m-5 -5 5 5 -5 5" stroke="#ead8a4" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
 </>;
}

function GateForeground(){
 return <>
  <path d="m466 355 8 -1 53 11 -17 3Z" fill="#6b8175" opacity=".34"/>
  <path d="m400 259 6 -4 66 94 -6 5Z" fill="#ae9a7b" opacity=".51"/>
  <path d="m404 256 3 -1 68 96 -2 1Z" fill="#f3e3be"/>
  <path d="m466 148 6 -.4V354l-6 2Z" fill="#385e58"/>
  <path d="m466 148 2 -.1V355l-2 1Z" fill="#94a58c"/>
  <path d="m472 148 2 -1v206l-2 1Z" fill="#2f514b"/>
  <path d="m465 353 10 -2v4l-10 2Z" fill="#294e49"/>
  <path d="m469 355 33 46m-32 -51 38 50" stroke="#486f63" strokeWidth="2.5"/>
  <path d="m470 326 36 63v12" stroke="#597d6f" strokeWidth="2.7" fill="none"/>
  {[0,1,2,3,4].map(i=><path key={i} d={`M${476+i*6} ${337+i*10.3}v${26-i*.6}`} stroke="#688478" strokeWidth="2"/>)}
 </>;
}

export function Pool({x=280,step=0,phase=step,walk=0,gesture=0,time=0,camera=0,view='full'}: PoolProps) {
 const id=usePrefix();
 const zoom=1+Math.max(0,Math.min(1,camera))*.13+(view==='opening'?.025:0);
 const anchorX=365+(x-280)*.25;
 return <svg viewBox="0 0 900 400" style={{width:'100%',height:'100%',display:'block'}} role="img" aria-label="Nina beside the outdoor swimming pool gate">
  <SceneDefs prefix={id}/>
  <g clipPath={`url(#${id}-scene)`}>
   <g transform={`translate(${anchorX*(1-zoom)} ${228*(1-zoom)}) scale(${zoom})`}>
    <Landscape prefix={id}/>
    <DistantDeck/>
    <Paving prefix={id}/>
    <Water prefix={id} time={time}/>
    <Pavilion prefix={id}/>
    <Nina x={x} groundY={321} phase={phase} walk={walk} gesture={gesture} time={time}/>
    <GateForeground/>
    <rect width="900" height="400" fill={`url(#${id}-paper)`} opacity=".22" pointerEvents="none"/>
   </g>
  </g>
 </svg>;
}

export function Band({time=0,turn=0}:{time?:number;turn?:number}) {
 const id=usePrefix();
 const rotation=-13+Math.sin(time*.65)*1.15+turn*5;
 return <svg viewBox="0 0 360 190" style={{width:'100%',height:'100%',display:'block'}} role="img" aria-label="Amber swimming-pool wristband">
  <defs>
   <linearGradient id={id+'-back'} x2="1" y2=".8"><stop stopColor="#a8683f"/><stop offset=".3" stopColor="#dc964a"/><stop offset=".7" stopColor="#c17e3d"/><stop offset="1" stopColor="#845538"/></linearGradient>
   <linearGradient id={id+'-face'} x1="0" y1="0" x2=".92" y2=".24"><stop stopColor="#9e633b"/><stop offset=".16" stopColor="#dc994f"/><stop offset=".45" stopColor="#f8c574"/><stop offset=".75" stopColor="#efb467"/><stop offset="1" stopColor="#ab703c"/></linearGradient>
   <radialGradient id={id+'-shadow'}><stop stopColor="#071317" stopOpacity=".65"/><stop offset="1" stopColor="#071317" stopOpacity="0"/></radialGradient>
  </defs>
  <ellipse cx="178" cy="151" rx="132" ry="19" fill={`url(#${id}-shadow)`}/>
  <g transform={`rotate(${rotation} 180 92)`}>
   <path d="M45 82C46 41 113 18 190 20s126 23 126 58l-6 34c-5-44-56-63-125-65-64-1-113 13-136 55Z" fill={`url(#${id}-back)`}/>
   <path d="M46 80c9-33 68-56 144-54 57 1 101 17 120 44" fill="none" stroke="#f7ca81" strokeWidth="3.3"/>
   <path d="M46 80c12 30 72 51 140 50 62-1 114-22 130-53l-4 38c-10 31-63 53-129 54-70 1-127-21-135-51Z" fill={`url(#${id}-face)`}/>
   <path d="M48 84c17 29 74 47 138 46 63-1 113-21 129-49" fill="none" stroke="#ffe0a1" strokeWidth="3.8"/>
   <path d="M51 117c16 28 71 47 132 46 65-1 115-20 128-49" fill="none" stroke="#8e5b3a" strokeWidth="1.7" opacity=".65"/>
   <g transform="translate(137 138) rotate(5 15 10)">
    <rect x="-6" y="-4" width="44" height="22" rx="5" fill="#cb8c4e"/>
    <rect x="-5" y="-3.5" width="42" height="20" rx="4" fill="#e5ad65" stroke="#f5c781" strokeWidth=".8"/>
    <g fill="none" stroke="#775d3e" strokeWidth="1.65" strokeLinecap="round">
     <path d="M1 5q3-4 7 0t8 0 8 0 7 0M1 10q3-4 7 0t8 0 8 0 7 0"/>
    </g>
   </g>
   <g transform="translate(249 128) rotate(-15)">
    <path d="M0 0l32 -1 1 11 -32 2Z" fill="#cb8b4a" opacity=".7"/>
    {[7,17,27].map(i=><circle key={i} cx={i} cy="5.5" r="2" fill="#875e3c"/>)}
   </g>
   <path d="m92 114 1.5 29m4 -27 1.5 29" stroke="#bd7e43" strokeWidth="1.15" opacity=".65"/>
  </g>
 </svg>;
}


export function Art({swapped=false}:{swapped?:boolean}){
 const id=usePrefix();
 return <svg viewBox="0 0 430 260" style={{width:'100%',height:'100%'}} role="img" aria-label={swapped?'Framed photograph of mountains':'Framed photograph of the coast'}>
  <defs>
   <linearGradient id={id+'-wood'} x2=".12" y2="1"><stop stopColor="#b18a65"/><stop offset=".48" stopColor="#896e52"/><stop offset="1" stopColor="#70563e"/></linearGradient>
   <linearGradient id={id+'-photo'} x2="0" y2="1"><stop stopColor={swapped?'#c48e75':'#a5c7ca'}/><stop offset=".68" stopColor={swapped?'#e5c399':'#d5dfca'}/><stop offset="1" stopColor="#91a89e"/></linearGradient>
   <clipPath id={id+'-print'}><rect x="92" y="50" width="246" height="146"/></clipPath>
  </defs>
  <rect x="62" y="24" width="311" height="202" rx="4" fill="#081419" opacity=".5"/>
  <rect x="58" y="18" width="312" height="202" rx="2" fill={`url(#${id}-wood)`}/>
  <path d="M61 22h305l-6 6H67Z" fill="#cdaa80"/>
  <rect x="66" y="26" width="296" height="186" fill="#4e493d"/>
  <rect x="69" y="29" width="290" height="180" fill={paper}/>
  <g clipPath={`url(#${id}-print)`}>
   <rect x="91" y="49" width="248" height="148" fill={`url(#${id}-photo)`}/>
   {swapped?<><circle cx="161" cy="84" r="20" fill="#f2d8ad"/><path d="m85 157 63 -35 36 7 53 -47 48 43 48 -6 20 80H81Z" fill="#87908a"/><path d="m87 192 64 -63 29 18 55 -63 29 44 -28 -16 -27 37 54 -17 80 65Z" fill="#536a6c"/><path d="m97 195 55 -50 46 22 50 -22 38 16 51 -27 18 65Z" fill="#344f57"/></>:<><circle cx="275" cy="85" r="18" fill="#f4deac"/><path d="M92 126q49 -19 93 0t82 2 71 2v66H92Z" fill="#8fae9e"/><path d="M88 139q73 -7 135 0t121 -5v68H88Z" fill="#6c9a99"/><path d="m95 160 38 -14 47 -2 34 11 -36 1 -28 14 -50 5Z" fill="#4f7470"/><path d="m89 197 20 -22 54 1 48 -9 43 4 -34 9 -17 19Z" fill="#314f53"/><path d="M216 154q20 -2 41 0m-12 4h34m-35 18 35 -2m-103 9 17 -1" stroke="#d8d9bf" strokeWidth="1.6" fill="none"/></>}
  </g>
 </svg>;
}

export function Rover({lit=false,battery='charged'}:{lit?:boolean;battery?:'charged'|'unknown'|'powered'}){
 const id=usePrefix();
 return <svg viewBox="0 0 430 260" style={{width:'100%',height:'100%'}} role="img" aria-label={battery==='unknown'?'Rover, power reading hidden':battery==='powered'?'Rover with power at the time it sent a signal':'Rover with a charged battery'}>
  <defs>
   <linearGradient id={id+'-chassis'} x2="0" y2="1"><stop stopColor="#d1c3a6"/><stop offset=".28" stopColor="#a49b82"/><stop offset="1" stopColor="#807f73"/></linearGradient>
   <linearGradient id={id+'-metal'} x2=".8" y2="1"><stop stopColor="#98b9b3"/><stop offset=".5" stopColor="#748f8b"/><stop offset="1" stopColor="#4e6a68"/></linearGradient>
  </defs>
  <ellipse cx="215" cy="219" rx="153" ry="10" fill="#09171c" opacity=".42"/>
  <path d="M16 222q55 -13 104 -9t83 3 83 -3 123 4" fill="none" stroke="#5e7774" strokeWidth="2"/>
  <g transform="translate(48 86)">
   <path d="m44 45 17 -15 205 -3 22 31 -15 18 -214 0Z" fill={`url(#${id}-chassis)`}/>
   <path d="m49 45 12 -15 206 -3 -13 12Z" fill="#f1dfb7"/><path d="m254 39 13 -12 21 31 -14 17Z" fill="#718480"/>
   <path d="m60 48 189 -5 12 26 -195 3Z" fill="#aa9b7b"/><path d="m74 52 54 -1 1 9 -53 2Z" fill="#786d5d"/>
   <g stroke="#dfd0ad" strokeWidth="1.6">{[80,91,102,113,124].map(x=><path key={x} d={`m${x} 52 1 9`}/>)}</g>
   <g stroke="#67817e" strokeWidth="6" fill="none" strokeLinecap="round"><path d="m61 108 49 -27 48 28 51 -33 47 30m-96 2 -27 -34m75 2 21 -10"/></g>
   {[61,158,256].map(x=><g key={x} transform={`translate(${x} 105)`}>
    <circle r="30" fill="#182b30" stroke="#637874" strokeWidth="4"/>
    <circle r="25" fill="none" stroke="#71827a" strokeWidth="5" strokeDasharray="2.5 7.3"/>
    <circle r="16" fill={`url(#${id}-metal)`} stroke="#42585a" strokeWidth="2"/><circle r="8.5" fill="#c1ad85"/><circle r="3.2" fill="#556967"/>
   </g>)}
   <path d="M100 29V-8l-3 -19 6 -5 3 18v44" fill="#94a69a"/>
   <path d="m85 -36 29 -3 15 5 2 11 -38 4 -8 -5Z" fill="#bdc7b4"/><path d="m116 -32 14 -1 1 10 -14 2Z" fill="#294a50"/><circle cx="123" cy="-27" r="3.2" fill={cyan}/>
   <path d="M200 26V2l6 -18" fill="none" stroke="#9db1a8" strokeWidth="4" strokeLinecap="round"/><circle cx="207" cy="-17" r="3.5" fill="#c5cab2"/>
   <rect x="167" y="10" width="45" height="14" rx="2.5" fill="#263f41" stroke="#b5c4b0" strokeWidth="2"/>
   {battery==='charged'&&[172,181,190,199].map(x=><rect key={x} x={x} y="13" width="6" height="8" rx="1" fill="#afe1be"/>)}
   {battery==='unknown'&&<path d="M181 17h16" stroke="#94a9a3" strokeWidth="2" strokeDasharray="3 3"/>}
   {battery==='powered'&&<path d="m193 11-9 6h5l-3 6 10-8h-6Z" fill="#afe1be"/>}
   <path d="M214 14v6" stroke="#b5c4b0" strokeWidth="3"/>
  </g>
  {lit&&<g fill="none" stroke={cyan} strokeWidth="4" strokeLinecap="round"><path d="M264 48q10 7 9 17m1 -27q18 11 18 27m5 -38q22 16 21 38"/></g>}
 </svg>;
}
