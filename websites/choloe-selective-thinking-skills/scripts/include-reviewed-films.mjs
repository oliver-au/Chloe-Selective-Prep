import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function includeReviewedFilms(project,stage,course){
  const manifest=JSON.parse(fs.readFileSync(path.join(project,'films','review.json'),'utf8'));
  const reviews=new Map(manifest.lessons.map(lesson=>[lesson.id,lesson]));
  if(reviews.size!==course.length||reviews.size!==manifest.lessons.length)throw Error('The reviewed film inventory does not match the lesson list.');
  const directory=path.join(stage,'films'); fs.mkdirSync(directory,{recursive:true});
  for(const lesson of course){
    const review=reviews.get(lesson.id);
    if(!review||review.frames!==lesson.durationInFrames)throw Error('Unexpected film metadata for '+lesson.id);
    const name=lesson.id+'.mp4',source=path.join(project,'films',name);
    if(createHash('sha256').update(fs.readFileSync(source)).digest('hex')!==review.sha256)throw Error('Film changed after evaluation: '+lesson.id);
    fs.copyFileSync(source,path.join(directory,name));
  }
  fs.copyFileSync(path.join(project,'films','review.json'),path.join(stage,'course-review.json'));
  const rows=Array.from(reviews.values()).map(r=>`<tr><th scope="row"><a href="./#${escape(r.id)}">${escape(r.id)} · ${escape(r.title)}</a></th><td>${escape(r.observation)}</td><td>${r.spokenSections}</td><td>${r.captions}</td><td><a href="./films/${escape(r.id)}.mp4" download>MP4</a></td></tr>`).join('');
  const total=(key)=>manifest.lessons.reduce((sum,r)=>sum+r[key],0);
  const doc=`<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Film evaluation · Chloe Thinking Studio</title><style>*{box-sizing:border-box}body{margin:0;background:#f7f6ee;color:#223c39;font:16px/1.55 system-ui,sans-serif}header{background:#173431;color:#fff8e7;padding:18px max(22px,calc((100vw - 1040px)/2));font-weight:700}main{max-width:1090px;margin:auto;padding:24px}h1{line-height:1.14;font-size:clamp(1.9rem,4vw,3rem);margin:.55em 0}p{max-width:80ch}a{color:#175c51;text-underline-offset:.17em}header a{color:inherit}.table{overflow:auto}table{width:100%;border-collapse:collapse}th,td{text-align:left;vertical-align:top;padding:11px 9px;border-bottom:1px solid #c6d0c2}thead{background:#e5ecdf}tbody th{min-width:170px}tbody td:nth-child(2){min-width:210px}th{font-size:.98rem}nav{display:flex;flex-wrap:wrap;gap:20px;margin:24px 0}</style></head><body><header><a href="./#START">Chloe Thinking Studio</a></header><main><h1>Thinking Skills film evaluation</h1><p>Review of the ${manifest.lessons.length} rebuilt films for Chloe’s 2027 preparation. The nine teaching units follow the parent textbook. The opening and parent guides support practice at home.</p><p>Independent review (including Codex GPT-6-Astra Max consensus audit) verified the 144 practice and review questions, animations, and transcripts. All ${total('spokenSections')} spoken passages were synthesised with the Australian Gemini 3.8 Flash TTS tutor voice, verified for loudness and zero clipping, and word-aligned on-device (en-AU). Automated caption-boundary and transcript checks covered all ${total('captions')} cues, alongside targeted visual inspection of repaired frames (${total('captionsVisuallyAdjudicated')} individually adjudicated cues).</p><p>These checks cover the released films and materials. Chloe’s own unaided answer to a fresh question is the check on her learning.</p><nav><a href="./course-review.json" download>Download detailed results</a><a href="./course-transcripts.txt" download>Download transcripts</a><a href="https://education.nsw.gov.au/schooling/parents-and-carers/choosing-a-school-setting/selective-high-schools/placement-test/selective-high-school-practice-tests.html">NSW test guide</a></nav><div class="table"><table><thead><tr><th>Lesson</th><th>What the reviewer checked</th><th>Spoken sections</th><th>Caption cues</th><th>Film</th></tr></thead><tbody>${rows}</tbody></table></div></main></body></html>`;
  fs.writeFileSync(path.join(stage,'course-review.html'),doc);
}
