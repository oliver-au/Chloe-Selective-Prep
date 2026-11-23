import type {Caption} from '@remotion/captions';
export type StyleName = 'paper' | 'lab' | 'detective' | 'classic';
export type Visual = {type:string;[key:string]:any};
export type WordTiming = {word:string;startMs:number;endMs:number};
export type Scene = {id:string;chapter:number;title:string;kind:string;narration:string;display:{lines:string[];visual?:Visual;[key:string]:any};sourceModels:string[];holdSeconds:number;durationInFrames:number;audioFrames:number;audio:string;captions:Caption[];words?:WordTiming[];start:number};
export type Palette = {ink:string;muted:string;accent:string;second:string;panel:string;line:string};
