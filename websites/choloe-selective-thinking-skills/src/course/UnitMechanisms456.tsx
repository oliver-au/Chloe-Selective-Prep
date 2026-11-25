import {useCurrentFrame,useVideoConfig} from 'remotion';
import {OrderStudy} from './Unit456Order';
import {DeductionStudy} from './Unit456Deduction';
import {SpatialStudy} from './Unit456Spatial';
import refDurationsData from './ref-durations.json';
import type {Palette,Scene} from './types';

const refDurations: Record<string, number> = refDurationsData;
export const mechanismIds456=new Set<string>();
for(const [unit,letter,count] of [[4,'o',7],[5,'d',8],[6,'s',9]] as const){
  for(let i=1;i<=count;i++)for(const phase of ['worked','answer']){
    mechanismIds456.add(`u${unit}-${letter}${i}-${phase}`);
  }
}
export function UnitMechanism456({id,audioFrames,scene}:{id:string;audioFrames?:number;scene?:Scene;palette?:Palette}){
  const {fps}=useVideoConfig(),frame=useCurrentFrame();
  const [unit,code,phase]=id.split('-');
  const finalFrame=scene?.audioFrames??audioFrames??Infinity;
  const elapsed=Math.max(0,Math.min(frame-Math.round(fps*.25),finalFrame))/fps;
  const actualSec=Number.isFinite(finalFrame)?Math.max(1,finalFrame/fps):elapsed||1;
  const refSec=refDurations[id]??actualSec;
  const scale=Number.isFinite(finalFrame)?Math.max(0.65,Math.min(1.55,refSec/actualSec)):1;
  const t=Math.min(refSec,elapsed*scale);
  const props={code:code.toUpperCase(),answer:phase==='answer',t};
  switch(unit){case 'u4':return <OrderStudy {...props}/>;case 'u5':return <DeductionStudy {...props}/>;case 'u6':return <SpatialStudy {...props}/>;default:return null;}
}
