import {useCurrentFrame,useVideoConfig} from 'remotion';
import type {Scene} from './types';
import refDurationsData from './ref-durations.json';
import {Background} from './FirstFilmArt';
import type {Shot} from './FirstFilmArt';
import {conditions} from './FirstConditionFilms';
import {possibilities} from './FirstPossibleFilms';
import {argumentsFilms} from './FirstArgumentFilms';

const refDurations: Record<string, number> = refDurationsData;
const shots:Record<string,Shot>={...conditions,...possibilities,...argumentsFilms};
export const firstUnitFilmIds=new Set(Object.keys(shots).map(key=>{
 const unit=key.startsWith('C')?'01':key.startsWith('M')?'02':'03';
 return unit+'-'+key.toLowerCase()+'-worked';
}));
export function FirstUnitFilm({scene}:{scene:Scene}){
 const frame=useCurrentFrame(),{fps}=useVideoConfig();
 const Film=shots[scene.sourceModels[0]];
 if(!Film)return null;
 const elapsed=Math.max(0,frame/fps-.25);
 const actualSec=Math.max(1,(scene.audioFrames||1)/fps);
 const refSec=refDurations[scene.id]??actualSec;
 const scale=Math.max(0.65,Math.min(1.55,refSec/actualSec));
 const t=Math.min(refSec,elapsed*scale);
 return <svg viewBox="0 0 1440 340" width="100%" height="100%" role="img" aria-label={scene.title+' · animated worked example'}><Background/><Film t={t}/></svg>;
}
