import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const project = path.resolve(import.meta.dirname, '..');
const root = path.resolve(project, '../..');
const source = JSON.parse(fs.readFileSync(path.join(root, 'research/chloe-mastery/scenes.json'), 'utf8'));
const metadata = ['01-03', '04-06', '07-09'].flatMap((n) => {
  const p = path.join(root, 'research/chloe-mastery/units-' + n + '.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : [];
});

// Identify custom animated boards vs generic Diagram.tsx answer scenes (for F02 readable holds)
const customIds = new Set();
for (const [u, cs] of [
  ['01', ['c1', 'c2', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10']],
  ['02', ['m1', 'm2', 'm3', 'm4', 'm5']],
  ['03', ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']],
]) {
  for (const c of cs) customIds.add(`${u}-${c}-worked`);
}
customIds.add('02-m1-answer');
for (const [u, l, cnt] of [[4, 'o', 7], [5, 'd', 8], [6, 's', 9]]) {
  for (let i = 1; i <= cnt; i++) {
    customIds.add(`u${u}-${l}${i}-worked`);
    customIds.add(`u${u}-${l}${i}-answer`);
  }
}
const u789Text = fs.readFileSync(path.join(project, 'src/course/U789Mechanisms.tsx'), 'utf8');
for (const m of u789Text.matchAll(/u[789]-[pqx]\d+-(?:worked|reveal|answer|practice|explain)/g)) {
  customIds.add(m[0]);
}

function fallbackCaptions(text, ms) {
  const out = [];
  let chunk = '';
  for (const w of text.split(/\s+/)) {
    if ((chunk + ' ' + w).length > 68 && chunk) {
      out.push(chunk);
      chunk = '';
    }
    chunk += (chunk ? ' ' : '') + w;
  }
  if (chunk) out.push(chunk);
  const total = out.reduce((n, x) => n + x.length, 0);
  let start = 0;
  return out.map((t) => {
    const end = start + (t.length / total) * ms;
    const c = {text: t, startMs: Math.round(start), endMs: Math.round(end), timestampMs: null, confidence: null};
    start = end;
    return c;
  });
}

const alignedFile = path.join(project, 'src/course/aligned-captions.json');
const alignedCaptions = fs.existsSync(alignedFile) ? JSON.parse(fs.readFileSync(alignedFile, 'utf8')) : {};

function timing(s) {
  const mp = path.join(project, 'public/audio', s.id + '.json');
  const m = fs.existsSync(mp) ? JSON.parse(fs.readFileSync(mp, 'utf8')) : null;
  if (!m && !process.argv.includes('--draft')) throw Error('Missing narration ' + s.id);
  if (m && m.text !== s.narration) throw Error('Stale audio ' + s.id);
  const duration = m?.duration ?? s.narration.split(/\s+/).length / 2.58;
  const audioFrames = Math.ceil(duration * 30);

  // F02: Generic Diagram.tsx answer scenes keep readable proof lines on screen for >= 2.2s after audio ends;
  // custom animated boards get a calm 1.0s settled hold with zero flashing bullets; quiz scenes keep 6.0s thinking pause.
  const isDiagramAnswer = s.kind === 'answer' && !!s.display?.visual && !customIds.has(s.id);
  const baseHold = s.kind === 'quiz' ? 6 : isDiagramAnswer ? Math.max(2.2, s.holdSeconds ?? 0.9) : Math.max(0.9, s.holdSeconds ?? 0.9);
  const durationInFrames = audioFrames + Math.ceil((baseHold + 0.35) * 30);

  const aligned = alignedCaptions[s.id]?.sourceHash === m?.sourceHash && m ? alignedCaptions[s.id] : null;
  return {
    ...s,
    audioRevision: m?.sourceHash?.slice(0, 12),
    audioFrames,
    durationInFrames,
    captions: aligned ? aligned.captions : fallbackCaptions(s.narration, duration * 1000),
    words: aligned?.words ?? undefined,
    ready: !!m,
  };
}

const scenes = source.filter((s) => !s.sourceModels.includes('C3')).map(timing);
const hookRequests = [];

// Recompute C3 timeline dynamically from actual c3-audio.json clip durations
const c3Tracks = JSON.parse(fs.readFileSync(path.join(project, 'src/course/c3/c3-audio.json'), 'utf8'));
const c3BeatMeta = [
  {id: 'c3-hook', title: 'The pool gate', kind: 'hook', pause: 0.58},
  {id: 'c3-predict', title: 'Make a prediction', kind: 'quiz', pause: 4.5},
  {id: 'c3-cross', title: 'Follow Nina', kind: 'worked', pause: 0.58},
  {id: 'c3-stay', title: 'Test a second story', kind: 'worked', pause: 0.58},
  {id: 'c3-forward', title: 'Find the requirement', kind: 'worked', pause: 0.58},
  {id: 'c3-language', title: 'Three ways to say it', kind: 'logic', pause: 0.58},
  {id: 'c3-room', title: 'Room B', kind: 'worked', pause: 0.58},
  {id: 'c3-exam', title: 'Exhibition question', kind: 'quiz', pause: 8},
  {id: 'c3-exam-proof', title: 'Exhibition answer', kind: 'answer', pause: 0.58},
  {id: 'c3-transfer', title: 'Rover question', kind: 'quiz', pause: 7},
  {id: 'c3-transfer-proof', title: 'Rover answer', kind: 'answer', pause: 0.58},
  {id: 'c3-recap', title: 'Take it with you', kind: 'recap', pause: 0.58},
];
let c3Start = 0;
const c3TimelineScenes = c3BeatMeta.map((b) => {
  const tr = c3Tracks[b.id];
  const dur = 9 + Math.ceil(tr.duration * 30) + Math.ceil(b.pause * 30);
  const entry = {id: b.id, start: c3Start, duration: dur};
  c3Start += dur;
  return entry;
});
const c3Timeline = {fps: 30, frames: c3Start, scenes: c3TimelineScenes};
fs.writeFileSync(path.join(project, 'src/course/c3/timeline.json'), JSON.stringify(c3Timeline, null, 2) + '\n');

const models = metadata.map((m) => {
  if (m.id === 'C3') {
    const c3Scenes = c3BeatMeta.map((b, i) => {
      const t = c3Tracks[b.id];
      const tl = c3Timeline.scenes[i];
      return {
        id: b.id,
        chapter: 1,
        title: b.title,
        phase: b.title,
        kind: b.kind,
        display: {lines: []},
        narration: t.text,
        holdSeconds: b.pause,
        audio: t.src,
        audioRevision: t.sourceHash?.slice(0, 12),
        audioFrames: Math.ceil(t.duration * 30),
        captions: t.captions,
        words: t.words,
        ready: t.ready === true,
        sourceModels: ['C3'],
        start: tl.start,
        durationInFrames: tl.duration,
      };
    });
    return {
      ...m,
      title: 'Decode “only if”',
      hook: 'Nina wears a pool wristband. Does that prove she went through the gate?',
      takeaway: 'When a result needs something, that thing must be there whenever the result happens.',
      steps: ['Find the result.', 'Ask what the result needs.', 'Test whether the requirement could be there on its own.'],
      pitfall: 'A wristband alone cannot tell you who went through the gate.',
      scenes: c3Scenes,
      durationInFrames: c3Timeline.frames,
    };
  }
  const core = scenes.filter((s) => s.sourceModels.includes(m.id));
  const hook = {
    id: m.id.toLowerCase() + '-hook',
    chapter: m.unit,
    title: m.title,
    kind: 'hook',
    phase: '01 / THE QUESTION',
    display: {lines: [m.hook]},
    narration: m.spokenHook ?? m.hook,
    holdSeconds: 2.5,
    audio: 'audio/' + m.id.toLowerCase() + '-hook.m4a',
    sourceModels: [m.id],
    start: 0,
  };
  hookRequests.push({id: hook.id, text: hook.narration});
  // F17: Explicit Habit title instead of inheriting "Answer · ..." from core.at(-1)
  const habit = {
    ...core.at(-1),
    id: m.id.toLowerCase() + '-habit',
    title: 'Habit · ' + m.title,
    kind: 'habit',
    phase: '06 / USE IT AGAIN',
    display: {lines: [m.takeaway, ...m.steps]},
    narration: '',
    audio: '',
    audioFrames: 0,
    durationInFrames: 330,
    captions: [],
    words: undefined,
    silent: true,
    ready: true,
  };
  let start = 0;
  const all = [timing(hook), ...core, habit].map((s) => {
    const v = {...s, start};
    start += s.durationInFrames;
    return v;
  });
  return {...m, scenes: all, durationInFrames: start};
});

const guides = [
  {
    id: 'START',
    unit: 0,
    title: 'How to use Thinking Studio',
    hook: 'What counts as understanding?',
    takeaway: 'Model → Structure → Decide → Prove',
    steps: ['Name the model.', 'Make its structure visible.', 'Prove your choice.'],
    pitfall: 'Watching is only the beginning.',
  },
  {
    id: 'GUIDE',
    unit: 10,
    title: 'A parent’s guide to lasting learning',
    hook: 'Can she explain it tomorrow?',
    takeaway: 'Return, vary the question, and ask for a proof.',
    steps: ['Practise a model.', 'Mix it with others.', 'Return after a delay.'],
    pitfall: 'A memorised answer is not transfer.',
  },
].map((m) => {
  let start = 0;
  const all = scenes
    .filter((s) => s.chapter === m.unit)
    .map((s) => {
      const v = {...s, start};
      start += s.durationInFrames;
      return v;
    });
  return {...m, scenes: all, durationInFrames: start};
});

fs.writeFileSync(path.join(root, 'research/chloe-mastery/hook-audio.json'), JSON.stringify(hookRequests, null, 2) + '\n');
fs.writeFileSync(path.join(project, 'src/course/course.json'), JSON.stringify([...guides, ...models], null, 2) + '\n');

const lessons = [...guides, ...models];
let imports =
  "import {Sequence,useVideoConfig} from 'remotion';\nimport {LessonScene} from './LessonScene';\nimport data from './course.json';\nimport type {CourseScene,LessonMeta} from './LessonScene';\n";
const exportsList = [];
for (let k = 0; k < lessons.length; k++) {
  const m = lessons[k];
  const name = 'Lesson' + m.id;
  exportsList.push(`${JSON.stringify(m.id)}:${name}`);
  imports +=
    `export const ${name}=()=>{const {fps}=useVideoConfig();const m=data[${k}];return <>\n` +
    m.scenes
      .map(
        (s, i) =>
          `<Sequence name=${JSON.stringify(s.phase || s.title)} from={${s.start}} durationInFrames={${s.durationInFrames}} premountFor={fps}><LessonScene scene={m.scenes[${i}] as CourseScene} meta={m as LessonMeta}/></Sequence>`
      )
      .join('\n') +
    '\n</>};\n';
}
imports += `export const lessonComponents={${exportsList.join(',')}};\n`;
fs.writeFileSync(path.join(project, 'src/course/Lessons.tsx'), imports);

let comps =
  "import {Composition,Folder} from 'remotion';\nimport {lessonComponents} from './Lessons';\nimport {LessonScene} from './LessonScene';\nimport data from './course.json';\nimport type {CourseScene,LessonMeta} from './LessonScene';\nexport const CourseCompositions=()=> <>\n";
for (const unit of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
  comps += `<Folder name="Unit-${unit}">\n`;
  for (const m of lessons.filter((x) => x.unit === unit)) {
    comps += `<Composition id="Chloe-${m.id}" component={lessonComponents.${m.id}} durationInFrames={${m.durationInFrames}} fps={30} width={1920} height={1080}/>\n`;
  }
  comps += '</Folder>\n';
}
comps += '<Folder name="Scene-review">\n';
let n = 0;
for (const m of lessons) {
  for (let i = 0; i < m.scenes.length; i++) {
    comps += `<Composition id="Scene-${m.scenes[i].id}" component={LessonScene} durationInFrames={${m.scenes[i].durationInFrames}} fps={30} width={1920} height={1080} defaultProps={{scene:data[${n}].scenes[${i}] as CourseScene,meta:data[${n}] as LessonMeta}}/>\n`;
  }
  n++;
}
comps += '</Folder></>;\n';
fs.writeFileSync(path.join(project, 'src/course/Compositions.tsx'), comps);

console.log({
  models: models.length,
  scenes: lessons.flatMap((m) => m.scenes).length,
  pending: lessons.flatMap((m) => m.scenes).filter((s) => !s.ready && !s.silent).length,
  totalMinutes: Number(lessons.reduce((sum, m) => sum + m.durationInFrames / 1800, 0).toFixed(2)),
});
