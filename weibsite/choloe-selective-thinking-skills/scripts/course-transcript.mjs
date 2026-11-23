import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const project=path.resolve(import.meta.dirname,'..');

export function courseTranscript(course){
  const notes=JSON.parse(fs.readFileSync(path.join(project,'src/course/visual-notes.json')));
  const time=frames=>{
    const seconds=Math.floor(frames/30);
    return Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
  };
  const lessons=[...course].sort((first,second)=>first.unit-second.unit).map(lesson=>{
    const scenes=lesson.scenes.filter(s=>s.narration||notes[s.id]).map(scene=>{
      const lines=[time(scene.start)+'  '+scene.title,scene.narration];
      if(notes[scene.id]) lines.push('On screen · '+notes[scene.id]);
      return lines.filter(Boolean).join('\n');
    });
    return [lesson.id+' · '+lesson.title,...scenes].join('\n\n');
  });
  return 'Chloe Thinking Studio · NSW 2027 preparation\nSpoken transcripts with a labelled visual description for the silent glass demonstration. Times are relative to the start of each video.\n\n'+lessons.join('\n\n────────────────────\n\n')+'\n';
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const data=JSON.parse(fs.readFileSync(path.join(project,'src/course/course.json')));
  process.stdout.write(courseTranscript(data));
}
