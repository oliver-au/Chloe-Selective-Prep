#!/usr/bin/env node
/** Decode every finished narration; attenuate only AAC clips that hit full scale. */
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const root=path.resolve(import.meta.dirname,'../../..');
const audio=path.resolve(import.meta.dirname,'../public/audio');
const ff=path.join(root,'video/node_modules/@remotion/compositor-darwin-arm64/ffmpeg');
const probe=path.join(root,'video/node_modules/@remotion/compositor-darwin-arm64/ffprobe');
const opts={cwd:path.dirname(ff),env:{...process.env,DYLD_LIBRARY_PATH:path.dirname(ff)},maxBuffer:64*1024*1024,stdio:['ignore','pipe','pipe']};
const db=x=>20*Math.log10(x);
function inspect(file){
  const metadata=JSON.parse(execFileSync(probe,['-v','error','-show_entries','stream=codec_name,codec_type,sample_rate,channels:format=duration','-of','json',file],{...opts,encoding:'utf8'}));
  const stream=metadata.streams.find(s=>s.codec_type==='audio');
  if(stream?.codec_name!=='aac'||stream.channels!==1)throw new Error('Unexpected audio format '+file);
  const b=execFileSync(ff,['-v','error','-i',file,'-f','wav','-acodec','pcm_s24le','-ac','1','pipe:1'],opts);
  let at=12,pcm;
  while(at+8<=b.length){const tag=b.toString('ascii',at,at+4),size=b.readUInt32LE(at+4);if(tag==='data'){pcm=b.subarray(at+8,Math.min(b.length,at+8+size));break;}at+=8+size+(size%2);}
  if(!pcm||pcm.length%3)throw new Error('No valid PCM24 data for '+file);
  let peak=0,squares=0,clipped=0;
  for(let i=0;i<pcm.length;i+=3){const value=pcm.readIntLE(i,3)/8388608;peak=Math.max(peak,Math.abs(value));squares+=value*value;if(Math.abs(value)>=.9999)clipped++;}
  const rms=Math.sqrt(squares/(pcm.length/3));
  if(rms<=.001||peak<=.01)throw new Error('Silent or nearly silent narration '+file);
  return {sampleRate:Number(stream.sample_rate),duration:Number(metadata.format.duration),decodedSeconds:pcm.length/(3*Number(stream.sample_rate)),peakDbfs:db(peak),rmsDbfs:db(rms),clippedSamples:clipped};
}
const entries=[];let repaired=0;
for(const filename of fs.readdirSync(audio).filter(x=>x.endsWith('.m4a')&&!x.includes('.headroom.')).sort()){
  const id=filename.slice(0,-4),file=path.join(audio,filename),metaFile=path.join(audio,id+'.json');
  if(!fs.existsSync(metaFile))throw new Error('Prepared metadata missing for '+id);
  const before=inspect(file);let after=before,gain=0;
  if(before.clippedSamples){
    const temporary=path.join(audio,id+'.headroom.tmp.m4a');
    // Test a new encode before replacing any existing valid narration.
    for(gain=-2;gain>=-8;gain-=2){
      execFileSync(ff,['-y','-hide_banner','-loglevel','error','-i',file,'-af',`volume=${gain}dB`,'-ar','24000','-c:a','aac','-b:a','96k','-f','mp4',temporary],opts);
      after=inspect(temporary);if(!after.clippedSamples)break;
    }
    if(after.clippedSamples){fs.unlinkSync(temporary);throw new Error('Headroom correction failed for '+id);}
    const meta=JSON.parse(fs.readFileSync(metaFile,'utf8'));
    fs.renameSync(temporary,file);
    meta.duration=after.duration;meta.wpm=meta.words/after.duration*60;
    meta.safetyGainDb=(meta.safetyGainDb||0)+gain;
    meta.safetyReason='Decoded AAC hit full scale; attenuated and rechecked without clipping';
    meta.sampleRate=after.sampleRate;
    fs.writeFileSync(metaFile,JSON.stringify(meta));repaired++;
    console.log(JSON.stringify({repaired:id,gainDb:gain,clippedSamplesBefore:before.clippedSamples,peakDbfsAfter:after.peakDbfs}));
  }
  entries.push({id,...after,safetyGainDb:gain});
  if(entries.length%50===0)console.log(JSON.stringify({audited:entries.length,repaired}));
}
fs.mkdirSync(path.join(root,'work'),{recursive:true});
fs.writeFileSync(path.join(root,'research/chloe-mastery/audio-headroom-audit.json'),JSON.stringify({createdAt:new Date().toISOString(),clips:entries.length,repaired,entries},null,2));
console.log(JSON.stringify({clips:entries.length,repaired,remainingClipped:entries.filter(x=>x.clippedSamples).length,peakRangeDbfs:[Math.min(...entries.map(x=>x.peakDbfs)),Math.max(...entries.map(x=>x.peakDbfs))]}));
