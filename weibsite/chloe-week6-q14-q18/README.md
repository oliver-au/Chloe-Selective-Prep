# Chloe Selective · Week 6 Questions 14 & 18

Interactive Remotion video lessons and practice website for Chloe (Year 5 NSW Selective High School Placement Test — Thinking Skills), covering Cortex Academy Week 6 Topic Test **Question 14** (rolling decagonal tube) and **Question 18** (Mr. Boris's shape & shade analogy), plus fresh original transfer practice questions.

## Lessons included

- **Question 14 — Roll the tube, watch the top.** (`#q14`)
  - Exact 10-face net `B G A D E H J C F I`, genuine hinge-by-hinge folding and corner-pivoting rolling physics, *the upside-down trap*, halfway opposite proof (`G ↔ J`), distractor checks, and a fresh regular 8-sided octagonal tube transfer puzzle (`R K W P L H M S`, answer C · 3).
- **Question 18 — Which picture fits?** (`#q18`)
  - Exact Week 6 shape analogy, *the sticky-paint trap*, animated outline-lift & paint-swatch-slide two-track separation (`Shapes: 2-4-1-3`, `Shades: 1-2-3-4`), distractor checks, and a fresh reverse-order analogy transfer puzzle where Layer 3 distinguishes Option B from Option D (answer D).

## Local workflow

```sh
npm install
npm run build:player
npm run serve:player -- --port 3044
```

Open Remotion Studio with `npm run dev`.

## Generating Australian Gemini TTS audio

Set `GEMINI_API_KEY` in `.env` (or your shell environment), then run:

```sh
npm run tts:au
npm run verify:transcripts
npm run build:player
```

This synthesises all 20 narrated clips using `gemini-3.8-flash-tts` with an Australian Sydney tutor voice (`en-AU`), normalises them to `-18 LUFS / -2 dBTP` mono AAC `.m4a`, word-aligns captions via `gemini-3.5-transcribe`, and verifies every clip with `skills/evaluate-chloe-tutorial-video/scripts/check_transcript.py`.
