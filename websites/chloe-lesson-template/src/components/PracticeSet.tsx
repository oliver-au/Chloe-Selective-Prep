import React, {useEffect, useRef, useState} from 'react';
import type {Question, Section} from '../content/types';
import {setKey, type Progress} from '../lib/progress';
import {speak, stopSpeaking} from '../lib/speak';
import {ArrowRightIcon, ChatIcon, CrossIcon, LockIcon, SpeakerIcon, StopIcon, TickIcon} from './Icons';

type Props = {
	section: Section;
	learner: string;
	perSet: number;
	progress: Progress;
	update: (change: (p: Progress) => Progress) => void;
	nextSection?: Section;
	onOpenSection: (id: string) => void;
};

export const PracticeSet: React.FC<Props> = ({section, learner, perSet, progress, update, nextSection, onOpenSection}) => {
	const [speakingId, setSpeakingId] = useState<string | null>(null);
	const topRef = useRef<HTMLDivElement>(null);

	useEffect(() => () => stopSpeaking(), []);

	if (section.questions.length === 0) {
		return <div className="card empty-note">Practice questions for this section are coming soon.</div>;
	}

	const setCount = Math.ceil(section.questions.length / perSet);
	const setIndex = Math.min(progress.setBySection[section.id] ?? 0, setCount - 1);
	const key = setKey(section.id, setIndex);
	const checked = !!progress.checked[key];
	const questions = section.questions.slice(setIndex * perSet, setIndex * perSet + perSet);
	const answeredCount = questions.filter((q) => progress.answers[q.id]).length;
	const allAnswered = answeredCount === questions.length;
	const score = questions.filter((q) => progress.answers[q.id] === q.answer).length;
	const left = questions.length - answeredCount;
	const hasNextSet = checked && setIndex < setCount - 1;
	const nextSetSize = hasNextSet ? Math.min(perSet, section.questions.length - (setIndex + 1) * perSet) : 0;
	const sectionDone = checked && setIndex === setCount - 1;

	const scrollToTop = () => requestAnimationFrame(() => topRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}));

	const quiet = () => {
		stopSpeaking();
		setSpeakingId(null);
	};

	const pick = (q: Question, option: string) => {
		if (checked) return;
		update((p) => ({...p, answers: {...p.answers, [q.id]: option}}));
	};

	const check = () => {
		if (!allAnswered) return;
		update((p) => ({...p, checked: {...p.checked, [key]: true}}));
		scrollToTop();
	};

	const goToSet = (index: number) => {
		quiet();
		update((p) => ({...p, setBySection: {...p.setBySection, [section.id]: index}}));
		scrollToTop();
	};

	const listen = (q: Question) => {
		if (speakingId === q.id) {
			quiet();
			return;
		}
		const mine = progress.answers[q.id];
		const trap = mine && mine !== q.answer ? q.tutor.traps?.[mine] : undefined;
		const text = trap ? `${q.tutor.explain} Why ${mine} looked right: ${trap}` : q.tutor.explain;
		setSpeakingId(q.id);
		speak(text, q.tutor.audio, () => setSpeakingId((current) => (current === q.id ? null : current)));
	};

	return (
		<div ref={topRef} className="practice">
			<div className="set-head">
				<div>
					<h4>
						Set {setIndex + 1} of {setCount}
					</h4>
					<p>Answer all {questions.length} on your own. Then your tutor explains each one.</p>
				</div>
				<div className="set-tools">
					{setCount > 1 && (
						<div className="pills" role="group" aria-label="Question sets">
							{Array.from({length: setCount}, (_, i) => {
								const done = !!progress.checked[setKey(section.id, i)];
								const reachable = i === 0 || !!progress.checked[setKey(section.id, i - 1)];
								return (
									<button
										key={i}
										type="button"
										className={`pill${done ? ' done' : ''}`}
										aria-current={i === setIndex ? 'true' : undefined}
										disabled={!reachable}
										onClick={() => goToSet(i)}
									>
										Set {i + 1}
										{done ? ' ✓' : ''}
									</button>
								);
							})}
						</div>
					)}
					<div className="pips">
						<span aria-hidden="true">
							{questions.map((q) => (
								<i key={q.id} className={progress.answers[q.id] ? 'on' : ''} />
							))}
						</span>
						{answeredCount} of {questions.length} answered
					</div>
				</div>
			</div>

			<div className="questions">
				{questions.map((q, i) => {
					const mine = progress.answers[q.id];
					const right = mine === q.answer;
					const trap = checked && mine && !right ? q.tutor.traps?.[mine] : undefined;
					const Figure = q.Figure;
					return (
						<article key={q.id} className="card qcard" aria-labelledby={`${q.id}-stem`}>
							<div className="qtop">
								<span className="qnum">
									<b>Q{setIndex * perSet + i + 1}</b>
									{q.tag && <span>{q.tag}</span>}
								</span>
								{checked && <span className={`verdict ${right ? 'right' : 'wrong'}`}>{right ? 'Correct' : `Not quite · answer ${q.answer}`}</span>}
							</div>
							<p className="stem" id={`${q.id}-stem`}>
								{q.stem}
							</p>
							{q.image && (
								<figure className="qfigure">
									<img src={q.image.src} alt={q.image.alt} />
								</figure>
							)}
							{Figure && (
								<figure className="qfigure">
									<Figure />
								</figure>
							)}
							<fieldset className="options">
								<legend className="sr-only">Choose one answer</legend>
								{q.options.map((o) => {
									const selected = mine === o.key;
									const state = checked ? (o.key === q.answer ? 'correct' : selected ? 'wrong' : 'dim') : selected ? 'selected' : '';
									return (
										<label key={o.key} className={`opt ${state}${checked ? ' locked' : ''}`}>
											<input type="radio" name={q.id} value={o.key} checked={selected} disabled={checked} onChange={() => pick(q, o.key)} />
											<b className="key">{o.key}</b>
											<span className="label">{o.label}</span>
											{checked && o.key === q.answer && (
												<span className="mark" role="img" aria-label="Correct answer">
													<TickIcon color="#a6e6c7" />
												</span>
											)}
											{checked && selected && o.key !== q.answer && (
												<span className="mark" role="img" aria-label="Your answer, not correct">
													<CrossIcon color="#ff6756" />
												</span>
											)}
										</label>
									);
								})}
							</fieldset>

							{!checked && (
								<div className="locked-note">
									<LockIcon color="#9ba9ad" />
									Tutor explanation unlocks when all {questions.length} questions in this set are answered.
								</div>
							)}

							{checked && (
								<div className="tutor">
									<div className="tutor-head">
										<span className="tutor-id">
											<span className="tutor-badge">
												<ChatIcon color="#0c1115" />
											</span>
											AI tutor · for {learner}
										</span>
										<button type="button" className="btn-ghost" onClick={() => listen(q)} aria-label={speakingId === q.id ? 'Stop reading' : 'Listen to this explanation'}>
											{speakingId === q.id ? <StopIcon /> : <SpeakerIcon />}
											{speakingId === q.id ? 'Stop' : 'Listen'}
										</button>
									</div>
									<p>{q.tutor.explain}</p>
									{trap && (
										<p className="trap">
											<b>Why {mine} looked right:</b> {trap}
										</p>
									)}
								</div>
							)}
						</article>
					);
				})}
			</div>

			<div className="card gate">
				{!checked && !allAnswered && (
					<>
						<div className="gate-info">
							<span className="gate-icon">
								<LockIcon size={18} color="#9ba9ad" />
							</span>
							<div>
								<p className="gate-title">Tutor explanations are locked</p>
								<p>
									Answer {left} more {left === 1 ? 'question' : 'questions'} to unlock them. {answeredCount} of {questions.length} answered.
								</p>
							</div>
						</div>
						<button type="button" className="btn-primary" disabled>
							Check my answers with Tutor
						</button>
					</>
				)}
				{!checked && allAnswered && (
					<>
						<div className="gate-info">
							<span className="gate-icon ready">
								<TickIcon color="#7bcce0" />
							</span>
							<div>
								<p className="gate-title">All {questions.length} answered</p>
								<p>Happy with your choices? Once you check, they’re locked in.</p>
							</div>
						</div>
						<button type="button" className="btn-primary" onClick={check}>
							Check my answers with Tutor
						</button>
					</>
				)}
				{checked && (
					<>
						<div className="gate-info">
							<span className="score">
								{score}/{questions.length}
							</span>
							<div>
								<p className="gate-title">{score === questions.length ? `All ${questions.length} correct. Lovely careful thinking.` : `You got ${score} of ${questions.length}.`}</p>
								<p>{score === questions.length ? 'Read the tutor notes anyway. Can you explain each one out loud?' : 'Read each tutor note. The mistakes are the useful part.'}</p>
							</div>
						</div>
						{hasNextSet && (
							<button type="button" className="btn-primary" onClick={() => goToSet(setIndex + 1)}>
								Next {nextSetSize} questions
								<ArrowRightIcon />
							</button>
						)}
						{sectionDone && nextSection && (
							<button
								type="button"
								className="btn-primary"
								onClick={() => {
									quiet();
									onOpenSection(nextSection.id);
								}}
							>
								Section done · Next: {nextSection.code} {nextSection.short}
								<ArrowRightIcon />
							</button>
						)}
						{sectionDone && !nextSection && <span className="done-tag">Every section finished</span>}
					</>
				)}
			</div>
		</div>
	);
};
