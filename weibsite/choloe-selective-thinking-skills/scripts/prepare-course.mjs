#!/usr/bin/env node
/**
 * Retired legacy Easton migration helper.
 *
 * Chloe Thinking Studio now uses the Australian Gemini 3.8 Flash TTS pipeline
 * (`scripts/generate-au-tts-batch.mjs` + `scripts/encode-and-align-local.mjs` +
 * `scripts/compile-course.mjs`). Running the old Easton importer would overwrite
 * repaired scripts in `research/chloe-mastery/scenes.json` and Australian audio clips.
 */
console.error(
  'scripts/prepare-course.mjs is retired (legacy American Easton importer).\n' +
    'Use scripts/generate-au-tts-batch.mjs, scripts/encode-and-align-local.mjs, and scripts/compile-course.mjs instead.'
);
process.exit(1);
