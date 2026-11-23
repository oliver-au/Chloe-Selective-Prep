import {Sequence,useVideoConfig} from 'remotion';
import {LessonScene} from './LessonScene';
import data from './course.json';
import type {CourseScene,LessonMeta} from './LessonScene';
export const LessonSTART=()=>{const {fps}=useVideoConfig();const m=data[0];return <>
<Sequence name="Think clearly. Show your proof." from={0} durationInFrames={671} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A routine for every question" from={671} durationInFrames={641} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Small words change the task" from={1312} durationInFrames={725} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Choose the smallest useful picture" from={2037} durationInFrames={716} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Build understanding, then transfer it" from={2753} durationInFrames={575} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Preparing for the 2027 test" from={3328} durationInFrames={746} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonGUIDE=()=>{const {fps}=useVideoConfig();const m=data[1];return <>
<Sequence name="Ask for the thinking behind the answer" from={0} durationInFrames={617} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Name the error, then repair it" from={617} durationInFrames={743} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="When the story gets longer" from={1360} durationInFrames={734} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="How to know a model is secure" from={2094} durationInFrames={731} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Use only the information you are given" from={2825} durationInFrames={737} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="One model, one proof, one fresh example" from={3562} durationInFrames={722} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC1=()=>{const {fps}=useVideoConfig();const m=data[2];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={212} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C1 · If then forward deduction" from={212} durationInFrames={548} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C1 · If then forward deduction" from={760} durationInFrames={545} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · If then forward deduction" from={1305} durationInFrames={662} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · If then forward deduction" from={1967} durationInFrames={500} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2467} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC2=()=>{const {fps}=useVideoConfig();const m=data[3];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={236} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C2 · Necessary versus sufficient" from={236} durationInFrames={545} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C2 · Necessary versus sufficient" from={781} durationInFrames={632} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Necessary versus sufficient" from={1413} durationInFrames={575} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Necessary versus sufficient" from={1988} durationInFrames={608} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2596} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC3=()=>{const {fps}=useVideoConfig();const m=data[4];return <>
<Sequence name="The pool gate" from={0} durationInFrames={165} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Make a prediction" from={165} durationInFrames={468} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Follow Nina" from={633} durationInFrames={219} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Test a second story" from={852} durationInFrames={393} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Find the requirement" from={1245} durationInFrames={351} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Three ways to say it" from={1596} durationInFrames={468} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Room B" from={2064} durationInFrames={456} premountFor={fps}><LessonScene scene={m.scenes[6] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Exhibition question" from={2520} durationInFrames={645} premountFor={fps}><LessonScene scene={m.scenes[7] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Exhibition answer" from={3165} durationInFrames={588} premountFor={fps}><LessonScene scene={m.scenes[8] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Rover question" from={3753} durationInFrames={513} premountFor={fps}><LessonScene scene={m.scenes[9] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Rover answer" from={4266} durationInFrames={651} premountFor={fps}><LessonScene scene={m.scenes[10] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Take it with you" from={4917} durationInFrames={327} premountFor={fps}><LessonScene scene={m.scenes[11] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC4=()=>{const {fps}=useVideoConfig();const m=data[5];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={242} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C4 · Contrapositive" from={242} durationInFrames={521} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C4 · Contrapositive" from={763} durationInFrames={548} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Contrapositive" from={1311} durationInFrames={617} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Contrapositive" from={1928} durationInFrames={545} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2473} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC5=()=>{const {fps}=useVideoConfig();const m=data[6];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={230} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C5 · Invalid reversal and negation" from={230} durationInFrames={554} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C5 · Invalid reversal and negation" from={784} durationInFrames={590} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Invalid reversal and negation" from={1374} durationInFrames={611} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Invalid reversal and negation" from={1985} durationInFrames={587} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2572} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC6=()=>{const {fps}=useVideoConfig();const m=data[7];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={242} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C6 · Conditional chains" from={242} durationInFrames={599} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C6 · Conditional chains" from={841} durationInFrames={614} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Conditional chains" from={1455} durationInFrames={737} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Conditional chains" from={2192} durationInFrames={503} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2695} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC7=()=>{const {fps}=useVideoConfig();const m=data[8];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={197} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C7 · Unless and provided that" from={197} durationInFrames={848} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C7 · Unless and provided that" from={1045} durationInFrames={542} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Unless and provided that" from={1587} durationInFrames={545} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Unless and provided that" from={2132} durationInFrames={452} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2584} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC8=()=>{const {fps}=useVideoConfig();const m=data[9];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={251} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C8 · Multiple routes" from={251} durationInFrames={584} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C8 · Multiple routes" from={835} durationInFrames={533} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Multiple routes" from={1368} durationInFrames={545} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Multiple routes" from={1913} durationInFrames={485} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2398} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC9=()=>{const {fps}=useVideoConfig();const m=data[10];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={269} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C9 · Weak language" from={269} durationInFrames={575} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C9 · Weak language" from={844} durationInFrames={581} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Weak language" from={1425} durationInFrames={563} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Weak language" from={1988} durationInFrames={470} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2458} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonC10=()=>{const {fps}=useVideoConfig();const m=data[11];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={224} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C10 · Whose reasoning is correct" from={224} durationInFrames={518} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="C10 · Whose reasoning is correct" from={742} durationInFrames={677} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Whose reasoning is correct" from={1419} durationInFrames={824} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Whose reasoning is correct" from={2243} durationInFrames={539} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2782} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonM1=()=>{const {fps}=useVideoConfig();const m=data[12];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={284} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M1 · Must and counterexamples" from={284} durationInFrames={491} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M1 · Must and counterexamples" from={775} durationInFrames={614} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Must and counterexamples" from={1389} durationInFrames={656} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Must and counterexamples" from={2045} durationInFrames={629} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2674} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonM2=()=>{const {fps}=useVideoConfig();const m=data[13];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={260} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M2 · Could and construction" from={260} durationInFrames={569} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M2 · Could and construction" from={829} durationInFrames={704} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Could and construction" from={1533} durationInFrames={632} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Could and construction" from={2165} durationInFrames={467} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2632} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonM3=()=>{const {fps}=useVideoConfig();const m=data[14];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={260} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M3 · Cannot and contradiction" from={260} durationInFrames={497} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M3 · Cannot and contradiction" from={757} durationInFrames={665} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Cannot and contradiction" from={1422} durationInFrames={635} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Cannot and contradiction" from={2057} durationInFrames={626} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2683} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonM4=()=>{const {fps}=useVideoConfig();const m=data[15];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={257} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M4 · All some none and not all" from={257} durationInFrames={629} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M4 · All some none and not all" from={886} durationInFrames={584} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · All some none and not all" from={1470} durationInFrames={644} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · All some none and not all" from={2114} durationInFrames={617} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2731} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonM5=()=>{const {fps}=useVideoConfig();const m=data[16];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={269} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M5 · Undetermined and two cases" from={269} durationInFrames={557} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="M5 · Undetermined and two cases" from={826} durationInFrames={716} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Undetermined and two cases" from={1542} durationInFrames={800} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Undetermined and two cases" from={2342} durationInFrames={509} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2851} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonA0=()=>{const {fps}=useVideoConfig();const m=data[17];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={236} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A0 · Claim evidence and gap" from={236} durationInFrames={575} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A0 · Claim evidence and gap" from={811} durationInFrames={641} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Claim evidence and gap" from={1452} durationInFrames={623} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Claim evidence and gap" from={2075} durationInFrames={569} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2644} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonA1=()=>{const {fps}=useVideoConfig();const m=data[18];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={263} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A1 · Strengthen with a direct hit" from={263} durationInFrames={563} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A1 · Strengthen with a direct hit" from={826} durationInFrames={668} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Strengthen with a direct hit" from={1494} durationInFrames={800} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Strengthen with a direct hit" from={2294} durationInFrames={554} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2848} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonA2=()=>{const {fps}=useVideoConfig();const m=data[19];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={245} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A2 · Weaken the exact bridge" from={245} durationInFrames={608} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A2 · Weaken the exact bridge" from={853} durationInFrames={584} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Weaken the exact bridge" from={1437} durationInFrames={710} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Weaken the exact bridge" from={2147} durationInFrames={584} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2731} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonA3=()=>{const {fps}=useVideoConfig();const m=data[20];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={245} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A3 · Identify the reasoning flaw" from={245} durationInFrames={671} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A3 · Identify the reasoning flaw" from={916} durationInFrames={629} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Identify the reasoning flaw" from={1545} durationInFrames={617} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Identify the reasoning flaw" from={2162} durationInFrames={674} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2836} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonA4=()=>{const {fps}=useVideoConfig();const m=data[21];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={284} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A4 · Assumptions and negation" from={284} durationInFrames={665} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A4 · Assumptions and negation" from={949} durationInFrames={590} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Assumptions and negation" from={1539} durationInFrames={701} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Assumptions and negation" from={2240} durationInFrames={626} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2866} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonA5=()=>{const {fps}=useVideoConfig();const m=data[22];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={212} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A5 · Cause and correlation" from={212} durationInFrames={647} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A5 · Cause and correlation" from={859} durationInFrames={707} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Cause and correlation" from={1566} durationInFrames={731} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Cause and correlation" from={2297} durationInFrames={608} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2905} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonA6=()=>{const {fps}=useVideoConfig();const m=data[23];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={290} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A6 · Sample and generalisation" from={290} durationInFrames={569} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A6 · Sample and generalisation" from={859} durationInFrames={575} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Sample and generalisation" from={1434} durationInFrames={632} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Sample and generalisation" from={2066} durationInFrames={635} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2701} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonA7=()=>{const {fps}=useVideoConfig();const m=data[24];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={308} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A7 · Fair comparisons" from={308} durationInFrames={629} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A7 · Fair comparisons" from={937} durationInFrames={647} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Fair comparisons" from={1584} durationInFrames={641} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Fair comparisons" from={2225} durationInFrames={527} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2752} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonA8=()=>{const {fps}=useVideoConfig();const m=data[25];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={269} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A8 · Detection and measurement bias" from={269} durationInFrames={623} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="A8 · Detection and measurement bias" from={892} durationInFrames={671} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn · Detection and measurement bias" from={1563} durationInFrames={707} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Answer · Detection and measurement bias" from={2270} durationInFrames={593} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2863} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonO1=()=>{const {fps}=useVideoConfig();const m=data[26];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={242} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O1 · Relative order · The method" from={242} durationInFrames={707} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O1 · Relative order · Worked example" from={949} durationInFrames={698} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O1 · Relative order · Your turn" from={1647} durationInFrames={533} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O1 · Relative order · Answer and check" from={2180} durationInFrames={422} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2602} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonO2=()=>{const {fps}=useVideoConfig();const m=data[27];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={260} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O2 · Adjacent blocks · The method" from={260} durationInFrames={581} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O2 · Adjacent blocks · Worked example" from={841} durationInFrames={683} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O2 · Adjacent blocks · Your turn" from={1524} durationInFrames={515} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O2 · Adjacent blocks · Answer and check" from={2039} durationInFrames={431} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2470} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonO3=()=>{const {fps}=useVideoConfig();const m=data[28];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={257} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O3 · Fixed positions and gaps · The method" from={257} durationInFrames={563} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O3 · Fixed positions and gaps · Worked example" from={820} durationInFrames={677} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O3 · Fixed positions and gaps · Your turn" from={1497} durationInFrames={518} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O3 · Fixed positions and gaps · Answer and check" from={2015} durationInFrames={440} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2455} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonO4=()=>{const {fps}=useVideoConfig();const m=data[29];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={227} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O4 · Circular seating and facing · The method" from={227} durationInFrames={614} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O4 · Circular seating and facing · Worked example" from={841} durationInFrames={776} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O4 · Circular seating and facing · Your turn" from={1617} durationInFrames={509} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O4 · Circular seating and facing · Answer and check" from={2126} durationInFrames={458} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2584} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonO5=()=>{const {fps}=useVideoConfig();const m=data[30];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={254} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O5 · Timetables · The method" from={254} durationInFrames={572} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O5 · Timetables · Worked example" from={826} durationInFrames={635} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O5 · Timetables · Your turn" from={1461} durationInFrames={557} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O5 · Timetables · Answer and check" from={2018} durationInFrames={461} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2479} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonO6=()=>{const {fps}=useVideoConfig();const m=data[31];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={218} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O6 · Separate attributes · The method" from={218} durationInFrames={593} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O6 · Separate attributes · Worked example" from={811} durationInFrames={608} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O6 · Separate attributes · Your turn" from={1419} durationInFrames={536} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O6 · Separate attributes · Answer and check" from={1955} durationInFrames={365} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2320} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonO7=()=>{const {fps}=useVideoConfig();const m=data[32];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={230} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O7 · Enough information to order · The method" from={230} durationInFrames={593} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O7 · Enough information to order · Worked example" from={823} durationInFrames={758} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O7 · Enough information to order · Your turn" from={1581} durationInFrames={725} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="O7 · Enough information to order · Answer and check" from={2306} durationInFrames={446} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2752} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonD1=()=>{const {fps}=useVideoConfig();const m=data[33];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={200} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D1 · Matching grids · The method" from={200} durationInFrames={537} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D1 · Matching grids · Worked example" from={737} durationInFrames={599} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D1 · Matching grids · Your turn" from={1336} durationInFrames={815} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D1 · Matching grids · Answer and check" from={2151} durationInFrames={482} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2633} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonD2=()=>{const {fps}=useVideoConfig();const m=data[34];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={260} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D2 · Or versus exactly one · The method" from={260} durationInFrames={662} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D2 · Or versus exactly one · Worked example" from={922} durationInFrames={650} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D2 · Or versus exactly one · Your turn" from={1572} durationInFrames={512} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D2 · Or versus exactly one · Answer and check" from={2084} durationInFrames={407} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2491} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonD3=()=>{const {fps}=useVideoConfig();const m=data[35];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={305} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D3 · Cases and shared conclusions · The method" from={305} durationInFrames={614} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D3 · Cases and shared conclusions · Worked example" from={919} durationInFrames={722} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D3 · Cases and shared conclusions · Your turn" from={1641} durationInFrames={521} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D3 · Cases and shared conclusions · Answer and check" from={2162} durationInFrames={476} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2638} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonD4=()=>{const {fps}=useVideoConfig();const m=data[36];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={284} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D4 · Test the options · The method" from={284} durationInFrames={602} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D4 · Test the options · Worked example" from={886} durationInFrames={674} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D4 · Test the options · Your turn" from={1560} durationInFrames={584} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D4 · Test the options · Answer and check" from={2144} durationInFrames={401} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2545} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonD5=()=>{const {fps}=useVideoConfig();const m=data[37];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={257} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D5 · Truth and lie consistency · The method" from={257} durationInFrames={587} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D5 · Truth and lie consistency · Worked example" from={844} durationInFrames={674} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D5 · Truth and lie consistency · Your turn" from={1518} durationInFrames={695} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D5 · Truth and lie consistency · Answer and check" from={2213} durationInFrames={537} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2750} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonD6=()=>{const {fps}=useVideoConfig();const m=data[38];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={260} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D6 · Sets and existence · The method" from={260} durationInFrames={599} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D6 · Sets and existence · Worked example" from={859} durationInFrames={602} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D6 · Sets and existence · Your turn" from={1461} durationInFrames={551} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D6 · Sets and existence · Answer and check" from={2012} durationInFrames={419} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2431} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonD7=()=>{const {fps}=useVideoConfig();const m=data[39];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={257} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D7 · Decisive information · The method" from={257} durationInFrames={614} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D7 · Decisive information · Worked example" from={871} durationInFrames={761} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D7 · Decisive information · Your turn" from={1632} durationInFrames={731} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D7 · Decisive information · Answer and check" from={2363} durationInFrames={488} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2851} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonD8=()=>{const {fps}=useVideoConfig();const m=data[40];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={272} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D8 · Networks and routes · The method" from={272} durationInFrames={512} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D8 · Networks and routes · Worked example" from={784} durationInFrames={638} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D8 · Networks and routes · Your turn" from={1422} durationInFrames={530} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="D8 · Networks and routes · Answer and check" from={1952} durationInFrames={410} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2362} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonS1=()=>{const {fps}=useVideoConfig();const m=data[41];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={287} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S1 · Mirror images · The method" from={287} durationInFrames={605} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S1 · Mirror images · Worked example" from={892} durationInFrames={524} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S1 · Mirror images · Your turn" from={1416} durationInFrames={536} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S1 · Mirror images · Answer and check" from={1952} durationInFrames={452} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2404} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonS2=()=>{const {fps}=useVideoConfig();const m=data[42];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={263} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S2 · Rotations · The method" from={263} durationInFrames={641} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S2 · Rotations · Worked example" from={904} durationInFrames={641} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S2 · Rotations · Your turn" from={1545} durationInFrames={584} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S2 · Rotations · Answer and check" from={2129} durationInFrames={455} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2584} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonS3=()=>{const {fps}=useVideoConfig();const m=data[43];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={281} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S3 · Top front and side views · The method" from={281} durationInFrames={650} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S3 · Top front and side views · Worked example" from={931} durationInFrames={698} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S3 · Top front and side views · Your turn" from={1629} durationInFrames={569} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S3 · Top front and side views · Answer and check" from={2198} durationInFrames={473} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2671} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonS4=()=>{const {fps}=useVideoConfig();const m=data[44];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={278} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S4 · Fold unfold and punch · The method" from={278} durationInFrames={611} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S4 · Fold unfold and punch · Worked example" from={889} durationInFrames={674} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S4 · Fold unfold and punch · Your turn" from={1563} durationInFrames={578} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S4 · Fold unfold and punch · Answer and check" from={2141} durationInFrames={452} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2593} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonS5=()=>{const {fps}=useVideoConfig();const m=data[45];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={260} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S5 · Cube nets · The method" from={260} durationInFrames={644} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S5 · Cube nets · Worked example" from={904} durationInFrames={668} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S5 · Cube nets · Your turn" from={1572} durationInFrames={584} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S5 · Cube nets · Answer and check" from={2156} durationInFrames={560} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2716} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonS6=()=>{const {fps}=useVideoConfig();const m=data[46];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={254} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S6 · Dice and corner order · The method" from={254} durationInFrames={635} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S6 · Dice and corner order · Worked example" from={889} durationInFrames={611} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S6 · Dice and corner order · Your turn" from={1500} durationInFrames={578} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S6 · Dice and corner order · Answer and check" from={2078} durationInFrames={470} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2548} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonS7=()=>{const {fps}=useVideoConfig();const m=data[47];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={215} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S7 · Tiling and piece fit · The method" from={215} durationInFrames={596} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S7 · Tiling and piece fit · Worked example" from={811} durationInFrames={680} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S7 · Tiling and piece fit · Your turn" from={1491} durationInFrames={500} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S7 · Tiling and piece fit · Answer and check" from={1991} durationInFrames={467} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2458} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonS8=()=>{const {fps}=useVideoConfig();const m=data[48];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={251} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S8 · Transformation sequences · The method" from={251} durationInFrames={614} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S8 · Transformation sequences · Worked example" from={865} durationInFrames={635} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S8 · Transformation sequences · Your turn" from={1500} durationInFrames={690} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S8 · Transformation sequences · Answer and check" from={2190} durationInFrames={587} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2777} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonS9=()=>{const {fps}=useVideoConfig();const m=data[49];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={278} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S9 · Directions and relative positions · The method" from={278} durationInFrames={524} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S9 · Directions and relative positions · Worked example" from={802} durationInFrames={656} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S9 · Directions and relative positions · Your turn" from={1458} durationInFrames={461} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="S9 · Directions and relative positions · Answer and check" from={1919} durationInFrames={512} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2431} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonP1=()=>{const {fps}=useVideoConfig();const m=data[50];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={209} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Build a consistent code" from={209} durationInFrames={551} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Build a consistent code" from={760} durationInFrames={650} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Build a consistent code" from={1410} durationInFrames={563} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Build a consistent code" from={1973} durationInFrames={563} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2536} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonP2=()=>{const {fps}=useVideoConfig();const m=data[51];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={302} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Turn position clues into a grid" from={302} durationInFrames={554} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Turn position clues into a grid" from={856} durationInFrames={713} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Turn position clues into a grid" from={1569} durationInFrames={647} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Turn position clues into a grid" from={2216} durationInFrames={530} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2746} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonP3=()=>{const {fps}=useVideoConfig();const m=data[52];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={308} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Find the place in a cycle" from={308} durationInFrames={575} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Find the place in a cycle" from={883} durationInFrames={569} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Find the place in a cycle" from={1452} durationInFrames={605} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Find the place in a cycle" from={2057} durationInFrames={404} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2461} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonP4=()=>{const {fps}=useVideoConfig();const m=data[53];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={260} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Explain a faulty display" from={260} durationInFrames={602} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Explain a faulty display" from={862} durationInFrames={665} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Explain a faulty display" from={1527} durationInFrames={620} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Explain a faulty display" from={2147} durationInFrames={500} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2647} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonP5=()=>{const {fps}=useVideoConfig();const m=data[54];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={254} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Separate the changing features" from={254} durationInFrames={611} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Separate the changing features" from={865} durationInFrames={653} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Separate the changing features" from={1518} durationInFrames={677} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Separate the changing features" from={2195} durationInFrames={524} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2719} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonP6=()=>{const {fps}=useVideoConfig();const m=data[55];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={308} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Reverse order and change symbols" from={308} durationInFrames={560} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Reverse order and change symbols" from={868} durationInFrames={659} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Reverse order and change symbols" from={1527} durationInFrames={578} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Reverse order and change symbols" from={2105} durationInFrames={704} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2809} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ1=()=>{const {fps}=useVideoConfig();const m=data[56];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={293} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Draw time before calculating" from={293} durationInFrames={524} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Draw time before calculating" from={817} durationInFrames={554} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Draw time before calculating" from={1371} durationInFrames={578} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Draw time before calculating" from={1949} durationInFrames={581} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2530} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ2=()=>{const {fps}=useVideoConfig();const m=data[57];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={296} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Use rates with clear units" from={296} durationInFrames={635} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Use rates with clear units" from={931} durationInFrames={686} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Use rates with clear units" from={1617} durationInFrames={539} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Use rates with clear units" from={2156} durationInFrames={737} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Use rates with clear units" from={2893} durationInFrames={782} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={3675} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[6] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ3=()=>{const {fps}=useVideoConfig();const m=data[58];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={305} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Compare on a common basis" from={305} durationInFrames={578} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Compare on a common basis" from={883} durationInFrames={638} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Compare on a common basis" from={1521} durationInFrames={575} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Compare on a common basis" from={2096} durationInFrames={533} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2629} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ4=()=>{const {fps}=useVideoConfig();const m=data[59];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={290} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Find the limiting resource" from={290} durationInFrames={575} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Find the limiting resource" from={865} durationInFrames={626} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Find the limiting resource" from={1491} durationInFrames={614} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Find the limiting resource" from={2105} durationInFrames={491} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2596} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ5=()=>{const {fps}=useVideoConfig();const m=data[60];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={266} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Undo the steps in reverse" from={266} durationInFrames={611} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Undo the steps in reverse" from={877} durationInFrames={866} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Undo the steps in reverse" from={1743} durationInFrames={524} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Undo the steps in reverse" from={2267} durationInFrames={509} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2776} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ6=()=>{const {fps}=useVideoConfig();const m=data[61];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={308} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Count the right things once" from={308} durationInFrames={599} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Count the right things once" from={907} durationInFrames={674} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Count the right things once" from={1581} durationInFrames={593} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Count the right things once" from={2174} durationInFrames={470} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2644} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ7=()=>{const {fps}=useVideoConfig();const m=data[62];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={308} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Place the overlap first" from={308} durationInFrames={587} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Place the overlap first" from={895} durationInFrames={779} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Place the overlap first" from={1674} durationInFrames={563} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Place the overlap first" from={2237} durationInFrames={522} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2759} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ8=()=>{const {fps}=useVideoConfig();const m=data[63];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={389} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check which time windows overlap" from={389} durationInFrames={608} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check which time windows overlap" from={997} durationInFrames={719} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Check which time windows overlap" from={1716} durationInFrames={635} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Check which time windows overlap" from={2351} durationInFrames={416} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2767} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ9=()=>{const {fps}=useVideoConfig();const m=data[64];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={332} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Rank the measure actually asked for" from={332} durationInFrames={638} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Rank the measure actually asked for" from={970} durationInFrames={713} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Rank the measure actually asked for" from={1683} durationInFrames={659} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Rank the measure actually asked for" from={2342} durationInFrames={521} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2863} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ10=()=>{const {fps}=useVideoConfig();const m=data[65];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={287} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Split digit blocks and cycles" from={287} durationInFrames={614} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Split digit blocks and cycles" from={901} durationInFrames={842} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Split digit blocks and cycles" from={1743} durationInFrames={539} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Split digit blocks and cycles" from={2282} durationInFrames={635} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2917} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonQ11=()=>{const {fps}=useVideoConfig();const m=data[66];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={260} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Compare legal purchase combinations" from={260} durationInFrames={524} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Compare legal purchase combinations" from={784} durationInFrames={704} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Compare legal purchase combinations" from={1488} durationInFrames={533} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Compare legal purchase combinations" from={2021} durationInFrames={686} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2707} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonX1=()=>{const {fps}=useVideoConfig();const m=data[67];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={281} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Build the worst legal case" from={281} durationInFrames={491} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Build the worst legal case" from={772} durationInFrames={644} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Build the worst legal case" from={1416} durationInFrames={536} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Build the worst legal case" from={1952} durationInFrames={419} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2371} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonX2=()=>{const {fps}=useVideoConfig();const m=data[68];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={314} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Track each toggle as a reversal" from={314} durationInFrames={537} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Track each toggle as a reversal" from={851} durationInFrames={551} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Track each toggle as a reversal" from={1402} durationInFrames={590} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Track each toggle as a reversal" from={1992} durationInFrames={410} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2402} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonX3=()=>{const {fps}=useVideoConfig();const m=data[69];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={326} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Use a baseline plus extra" from={326} durationInFrames={581} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Use a baseline plus extra" from={907} durationInFrames={671} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Use a baseline plus extra" from={1578} durationInFrames={605} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Use a baseline plus extra" from={2183} durationInFrames={635} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2818} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonX4=()=>{const {fps}=useVideoConfig();const m=data[70];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={260} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Read what the chart represents" from={260} durationInFrames={596} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Read what the chart represents" from={856} durationInFrames={758} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Read what the chart represents" from={1614} durationInFrames={752} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Read what the chart represents" from={2366} durationInFrames={470} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2836} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonX5=()=>{const {fps}=useVideoConfig();const m=data[71];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={269} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Simulate one step at a time" from={269} durationInFrames={620} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Simulate one step at a time" from={889} durationInFrames={653} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Simulate one step at a time" from={1542} durationInFrames={605} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Simulate one step at a time" from={2147} durationInFrames={599} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2746} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonX6=()=>{const {fps}=useVideoConfig();const m=data[72];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={254} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Look for a distinguishing observation" from={254} durationInFrames={569} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Look for a distinguishing observation" from={823} durationInFrames={647} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Look for a distinguishing observation" from={1470} durationInFrames={690} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Look for a distinguishing observation" from={2160} durationInFrames={527} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2687} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const LessonX7=()=>{const {fps}=useVideoConfig();const m=data[73];return <>
<Sequence name="01 / THE QUESTION" from={0} durationInFrames={299} premountFor={fps}><LessonScene scene={m.scenes[0] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Search for the rule-breaking case" from={299} durationInFrames={569} premountFor={fps}><LessonScene scene={m.scenes[1] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Search for the rule-breaking case" from={868} durationInFrames={596} premountFor={fps}><LessonScene scene={m.scenes[2] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Your turn: Search for the rule-breaking case" from={1464} durationInFrames={809} premountFor={fps}><LessonScene scene={m.scenes[3] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="Check: Search for the rule-breaking case" from={2273} durationInFrames={662} premountFor={fps}><LessonScene scene={m.scenes[4] as CourseScene} meta={m as LessonMeta}/></Sequence>
<Sequence name="06 / USE IT AGAIN" from={2935} durationInFrames={330} premountFor={fps}><LessonScene scene={m.scenes[5] as CourseScene} meta={m as LessonMeta}/></Sequence>
</>};
export const lessonComponents={"START":LessonSTART,"GUIDE":LessonGUIDE,"C1":LessonC1,"C2":LessonC2,"C3":LessonC3,"C4":LessonC4,"C5":LessonC5,"C6":LessonC6,"C7":LessonC7,"C8":LessonC8,"C9":LessonC9,"C10":LessonC10,"M1":LessonM1,"M2":LessonM2,"M3":LessonM3,"M4":LessonM4,"M5":LessonM5,"A0":LessonA0,"A1":LessonA1,"A2":LessonA2,"A3":LessonA3,"A4":LessonA4,"A5":LessonA5,"A6":LessonA6,"A7":LessonA7,"A8":LessonA8,"O1":LessonO1,"O2":LessonO2,"O3":LessonO3,"O4":LessonO4,"O5":LessonO5,"O6":LessonO6,"O7":LessonO7,"D1":LessonD1,"D2":LessonD2,"D3":LessonD3,"D4":LessonD4,"D5":LessonD5,"D6":LessonD6,"D7":LessonD7,"D8":LessonD8,"S1":LessonS1,"S2":LessonS2,"S3":LessonS3,"S4":LessonS4,"S5":LessonS5,"S6":LessonS6,"S7":LessonS7,"S8":LessonS8,"S9":LessonS9,"P1":LessonP1,"P2":LessonP2,"P3":LessonP3,"P4":LessonP4,"P5":LessonP5,"P6":LessonP6,"Q1":LessonQ1,"Q2":LessonQ2,"Q3":LessonQ3,"Q4":LessonQ4,"Q5":LessonQ5,"Q6":LessonQ6,"Q7":LessonQ7,"Q8":LessonQ8,"Q9":LessonQ9,"Q10":LessonQ10,"Q11":LessonQ11,"X1":LessonX1,"X2":LessonX2,"X3":LessonX3,"X4":LessonX4,"X5":LessonX5,"X6":LessonX6,"X7":LessonX7};
