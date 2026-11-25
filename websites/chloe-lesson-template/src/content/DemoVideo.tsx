import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Chapter, VideoSource} from './types';

export type DemoVideoProps = {learner: string; subject: string; title: string; chapters: Chapter[]};

/**
 * A stand-in lesson video so the template works out of the box.
 * Replace it with the real lesson composition (or an MP4) in src/content/site.ts.
 */
export const DemoVideo: React.FC<DemoVideoProps> = ({learner, subject, title, chapters}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const t = frame / fps;
	const index = chapters.reduce((found, c, i) => (t >= c.start ? i : found), 0);
	const chapter = chapters[index];
	const enter = interpolate(t - (chapter?.start ?? 0), [0, 0.5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const label = `${String(index + 1).padStart(2, '0')} · ${(chapter?.title ?? '').toUpperCase()}`;

	return (
		<AbsoluteFill style={{backgroundColor: '#0c1115', color: '#f3f0e7', fontFamily: "'Manrope Variable', Arial, sans-serif"}}>
			<div style={{position: 'absolute', left: 110, top: 56, display: 'flex', alignItems: 'center', gap: 18}}>
				<div style={{width: 14, height: 14, background: '#ff6756'}} />
				<span style={{fontSize: 27, fontWeight: 800, letterSpacing: 5}}>{learner.toUpperCase()}</span>
				<span style={{fontSize: 23, letterSpacing: 3, color: '#9ba9ad', marginLeft: 12}}>SELECTIVE / {subject.toUpperCase()}</span>
			</div>
			<div style={{position: 'absolute', right: 110, top: 60, fontSize: 25, letterSpacing: 3, color: '#9ba9ad'}}>{label}</div>
			<div style={{position: 'absolute', left: 110, top: 210, width: 1400, fontSize: 96, fontWeight: 750, letterSpacing: -3, lineHeight: 1.05}}>{title}</div>
			<div style={{position: 'absolute', left: 110, top: 560, opacity: enter, translate: `0 ${(1 - enter) * 24}px`}}>
				<div style={{fontSize: 28, fontWeight: 800, letterSpacing: 4, color: '#7bcce0'}}>CHAPTER {index + 1}</div>
				<div style={{fontSize: 64, fontWeight: 700, marginTop: 16}}>{chapter?.title}</div>
			</div>
			<div style={{position: 'absolute', left: 110, top: 400, fontSize: 24, letterSpacing: 3, color: '#9ba9ad'}}>
				DEMO VIDEO · REPLACE WITH THE LESSON COMPOSITION
			</div>
			<div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: '#1d292f'}}>
				<div style={{width: `${(frame / Math.max(1, durationInFrames - 1)) * 100}%`, height: '100%', background: '#7bcce0'}} />
			</div>
		</AbsoluteFill>
	);
};

export function demoVideo(props: DemoVideoProps, secondsAfterLastChapter = 4, fps = 30): VideoSource {
	const last = props.chapters[props.chapters.length - 1];
	return {
		kind: 'remotion',
		component: DemoVideo,
		inputProps: props,
		durationInFrames: Math.ceil(((last?.start ?? 0) + secondsAfterLastChapter) * fps),
		fps,
		width: 1920,
		height: 1080,
	};
}
