import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {courseTranscript} from './course-transcript.mjs';
import {includeReviewedFilms} from './include-reviewed-films.mjs';

const project=path.resolve(import.meta.dirname,'..');
const out=path.join(project,'dist');
const stage=fs.mkdtempSync(path.join(project,'.player-build-'));
const course=JSON.parse(fs.readFileSync(path.join(project,'src/course/course.json')));
try{
 await build({entryPoints:[path.join(project,'src/watch.tsx')],bundle:true,minify:true,sourcemap:false,outfile:path.join(stage,'app.js'),jsx:'automatic',target:['safari16','chrome110'],define:{'process.env.NODE_ENV':'"production"'},loader:{'.woff2':'file'},logLevel:'warning'});
 let html=fs.readFileSync(path.join(project,'public/index.html'),'utf8');
 for(const name of ['app.js','app.css']){
  const bytes=fs.readFileSync(path.join(stage,name));
  const version=createHash('sha256').update(bytes).digest('hex').slice(0,12);
  const hashed=name.replace('.',`-${version}.`);
  fs.renameSync(path.join(stage,name),path.join(stage,hashed));html=html.replace('./'+name,'./'+hashed);
 }
 fs.writeFileSync(path.join(stage,'index.html'),html);
 fs.copyFileSync(path.join(project,'public/robots.txt'),path.join(stage,'robots.txt'));
 fs.writeFileSync(path.join(stage,'course-transcripts.txt'),courseTranscript(course));

 includeReviewedFilms(project,stage,course);
 // Retain the previous good build until the complete bundle and all its dependencies exist.
 const previous=out+'.previous';
 if(fs.existsSync(previous))fs.rmSync(previous,{recursive:true});
 if(fs.existsSync(out))fs.renameSync(out,previous);
 try{fs.renameSync(stage,out);}catch(error){if(fs.existsSync(previous))fs.renameSync(previous,out);throw error;}
 if(fs.existsSync(previous))fs.rmSync(previous,{recursive:true});
}finally{if(fs.existsSync(stage))fs.rmSync(stage,{recursive:true});}
console.log('Built',course.length,'playable lessons and guides');
