# Chloe Selective · Lesson page template

A starting point for each new selective prep website. One site covers one source (for example a weekly topic test). Each question or topic from the source becomes a **section**, and every section has the same three parts:

1. **Watch & think:** the lesson video with chapter buttons. It can pause at a chapter so Chloe makes her guess before the answer.
2. **Follow up:** the habit to keep from the video: one rule, a few steps, and the trap to watch for.
3. **Practice:** questions shown **three at a time**. Nothing is marked right or wrong until all three are answered. Then "Check my answers with Tutor" locks them in and shows the **AI tutor** explanation under every question. If her answer was wrong, it also says why that choice looked right. A **Next 3 questions** button appears only when the section has more questions. The last set leads on to the next section.

A menu on the left lists the sections with how many questions have been answered. Progress is saved in the browser on that device, and the footer has a button to reset it.

The demo content is Week 6 Q14 and Q18 with nine original practice questions. The videos are stand-in demo clips.

## Run it

```sh
npm install
npm run build
npm run serve -- --port 3050
```

Then open http://localhost:3050. `npm run typecheck` checks the TypeScript.

## Make a new site from it

1. Copy this folder to `websites/<new-site-name>` (leave out `node_modules` and `dist`).
2. Edit **`src/content/site.ts`**. This is the only file you need to change for content:
   - `id`: change it for every site, so saved progress doesn't mix between sites.
   - `title`, `source`, `intro`, `brandLine`, `footer`.
   - `questionsPerSet`: 3 by default.
   - `sections`: one entry per question or topic. See `src/content/types.ts` for every field.
3. Set each section's `video`:
   - A Remotion composition from the video skill, played in the browser:
     ```ts
     video: {kind: 'remotion', component: Q14Video, durationInFrames: q14DurationFrames(30), fps: 30, width: 1920, height: 1080},
     ```
     Copy the composition's source into `src/` and add any packages it needs (for example `@remotion/media`).
   - Or a rendered file in `public/videos/`:
     ```ts
     video: {kind: 'file', src: 'videos/q14.mp4', captions: 'videos/q14.vtt'},
     ```
   - Or `{kind: 'none'}` to show a "Video coming soon" card.
4. Set each section's `chapters`: `start` in seconds, plus `pauseForGuessAt` on the chapter where the video should stop for her guess.
5. Change `site` in `firebase.json` to the new Firebase Hosting site name.

## Writing questions and tutor notes

Each question needs:

- `id`: unique across the whole site.
- `stem`, `options` (A–D), `answer`.
- Optional `image` (a file in `public/`) or `Figure` (an SVG React component) for diagrams.
- `tutor.explain`: the AI tutor's explanation, written to Chloe in plain words.
- `tutor.traps`: for each wrong option, one sentence on why it looked right.
- Optional `tutor.audio`: a narrated file in `public/` for the Listen button. Without one, Listen reads the note aloud with the browser's Australian voice.

When an AI agent writes the questions, ask it to work each answer out step by step and check that only one option is right. Then read every question yourself before Chloe uses it.

## Deploy

The site uses the same Firebase project as the other sites (`chloe-selective-prep`). Create the hosting site once, then build and deploy:

```sh
firebase hosting:sites:create <site-name>
npm run build
firebase deploy --only hosting
```

## Files

| Path | What it is |
| --- | --- |
| `src/content/site.ts` | All the content: sections, videos, chapters, follow-ups, questions, tutor notes |
| `src/content/types.ts` | The shape of that content, with notes on each field |
| `src/content/DemoVideo.tsx` | The stand-in demo video. Delete it once real videos are in |
| `src/App.tsx` | Page layout: header, section menu, the three stages |
| `src/components/VideoStage.tsx` | Video player, chapters and pause-for-a-guess |
| `src/components/FollowUpCard.tsx` | The habit-to-keep card |
| `src/components/PracticeSet.tsx` | Questions in sets, the tutor lock, tutor notes, next set |
| `src/styles.css` | Colours and layout, matching the Week 6 site |
