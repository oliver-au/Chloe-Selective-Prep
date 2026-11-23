import {ink,ivory,teal,amber,brick,blue,faded,ease,mix,Letter,Stamp,Sheet,Trail,Place,Door,Ball,Person,Cup} from './FirstFilmArt';
import type {Shot} from './FirstFilmArt';

function ScannerGate({t}:{t:number}){
  const pass=ease(t,1,3),gate=ease(t,5.7,2);
  const cardOut=ease(t,10.2,.65), hide=ease(t,10.9,.85), alternatives=ease(t,14,1);
  return <>
    <Letter x={52} y={51} align="start" size={30}>The card reader</Letter>
    <path d="M30 264h885" stroke="#b7ae8e" strokeWidth={5}/>
    <path d="M55 258v-93h60v91m18 0v-93h61v94m480-1v-96h58v94m18 0v-94h62v93" fill="none" stroke="#b2bba3" strokeWidth={10}/>
    <rect x={424} y={123} width={74} height={139} rx={11} fill="#3f6561"/><rect x={432} y={139} width={57} height={66} rx={8} fill="#233f40"/>
    <g transform={`translate(${mix(130,460,pass)} ${mix(221,169,pass)}) rotate(${mix(-12,-5,pass)})`} opacity={1-cardOut}><rect x={-61} y={-40} width={122} height={78} fill={blue} rx={9} stroke="#315872" strokeWidth={3}/><path d="M-42-18h30m-30 9h18" stroke={ivory} strokeWidth={3}/><Letter x={3} y={18} size={21} fill={ivory}>BLUE</Letter></g>
    <path d="M516 253v-85" stroke={ink} strokeWidth={15}/><g transform={`rotate(${-71*gate} 516 169)`}><path d="M516 169h162" stroke={ink} strokeWidth={15} strokeLinecap="round"/><path d="M532 169h140" stroke={amber} strokeDasharray="25 15" strokeWidth={9}/></g>
    <g opacity={hide}><rect x={59} y={88} width={312} height={152} rx={9} fill="#d9d3b7" stroke="#a7a58c" strokeWidth={2}/><Letter x={215} y={156} size={29}>Input covered</Letter><Letter x={215} y={196} size={23} fill={faded}>Which card was used?</Letter></g>
    <Place x={900} y={55} w={490} h={230}/><Letter x={1145} y={107} size={29}>Under the rule</Letter>
    <Letter x={1145} y={161} size={25} fill={faded}>{gate>.65?'The gate opens.':'Blue card → open gate'}</Letter>
    <g opacity={alternatives}><path d="M966 185h360" stroke="#bcb092" strokeWidth={2}/><Letter x={1145} y={226} size={25}>An open gate alone</Letter><Letter x={1145} y={258} size={23} fill={faded}>does not identify the card.</Letter></g>
  </>;
}
function NoBeep({t}:{t:number}){
  const scan=ease(t,.3,1.25),sound=ease(t,1.55,.95),observed=ease(t,4,1.2),possibilities=ease(t,11.8,1.5),verdict=ease(t,7.5,1);
  return <><Letter x={53} y={51} size={31} align="start">Test the scanner output</Letter>
    <Place x={52} y={80} w={790} h={217} fill="#d2d5bd"/>
    <rect x={387} y={100} width={418} height={165} rx={15} fill="#375654"/><rect x={402} y={117} width={388} height={125} rx={6} fill="#223d3c"/>
    {[0,1,2,3,4].map(i=><path key={i} d={`M${445+i*73} 121v117`} stroke="#3b5953" strokeWidth={2}/>)}
    <path d="M413 182h360" stroke="#46665c" strokeWidth={2}/><g opacity={1-observed}><Trail d="M418 182h72l12-25 14 50 17-65 16 86 15-65 16 35 13-16h176" show={sound} color="#b9d69f" w={5}/></g>
    <path d="M418 182h350" stroke="#b9d69f" strokeWidth={4} pathLength={1} strokeDasharray={1} strokeDashoffset={1-observed}/>
    <rect x={124} y={141} width={175} height={98} rx={12} fill="#668b7c"/><path d="M145 190h133" stroke={ink} strokeWidth={12}/>
    <g opacity={1-observed} transform={`translate(${mix(84,208,scan)} ${mix(133,171,scan)}) rotate(-5)`}><rect x={-54} y={-32} width={108} height={66} rx={8} fill={blue} stroke="#385d70" strokeWidth={3}/><Letter x={0} y={9} size={21} fill={ivory}>VALID</Letter></g>
    <Letter x={592} y={285} size={21}>{observed>.5?'Observed output · no beep':'Rule demonstration · beep'}</Letter>
    <Place x={872} y={80} w={515} h={217}/><Letter x={1130} y={127} size={29}>{observed>.5?'What can we conclude?':'A valid scan requires a beep.'}</Letter>
    <Stamp x={1130} y={178} w={345} show={verdict}>No valid card was scanned</Stamp>
    <g opacity={possibilities}><Letter x={1130} y={241} size={23}>An invalid scan or no scan</Letter><Letter x={1130} y={273} size={22} fill={faded}>could explain the silence.</Letter></g>
  </>;
}
function Forms({t}:{t:number}){
  const mia=ease(t,2.2,1.7),copy=ease(t,9.4,1.6),check=ease(t,12.6,2.8);
  return <><Letter x={58} y={54} align="start" size={32}>Competition desk</Letter>
    <path d="M54 272h815" stroke="#9f8056" strokeWidth={15}/><path d="M54 268h815" stroke="#c49d67" strokeWidth={7}/>
    {[0,1,2].map((v)=><Sheet key={v} x={478+v*12} y={183-v*3} w={204} h={133} angle={-9+v*4} label={['Entry forms','Form','Form'][v]}/>)}
    <Sheet x={mix(140,521,mia)} y={mix(205,181,mia)-Math.sin(Math.PI*mia)*61} angle={mix(-12,3,mia)} w={200} h={142} label="Mia’s form" color="#e4c184"/>
    <Place x={862} y={28} w={525} h={280}/><Letter x={1125} y={73} size={30}>A possible finalists’ list</Letter>
    {['Jin','Tess'].map((n,i)=><g key={n}><Letter x={937} y={136+i*65} align="start">{n}</Letter><Trail d={`M1020 ${126+i*65}h137`} show={copy} color={teal}/><g opacity={copy}><Letter x={1266} y={134+i*65} size={23}>form on file</Letter></g></g>)}
    <Stamp x={1120} y={260} w={370} show={check}>Mia can miss the final</Stamp>
  </>;
}
function Hall({t}:{t:number}){
  const open=ease(t,2.7,1.4),alt=ease(t,7.2,2.1),lift=Math.sin(Math.PI*alt)*38;
  return <><path d="M25 250h815v73H25Z" fill="#c3b39a"/><path d="M42 240V92l367-69 339 64v156" fill="#d7c8a3" stroke="#968c6f" strokeWidth={4}/><path d="M46 93l361-70 342 61" fill="none" stroke="#647b6b" strokeWidth={12}/>
   {[115,575].map(x=><g key={x}><rect x={x} y={104} width={92} height={85} fill="#92b4ab" stroke="#596e62" strokeWidth={4}/><path d={`M${x+46} 105v82M${x} 151h92`} stroke="#708a78" strokeWidth={4}/></g>)}<Door x={388} y={274} w={150} h={157} open={open}/>
   <Place x={864} y={35} w={521} h={268}/><Letter x={1125} y={79} size={28}>Two possible bookings</Letter>
   <g opacity={1-alt*.68}><Sheet x={1030} y={177} w={221} h={129} label="Training"/><Ball x={1099} y={216} r={18}/></g>
   <g opacity={alt} transform={`translate(${43*(1-alt)} ${- lift})`}><Sheet x={1222} y={201} w={220} h={133} label="Assembly" color="#e1c188"/></g>
   <g opacity={alt}><Stamp x={391} y={309} w={287}>Same open hall</Stamp></g></>;
}
function Register({t}:{t:number}){
 const p=ease(t,6.7,2.4),q=ease(t,9.9,2.4),sign=ease(t,12.2,1.4);
 const x=q>0?mix(691,965,q):mix(285,691,p), y=q>0?mix(240,238,q):240-Math.sin(Math.PI*p)*42;
 return <><Letter x={66} y={59} align="start" size={31}>Follow the visitor</Letter>
 <Place x={62} y={91} w={415} h={179} fill="#d6deca"/><Place x={512} y={91} w={359} h={179} fill="#d6deca"/><Place x={904} y={91} w={463} h={179} fill="#dfd0ad"/>
 {[111,159,207,255,303,351,399].map(n=><path key={n} d={`M${n} 220v-68l7-9 7 9v68`} fill="#708d7b"/>)}<path d="M107 167h306m-305 37h305" stroke={ink} strokeWidth={6}/>
 <rect x={245} y={176} width={33} height={28} rx={4} fill={amber}/><path d="M251 176v-9a10 10 0 0 1 20 0v9" fill="none" stroke="#7c633b" strokeWidth={4}/>
 <Door x={698} y={229} label="SIDE" w={109} h={86} open={.88}/>
 <g transform="translate(1130 184)"><path d="M-131-40Q-63-62 0-38q72-23 132-2v93q-70-21-132-2q-66-20-131-1Z" fill={ivory} stroke="#997b58" strokeWidth={4}/><path d="M0-35v85" stroke="#c0a47a" strokeWidth={3}/><path d="M15 10q12-19 18 0t20-12q-8 27 18 6t22 3" stroke={teal} strokeWidth={4} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-sign}/><g opacity={q} transform={`translate(${15+78*sign} ${11-8*Math.sin(Math.PI*4*sign)}) rotate(30)`}><path d="M0 0l-2-15 12-42 8 2-10 43z" fill="#bd8c4c" stroke="#846841" strokeWidth={1.5}/><path d="M0 0l-2-15 10 3z" fill={ink}/></g></g>
 <path d="M250 251H1170" fill="none" stroke="#9b9679" strokeDasharray="9 10" strokeWidth={3}/><g transform={`translate(${x} ${y})`}><Person x={0} y={0} s={.55}/></g>
 {['Locked gate','Side entrance','Signed book'].map((n,i)=><Letter key={n} x={[265,698,1129][i]} y={316} size={27}>{n}</Letter>)}</>;
}
function Equipment({t}:{t:number}){
 const away=ease(t,3.5,1),tom=ease(t,12.1,1.8);
 return <><Letter x={60} y={57} align="start" size={32}>The equipment counter</Letter>
 <g opacity={1-ease(t,11.5,.55)}><rect x={85} y={101} width={526} height={144} rx={6} fill="#799484"/><path d="M106 171h481m-314-72v147m139-147v147" stroke="#516f62" strokeWidth={8}/>
 {[158,222,333,480].map((x,i)=><Ball key={x} x={x} y={i===2?138:215} r={22}/>)}<path d="M73 249h640v19H73z" fill="#ab8b61"/></g>
 <g opacity={tom}>{[0,1].map(i=>{const dx=i*362,pass=i?ease(t,14.35,1.45):0;return <g key={i} transform={`translate(${52+dx} 0)`}><Place x={0} y={88} w={338} h={195} fill="#d8d9bc"/><Letter x={169} y={126} size={23}>Coach present</Letter><Person x={75} y={250} s={.75}/><path d="M116 219h74v13h-74Z" fill="#8a7356"/><rect x={123} y={230} width={9} height={24} fill="#76694f"/><path d="M235 227h72l-8 30h-55Z" fill="#aa825d"/><g><Ball x={mix(152,271,pass)} y={mix(201,232,pass)-31*Math.sin(Math.PI*pass)} r={17}/><path d="M234 231h75" stroke="#956f4f" strokeWidth={6}/></g><Letter x={168} y={312} size={22}>{i?'Could collect':'Could leave it'}</Letter></g>;})}</g>
 <Place x={826} y={60} w={557} h={233}/><Letter x={1103} y={106} size={32}>{tom>.5?'Tomorrow’s possible scene':'Today'}</Letter>
 <g opacity={away*(1-ease(t,11.45,.55))}><Letter x={1103} y={169}>Coach away</Letter><Stamp x={1103} y={236} color={brick} w={290} show={ease(t,6.4,.9)}>No collection</Stamp></g>
 <g opacity={tom}><Letter x={1103} y={169}>Coach present</Letter><Stamp x={1103} y={234} w={373} show={ease(t,15,.8)}>Collection still uncertain</Stamp></g></>;
}
function Qualification({t}:{t:number}){
 const points=ease(t,7.8,1),cross=ease(t,12.7,1),fair=ease(t,15.1,1.2);
 return <><Letter x={65} y={52} align="start" size={32}>Only two routes into the final</Letter>
 <path d="M295 173H423Q450 173 477 120T555 94h270q47 0 82 49t85 49h112M423 173q35 0 68 42t74 40h256q54 0 92-34t79-29" fill="none" stroke="#aaad92" strokeWidth={13} strokeLinecap="round"/>
 <Trail d="M440 181Q467 176 491 215t74 40h256q54 0 92-34t79-29h112" show={fair} color={teal} w={10}/>
 <Sheet x={181} y={184} w={226} h={134} label={points>.5?'13 points':'Team'} color="#e1c188"/>
 <Stamp x={690} y={91} w={256}>15 or more points</Stamp><Stamp x={686} y={253} w={216}>Fair Play award</Stamp>
 <path d="M810 59l51 62m1-62-51 62" fill="none" stroke={brick} strokeWidth={10} strokeLinecap="round" opacity={cross}/>
 <Cup x={1198} y={178} s={1.1}/><Letter x={1198} y={243} size={32}>In the final</Letter></>;
}
function Team({t}:{t:number}){
 const picked=ease(t,2.7,1.4),why=ease(t,5.4,1),question=ease(t,8.2,1.1);
 return <><Letter x={58} y={55} align="start" size={32}>Training missed</Letter><Place x={54} y={85} w={861} h={215}/><Letter x={242} y={137}>Usually dropped</Letter><Letter x={703} y={137}>Still on team</Letter><path d="M486 103v177" stroke="#b2a892" strokeDasharray="8 8" strokeWidth={3}/>
 <g opacity={ease(t,2.55,.45)} transform={`translate(${mix(530,697,picked)} ${mix(98,217,picked)-6*Math.sin(Math.PI*picked)})`}><path d="m-37-38 25-13q12 16 24 0l27 14 21 30-18 13-13-18v66h-56v-66L-41 4-59-8Z" fill={teal} stroke="#2b6361" strokeWidth={3}/><Letter x={0} y={27} size={25} fill={ivory}>K</Letter></g>
 <Place x={964} y={61} w={412} h={235}/><Letter x={1170} y={114}>Katya’s reason</Letter><g opacity={why}><Letter x={1170} y={176} size={27}>Medical exemption?</Letter></g><Stamp x={1170} y={239} w={250} color={brick} show={question}>Not established</Stamp></>;
}
function Shops({t}:{t:number}){
 const day=ease(t,4,1.4),rob=ease(t,6.8,1.2),paul=ease(t,13.9,1.4),parade=ease(t,16.9,1.2);
 return <>{[0,1].map(i=>{const x=46+i*694,flags=i?paul:day*(1-rob);return <g transform={`translate(${x},0)`} key={i}><Place x={0} y={25} w={654} h={286} fill={i?'#ddcba9':'#d2d6bd'}/><Letter x={326} y={70} size={28}>{i?'Paul’s day':'Rob’s day'}</Letter>{[0,1,2].map(k=><g key={k} transform={`translate(${48+k*182},0)`}><rect x={0} y={130} width={171} height={101} fill={['#d5ac83','#e5bd92','#cfa086'][k]}/><path d="M-5 137l15-23h154l13 23Z" fill={i?'#547c75':'#658c7c'}/><rect x={18} y={152} width={74} height={49} fill="#95b4ac" stroke="#798a78" strokeWidth={4}/><rect x={113} y={151} width={37} height={80} fill="#a09375"/><path d="M85 117V82" stroke="#6e715e" strokeWidth={3}/><path d={`M86 83l${flags*38} 6l-${flags*38} 12Z`} fill={brick}/></g>)}{i===1&&<g opacity={parade} transform={`translate(${mix(30,293,parade)},0)`}><Person x={0} y={240} s={.40} color={brick}/><Person x={62} y={240} s={.42} color={teal}/><path d="M10 211v-46m64 47v-47" stroke="#624f3c" strokeWidth={3}/><path d="M10 164h64v24l-32-5-32 5z" fill="#dbaa64" stroke="#8a754e" strokeWidth={1.8}/><path d="M20 169h45m-35 7h26" stroke="#f5dc99" strokeWidth={3}/></g>}<Letter x={326} y={273} size={25} fill={faded}>{i?(parade>.5?'A parade could have the same flags.':paul>.5?'Flags up':'Another day'):(rob>.65?'No flags → no national match':'A national match requires flags.')}</Letter></g>;})}</>;
}
export const conditions:Record<string,Shot>={C1:ScannerGate,C2:Forms,C4:NoBeep,C5:Hall,C6:Register,C7:Equipment,C8:Qualification,C9:Team,C10:Shops};
