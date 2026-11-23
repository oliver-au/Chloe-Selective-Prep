# Chloe Thinking Studio

A public learning course with 72 model lessons in nine units, two orientation/coaching videos, 144 original practice and review questions, Australian Gemini 3.8 Flash TTS narration, and browser-local progress.

The final site builds from the checked-in source and media:

```sh
npm install
npm run build:player
npm run serve:player -- --port 3043
```

Open Remotion Studio with `npm run dev`. Individual lessons and scenes are registered in `src/course/Compositions.tsx`; authored timelines are in `Lessons.tsx`. Lesson content and questions are in `src/course/course.json`. `Diagram.tsx` and `EvidenceMechanisms.tsx` provide the animated reasoning, and `QuestionFigure.tsx` draws only the given information in practice questions.

The local editorial preparation, synthesis and review scripts also use the parent Chloe project’s source and research folders. The standalone website build does not require those folders.

All narration files were decoded and checked against script/voice hashes, measured durations and clipping. Every model received content and rendered-frame review; all practice questions received a separate solution pass. All 380 narrated clips received on-device speech recognition, with targeted second-pass dictation for ambiguous speech. Standard lesson phrase captions follow measured speech. The course includes the illustrated C3 production. The public player and downloadable course transcript share the spoken script. Review covered rendered scenes and sampled motion.

Progress is stored only in the visitor’s browser, with export/import for moving it between computers. A watched video or an explain-back checkbox is not an assessment of mastery. The parent guide links current official NSW practice resources for further mixed and timed work.
