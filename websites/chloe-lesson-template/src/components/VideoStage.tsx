import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Player, type PlayerRef} from '@remotion/player';
import type {Section} from '../content/types';

type Props = {
	section: Section;
	learner: string;
	note?: string;
	autoPause: boolean;
	onAutoPauseChange: (value: boolean) => void;
};

const GUESS_NOTICE = 'Your turn! Make your guess and say why, then press play to see the answer.';

export const VideoStage: React.FC<Props> = ({section, learner, note, autoPause, onAutoPauseChange}) => {
	const video = section.video;
	const chapters = section.chapters;
	const [time, setTime] = useState(0);
	const [notice, setNotice] = useState('');
	const playerRef = useRef<PlayerRef>(null);
	const fileRef = useRef<HTMLVideoElement>(null);
	const pausedFor = useRef(new Set<number>());
	const autoPauseRef = useRef(autoPause);

	useEffect(() => {
		autoPauseRef.current = autoPause;
	}, [autoPause]);

	const handleTime = useCallback(
		(t: number, pause: () => void) => {
			setTime(t);
			if (!autoPauseRef.current) return;
			chapters.forEach((c, i) => {
				if (c.pauseForGuessAt === undefined || pausedFor.current.has(i)) return;
				if (t >= c.pauseForGuessAt && t < c.pauseForGuessAt + 0.6) {
					pausedFor.current.add(i);
					pause();
					setNotice(GUESS_NOTICE);
				}
			});
		},
		[chapters],
	);

	useEffect(() => {
		if (video.kind !== 'remotion') return;
		const player = playerRef.current;
		if (!player) return;
		const onFrame = ({detail}: {detail: {frame: number}}) => handleTime(detail.frame / video.fps, () => player.pause());
		const onPlay = () => setNotice('');
		player.addEventListener('frameupdate', onFrame);
		player.addEventListener('play', onPlay);
		return () => {
			player.removeEventListener('frameupdate', onFrame);
			player.removeEventListener('play', onPlay);
		};
	}, [video, handleTime]);

	const seek = (index: number) => {
		const start = chapters[index].start;
		chapters.forEach((c, i) => {
			if ((c.pauseForGuessAt ?? -1) >= start) pausedFor.current.delete(i);
		});
		setNotice('');
		if (video.kind === 'remotion') playerRef.current?.seekTo(Math.round(start * video.fps));
		if (video.kind === 'file' && fileRef.current) fileRef.current.currentTime = start;
		setTime(start);
	};

	const activeChapter = chapters.reduce((found, c, i) => (time + 0.01 >= c.start ? i : found), 0);
	const aspect = video.kind === 'remotion' ? `${video.width} / ${video.height}` : '16 / 9';

	return (
		<>
			<div className="video-frame" style={{aspectRatio: aspect}}>
				{video.kind === 'remotion' && (
					<Player
						ref={playerRef}
						component={video.component}
						inputProps={video.inputProps ?? {}}
						durationInFrames={video.durationInFrames}
						fps={video.fps}
						compositionWidth={video.width}
						compositionHeight={video.height}
						style={{width: '100%', height: '100%'}}
						controls
						clickToPlay
						doubleClickToFullscreen
						showVolumeControls
						moveToBeginningWhenEnded={false}
						acknowledgeRemotionLicense
					/>
				)}
				{video.kind === 'file' && (
					<video
						ref={fileRef}
						src={video.src}
						poster={video.poster}
						controls
						playsInline
						preload="metadata"
						onTimeUpdate={(e) => {
							const el = e.currentTarget;
							handleTime(el.currentTime, () => el.pause());
						}}
						onPlay={() => setNotice('')}
					>
						{video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" default />}
					</video>
				)}
				{video.kind === 'none' && (
					<div className="video-placeholder">
						<div className="video-brand">
							<span className="brand-mark" />
							<strong>{learner.toUpperCase()}</strong>
							<span>SELECTIVE / {section.subject.split('·')[0].trim().toUpperCase()}</span>
						</div>
						<p className="video-title">{section.title}</p>
						<p className="video-soon">Video coming soon</p>
					</div>
				)}
			</div>

			{notice && (
				<div className="notice" role="status">
					{notice}
				</div>
			)}

			{video.kind !== 'none' && (
				<div className="video-tools">
					<label className="check">
						<input type="checkbox" checked={autoPause} onChange={(e) => onAutoPauseChange(e.target.checked)} />
						Pause so I can make my guess
					</label>
					{note && <span>{note}</span>}
				</div>
			)}

			{chapters.length > 0 && (
				<div className="chapters" aria-label="Video chapters">
					{chapters.map((c, i) => (
						<button
							key={c.title + i}
							type="button"
							className="chap"
							aria-current={i === activeChapter ? 'true' : undefined}
							disabled={video.kind === 'none'}
							onClick={() => seek(i)}
						>
							<small>{String(i + 1).padStart(2, '0')}</small>
							<span>{c.title}</span>
						</button>
					))}
				</div>
			)}
		</>
	);
};
