import {Composition,Folder} from 'remotion';
import {lessonComponents} from './Lessons';
import {LessonScene} from './LessonScene';
import data from './course.json';
import type {CourseScene,LessonMeta} from './LessonScene';
export const CourseCompositions=()=> <>
<Folder name="Unit-0">
<Composition id="Chloe-START" component={lessonComponents.START} durationInFrames={4074} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-1">
<Composition id="Chloe-C1" component={lessonComponents.C1} durationInFrames={2797} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-C2" component={lessonComponents.C2} durationInFrames={2926} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-C3" component={lessonComponents.C3} durationInFrames={5244} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-C4" component={lessonComponents.C4} durationInFrames={2803} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-C5" component={lessonComponents.C5} durationInFrames={2902} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-C6" component={lessonComponents.C6} durationInFrames={3025} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-C7" component={lessonComponents.C7} durationInFrames={2914} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-C8" component={lessonComponents.C8} durationInFrames={2728} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-C9" component={lessonComponents.C9} durationInFrames={2788} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-C10" component={lessonComponents.C10} durationInFrames={3112} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-2">
<Composition id="Chloe-M1" component={lessonComponents.M1} durationInFrames={3004} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-M2" component={lessonComponents.M2} durationInFrames={2962} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-M3" component={lessonComponents.M3} durationInFrames={3013} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-M4" component={lessonComponents.M4} durationInFrames={3061} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-M5" component={lessonComponents.M5} durationInFrames={3181} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-3">
<Composition id="Chloe-A0" component={lessonComponents.A0} durationInFrames={2974} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-A1" component={lessonComponents.A1} durationInFrames={3178} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-A2" component={lessonComponents.A2} durationInFrames={3061} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-A3" component={lessonComponents.A3} durationInFrames={3166} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-A4" component={lessonComponents.A4} durationInFrames={3196} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-A5" component={lessonComponents.A5} durationInFrames={3235} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-A6" component={lessonComponents.A6} durationInFrames={3031} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-A7" component={lessonComponents.A7} durationInFrames={3082} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-A8" component={lessonComponents.A8} durationInFrames={3193} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-4">
<Composition id="Chloe-O1" component={lessonComponents.O1} durationInFrames={2932} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-O2" component={lessonComponents.O2} durationInFrames={2800} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-O3" component={lessonComponents.O3} durationInFrames={2785} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-O4" component={lessonComponents.O4} durationInFrames={2914} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-O5" component={lessonComponents.O5} durationInFrames={2809} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-O6" component={lessonComponents.O6} durationInFrames={2650} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-O7" component={lessonComponents.O7} durationInFrames={3082} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-5">
<Composition id="Chloe-D1" component={lessonComponents.D1} durationInFrames={2963} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-D2" component={lessonComponents.D2} durationInFrames={2821} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-D3" component={lessonComponents.D3} durationInFrames={2968} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-D4" component={lessonComponents.D4} durationInFrames={2875} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-D5" component={lessonComponents.D5} durationInFrames={3080} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-D6" component={lessonComponents.D6} durationInFrames={2761} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-D7" component={lessonComponents.D7} durationInFrames={3181} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-D8" component={lessonComponents.D8} durationInFrames={2692} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-6">
<Composition id="Chloe-S1" component={lessonComponents.S1} durationInFrames={2734} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-S2" component={lessonComponents.S2} durationInFrames={2914} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-S3" component={lessonComponents.S3} durationInFrames={3001} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-S4" component={lessonComponents.S4} durationInFrames={2923} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-S5" component={lessonComponents.S5} durationInFrames={3046} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-S6" component={lessonComponents.S6} durationInFrames={2878} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-S7" component={lessonComponents.S7} durationInFrames={2788} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-S8" component={lessonComponents.S8} durationInFrames={3107} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-S9" component={lessonComponents.S9} durationInFrames={2761} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-7">
<Composition id="Chloe-P1" component={lessonComponents.P1} durationInFrames={2866} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-P2" component={lessonComponents.P2} durationInFrames={3076} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-P3" component={lessonComponents.P3} durationInFrames={2791} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-P4" component={lessonComponents.P4} durationInFrames={2977} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-P5" component={lessonComponents.P5} durationInFrames={3049} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-P6" component={lessonComponents.P6} durationInFrames={3139} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-8">
<Composition id="Chloe-Q1" component={lessonComponents.Q1} durationInFrames={2860} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q2" component={lessonComponents.Q2} durationInFrames={4005} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q3" component={lessonComponents.Q3} durationInFrames={2959} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q4" component={lessonComponents.Q4} durationInFrames={2926} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q5" component={lessonComponents.Q5} durationInFrames={3106} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q6" component={lessonComponents.Q6} durationInFrames={2974} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q7" component={lessonComponents.Q7} durationInFrames={3089} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q8" component={lessonComponents.Q8} durationInFrames={3097} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q9" component={lessonComponents.Q9} durationInFrames={3193} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q10" component={lessonComponents.Q10} durationInFrames={3247} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-Q11" component={lessonComponents.Q11} durationInFrames={3037} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-9">
<Composition id="Chloe-X1" component={lessonComponents.X1} durationInFrames={2701} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-X2" component={lessonComponents.X2} durationInFrames={2732} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-X3" component={lessonComponents.X3} durationInFrames={3148} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-X4" component={lessonComponents.X4} durationInFrames={3166} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-X5" component={lessonComponents.X5} durationInFrames={3076} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-X6" component={lessonComponents.X6} durationInFrames={3017} fps={30} width={1920} height={1080}/>
<Composition id="Chloe-X7" component={lessonComponents.X7} durationInFrames={3265} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Unit-10">
<Composition id="Chloe-GUIDE" component={lessonComponents.GUIDE} durationInFrames={4284} fps={30} width={1920} height={1080}/>
</Folder>
<Folder name="Scene-review">
<Composition id="Scene-start-welcome" component={LessonScene} durationInFrames={671} fps={30} width={1920} height={1080} defaultProps={{scene:data[0].scenes[0] as CourseScene,meta:data[0] as LessonMeta}}/>
<Composition id="Scene-start-msdp" component={LessonScene} durationInFrames={641} fps={30} width={1920} height={1080} defaultProps={{scene:data[0].scenes[1] as CourseScene,meta:data[0] as LessonMeta}}/>
<Composition id="Scene-start-signal" component={LessonScene} durationInFrames={725} fps={30} width={1920} height={1080} defaultProps={{scene:data[0].scenes[2] as CourseScene,meta:data[0] as LessonMeta}}/>
<Composition id="Scene-start-toolkit" component={LessonScene} durationInFrames={716} fps={30} width={1920} height={1080} defaultProps={{scene:data[0].scenes[3] as CourseScene,meta:data[0] as LessonMeta}}/>
<Composition id="Scene-start-ladder" component={LessonScene} durationInFrames={575} fps={30} width={1920} height={1080} defaultProps={{scene:data[0].scenes[4] as CourseScene,meta:data[0] as LessonMeta}}/>
<Composition id="Scene-start-format" component={LessonScene} durationInFrames={746} fps={30} width={1920} height={1080} defaultProps={{scene:data[0].scenes[5] as CourseScene,meta:data[0] as LessonMeta}}/>
<Composition id="Scene-end-parent-prompts" component={LessonScene} durationInFrames={617} fps={30} width={1920} height={1080} defaultProps={{scene:data[1].scenes[0] as CourseScene,meta:data[1] as LessonMeta}}/>
<Composition id="Scene-end-diagnose" component={LessonScene} durationInFrames={743} fps={30} width={1920} height={1080} defaultProps={{scene:data[1].scenes[1] as CourseScene,meta:data[1] as LessonMeta}}/>
<Composition id="Scene-end-transfer" component={LessonScene} durationInFrames={734} fps={30} width={1920} height={1080} defaultProps={{scene:data[1].scenes[2] as CourseScene,meta:data[1] as LessonMeta}}/>
<Composition id="Scene-end-mastery" component={LessonScene} durationInFrames={731} fps={30} width={1920} height={1080} defaultProps={{scene:data[1].scenes[3] as CourseScene,meta:data[1] as LessonMeta}}/>
<Composition id="Scene-end-boundaries" component={LessonScene} durationInFrames={737} fps={30} width={1920} height={1080} defaultProps={{scene:data[1].scenes[4] as CourseScene,meta:data[1] as LessonMeta}}/>
<Composition id="Scene-end-next" component={LessonScene} durationInFrames={722} fps={30} width={1920} height={1080} defaultProps={{scene:data[1].scenes[5] as CourseScene,meta:data[1] as LessonMeta}}/>
<Composition id="Scene-c1-hook" component={LessonScene} durationInFrames={212} fps={30} width={1920} height={1080} defaultProps={{scene:data[2].scenes[0] as CourseScene,meta:data[2] as LessonMeta}}/>
<Composition id="Scene-01-c1-explain" component={LessonScene} durationInFrames={548} fps={30} width={1920} height={1080} defaultProps={{scene:data[2].scenes[1] as CourseScene,meta:data[2] as LessonMeta}}/>
<Composition id="Scene-01-c1-worked" component={LessonScene} durationInFrames={545} fps={30} width={1920} height={1080} defaultProps={{scene:data[2].scenes[2] as CourseScene,meta:data[2] as LessonMeta}}/>
<Composition id="Scene-01-c1-quiz" component={LessonScene} durationInFrames={662} fps={30} width={1920} height={1080} defaultProps={{scene:data[2].scenes[3] as CourseScene,meta:data[2] as LessonMeta}}/>
<Composition id="Scene-01-c1-answer" component={LessonScene} durationInFrames={500} fps={30} width={1920} height={1080} defaultProps={{scene:data[2].scenes[4] as CourseScene,meta:data[2] as LessonMeta}}/>
<Composition id="Scene-c1-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[2].scenes[5] as CourseScene,meta:data[2] as LessonMeta}}/>
<Composition id="Scene-c2-hook" component={LessonScene} durationInFrames={236} fps={30} width={1920} height={1080} defaultProps={{scene:data[3].scenes[0] as CourseScene,meta:data[3] as LessonMeta}}/>
<Composition id="Scene-01-c2-explain" component={LessonScene} durationInFrames={545} fps={30} width={1920} height={1080} defaultProps={{scene:data[3].scenes[1] as CourseScene,meta:data[3] as LessonMeta}}/>
<Composition id="Scene-01-c2-worked" component={LessonScene} durationInFrames={632} fps={30} width={1920} height={1080} defaultProps={{scene:data[3].scenes[2] as CourseScene,meta:data[3] as LessonMeta}}/>
<Composition id="Scene-01-c2-quiz" component={LessonScene} durationInFrames={575} fps={30} width={1920} height={1080} defaultProps={{scene:data[3].scenes[3] as CourseScene,meta:data[3] as LessonMeta}}/>
<Composition id="Scene-01-c2-answer" component={LessonScene} durationInFrames={608} fps={30} width={1920} height={1080} defaultProps={{scene:data[3].scenes[4] as CourseScene,meta:data[3] as LessonMeta}}/>
<Composition id="Scene-c2-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[3].scenes[5] as CourseScene,meta:data[3] as LessonMeta}}/>
<Composition id="Scene-c3-hook" component={LessonScene} durationInFrames={165} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[0] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-predict" component={LessonScene} durationInFrames={468} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[1] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-cross" component={LessonScene} durationInFrames={219} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[2] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-stay" component={LessonScene} durationInFrames={393} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[3] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-forward" component={LessonScene} durationInFrames={351} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[4] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-language" component={LessonScene} durationInFrames={468} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[5] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-room" component={LessonScene} durationInFrames={456} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[6] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-exam" component={LessonScene} durationInFrames={645} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[7] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-exam-proof" component={LessonScene} durationInFrames={588} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[8] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-transfer" component={LessonScene} durationInFrames={513} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[9] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-transfer-proof" component={LessonScene} durationInFrames={651} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[10] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c3-recap" component={LessonScene} durationInFrames={327} fps={30} width={1920} height={1080} defaultProps={{scene:data[4].scenes[11] as CourseScene,meta:data[4] as LessonMeta}}/>
<Composition id="Scene-c4-hook" component={LessonScene} durationInFrames={242} fps={30} width={1920} height={1080} defaultProps={{scene:data[5].scenes[0] as CourseScene,meta:data[5] as LessonMeta}}/>
<Composition id="Scene-01-c4-explain" component={LessonScene} durationInFrames={521} fps={30} width={1920} height={1080} defaultProps={{scene:data[5].scenes[1] as CourseScene,meta:data[5] as LessonMeta}}/>
<Composition id="Scene-01-c4-worked" component={LessonScene} durationInFrames={548} fps={30} width={1920} height={1080} defaultProps={{scene:data[5].scenes[2] as CourseScene,meta:data[5] as LessonMeta}}/>
<Composition id="Scene-01-c4-quiz" component={LessonScene} durationInFrames={617} fps={30} width={1920} height={1080} defaultProps={{scene:data[5].scenes[3] as CourseScene,meta:data[5] as LessonMeta}}/>
<Composition id="Scene-01-c4-answer" component={LessonScene} durationInFrames={545} fps={30} width={1920} height={1080} defaultProps={{scene:data[5].scenes[4] as CourseScene,meta:data[5] as LessonMeta}}/>
<Composition id="Scene-c4-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[5].scenes[5] as CourseScene,meta:data[5] as LessonMeta}}/>
<Composition id="Scene-c5-hook" component={LessonScene} durationInFrames={230} fps={30} width={1920} height={1080} defaultProps={{scene:data[6].scenes[0] as CourseScene,meta:data[6] as LessonMeta}}/>
<Composition id="Scene-01-c5-explain" component={LessonScene} durationInFrames={554} fps={30} width={1920} height={1080} defaultProps={{scene:data[6].scenes[1] as CourseScene,meta:data[6] as LessonMeta}}/>
<Composition id="Scene-01-c5-worked" component={LessonScene} durationInFrames={590} fps={30} width={1920} height={1080} defaultProps={{scene:data[6].scenes[2] as CourseScene,meta:data[6] as LessonMeta}}/>
<Composition id="Scene-01-c5-quiz" component={LessonScene} durationInFrames={611} fps={30} width={1920} height={1080} defaultProps={{scene:data[6].scenes[3] as CourseScene,meta:data[6] as LessonMeta}}/>
<Composition id="Scene-01-c5-answer" component={LessonScene} durationInFrames={587} fps={30} width={1920} height={1080} defaultProps={{scene:data[6].scenes[4] as CourseScene,meta:data[6] as LessonMeta}}/>
<Composition id="Scene-c5-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[6].scenes[5] as CourseScene,meta:data[6] as LessonMeta}}/>
<Composition id="Scene-c6-hook" component={LessonScene} durationInFrames={242} fps={30} width={1920} height={1080} defaultProps={{scene:data[7].scenes[0] as CourseScene,meta:data[7] as LessonMeta}}/>
<Composition id="Scene-01-c6-explain" component={LessonScene} durationInFrames={599} fps={30} width={1920} height={1080} defaultProps={{scene:data[7].scenes[1] as CourseScene,meta:data[7] as LessonMeta}}/>
<Composition id="Scene-01-c6-worked" component={LessonScene} durationInFrames={614} fps={30} width={1920} height={1080} defaultProps={{scene:data[7].scenes[2] as CourseScene,meta:data[7] as LessonMeta}}/>
<Composition id="Scene-01-c6-quiz" component={LessonScene} durationInFrames={737} fps={30} width={1920} height={1080} defaultProps={{scene:data[7].scenes[3] as CourseScene,meta:data[7] as LessonMeta}}/>
<Composition id="Scene-01-c6-answer" component={LessonScene} durationInFrames={503} fps={30} width={1920} height={1080} defaultProps={{scene:data[7].scenes[4] as CourseScene,meta:data[7] as LessonMeta}}/>
<Composition id="Scene-c6-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[7].scenes[5] as CourseScene,meta:data[7] as LessonMeta}}/>
<Composition id="Scene-c7-hook" component={LessonScene} durationInFrames={197} fps={30} width={1920} height={1080} defaultProps={{scene:data[8].scenes[0] as CourseScene,meta:data[8] as LessonMeta}}/>
<Composition id="Scene-01-c7-explain" component={LessonScene} durationInFrames={848} fps={30} width={1920} height={1080} defaultProps={{scene:data[8].scenes[1] as CourseScene,meta:data[8] as LessonMeta}}/>
<Composition id="Scene-01-c7-worked" component={LessonScene} durationInFrames={542} fps={30} width={1920} height={1080} defaultProps={{scene:data[8].scenes[2] as CourseScene,meta:data[8] as LessonMeta}}/>
<Composition id="Scene-01-c7-quiz" component={LessonScene} durationInFrames={545} fps={30} width={1920} height={1080} defaultProps={{scene:data[8].scenes[3] as CourseScene,meta:data[8] as LessonMeta}}/>
<Composition id="Scene-01-c7-answer" component={LessonScene} durationInFrames={452} fps={30} width={1920} height={1080} defaultProps={{scene:data[8].scenes[4] as CourseScene,meta:data[8] as LessonMeta}}/>
<Composition id="Scene-c7-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[8].scenes[5] as CourseScene,meta:data[8] as LessonMeta}}/>
<Composition id="Scene-c8-hook" component={LessonScene} durationInFrames={251} fps={30} width={1920} height={1080} defaultProps={{scene:data[9].scenes[0] as CourseScene,meta:data[9] as LessonMeta}}/>
<Composition id="Scene-01-c8-explain" component={LessonScene} durationInFrames={584} fps={30} width={1920} height={1080} defaultProps={{scene:data[9].scenes[1] as CourseScene,meta:data[9] as LessonMeta}}/>
<Composition id="Scene-01-c8-worked" component={LessonScene} durationInFrames={533} fps={30} width={1920} height={1080} defaultProps={{scene:data[9].scenes[2] as CourseScene,meta:data[9] as LessonMeta}}/>
<Composition id="Scene-01-c8-quiz" component={LessonScene} durationInFrames={545} fps={30} width={1920} height={1080} defaultProps={{scene:data[9].scenes[3] as CourseScene,meta:data[9] as LessonMeta}}/>
<Composition id="Scene-01-c8-answer" component={LessonScene} durationInFrames={485} fps={30} width={1920} height={1080} defaultProps={{scene:data[9].scenes[4] as CourseScene,meta:data[9] as LessonMeta}}/>
<Composition id="Scene-c8-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[9].scenes[5] as CourseScene,meta:data[9] as LessonMeta}}/>
<Composition id="Scene-c9-hook" component={LessonScene} durationInFrames={269} fps={30} width={1920} height={1080} defaultProps={{scene:data[10].scenes[0] as CourseScene,meta:data[10] as LessonMeta}}/>
<Composition id="Scene-01-c9-explain" component={LessonScene} durationInFrames={575} fps={30} width={1920} height={1080} defaultProps={{scene:data[10].scenes[1] as CourseScene,meta:data[10] as LessonMeta}}/>
<Composition id="Scene-01-c9-worked" component={LessonScene} durationInFrames={581} fps={30} width={1920} height={1080} defaultProps={{scene:data[10].scenes[2] as CourseScene,meta:data[10] as LessonMeta}}/>
<Composition id="Scene-01-c9-quiz" component={LessonScene} durationInFrames={563} fps={30} width={1920} height={1080} defaultProps={{scene:data[10].scenes[3] as CourseScene,meta:data[10] as LessonMeta}}/>
<Composition id="Scene-01-c9-answer" component={LessonScene} durationInFrames={470} fps={30} width={1920} height={1080} defaultProps={{scene:data[10].scenes[4] as CourseScene,meta:data[10] as LessonMeta}}/>
<Composition id="Scene-c9-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[10].scenes[5] as CourseScene,meta:data[10] as LessonMeta}}/>
<Composition id="Scene-c10-hook" component={LessonScene} durationInFrames={224} fps={30} width={1920} height={1080} defaultProps={{scene:data[11].scenes[0] as CourseScene,meta:data[11] as LessonMeta}}/>
<Composition id="Scene-01-c10-explain" component={LessonScene} durationInFrames={518} fps={30} width={1920} height={1080} defaultProps={{scene:data[11].scenes[1] as CourseScene,meta:data[11] as LessonMeta}}/>
<Composition id="Scene-01-c10-worked" component={LessonScene} durationInFrames={677} fps={30} width={1920} height={1080} defaultProps={{scene:data[11].scenes[2] as CourseScene,meta:data[11] as LessonMeta}}/>
<Composition id="Scene-01-c10-quiz" component={LessonScene} durationInFrames={824} fps={30} width={1920} height={1080} defaultProps={{scene:data[11].scenes[3] as CourseScene,meta:data[11] as LessonMeta}}/>
<Composition id="Scene-01-c10-answer" component={LessonScene} durationInFrames={539} fps={30} width={1920} height={1080} defaultProps={{scene:data[11].scenes[4] as CourseScene,meta:data[11] as LessonMeta}}/>
<Composition id="Scene-c10-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[11].scenes[5] as CourseScene,meta:data[11] as LessonMeta}}/>
<Composition id="Scene-m1-hook" component={LessonScene} durationInFrames={284} fps={30} width={1920} height={1080} defaultProps={{scene:data[12].scenes[0] as CourseScene,meta:data[12] as LessonMeta}}/>
<Composition id="Scene-02-m1-explain" component={LessonScene} durationInFrames={491} fps={30} width={1920} height={1080} defaultProps={{scene:data[12].scenes[1] as CourseScene,meta:data[12] as LessonMeta}}/>
<Composition id="Scene-02-m1-worked" component={LessonScene} durationInFrames={614} fps={30} width={1920} height={1080} defaultProps={{scene:data[12].scenes[2] as CourseScene,meta:data[12] as LessonMeta}}/>
<Composition id="Scene-02-m1-quiz" component={LessonScene} durationInFrames={656} fps={30} width={1920} height={1080} defaultProps={{scene:data[12].scenes[3] as CourseScene,meta:data[12] as LessonMeta}}/>
<Composition id="Scene-02-m1-answer" component={LessonScene} durationInFrames={629} fps={30} width={1920} height={1080} defaultProps={{scene:data[12].scenes[4] as CourseScene,meta:data[12] as LessonMeta}}/>
<Composition id="Scene-m1-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[12].scenes[5] as CourseScene,meta:data[12] as LessonMeta}}/>
<Composition id="Scene-m2-hook" component={LessonScene} durationInFrames={260} fps={30} width={1920} height={1080} defaultProps={{scene:data[13].scenes[0] as CourseScene,meta:data[13] as LessonMeta}}/>
<Composition id="Scene-02-m2-explain" component={LessonScene} durationInFrames={569} fps={30} width={1920} height={1080} defaultProps={{scene:data[13].scenes[1] as CourseScene,meta:data[13] as LessonMeta}}/>
<Composition id="Scene-02-m2-worked" component={LessonScene} durationInFrames={704} fps={30} width={1920} height={1080} defaultProps={{scene:data[13].scenes[2] as CourseScene,meta:data[13] as LessonMeta}}/>
<Composition id="Scene-02-m2-quiz" component={LessonScene} durationInFrames={632} fps={30} width={1920} height={1080} defaultProps={{scene:data[13].scenes[3] as CourseScene,meta:data[13] as LessonMeta}}/>
<Composition id="Scene-02-m2-answer" component={LessonScene} durationInFrames={467} fps={30} width={1920} height={1080} defaultProps={{scene:data[13].scenes[4] as CourseScene,meta:data[13] as LessonMeta}}/>
<Composition id="Scene-m2-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[13].scenes[5] as CourseScene,meta:data[13] as LessonMeta}}/>
<Composition id="Scene-m3-hook" component={LessonScene} durationInFrames={260} fps={30} width={1920} height={1080} defaultProps={{scene:data[14].scenes[0] as CourseScene,meta:data[14] as LessonMeta}}/>
<Composition id="Scene-02-m3-explain" component={LessonScene} durationInFrames={497} fps={30} width={1920} height={1080} defaultProps={{scene:data[14].scenes[1] as CourseScene,meta:data[14] as LessonMeta}}/>
<Composition id="Scene-02-m3-worked" component={LessonScene} durationInFrames={665} fps={30} width={1920} height={1080} defaultProps={{scene:data[14].scenes[2] as CourseScene,meta:data[14] as LessonMeta}}/>
<Composition id="Scene-02-m3-quiz" component={LessonScene} durationInFrames={635} fps={30} width={1920} height={1080} defaultProps={{scene:data[14].scenes[3] as CourseScene,meta:data[14] as LessonMeta}}/>
<Composition id="Scene-02-m3-answer" component={LessonScene} durationInFrames={626} fps={30} width={1920} height={1080} defaultProps={{scene:data[14].scenes[4] as CourseScene,meta:data[14] as LessonMeta}}/>
<Composition id="Scene-m3-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[14].scenes[5] as CourseScene,meta:data[14] as LessonMeta}}/>
<Composition id="Scene-m4-hook" component={LessonScene} durationInFrames={257} fps={30} width={1920} height={1080} defaultProps={{scene:data[15].scenes[0] as CourseScene,meta:data[15] as LessonMeta}}/>
<Composition id="Scene-02-m4-explain" component={LessonScene} durationInFrames={629} fps={30} width={1920} height={1080} defaultProps={{scene:data[15].scenes[1] as CourseScene,meta:data[15] as LessonMeta}}/>
<Composition id="Scene-02-m4-worked" component={LessonScene} durationInFrames={584} fps={30} width={1920} height={1080} defaultProps={{scene:data[15].scenes[2] as CourseScene,meta:data[15] as LessonMeta}}/>
<Composition id="Scene-02-m4-quiz" component={LessonScene} durationInFrames={644} fps={30} width={1920} height={1080} defaultProps={{scene:data[15].scenes[3] as CourseScene,meta:data[15] as LessonMeta}}/>
<Composition id="Scene-02-m4-answer" component={LessonScene} durationInFrames={617} fps={30} width={1920} height={1080} defaultProps={{scene:data[15].scenes[4] as CourseScene,meta:data[15] as LessonMeta}}/>
<Composition id="Scene-m4-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[15].scenes[5] as CourseScene,meta:data[15] as LessonMeta}}/>
<Composition id="Scene-m5-hook" component={LessonScene} durationInFrames={269} fps={30} width={1920} height={1080} defaultProps={{scene:data[16].scenes[0] as CourseScene,meta:data[16] as LessonMeta}}/>
<Composition id="Scene-02-m5-explain" component={LessonScene} durationInFrames={557} fps={30} width={1920} height={1080} defaultProps={{scene:data[16].scenes[1] as CourseScene,meta:data[16] as LessonMeta}}/>
<Composition id="Scene-02-m5-worked" component={LessonScene} durationInFrames={716} fps={30} width={1920} height={1080} defaultProps={{scene:data[16].scenes[2] as CourseScene,meta:data[16] as LessonMeta}}/>
<Composition id="Scene-02-m5-quiz" component={LessonScene} durationInFrames={800} fps={30} width={1920} height={1080} defaultProps={{scene:data[16].scenes[3] as CourseScene,meta:data[16] as LessonMeta}}/>
<Composition id="Scene-02-m5-answer" component={LessonScene} durationInFrames={509} fps={30} width={1920} height={1080} defaultProps={{scene:data[16].scenes[4] as CourseScene,meta:data[16] as LessonMeta}}/>
<Composition id="Scene-m5-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[16].scenes[5] as CourseScene,meta:data[16] as LessonMeta}}/>
<Composition id="Scene-a0-hook" component={LessonScene} durationInFrames={236} fps={30} width={1920} height={1080} defaultProps={{scene:data[17].scenes[0] as CourseScene,meta:data[17] as LessonMeta}}/>
<Composition id="Scene-03-a0-explain" component={LessonScene} durationInFrames={575} fps={30} width={1920} height={1080} defaultProps={{scene:data[17].scenes[1] as CourseScene,meta:data[17] as LessonMeta}}/>
<Composition id="Scene-03-a0-worked" component={LessonScene} durationInFrames={641} fps={30} width={1920} height={1080} defaultProps={{scene:data[17].scenes[2] as CourseScene,meta:data[17] as LessonMeta}}/>
<Composition id="Scene-03-a0-quiz" component={LessonScene} durationInFrames={623} fps={30} width={1920} height={1080} defaultProps={{scene:data[17].scenes[3] as CourseScene,meta:data[17] as LessonMeta}}/>
<Composition id="Scene-03-a0-answer" component={LessonScene} durationInFrames={569} fps={30} width={1920} height={1080} defaultProps={{scene:data[17].scenes[4] as CourseScene,meta:data[17] as LessonMeta}}/>
<Composition id="Scene-a0-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[17].scenes[5] as CourseScene,meta:data[17] as LessonMeta}}/>
<Composition id="Scene-a1-hook" component={LessonScene} durationInFrames={263} fps={30} width={1920} height={1080} defaultProps={{scene:data[18].scenes[0] as CourseScene,meta:data[18] as LessonMeta}}/>
<Composition id="Scene-03-a1-explain" component={LessonScene} durationInFrames={563} fps={30} width={1920} height={1080} defaultProps={{scene:data[18].scenes[1] as CourseScene,meta:data[18] as LessonMeta}}/>
<Composition id="Scene-03-a1-worked" component={LessonScene} durationInFrames={668} fps={30} width={1920} height={1080} defaultProps={{scene:data[18].scenes[2] as CourseScene,meta:data[18] as LessonMeta}}/>
<Composition id="Scene-03-a1-quiz" component={LessonScene} durationInFrames={800} fps={30} width={1920} height={1080} defaultProps={{scene:data[18].scenes[3] as CourseScene,meta:data[18] as LessonMeta}}/>
<Composition id="Scene-03-a1-answer" component={LessonScene} durationInFrames={554} fps={30} width={1920} height={1080} defaultProps={{scene:data[18].scenes[4] as CourseScene,meta:data[18] as LessonMeta}}/>
<Composition id="Scene-a1-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[18].scenes[5] as CourseScene,meta:data[18] as LessonMeta}}/>
<Composition id="Scene-a2-hook" component={LessonScene} durationInFrames={245} fps={30} width={1920} height={1080} defaultProps={{scene:data[19].scenes[0] as CourseScene,meta:data[19] as LessonMeta}}/>
<Composition id="Scene-03-a2-explain" component={LessonScene} durationInFrames={608} fps={30} width={1920} height={1080} defaultProps={{scene:data[19].scenes[1] as CourseScene,meta:data[19] as LessonMeta}}/>
<Composition id="Scene-03-a2-worked" component={LessonScene} durationInFrames={584} fps={30} width={1920} height={1080} defaultProps={{scene:data[19].scenes[2] as CourseScene,meta:data[19] as LessonMeta}}/>
<Composition id="Scene-03-a2-quiz" component={LessonScene} durationInFrames={710} fps={30} width={1920} height={1080} defaultProps={{scene:data[19].scenes[3] as CourseScene,meta:data[19] as LessonMeta}}/>
<Composition id="Scene-03-a2-answer" component={LessonScene} durationInFrames={584} fps={30} width={1920} height={1080} defaultProps={{scene:data[19].scenes[4] as CourseScene,meta:data[19] as LessonMeta}}/>
<Composition id="Scene-a2-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[19].scenes[5] as CourseScene,meta:data[19] as LessonMeta}}/>
<Composition id="Scene-a3-hook" component={LessonScene} durationInFrames={245} fps={30} width={1920} height={1080} defaultProps={{scene:data[20].scenes[0] as CourseScene,meta:data[20] as LessonMeta}}/>
<Composition id="Scene-03-a3-explain" component={LessonScene} durationInFrames={671} fps={30} width={1920} height={1080} defaultProps={{scene:data[20].scenes[1] as CourseScene,meta:data[20] as LessonMeta}}/>
<Composition id="Scene-03-a3-worked" component={LessonScene} durationInFrames={629} fps={30} width={1920} height={1080} defaultProps={{scene:data[20].scenes[2] as CourseScene,meta:data[20] as LessonMeta}}/>
<Composition id="Scene-03-a3-quiz" component={LessonScene} durationInFrames={617} fps={30} width={1920} height={1080} defaultProps={{scene:data[20].scenes[3] as CourseScene,meta:data[20] as LessonMeta}}/>
<Composition id="Scene-03-a3-answer" component={LessonScene} durationInFrames={674} fps={30} width={1920} height={1080} defaultProps={{scene:data[20].scenes[4] as CourseScene,meta:data[20] as LessonMeta}}/>
<Composition id="Scene-a3-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[20].scenes[5] as CourseScene,meta:data[20] as LessonMeta}}/>
<Composition id="Scene-a4-hook" component={LessonScene} durationInFrames={284} fps={30} width={1920} height={1080} defaultProps={{scene:data[21].scenes[0] as CourseScene,meta:data[21] as LessonMeta}}/>
<Composition id="Scene-03-a4-explain" component={LessonScene} durationInFrames={665} fps={30} width={1920} height={1080} defaultProps={{scene:data[21].scenes[1] as CourseScene,meta:data[21] as LessonMeta}}/>
<Composition id="Scene-03-a4-worked" component={LessonScene} durationInFrames={590} fps={30} width={1920} height={1080} defaultProps={{scene:data[21].scenes[2] as CourseScene,meta:data[21] as LessonMeta}}/>
<Composition id="Scene-03-a4-quiz" component={LessonScene} durationInFrames={701} fps={30} width={1920} height={1080} defaultProps={{scene:data[21].scenes[3] as CourseScene,meta:data[21] as LessonMeta}}/>
<Composition id="Scene-03-a4-answer" component={LessonScene} durationInFrames={626} fps={30} width={1920} height={1080} defaultProps={{scene:data[21].scenes[4] as CourseScene,meta:data[21] as LessonMeta}}/>
<Composition id="Scene-a4-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[21].scenes[5] as CourseScene,meta:data[21] as LessonMeta}}/>
<Composition id="Scene-a5-hook" component={LessonScene} durationInFrames={212} fps={30} width={1920} height={1080} defaultProps={{scene:data[22].scenes[0] as CourseScene,meta:data[22] as LessonMeta}}/>
<Composition id="Scene-03-a5-explain" component={LessonScene} durationInFrames={647} fps={30} width={1920} height={1080} defaultProps={{scene:data[22].scenes[1] as CourseScene,meta:data[22] as LessonMeta}}/>
<Composition id="Scene-03-a5-worked" component={LessonScene} durationInFrames={707} fps={30} width={1920} height={1080} defaultProps={{scene:data[22].scenes[2] as CourseScene,meta:data[22] as LessonMeta}}/>
<Composition id="Scene-03-a5-quiz" component={LessonScene} durationInFrames={731} fps={30} width={1920} height={1080} defaultProps={{scene:data[22].scenes[3] as CourseScene,meta:data[22] as LessonMeta}}/>
<Composition id="Scene-03-a5-answer" component={LessonScene} durationInFrames={608} fps={30} width={1920} height={1080} defaultProps={{scene:data[22].scenes[4] as CourseScene,meta:data[22] as LessonMeta}}/>
<Composition id="Scene-a5-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[22].scenes[5] as CourseScene,meta:data[22] as LessonMeta}}/>
<Composition id="Scene-a6-hook" component={LessonScene} durationInFrames={290} fps={30} width={1920} height={1080} defaultProps={{scene:data[23].scenes[0] as CourseScene,meta:data[23] as LessonMeta}}/>
<Composition id="Scene-03-a6-explain" component={LessonScene} durationInFrames={569} fps={30} width={1920} height={1080} defaultProps={{scene:data[23].scenes[1] as CourseScene,meta:data[23] as LessonMeta}}/>
<Composition id="Scene-03-a6-worked" component={LessonScene} durationInFrames={575} fps={30} width={1920} height={1080} defaultProps={{scene:data[23].scenes[2] as CourseScene,meta:data[23] as LessonMeta}}/>
<Composition id="Scene-03-a6-quiz" component={LessonScene} durationInFrames={632} fps={30} width={1920} height={1080} defaultProps={{scene:data[23].scenes[3] as CourseScene,meta:data[23] as LessonMeta}}/>
<Composition id="Scene-03-a6-answer" component={LessonScene} durationInFrames={635} fps={30} width={1920} height={1080} defaultProps={{scene:data[23].scenes[4] as CourseScene,meta:data[23] as LessonMeta}}/>
<Composition id="Scene-a6-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[23].scenes[5] as CourseScene,meta:data[23] as LessonMeta}}/>
<Composition id="Scene-a7-hook" component={LessonScene} durationInFrames={308} fps={30} width={1920} height={1080} defaultProps={{scene:data[24].scenes[0] as CourseScene,meta:data[24] as LessonMeta}}/>
<Composition id="Scene-03-a7-explain" component={LessonScene} durationInFrames={629} fps={30} width={1920} height={1080} defaultProps={{scene:data[24].scenes[1] as CourseScene,meta:data[24] as LessonMeta}}/>
<Composition id="Scene-03-a7-worked" component={LessonScene} durationInFrames={647} fps={30} width={1920} height={1080} defaultProps={{scene:data[24].scenes[2] as CourseScene,meta:data[24] as LessonMeta}}/>
<Composition id="Scene-03-a7-quiz" component={LessonScene} durationInFrames={641} fps={30} width={1920} height={1080} defaultProps={{scene:data[24].scenes[3] as CourseScene,meta:data[24] as LessonMeta}}/>
<Composition id="Scene-03-a7-answer" component={LessonScene} durationInFrames={527} fps={30} width={1920} height={1080} defaultProps={{scene:data[24].scenes[4] as CourseScene,meta:data[24] as LessonMeta}}/>
<Composition id="Scene-a7-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[24].scenes[5] as CourseScene,meta:data[24] as LessonMeta}}/>
<Composition id="Scene-a8-hook" component={LessonScene} durationInFrames={269} fps={30} width={1920} height={1080} defaultProps={{scene:data[25].scenes[0] as CourseScene,meta:data[25] as LessonMeta}}/>
<Composition id="Scene-03-a8-explain" component={LessonScene} durationInFrames={623} fps={30} width={1920} height={1080} defaultProps={{scene:data[25].scenes[1] as CourseScene,meta:data[25] as LessonMeta}}/>
<Composition id="Scene-03-a8-worked" component={LessonScene} durationInFrames={671} fps={30} width={1920} height={1080} defaultProps={{scene:data[25].scenes[2] as CourseScene,meta:data[25] as LessonMeta}}/>
<Composition id="Scene-03-a8-quiz" component={LessonScene} durationInFrames={707} fps={30} width={1920} height={1080} defaultProps={{scene:data[25].scenes[3] as CourseScene,meta:data[25] as LessonMeta}}/>
<Composition id="Scene-03-a8-answer" component={LessonScene} durationInFrames={593} fps={30} width={1920} height={1080} defaultProps={{scene:data[25].scenes[4] as CourseScene,meta:data[25] as LessonMeta}}/>
<Composition id="Scene-a8-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[25].scenes[5] as CourseScene,meta:data[25] as LessonMeta}}/>
<Composition id="Scene-o1-hook" component={LessonScene} durationInFrames={242} fps={30} width={1920} height={1080} defaultProps={{scene:data[26].scenes[0] as CourseScene,meta:data[26] as LessonMeta}}/>
<Composition id="Scene-u4-o1-explain" component={LessonScene} durationInFrames={707} fps={30} width={1920} height={1080} defaultProps={{scene:data[26].scenes[1] as CourseScene,meta:data[26] as LessonMeta}}/>
<Composition id="Scene-u4-o1-worked" component={LessonScene} durationInFrames={698} fps={30} width={1920} height={1080} defaultProps={{scene:data[26].scenes[2] as CourseScene,meta:data[26] as LessonMeta}}/>
<Composition id="Scene-u4-o1-quiz" component={LessonScene} durationInFrames={533} fps={30} width={1920} height={1080} defaultProps={{scene:data[26].scenes[3] as CourseScene,meta:data[26] as LessonMeta}}/>
<Composition id="Scene-u4-o1-answer" component={LessonScene} durationInFrames={422} fps={30} width={1920} height={1080} defaultProps={{scene:data[26].scenes[4] as CourseScene,meta:data[26] as LessonMeta}}/>
<Composition id="Scene-o1-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[26].scenes[5] as CourseScene,meta:data[26] as LessonMeta}}/>
<Composition id="Scene-o2-hook" component={LessonScene} durationInFrames={260} fps={30} width={1920} height={1080} defaultProps={{scene:data[27].scenes[0] as CourseScene,meta:data[27] as LessonMeta}}/>
<Composition id="Scene-u4-o2-explain" component={LessonScene} durationInFrames={581} fps={30} width={1920} height={1080} defaultProps={{scene:data[27].scenes[1] as CourseScene,meta:data[27] as LessonMeta}}/>
<Composition id="Scene-u4-o2-worked" component={LessonScene} durationInFrames={683} fps={30} width={1920} height={1080} defaultProps={{scene:data[27].scenes[2] as CourseScene,meta:data[27] as LessonMeta}}/>
<Composition id="Scene-u4-o2-quiz" component={LessonScene} durationInFrames={515} fps={30} width={1920} height={1080} defaultProps={{scene:data[27].scenes[3] as CourseScene,meta:data[27] as LessonMeta}}/>
<Composition id="Scene-u4-o2-answer" component={LessonScene} durationInFrames={431} fps={30} width={1920} height={1080} defaultProps={{scene:data[27].scenes[4] as CourseScene,meta:data[27] as LessonMeta}}/>
<Composition id="Scene-o2-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[27].scenes[5] as CourseScene,meta:data[27] as LessonMeta}}/>
<Composition id="Scene-o3-hook" component={LessonScene} durationInFrames={257} fps={30} width={1920} height={1080} defaultProps={{scene:data[28].scenes[0] as CourseScene,meta:data[28] as LessonMeta}}/>
<Composition id="Scene-u4-o3-explain" component={LessonScene} durationInFrames={563} fps={30} width={1920} height={1080} defaultProps={{scene:data[28].scenes[1] as CourseScene,meta:data[28] as LessonMeta}}/>
<Composition id="Scene-u4-o3-worked" component={LessonScene} durationInFrames={677} fps={30} width={1920} height={1080} defaultProps={{scene:data[28].scenes[2] as CourseScene,meta:data[28] as LessonMeta}}/>
<Composition id="Scene-u4-o3-quiz" component={LessonScene} durationInFrames={518} fps={30} width={1920} height={1080} defaultProps={{scene:data[28].scenes[3] as CourseScene,meta:data[28] as LessonMeta}}/>
<Composition id="Scene-u4-o3-answer" component={LessonScene} durationInFrames={440} fps={30} width={1920} height={1080} defaultProps={{scene:data[28].scenes[4] as CourseScene,meta:data[28] as LessonMeta}}/>
<Composition id="Scene-o3-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[28].scenes[5] as CourseScene,meta:data[28] as LessonMeta}}/>
<Composition id="Scene-o4-hook" component={LessonScene} durationInFrames={227} fps={30} width={1920} height={1080} defaultProps={{scene:data[29].scenes[0] as CourseScene,meta:data[29] as LessonMeta}}/>
<Composition id="Scene-u4-o4-explain" component={LessonScene} durationInFrames={614} fps={30} width={1920} height={1080} defaultProps={{scene:data[29].scenes[1] as CourseScene,meta:data[29] as LessonMeta}}/>
<Composition id="Scene-u4-o4-worked" component={LessonScene} durationInFrames={776} fps={30} width={1920} height={1080} defaultProps={{scene:data[29].scenes[2] as CourseScene,meta:data[29] as LessonMeta}}/>
<Composition id="Scene-u4-o4-quiz" component={LessonScene} durationInFrames={509} fps={30} width={1920} height={1080} defaultProps={{scene:data[29].scenes[3] as CourseScene,meta:data[29] as LessonMeta}}/>
<Composition id="Scene-u4-o4-answer" component={LessonScene} durationInFrames={458} fps={30} width={1920} height={1080} defaultProps={{scene:data[29].scenes[4] as CourseScene,meta:data[29] as LessonMeta}}/>
<Composition id="Scene-o4-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[29].scenes[5] as CourseScene,meta:data[29] as LessonMeta}}/>
<Composition id="Scene-o5-hook" component={LessonScene} durationInFrames={254} fps={30} width={1920} height={1080} defaultProps={{scene:data[30].scenes[0] as CourseScene,meta:data[30] as LessonMeta}}/>
<Composition id="Scene-u4-o5-explain" component={LessonScene} durationInFrames={572} fps={30} width={1920} height={1080} defaultProps={{scene:data[30].scenes[1] as CourseScene,meta:data[30] as LessonMeta}}/>
<Composition id="Scene-u4-o5-worked" component={LessonScene} durationInFrames={635} fps={30} width={1920} height={1080} defaultProps={{scene:data[30].scenes[2] as CourseScene,meta:data[30] as LessonMeta}}/>
<Composition id="Scene-u4-o5-quiz" component={LessonScene} durationInFrames={557} fps={30} width={1920} height={1080} defaultProps={{scene:data[30].scenes[3] as CourseScene,meta:data[30] as LessonMeta}}/>
<Composition id="Scene-u4-o5-answer" component={LessonScene} durationInFrames={461} fps={30} width={1920} height={1080} defaultProps={{scene:data[30].scenes[4] as CourseScene,meta:data[30] as LessonMeta}}/>
<Composition id="Scene-o5-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[30].scenes[5] as CourseScene,meta:data[30] as LessonMeta}}/>
<Composition id="Scene-o6-hook" component={LessonScene} durationInFrames={218} fps={30} width={1920} height={1080} defaultProps={{scene:data[31].scenes[0] as CourseScene,meta:data[31] as LessonMeta}}/>
<Composition id="Scene-u4-o6-explain" component={LessonScene} durationInFrames={593} fps={30} width={1920} height={1080} defaultProps={{scene:data[31].scenes[1] as CourseScene,meta:data[31] as LessonMeta}}/>
<Composition id="Scene-u4-o6-worked" component={LessonScene} durationInFrames={608} fps={30} width={1920} height={1080} defaultProps={{scene:data[31].scenes[2] as CourseScene,meta:data[31] as LessonMeta}}/>
<Composition id="Scene-u4-o6-quiz" component={LessonScene} durationInFrames={536} fps={30} width={1920} height={1080} defaultProps={{scene:data[31].scenes[3] as CourseScene,meta:data[31] as LessonMeta}}/>
<Composition id="Scene-u4-o6-answer" component={LessonScene} durationInFrames={365} fps={30} width={1920} height={1080} defaultProps={{scene:data[31].scenes[4] as CourseScene,meta:data[31] as LessonMeta}}/>
<Composition id="Scene-o6-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[31].scenes[5] as CourseScene,meta:data[31] as LessonMeta}}/>
<Composition id="Scene-o7-hook" component={LessonScene} durationInFrames={230} fps={30} width={1920} height={1080} defaultProps={{scene:data[32].scenes[0] as CourseScene,meta:data[32] as LessonMeta}}/>
<Composition id="Scene-u4-o7-explain" component={LessonScene} durationInFrames={593} fps={30} width={1920} height={1080} defaultProps={{scene:data[32].scenes[1] as CourseScene,meta:data[32] as LessonMeta}}/>
<Composition id="Scene-u4-o7-worked" component={LessonScene} durationInFrames={758} fps={30} width={1920} height={1080} defaultProps={{scene:data[32].scenes[2] as CourseScene,meta:data[32] as LessonMeta}}/>
<Composition id="Scene-u4-o7-quiz" component={LessonScene} durationInFrames={725} fps={30} width={1920} height={1080} defaultProps={{scene:data[32].scenes[3] as CourseScene,meta:data[32] as LessonMeta}}/>
<Composition id="Scene-u4-o7-answer" component={LessonScene} durationInFrames={446} fps={30} width={1920} height={1080} defaultProps={{scene:data[32].scenes[4] as CourseScene,meta:data[32] as LessonMeta}}/>
<Composition id="Scene-o7-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[32].scenes[5] as CourseScene,meta:data[32] as LessonMeta}}/>
<Composition id="Scene-d1-hook" component={LessonScene} durationInFrames={200} fps={30} width={1920} height={1080} defaultProps={{scene:data[33].scenes[0] as CourseScene,meta:data[33] as LessonMeta}}/>
<Composition id="Scene-u5-d1-explain" component={LessonScene} durationInFrames={537} fps={30} width={1920} height={1080} defaultProps={{scene:data[33].scenes[1] as CourseScene,meta:data[33] as LessonMeta}}/>
<Composition id="Scene-u5-d1-worked" component={LessonScene} durationInFrames={599} fps={30} width={1920} height={1080} defaultProps={{scene:data[33].scenes[2] as CourseScene,meta:data[33] as LessonMeta}}/>
<Composition id="Scene-u5-d1-quiz" component={LessonScene} durationInFrames={815} fps={30} width={1920} height={1080} defaultProps={{scene:data[33].scenes[3] as CourseScene,meta:data[33] as LessonMeta}}/>
<Composition id="Scene-u5-d1-answer" component={LessonScene} durationInFrames={482} fps={30} width={1920} height={1080} defaultProps={{scene:data[33].scenes[4] as CourseScene,meta:data[33] as LessonMeta}}/>
<Composition id="Scene-d1-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[33].scenes[5] as CourseScene,meta:data[33] as LessonMeta}}/>
<Composition id="Scene-d2-hook" component={LessonScene} durationInFrames={260} fps={30} width={1920} height={1080} defaultProps={{scene:data[34].scenes[0] as CourseScene,meta:data[34] as LessonMeta}}/>
<Composition id="Scene-u5-d2-explain" component={LessonScene} durationInFrames={662} fps={30} width={1920} height={1080} defaultProps={{scene:data[34].scenes[1] as CourseScene,meta:data[34] as LessonMeta}}/>
<Composition id="Scene-u5-d2-worked" component={LessonScene} durationInFrames={650} fps={30} width={1920} height={1080} defaultProps={{scene:data[34].scenes[2] as CourseScene,meta:data[34] as LessonMeta}}/>
<Composition id="Scene-u5-d2-quiz" component={LessonScene} durationInFrames={512} fps={30} width={1920} height={1080} defaultProps={{scene:data[34].scenes[3] as CourseScene,meta:data[34] as LessonMeta}}/>
<Composition id="Scene-u5-d2-answer" component={LessonScene} durationInFrames={407} fps={30} width={1920} height={1080} defaultProps={{scene:data[34].scenes[4] as CourseScene,meta:data[34] as LessonMeta}}/>
<Composition id="Scene-d2-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[34].scenes[5] as CourseScene,meta:data[34] as LessonMeta}}/>
<Composition id="Scene-d3-hook" component={LessonScene} durationInFrames={305} fps={30} width={1920} height={1080} defaultProps={{scene:data[35].scenes[0] as CourseScene,meta:data[35] as LessonMeta}}/>
<Composition id="Scene-u5-d3-explain" component={LessonScene} durationInFrames={614} fps={30} width={1920} height={1080} defaultProps={{scene:data[35].scenes[1] as CourseScene,meta:data[35] as LessonMeta}}/>
<Composition id="Scene-u5-d3-worked" component={LessonScene} durationInFrames={722} fps={30} width={1920} height={1080} defaultProps={{scene:data[35].scenes[2] as CourseScene,meta:data[35] as LessonMeta}}/>
<Composition id="Scene-u5-d3-quiz" component={LessonScene} durationInFrames={521} fps={30} width={1920} height={1080} defaultProps={{scene:data[35].scenes[3] as CourseScene,meta:data[35] as LessonMeta}}/>
<Composition id="Scene-u5-d3-answer" component={LessonScene} durationInFrames={476} fps={30} width={1920} height={1080} defaultProps={{scene:data[35].scenes[4] as CourseScene,meta:data[35] as LessonMeta}}/>
<Composition id="Scene-d3-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[35].scenes[5] as CourseScene,meta:data[35] as LessonMeta}}/>
<Composition id="Scene-d4-hook" component={LessonScene} durationInFrames={284} fps={30} width={1920} height={1080} defaultProps={{scene:data[36].scenes[0] as CourseScene,meta:data[36] as LessonMeta}}/>
<Composition id="Scene-u5-d4-explain" component={LessonScene} durationInFrames={602} fps={30} width={1920} height={1080} defaultProps={{scene:data[36].scenes[1] as CourseScene,meta:data[36] as LessonMeta}}/>
<Composition id="Scene-u5-d4-worked" component={LessonScene} durationInFrames={674} fps={30} width={1920} height={1080} defaultProps={{scene:data[36].scenes[2] as CourseScene,meta:data[36] as LessonMeta}}/>
<Composition id="Scene-u5-d4-quiz" component={LessonScene} durationInFrames={584} fps={30} width={1920} height={1080} defaultProps={{scene:data[36].scenes[3] as CourseScene,meta:data[36] as LessonMeta}}/>
<Composition id="Scene-u5-d4-answer" component={LessonScene} durationInFrames={401} fps={30} width={1920} height={1080} defaultProps={{scene:data[36].scenes[4] as CourseScene,meta:data[36] as LessonMeta}}/>
<Composition id="Scene-d4-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[36].scenes[5] as CourseScene,meta:data[36] as LessonMeta}}/>
<Composition id="Scene-d5-hook" component={LessonScene} durationInFrames={257} fps={30} width={1920} height={1080} defaultProps={{scene:data[37].scenes[0] as CourseScene,meta:data[37] as LessonMeta}}/>
<Composition id="Scene-u5-d5-explain" component={LessonScene} durationInFrames={587} fps={30} width={1920} height={1080} defaultProps={{scene:data[37].scenes[1] as CourseScene,meta:data[37] as LessonMeta}}/>
<Composition id="Scene-u5-d5-worked" component={LessonScene} durationInFrames={674} fps={30} width={1920} height={1080} defaultProps={{scene:data[37].scenes[2] as CourseScene,meta:data[37] as LessonMeta}}/>
<Composition id="Scene-u5-d5-quiz" component={LessonScene} durationInFrames={695} fps={30} width={1920} height={1080} defaultProps={{scene:data[37].scenes[3] as CourseScene,meta:data[37] as LessonMeta}}/>
<Composition id="Scene-u5-d5-answer" component={LessonScene} durationInFrames={537} fps={30} width={1920} height={1080} defaultProps={{scene:data[37].scenes[4] as CourseScene,meta:data[37] as LessonMeta}}/>
<Composition id="Scene-d5-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[37].scenes[5] as CourseScene,meta:data[37] as LessonMeta}}/>
<Composition id="Scene-d6-hook" component={LessonScene} durationInFrames={260} fps={30} width={1920} height={1080} defaultProps={{scene:data[38].scenes[0] as CourseScene,meta:data[38] as LessonMeta}}/>
<Composition id="Scene-u5-d6-explain" component={LessonScene} durationInFrames={599} fps={30} width={1920} height={1080} defaultProps={{scene:data[38].scenes[1] as CourseScene,meta:data[38] as LessonMeta}}/>
<Composition id="Scene-u5-d6-worked" component={LessonScene} durationInFrames={602} fps={30} width={1920} height={1080} defaultProps={{scene:data[38].scenes[2] as CourseScene,meta:data[38] as LessonMeta}}/>
<Composition id="Scene-u5-d6-quiz" component={LessonScene} durationInFrames={551} fps={30} width={1920} height={1080} defaultProps={{scene:data[38].scenes[3] as CourseScene,meta:data[38] as LessonMeta}}/>
<Composition id="Scene-u5-d6-answer" component={LessonScene} durationInFrames={419} fps={30} width={1920} height={1080} defaultProps={{scene:data[38].scenes[4] as CourseScene,meta:data[38] as LessonMeta}}/>
<Composition id="Scene-d6-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[38].scenes[5] as CourseScene,meta:data[38] as LessonMeta}}/>
<Composition id="Scene-d7-hook" component={LessonScene} durationInFrames={257} fps={30} width={1920} height={1080} defaultProps={{scene:data[39].scenes[0] as CourseScene,meta:data[39] as LessonMeta}}/>
<Composition id="Scene-u5-d7-explain" component={LessonScene} durationInFrames={614} fps={30} width={1920} height={1080} defaultProps={{scene:data[39].scenes[1] as CourseScene,meta:data[39] as LessonMeta}}/>
<Composition id="Scene-u5-d7-worked" component={LessonScene} durationInFrames={761} fps={30} width={1920} height={1080} defaultProps={{scene:data[39].scenes[2] as CourseScene,meta:data[39] as LessonMeta}}/>
<Composition id="Scene-u5-d7-quiz" component={LessonScene} durationInFrames={731} fps={30} width={1920} height={1080} defaultProps={{scene:data[39].scenes[3] as CourseScene,meta:data[39] as LessonMeta}}/>
<Composition id="Scene-u5-d7-answer" component={LessonScene} durationInFrames={488} fps={30} width={1920} height={1080} defaultProps={{scene:data[39].scenes[4] as CourseScene,meta:data[39] as LessonMeta}}/>
<Composition id="Scene-d7-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[39].scenes[5] as CourseScene,meta:data[39] as LessonMeta}}/>
<Composition id="Scene-d8-hook" component={LessonScene} durationInFrames={272} fps={30} width={1920} height={1080} defaultProps={{scene:data[40].scenes[0] as CourseScene,meta:data[40] as LessonMeta}}/>
<Composition id="Scene-u5-d8-explain" component={LessonScene} durationInFrames={512} fps={30} width={1920} height={1080} defaultProps={{scene:data[40].scenes[1] as CourseScene,meta:data[40] as LessonMeta}}/>
<Composition id="Scene-u5-d8-worked" component={LessonScene} durationInFrames={638} fps={30} width={1920} height={1080} defaultProps={{scene:data[40].scenes[2] as CourseScene,meta:data[40] as LessonMeta}}/>
<Composition id="Scene-u5-d8-quiz" component={LessonScene} durationInFrames={530} fps={30} width={1920} height={1080} defaultProps={{scene:data[40].scenes[3] as CourseScene,meta:data[40] as LessonMeta}}/>
<Composition id="Scene-u5-d8-answer" component={LessonScene} durationInFrames={410} fps={30} width={1920} height={1080} defaultProps={{scene:data[40].scenes[4] as CourseScene,meta:data[40] as LessonMeta}}/>
<Composition id="Scene-d8-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[40].scenes[5] as CourseScene,meta:data[40] as LessonMeta}}/>
<Composition id="Scene-s1-hook" component={LessonScene} durationInFrames={287} fps={30} width={1920} height={1080} defaultProps={{scene:data[41].scenes[0] as CourseScene,meta:data[41] as LessonMeta}}/>
<Composition id="Scene-u6-s1-explain" component={LessonScene} durationInFrames={605} fps={30} width={1920} height={1080} defaultProps={{scene:data[41].scenes[1] as CourseScene,meta:data[41] as LessonMeta}}/>
<Composition id="Scene-u6-s1-worked" component={LessonScene} durationInFrames={524} fps={30} width={1920} height={1080} defaultProps={{scene:data[41].scenes[2] as CourseScene,meta:data[41] as LessonMeta}}/>
<Composition id="Scene-u6-s1-quiz" component={LessonScene} durationInFrames={536} fps={30} width={1920} height={1080} defaultProps={{scene:data[41].scenes[3] as CourseScene,meta:data[41] as LessonMeta}}/>
<Composition id="Scene-u6-s1-answer" component={LessonScene} durationInFrames={452} fps={30} width={1920} height={1080} defaultProps={{scene:data[41].scenes[4] as CourseScene,meta:data[41] as LessonMeta}}/>
<Composition id="Scene-s1-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[41].scenes[5] as CourseScene,meta:data[41] as LessonMeta}}/>
<Composition id="Scene-s2-hook" component={LessonScene} durationInFrames={263} fps={30} width={1920} height={1080} defaultProps={{scene:data[42].scenes[0] as CourseScene,meta:data[42] as LessonMeta}}/>
<Composition id="Scene-u6-s2-explain" component={LessonScene} durationInFrames={641} fps={30} width={1920} height={1080} defaultProps={{scene:data[42].scenes[1] as CourseScene,meta:data[42] as LessonMeta}}/>
<Composition id="Scene-u6-s2-worked" component={LessonScene} durationInFrames={641} fps={30} width={1920} height={1080} defaultProps={{scene:data[42].scenes[2] as CourseScene,meta:data[42] as LessonMeta}}/>
<Composition id="Scene-u6-s2-quiz" component={LessonScene} durationInFrames={584} fps={30} width={1920} height={1080} defaultProps={{scene:data[42].scenes[3] as CourseScene,meta:data[42] as LessonMeta}}/>
<Composition id="Scene-u6-s2-answer" component={LessonScene} durationInFrames={455} fps={30} width={1920} height={1080} defaultProps={{scene:data[42].scenes[4] as CourseScene,meta:data[42] as LessonMeta}}/>
<Composition id="Scene-s2-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[42].scenes[5] as CourseScene,meta:data[42] as LessonMeta}}/>
<Composition id="Scene-s3-hook" component={LessonScene} durationInFrames={281} fps={30} width={1920} height={1080} defaultProps={{scene:data[43].scenes[0] as CourseScene,meta:data[43] as LessonMeta}}/>
<Composition id="Scene-u6-s3-explain" component={LessonScene} durationInFrames={650} fps={30} width={1920} height={1080} defaultProps={{scene:data[43].scenes[1] as CourseScene,meta:data[43] as LessonMeta}}/>
<Composition id="Scene-u6-s3-worked" component={LessonScene} durationInFrames={698} fps={30} width={1920} height={1080} defaultProps={{scene:data[43].scenes[2] as CourseScene,meta:data[43] as LessonMeta}}/>
<Composition id="Scene-u6-s3-quiz" component={LessonScene} durationInFrames={569} fps={30} width={1920} height={1080} defaultProps={{scene:data[43].scenes[3] as CourseScene,meta:data[43] as LessonMeta}}/>
<Composition id="Scene-u6-s3-answer" component={LessonScene} durationInFrames={473} fps={30} width={1920} height={1080} defaultProps={{scene:data[43].scenes[4] as CourseScene,meta:data[43] as LessonMeta}}/>
<Composition id="Scene-s3-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[43].scenes[5] as CourseScene,meta:data[43] as LessonMeta}}/>
<Composition id="Scene-s4-hook" component={LessonScene} durationInFrames={278} fps={30} width={1920} height={1080} defaultProps={{scene:data[44].scenes[0] as CourseScene,meta:data[44] as LessonMeta}}/>
<Composition id="Scene-u6-s4-explain" component={LessonScene} durationInFrames={611} fps={30} width={1920} height={1080} defaultProps={{scene:data[44].scenes[1] as CourseScene,meta:data[44] as LessonMeta}}/>
<Composition id="Scene-u6-s4-worked" component={LessonScene} durationInFrames={674} fps={30} width={1920} height={1080} defaultProps={{scene:data[44].scenes[2] as CourseScene,meta:data[44] as LessonMeta}}/>
<Composition id="Scene-u6-s4-quiz" component={LessonScene} durationInFrames={578} fps={30} width={1920} height={1080} defaultProps={{scene:data[44].scenes[3] as CourseScene,meta:data[44] as LessonMeta}}/>
<Composition id="Scene-u6-s4-answer" component={LessonScene} durationInFrames={452} fps={30} width={1920} height={1080} defaultProps={{scene:data[44].scenes[4] as CourseScene,meta:data[44] as LessonMeta}}/>
<Composition id="Scene-s4-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[44].scenes[5] as CourseScene,meta:data[44] as LessonMeta}}/>
<Composition id="Scene-s5-hook" component={LessonScene} durationInFrames={260} fps={30} width={1920} height={1080} defaultProps={{scene:data[45].scenes[0] as CourseScene,meta:data[45] as LessonMeta}}/>
<Composition id="Scene-u6-s5-explain" component={LessonScene} durationInFrames={644} fps={30} width={1920} height={1080} defaultProps={{scene:data[45].scenes[1] as CourseScene,meta:data[45] as LessonMeta}}/>
<Composition id="Scene-u6-s5-worked" component={LessonScene} durationInFrames={668} fps={30} width={1920} height={1080} defaultProps={{scene:data[45].scenes[2] as CourseScene,meta:data[45] as LessonMeta}}/>
<Composition id="Scene-u6-s5-quiz" component={LessonScene} durationInFrames={584} fps={30} width={1920} height={1080} defaultProps={{scene:data[45].scenes[3] as CourseScene,meta:data[45] as LessonMeta}}/>
<Composition id="Scene-u6-s5-answer" component={LessonScene} durationInFrames={560} fps={30} width={1920} height={1080} defaultProps={{scene:data[45].scenes[4] as CourseScene,meta:data[45] as LessonMeta}}/>
<Composition id="Scene-s5-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[45].scenes[5] as CourseScene,meta:data[45] as LessonMeta}}/>
<Composition id="Scene-s6-hook" component={LessonScene} durationInFrames={254} fps={30} width={1920} height={1080} defaultProps={{scene:data[46].scenes[0] as CourseScene,meta:data[46] as LessonMeta}}/>
<Composition id="Scene-u6-s6-explain" component={LessonScene} durationInFrames={635} fps={30} width={1920} height={1080} defaultProps={{scene:data[46].scenes[1] as CourseScene,meta:data[46] as LessonMeta}}/>
<Composition id="Scene-u6-s6-worked" component={LessonScene} durationInFrames={611} fps={30} width={1920} height={1080} defaultProps={{scene:data[46].scenes[2] as CourseScene,meta:data[46] as LessonMeta}}/>
<Composition id="Scene-u6-s6-quiz" component={LessonScene} durationInFrames={578} fps={30} width={1920} height={1080} defaultProps={{scene:data[46].scenes[3] as CourseScene,meta:data[46] as LessonMeta}}/>
<Composition id="Scene-u6-s6-answer" component={LessonScene} durationInFrames={470} fps={30} width={1920} height={1080} defaultProps={{scene:data[46].scenes[4] as CourseScene,meta:data[46] as LessonMeta}}/>
<Composition id="Scene-s6-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[46].scenes[5] as CourseScene,meta:data[46] as LessonMeta}}/>
<Composition id="Scene-s7-hook" component={LessonScene} durationInFrames={215} fps={30} width={1920} height={1080} defaultProps={{scene:data[47].scenes[0] as CourseScene,meta:data[47] as LessonMeta}}/>
<Composition id="Scene-u6-s7-explain" component={LessonScene} durationInFrames={596} fps={30} width={1920} height={1080} defaultProps={{scene:data[47].scenes[1] as CourseScene,meta:data[47] as LessonMeta}}/>
<Composition id="Scene-u6-s7-worked" component={LessonScene} durationInFrames={680} fps={30} width={1920} height={1080} defaultProps={{scene:data[47].scenes[2] as CourseScene,meta:data[47] as LessonMeta}}/>
<Composition id="Scene-u6-s7-quiz" component={LessonScene} durationInFrames={500} fps={30} width={1920} height={1080} defaultProps={{scene:data[47].scenes[3] as CourseScene,meta:data[47] as LessonMeta}}/>
<Composition id="Scene-u6-s7-answer" component={LessonScene} durationInFrames={467} fps={30} width={1920} height={1080} defaultProps={{scene:data[47].scenes[4] as CourseScene,meta:data[47] as LessonMeta}}/>
<Composition id="Scene-s7-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[47].scenes[5] as CourseScene,meta:data[47] as LessonMeta}}/>
<Composition id="Scene-s8-hook" component={LessonScene} durationInFrames={251} fps={30} width={1920} height={1080} defaultProps={{scene:data[48].scenes[0] as CourseScene,meta:data[48] as LessonMeta}}/>
<Composition id="Scene-u6-s8-explain" component={LessonScene} durationInFrames={614} fps={30} width={1920} height={1080} defaultProps={{scene:data[48].scenes[1] as CourseScene,meta:data[48] as LessonMeta}}/>
<Composition id="Scene-u6-s8-worked" component={LessonScene} durationInFrames={635} fps={30} width={1920} height={1080} defaultProps={{scene:data[48].scenes[2] as CourseScene,meta:data[48] as LessonMeta}}/>
<Composition id="Scene-u6-s8-quiz" component={LessonScene} durationInFrames={690} fps={30} width={1920} height={1080} defaultProps={{scene:data[48].scenes[3] as CourseScene,meta:data[48] as LessonMeta}}/>
<Composition id="Scene-u6-s8-answer" component={LessonScene} durationInFrames={587} fps={30} width={1920} height={1080} defaultProps={{scene:data[48].scenes[4] as CourseScene,meta:data[48] as LessonMeta}}/>
<Composition id="Scene-s8-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[48].scenes[5] as CourseScene,meta:data[48] as LessonMeta}}/>
<Composition id="Scene-s9-hook" component={LessonScene} durationInFrames={278} fps={30} width={1920} height={1080} defaultProps={{scene:data[49].scenes[0] as CourseScene,meta:data[49] as LessonMeta}}/>
<Composition id="Scene-u6-s9-explain" component={LessonScene} durationInFrames={524} fps={30} width={1920} height={1080} defaultProps={{scene:data[49].scenes[1] as CourseScene,meta:data[49] as LessonMeta}}/>
<Composition id="Scene-u6-s9-worked" component={LessonScene} durationInFrames={656} fps={30} width={1920} height={1080} defaultProps={{scene:data[49].scenes[2] as CourseScene,meta:data[49] as LessonMeta}}/>
<Composition id="Scene-u6-s9-quiz" component={LessonScene} durationInFrames={461} fps={30} width={1920} height={1080} defaultProps={{scene:data[49].scenes[3] as CourseScene,meta:data[49] as LessonMeta}}/>
<Composition id="Scene-u6-s9-answer" component={LessonScene} durationInFrames={512} fps={30} width={1920} height={1080} defaultProps={{scene:data[49].scenes[4] as CourseScene,meta:data[49] as LessonMeta}}/>
<Composition id="Scene-s9-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[49].scenes[5] as CourseScene,meta:data[49] as LessonMeta}}/>
<Composition id="Scene-p1-hook" component={LessonScene} durationInFrames={209} fps={30} width={1920} height={1080} defaultProps={{scene:data[50].scenes[0] as CourseScene,meta:data[50] as LessonMeta}}/>
<Composition id="Scene-u7-p1-explain" component={LessonScene} durationInFrames={551} fps={30} width={1920} height={1080} defaultProps={{scene:data[50].scenes[1] as CourseScene,meta:data[50] as LessonMeta}}/>
<Composition id="Scene-u7-p1-worked" component={LessonScene} durationInFrames={650} fps={30} width={1920} height={1080} defaultProps={{scene:data[50].scenes[2] as CourseScene,meta:data[50] as LessonMeta}}/>
<Composition id="Scene-u7-p1-practice" component={LessonScene} durationInFrames={563} fps={30} width={1920} height={1080} defaultProps={{scene:data[50].scenes[3] as CourseScene,meta:data[50] as LessonMeta}}/>
<Composition id="Scene-u7-p1-reveal" component={LessonScene} durationInFrames={563} fps={30} width={1920} height={1080} defaultProps={{scene:data[50].scenes[4] as CourseScene,meta:data[50] as LessonMeta}}/>
<Composition id="Scene-p1-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[50].scenes[5] as CourseScene,meta:data[50] as LessonMeta}}/>
<Composition id="Scene-p2-hook" component={LessonScene} durationInFrames={302} fps={30} width={1920} height={1080} defaultProps={{scene:data[51].scenes[0] as CourseScene,meta:data[51] as LessonMeta}}/>
<Composition id="Scene-u7-p2-explain" component={LessonScene} durationInFrames={554} fps={30} width={1920} height={1080} defaultProps={{scene:data[51].scenes[1] as CourseScene,meta:data[51] as LessonMeta}}/>
<Composition id="Scene-u7-p2-worked" component={LessonScene} durationInFrames={713} fps={30} width={1920} height={1080} defaultProps={{scene:data[51].scenes[2] as CourseScene,meta:data[51] as LessonMeta}}/>
<Composition id="Scene-u7-p2-practice" component={LessonScene} durationInFrames={647} fps={30} width={1920} height={1080} defaultProps={{scene:data[51].scenes[3] as CourseScene,meta:data[51] as LessonMeta}}/>
<Composition id="Scene-u7-p2-reveal" component={LessonScene} durationInFrames={530} fps={30} width={1920} height={1080} defaultProps={{scene:data[51].scenes[4] as CourseScene,meta:data[51] as LessonMeta}}/>
<Composition id="Scene-p2-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[51].scenes[5] as CourseScene,meta:data[51] as LessonMeta}}/>
<Composition id="Scene-p3-hook" component={LessonScene} durationInFrames={308} fps={30} width={1920} height={1080} defaultProps={{scene:data[52].scenes[0] as CourseScene,meta:data[52] as LessonMeta}}/>
<Composition id="Scene-u7-p3-explain" component={LessonScene} durationInFrames={575} fps={30} width={1920} height={1080} defaultProps={{scene:data[52].scenes[1] as CourseScene,meta:data[52] as LessonMeta}}/>
<Composition id="Scene-u7-p3-worked" component={LessonScene} durationInFrames={569} fps={30} width={1920} height={1080} defaultProps={{scene:data[52].scenes[2] as CourseScene,meta:data[52] as LessonMeta}}/>
<Composition id="Scene-u7-p3-practice" component={LessonScene} durationInFrames={605} fps={30} width={1920} height={1080} defaultProps={{scene:data[52].scenes[3] as CourseScene,meta:data[52] as LessonMeta}}/>
<Composition id="Scene-u7-p3-reveal" component={LessonScene} durationInFrames={404} fps={30} width={1920} height={1080} defaultProps={{scene:data[52].scenes[4] as CourseScene,meta:data[52] as LessonMeta}}/>
<Composition id="Scene-p3-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[52].scenes[5] as CourseScene,meta:data[52] as LessonMeta}}/>
<Composition id="Scene-p4-hook" component={LessonScene} durationInFrames={260} fps={30} width={1920} height={1080} defaultProps={{scene:data[53].scenes[0] as CourseScene,meta:data[53] as LessonMeta}}/>
<Composition id="Scene-u7-p4-explain" component={LessonScene} durationInFrames={602} fps={30} width={1920} height={1080} defaultProps={{scene:data[53].scenes[1] as CourseScene,meta:data[53] as LessonMeta}}/>
<Composition id="Scene-u7-p4-worked" component={LessonScene} durationInFrames={665} fps={30} width={1920} height={1080} defaultProps={{scene:data[53].scenes[2] as CourseScene,meta:data[53] as LessonMeta}}/>
<Composition id="Scene-u7-p4-practice" component={LessonScene} durationInFrames={620} fps={30} width={1920} height={1080} defaultProps={{scene:data[53].scenes[3] as CourseScene,meta:data[53] as LessonMeta}}/>
<Composition id="Scene-u7-p4-reveal" component={LessonScene} durationInFrames={500} fps={30} width={1920} height={1080} defaultProps={{scene:data[53].scenes[4] as CourseScene,meta:data[53] as LessonMeta}}/>
<Composition id="Scene-p4-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[53].scenes[5] as CourseScene,meta:data[53] as LessonMeta}}/>
<Composition id="Scene-p5-hook" component={LessonScene} durationInFrames={254} fps={30} width={1920} height={1080} defaultProps={{scene:data[54].scenes[0] as CourseScene,meta:data[54] as LessonMeta}}/>
<Composition id="Scene-u7-p5-explain" component={LessonScene} durationInFrames={611} fps={30} width={1920} height={1080} defaultProps={{scene:data[54].scenes[1] as CourseScene,meta:data[54] as LessonMeta}}/>
<Composition id="Scene-u7-p5-worked" component={LessonScene} durationInFrames={653} fps={30} width={1920} height={1080} defaultProps={{scene:data[54].scenes[2] as CourseScene,meta:data[54] as LessonMeta}}/>
<Composition id="Scene-u7-p5-practice" component={LessonScene} durationInFrames={677} fps={30} width={1920} height={1080} defaultProps={{scene:data[54].scenes[3] as CourseScene,meta:data[54] as LessonMeta}}/>
<Composition id="Scene-u7-p5-reveal" component={LessonScene} durationInFrames={524} fps={30} width={1920} height={1080} defaultProps={{scene:data[54].scenes[4] as CourseScene,meta:data[54] as LessonMeta}}/>
<Composition id="Scene-p5-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[54].scenes[5] as CourseScene,meta:data[54] as LessonMeta}}/>
<Composition id="Scene-p6-hook" component={LessonScene} durationInFrames={308} fps={30} width={1920} height={1080} defaultProps={{scene:data[55].scenes[0] as CourseScene,meta:data[55] as LessonMeta}}/>
<Composition id="Scene-u7-p6-explain" component={LessonScene} durationInFrames={560} fps={30} width={1920} height={1080} defaultProps={{scene:data[55].scenes[1] as CourseScene,meta:data[55] as LessonMeta}}/>
<Composition id="Scene-u7-p6-worked" component={LessonScene} durationInFrames={659} fps={30} width={1920} height={1080} defaultProps={{scene:data[55].scenes[2] as CourseScene,meta:data[55] as LessonMeta}}/>
<Composition id="Scene-u7-p6-practice" component={LessonScene} durationInFrames={578} fps={30} width={1920} height={1080} defaultProps={{scene:data[55].scenes[3] as CourseScene,meta:data[55] as LessonMeta}}/>
<Composition id="Scene-u7-p6-reveal" component={LessonScene} durationInFrames={704} fps={30} width={1920} height={1080} defaultProps={{scene:data[55].scenes[4] as CourseScene,meta:data[55] as LessonMeta}}/>
<Composition id="Scene-p6-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[55].scenes[5] as CourseScene,meta:data[55] as LessonMeta}}/>
<Composition id="Scene-q1-hook" component={LessonScene} durationInFrames={293} fps={30} width={1920} height={1080} defaultProps={{scene:data[56].scenes[0] as CourseScene,meta:data[56] as LessonMeta}}/>
<Composition id="Scene-u8-q1-explain" component={LessonScene} durationInFrames={524} fps={30} width={1920} height={1080} defaultProps={{scene:data[56].scenes[1] as CourseScene,meta:data[56] as LessonMeta}}/>
<Composition id="Scene-u8-q1-worked" component={LessonScene} durationInFrames={554} fps={30} width={1920} height={1080} defaultProps={{scene:data[56].scenes[2] as CourseScene,meta:data[56] as LessonMeta}}/>
<Composition id="Scene-u8-q1-practice" component={LessonScene} durationInFrames={578} fps={30} width={1920} height={1080} defaultProps={{scene:data[56].scenes[3] as CourseScene,meta:data[56] as LessonMeta}}/>
<Composition id="Scene-u8-q1-reveal" component={LessonScene} durationInFrames={581} fps={30} width={1920} height={1080} defaultProps={{scene:data[56].scenes[4] as CourseScene,meta:data[56] as LessonMeta}}/>
<Composition id="Scene-q1-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[56].scenes[5] as CourseScene,meta:data[56] as LessonMeta}}/>
<Composition id="Scene-q2-hook" component={LessonScene} durationInFrames={296} fps={30} width={1920} height={1080} defaultProps={{scene:data[57].scenes[0] as CourseScene,meta:data[57] as LessonMeta}}/>
<Composition id="Scene-u8-q2-explain" component={LessonScene} durationInFrames={635} fps={30} width={1920} height={1080} defaultProps={{scene:data[57].scenes[1] as CourseScene,meta:data[57] as LessonMeta}}/>
<Composition id="Scene-u8-q2-worked" component={LessonScene} durationInFrames={686} fps={30} width={1920} height={1080} defaultProps={{scene:data[57].scenes[2] as CourseScene,meta:data[57] as LessonMeta}}/>
<Composition id="Scene-u8-q2-practice" component={LessonScene} durationInFrames={539} fps={30} width={1920} height={1080} defaultProps={{scene:data[57].scenes[3] as CourseScene,meta:data[57] as LessonMeta}}/>
<Composition id="Scene-u8-q2-reveal" component={LessonScene} durationInFrames={737} fps={30} width={1920} height={1080} defaultProps={{scene:data[57].scenes[4] as CourseScene,meta:data[57] as LessonMeta}}/>
<Composition id="Scene-u8-q2-extra1" component={LessonScene} durationInFrames={782} fps={30} width={1920} height={1080} defaultProps={{scene:data[57].scenes[5] as CourseScene,meta:data[57] as LessonMeta}}/>
<Composition id="Scene-q2-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[57].scenes[6] as CourseScene,meta:data[57] as LessonMeta}}/>
<Composition id="Scene-q3-hook" component={LessonScene} durationInFrames={305} fps={30} width={1920} height={1080} defaultProps={{scene:data[58].scenes[0] as CourseScene,meta:data[58] as LessonMeta}}/>
<Composition id="Scene-u8-q3-explain" component={LessonScene} durationInFrames={578} fps={30} width={1920} height={1080} defaultProps={{scene:data[58].scenes[1] as CourseScene,meta:data[58] as LessonMeta}}/>
<Composition id="Scene-u8-q3-worked" component={LessonScene} durationInFrames={638} fps={30} width={1920} height={1080} defaultProps={{scene:data[58].scenes[2] as CourseScene,meta:data[58] as LessonMeta}}/>
<Composition id="Scene-u8-q3-practice" component={LessonScene} durationInFrames={575} fps={30} width={1920} height={1080} defaultProps={{scene:data[58].scenes[3] as CourseScene,meta:data[58] as LessonMeta}}/>
<Composition id="Scene-u8-q3-reveal" component={LessonScene} durationInFrames={533} fps={30} width={1920} height={1080} defaultProps={{scene:data[58].scenes[4] as CourseScene,meta:data[58] as LessonMeta}}/>
<Composition id="Scene-q3-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[58].scenes[5] as CourseScene,meta:data[58] as LessonMeta}}/>
<Composition id="Scene-q4-hook" component={LessonScene} durationInFrames={290} fps={30} width={1920} height={1080} defaultProps={{scene:data[59].scenes[0] as CourseScene,meta:data[59] as LessonMeta}}/>
<Composition id="Scene-u8-q4-explain" component={LessonScene} durationInFrames={575} fps={30} width={1920} height={1080} defaultProps={{scene:data[59].scenes[1] as CourseScene,meta:data[59] as LessonMeta}}/>
<Composition id="Scene-u8-q4-worked" component={LessonScene} durationInFrames={626} fps={30} width={1920} height={1080} defaultProps={{scene:data[59].scenes[2] as CourseScene,meta:data[59] as LessonMeta}}/>
<Composition id="Scene-u8-q4-practice" component={LessonScene} durationInFrames={614} fps={30} width={1920} height={1080} defaultProps={{scene:data[59].scenes[3] as CourseScene,meta:data[59] as LessonMeta}}/>
<Composition id="Scene-u8-q4-reveal" component={LessonScene} durationInFrames={491} fps={30} width={1920} height={1080} defaultProps={{scene:data[59].scenes[4] as CourseScene,meta:data[59] as LessonMeta}}/>
<Composition id="Scene-q4-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[59].scenes[5] as CourseScene,meta:data[59] as LessonMeta}}/>
<Composition id="Scene-q5-hook" component={LessonScene} durationInFrames={266} fps={30} width={1920} height={1080} defaultProps={{scene:data[60].scenes[0] as CourseScene,meta:data[60] as LessonMeta}}/>
<Composition id="Scene-u8-q5-explain" component={LessonScene} durationInFrames={611} fps={30} width={1920} height={1080} defaultProps={{scene:data[60].scenes[1] as CourseScene,meta:data[60] as LessonMeta}}/>
<Composition id="Scene-u8-q5-worked" component={LessonScene} durationInFrames={866} fps={30} width={1920} height={1080} defaultProps={{scene:data[60].scenes[2] as CourseScene,meta:data[60] as LessonMeta}}/>
<Composition id="Scene-u8-q5-practice" component={LessonScene} durationInFrames={524} fps={30} width={1920} height={1080} defaultProps={{scene:data[60].scenes[3] as CourseScene,meta:data[60] as LessonMeta}}/>
<Composition id="Scene-u8-q5-reveal" component={LessonScene} durationInFrames={509} fps={30} width={1920} height={1080} defaultProps={{scene:data[60].scenes[4] as CourseScene,meta:data[60] as LessonMeta}}/>
<Composition id="Scene-q5-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[60].scenes[5] as CourseScene,meta:data[60] as LessonMeta}}/>
<Composition id="Scene-q6-hook" component={LessonScene} durationInFrames={308} fps={30} width={1920} height={1080} defaultProps={{scene:data[61].scenes[0] as CourseScene,meta:data[61] as LessonMeta}}/>
<Composition id="Scene-u8-q6-explain" component={LessonScene} durationInFrames={599} fps={30} width={1920} height={1080} defaultProps={{scene:data[61].scenes[1] as CourseScene,meta:data[61] as LessonMeta}}/>
<Composition id="Scene-u8-q6-worked" component={LessonScene} durationInFrames={674} fps={30} width={1920} height={1080} defaultProps={{scene:data[61].scenes[2] as CourseScene,meta:data[61] as LessonMeta}}/>
<Composition id="Scene-u8-q6-practice" component={LessonScene} durationInFrames={593} fps={30} width={1920} height={1080} defaultProps={{scene:data[61].scenes[3] as CourseScene,meta:data[61] as LessonMeta}}/>
<Composition id="Scene-u8-q6-reveal" component={LessonScene} durationInFrames={470} fps={30} width={1920} height={1080} defaultProps={{scene:data[61].scenes[4] as CourseScene,meta:data[61] as LessonMeta}}/>
<Composition id="Scene-q6-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[61].scenes[5] as CourseScene,meta:data[61] as LessonMeta}}/>
<Composition id="Scene-q7-hook" component={LessonScene} durationInFrames={308} fps={30} width={1920} height={1080} defaultProps={{scene:data[62].scenes[0] as CourseScene,meta:data[62] as LessonMeta}}/>
<Composition id="Scene-u8-q7-explain" component={LessonScene} durationInFrames={587} fps={30} width={1920} height={1080} defaultProps={{scene:data[62].scenes[1] as CourseScene,meta:data[62] as LessonMeta}}/>
<Composition id="Scene-u8-q7-worked" component={LessonScene} durationInFrames={779} fps={30} width={1920} height={1080} defaultProps={{scene:data[62].scenes[2] as CourseScene,meta:data[62] as LessonMeta}}/>
<Composition id="Scene-u8-q7-practice" component={LessonScene} durationInFrames={563} fps={30} width={1920} height={1080} defaultProps={{scene:data[62].scenes[3] as CourseScene,meta:data[62] as LessonMeta}}/>
<Composition id="Scene-u8-q7-reveal" component={LessonScene} durationInFrames={522} fps={30} width={1920} height={1080} defaultProps={{scene:data[62].scenes[4] as CourseScene,meta:data[62] as LessonMeta}}/>
<Composition id="Scene-q7-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[62].scenes[5] as CourseScene,meta:data[62] as LessonMeta}}/>
<Composition id="Scene-q8-hook" component={LessonScene} durationInFrames={389} fps={30} width={1920} height={1080} defaultProps={{scene:data[63].scenes[0] as CourseScene,meta:data[63] as LessonMeta}}/>
<Composition id="Scene-u8-q8-explain" component={LessonScene} durationInFrames={608} fps={30} width={1920} height={1080} defaultProps={{scene:data[63].scenes[1] as CourseScene,meta:data[63] as LessonMeta}}/>
<Composition id="Scene-u8-q8-worked" component={LessonScene} durationInFrames={719} fps={30} width={1920} height={1080} defaultProps={{scene:data[63].scenes[2] as CourseScene,meta:data[63] as LessonMeta}}/>
<Composition id="Scene-u8-q8-practice" component={LessonScene} durationInFrames={635} fps={30} width={1920} height={1080} defaultProps={{scene:data[63].scenes[3] as CourseScene,meta:data[63] as LessonMeta}}/>
<Composition id="Scene-u8-q8-reveal" component={LessonScene} durationInFrames={416} fps={30} width={1920} height={1080} defaultProps={{scene:data[63].scenes[4] as CourseScene,meta:data[63] as LessonMeta}}/>
<Composition id="Scene-q8-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[63].scenes[5] as CourseScene,meta:data[63] as LessonMeta}}/>
<Composition id="Scene-q9-hook" component={LessonScene} durationInFrames={332} fps={30} width={1920} height={1080} defaultProps={{scene:data[64].scenes[0] as CourseScene,meta:data[64] as LessonMeta}}/>
<Composition id="Scene-u8-q9-explain" component={LessonScene} durationInFrames={638} fps={30} width={1920} height={1080} defaultProps={{scene:data[64].scenes[1] as CourseScene,meta:data[64] as LessonMeta}}/>
<Composition id="Scene-u8-q9-worked" component={LessonScene} durationInFrames={713} fps={30} width={1920} height={1080} defaultProps={{scene:data[64].scenes[2] as CourseScene,meta:data[64] as LessonMeta}}/>
<Composition id="Scene-u8-q9-practice" component={LessonScene} durationInFrames={659} fps={30} width={1920} height={1080} defaultProps={{scene:data[64].scenes[3] as CourseScene,meta:data[64] as LessonMeta}}/>
<Composition id="Scene-u8-q9-reveal" component={LessonScene} durationInFrames={521} fps={30} width={1920} height={1080} defaultProps={{scene:data[64].scenes[4] as CourseScene,meta:data[64] as LessonMeta}}/>
<Composition id="Scene-q9-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[64].scenes[5] as CourseScene,meta:data[64] as LessonMeta}}/>
<Composition id="Scene-q10-hook" component={LessonScene} durationInFrames={287} fps={30} width={1920} height={1080} defaultProps={{scene:data[65].scenes[0] as CourseScene,meta:data[65] as LessonMeta}}/>
<Composition id="Scene-u8-q10-explain" component={LessonScene} durationInFrames={614} fps={30} width={1920} height={1080} defaultProps={{scene:data[65].scenes[1] as CourseScene,meta:data[65] as LessonMeta}}/>
<Composition id="Scene-u8-q10-worked" component={LessonScene} durationInFrames={842} fps={30} width={1920} height={1080} defaultProps={{scene:data[65].scenes[2] as CourseScene,meta:data[65] as LessonMeta}}/>
<Composition id="Scene-u8-q10-practice" component={LessonScene} durationInFrames={539} fps={30} width={1920} height={1080} defaultProps={{scene:data[65].scenes[3] as CourseScene,meta:data[65] as LessonMeta}}/>
<Composition id="Scene-u8-q10-reveal" component={LessonScene} durationInFrames={635} fps={30} width={1920} height={1080} defaultProps={{scene:data[65].scenes[4] as CourseScene,meta:data[65] as LessonMeta}}/>
<Composition id="Scene-q10-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[65].scenes[5] as CourseScene,meta:data[65] as LessonMeta}}/>
<Composition id="Scene-q11-hook" component={LessonScene} durationInFrames={260} fps={30} width={1920} height={1080} defaultProps={{scene:data[66].scenes[0] as CourseScene,meta:data[66] as LessonMeta}}/>
<Composition id="Scene-u8-q11-explain" component={LessonScene} durationInFrames={524} fps={30} width={1920} height={1080} defaultProps={{scene:data[66].scenes[1] as CourseScene,meta:data[66] as LessonMeta}}/>
<Composition id="Scene-u8-q11-worked" component={LessonScene} durationInFrames={704} fps={30} width={1920} height={1080} defaultProps={{scene:data[66].scenes[2] as CourseScene,meta:data[66] as LessonMeta}}/>
<Composition id="Scene-u8-q11-practice" component={LessonScene} durationInFrames={533} fps={30} width={1920} height={1080} defaultProps={{scene:data[66].scenes[3] as CourseScene,meta:data[66] as LessonMeta}}/>
<Composition id="Scene-u8-q11-reveal" component={LessonScene} durationInFrames={686} fps={30} width={1920} height={1080} defaultProps={{scene:data[66].scenes[4] as CourseScene,meta:data[66] as LessonMeta}}/>
<Composition id="Scene-q11-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[66].scenes[5] as CourseScene,meta:data[66] as LessonMeta}}/>
<Composition id="Scene-x1-hook" component={LessonScene} durationInFrames={281} fps={30} width={1920} height={1080} defaultProps={{scene:data[67].scenes[0] as CourseScene,meta:data[67] as LessonMeta}}/>
<Composition id="Scene-u9-x1-explain" component={LessonScene} durationInFrames={491} fps={30} width={1920} height={1080} defaultProps={{scene:data[67].scenes[1] as CourseScene,meta:data[67] as LessonMeta}}/>
<Composition id="Scene-u9-x1-worked" component={LessonScene} durationInFrames={644} fps={30} width={1920} height={1080} defaultProps={{scene:data[67].scenes[2] as CourseScene,meta:data[67] as LessonMeta}}/>
<Composition id="Scene-u9-x1-practice" component={LessonScene} durationInFrames={536} fps={30} width={1920} height={1080} defaultProps={{scene:data[67].scenes[3] as CourseScene,meta:data[67] as LessonMeta}}/>
<Composition id="Scene-u9-x1-reveal" component={LessonScene} durationInFrames={419} fps={30} width={1920} height={1080} defaultProps={{scene:data[67].scenes[4] as CourseScene,meta:data[67] as LessonMeta}}/>
<Composition id="Scene-x1-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[67].scenes[5] as CourseScene,meta:data[67] as LessonMeta}}/>
<Composition id="Scene-x2-hook" component={LessonScene} durationInFrames={314} fps={30} width={1920} height={1080} defaultProps={{scene:data[68].scenes[0] as CourseScene,meta:data[68] as LessonMeta}}/>
<Composition id="Scene-u9-x2-explain" component={LessonScene} durationInFrames={537} fps={30} width={1920} height={1080} defaultProps={{scene:data[68].scenes[1] as CourseScene,meta:data[68] as LessonMeta}}/>
<Composition id="Scene-u9-x2-worked" component={LessonScene} durationInFrames={551} fps={30} width={1920} height={1080} defaultProps={{scene:data[68].scenes[2] as CourseScene,meta:data[68] as LessonMeta}}/>
<Composition id="Scene-u9-x2-practice" component={LessonScene} durationInFrames={590} fps={30} width={1920} height={1080} defaultProps={{scene:data[68].scenes[3] as CourseScene,meta:data[68] as LessonMeta}}/>
<Composition id="Scene-u9-x2-reveal" component={LessonScene} durationInFrames={410} fps={30} width={1920} height={1080} defaultProps={{scene:data[68].scenes[4] as CourseScene,meta:data[68] as LessonMeta}}/>
<Composition id="Scene-x2-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[68].scenes[5] as CourseScene,meta:data[68] as LessonMeta}}/>
<Composition id="Scene-x3-hook" component={LessonScene} durationInFrames={326} fps={30} width={1920} height={1080} defaultProps={{scene:data[69].scenes[0] as CourseScene,meta:data[69] as LessonMeta}}/>
<Composition id="Scene-u9-x3-explain" component={LessonScene} durationInFrames={581} fps={30} width={1920} height={1080} defaultProps={{scene:data[69].scenes[1] as CourseScene,meta:data[69] as LessonMeta}}/>
<Composition id="Scene-u9-x3-worked" component={LessonScene} durationInFrames={671} fps={30} width={1920} height={1080} defaultProps={{scene:data[69].scenes[2] as CourseScene,meta:data[69] as LessonMeta}}/>
<Composition id="Scene-u9-x3-practice" component={LessonScene} durationInFrames={605} fps={30} width={1920} height={1080} defaultProps={{scene:data[69].scenes[3] as CourseScene,meta:data[69] as LessonMeta}}/>
<Composition id="Scene-u9-x3-reveal" component={LessonScene} durationInFrames={635} fps={30} width={1920} height={1080} defaultProps={{scene:data[69].scenes[4] as CourseScene,meta:data[69] as LessonMeta}}/>
<Composition id="Scene-x3-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[69].scenes[5] as CourseScene,meta:data[69] as LessonMeta}}/>
<Composition id="Scene-x4-hook" component={LessonScene} durationInFrames={260} fps={30} width={1920} height={1080} defaultProps={{scene:data[70].scenes[0] as CourseScene,meta:data[70] as LessonMeta}}/>
<Composition id="Scene-u9-x4-explain" component={LessonScene} durationInFrames={596} fps={30} width={1920} height={1080} defaultProps={{scene:data[70].scenes[1] as CourseScene,meta:data[70] as LessonMeta}}/>
<Composition id="Scene-u9-x4-worked" component={LessonScene} durationInFrames={758} fps={30} width={1920} height={1080} defaultProps={{scene:data[70].scenes[2] as CourseScene,meta:data[70] as LessonMeta}}/>
<Composition id="Scene-u9-x4-practice" component={LessonScene} durationInFrames={752} fps={30} width={1920} height={1080} defaultProps={{scene:data[70].scenes[3] as CourseScene,meta:data[70] as LessonMeta}}/>
<Composition id="Scene-u9-x4-reveal" component={LessonScene} durationInFrames={470} fps={30} width={1920} height={1080} defaultProps={{scene:data[70].scenes[4] as CourseScene,meta:data[70] as LessonMeta}}/>
<Composition id="Scene-x4-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[70].scenes[5] as CourseScene,meta:data[70] as LessonMeta}}/>
<Composition id="Scene-x5-hook" component={LessonScene} durationInFrames={269} fps={30} width={1920} height={1080} defaultProps={{scene:data[71].scenes[0] as CourseScene,meta:data[71] as LessonMeta}}/>
<Composition id="Scene-u9-x5-explain" component={LessonScene} durationInFrames={620} fps={30} width={1920} height={1080} defaultProps={{scene:data[71].scenes[1] as CourseScene,meta:data[71] as LessonMeta}}/>
<Composition id="Scene-u9-x5-worked" component={LessonScene} durationInFrames={653} fps={30} width={1920} height={1080} defaultProps={{scene:data[71].scenes[2] as CourseScene,meta:data[71] as LessonMeta}}/>
<Composition id="Scene-u9-x5-practice" component={LessonScene} durationInFrames={605} fps={30} width={1920} height={1080} defaultProps={{scene:data[71].scenes[3] as CourseScene,meta:data[71] as LessonMeta}}/>
<Composition id="Scene-u9-x5-reveal" component={LessonScene} durationInFrames={599} fps={30} width={1920} height={1080} defaultProps={{scene:data[71].scenes[4] as CourseScene,meta:data[71] as LessonMeta}}/>
<Composition id="Scene-x5-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[71].scenes[5] as CourseScene,meta:data[71] as LessonMeta}}/>
<Composition id="Scene-x6-hook" component={LessonScene} durationInFrames={254} fps={30} width={1920} height={1080} defaultProps={{scene:data[72].scenes[0] as CourseScene,meta:data[72] as LessonMeta}}/>
<Composition id="Scene-u9-x6-explain" component={LessonScene} durationInFrames={569} fps={30} width={1920} height={1080} defaultProps={{scene:data[72].scenes[1] as CourseScene,meta:data[72] as LessonMeta}}/>
<Composition id="Scene-u9-x6-worked" component={LessonScene} durationInFrames={647} fps={30} width={1920} height={1080} defaultProps={{scene:data[72].scenes[2] as CourseScene,meta:data[72] as LessonMeta}}/>
<Composition id="Scene-u9-x6-practice" component={LessonScene} durationInFrames={690} fps={30} width={1920} height={1080} defaultProps={{scene:data[72].scenes[3] as CourseScene,meta:data[72] as LessonMeta}}/>
<Composition id="Scene-u9-x6-reveal" component={LessonScene} durationInFrames={527} fps={30} width={1920} height={1080} defaultProps={{scene:data[72].scenes[4] as CourseScene,meta:data[72] as LessonMeta}}/>
<Composition id="Scene-x6-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[72].scenes[5] as CourseScene,meta:data[72] as LessonMeta}}/>
<Composition id="Scene-x7-hook" component={LessonScene} durationInFrames={299} fps={30} width={1920} height={1080} defaultProps={{scene:data[73].scenes[0] as CourseScene,meta:data[73] as LessonMeta}}/>
<Composition id="Scene-u9-x7-explain" component={LessonScene} durationInFrames={569} fps={30} width={1920} height={1080} defaultProps={{scene:data[73].scenes[1] as CourseScene,meta:data[73] as LessonMeta}}/>
<Composition id="Scene-u9-x7-worked" component={LessonScene} durationInFrames={596} fps={30} width={1920} height={1080} defaultProps={{scene:data[73].scenes[2] as CourseScene,meta:data[73] as LessonMeta}}/>
<Composition id="Scene-u9-x7-practice" component={LessonScene} durationInFrames={809} fps={30} width={1920} height={1080} defaultProps={{scene:data[73].scenes[3] as CourseScene,meta:data[73] as LessonMeta}}/>
<Composition id="Scene-u9-x7-reveal" component={LessonScene} durationInFrames={662} fps={30} width={1920} height={1080} defaultProps={{scene:data[73].scenes[4] as CourseScene,meta:data[73] as LessonMeta}}/>
<Composition id="Scene-x7-habit" component={LessonScene} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{scene:data[73].scenes[5] as CourseScene,meta:data[73] as LessonMeta}}/>
</Folder></>;
