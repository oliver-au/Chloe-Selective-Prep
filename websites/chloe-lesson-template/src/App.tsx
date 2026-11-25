import React, {useEffect, useMemo, useState} from 'react';
import type {Site} from './content/types';
import {emptyProgress, loadProgress, saveProgress, type Progress} from './lib/progress';
import {stopSpeaking} from './lib/speak';
import {VideoStage} from './components/VideoStage';
import {FollowUpCard} from './components/FollowUpCard';
import {PracticeSet} from './components/PracticeSet';

const sectionFromHash = (site: Site) => {
	const id = decodeURIComponent(location.hash.slice(1));
	return site.sections.some((s) => s.id === id) ? id : (site.sections[0]?.id ?? '');
};

const pad = (n: number) => String(n).padStart(2, '0');

export const App: React.FC<{site: Site}> = ({site}) => {
	const storageKey = `chloe-lesson-${site.id}-v1`;
	const [progress, setProgress] = useState<Progress>(() => loadProgress(storageKey));
	const [sectionId, setSectionId] = useState(() => sectionFromHash(site));
	const [autoPause, setAutoPause] = useState(true);

	useEffect(() => {
		document.title = `${site.learner} Selective · ${site.title}`;
	}, [site]);

	useEffect(() => saveProgress(storageKey, progress), [storageKey, progress]);

	useEffect(() => {
		const onHash = () => setSectionId(sectionFromHash(site));
		window.addEventListener('hashchange', onHash);
		return () => window.removeEventListener('hashchange', onHash);
	}, [site]);

	const allQuestions = useMemo(() => site.sections.flatMap((s) => s.questions), [site]);

	if (site.sections.length === 0) {
		return <p className="wrap">Add a section in src/content/site.ts to get started.</p>;
	}

	const sectionIndex = Math.max(0, site.sections.findIndex((s) => s.id === sectionId));
	const section = site.sections[sectionIndex];
	const nextSection = site.sections[sectionIndex + 1];
	const answeredTotal = allQuestions.filter((q) => progress.answers[q.id]).length;
	const percent = (done: number, total: number) => `${total ? Math.round((done / total) * 100) : 0}%`;

	const openSection = (id: string) => {
		stopSpeaking();
		setSectionId(id);
		if (decodeURIComponent(location.hash.slice(1)) !== id) history.pushState(null, '', `#${id}`);
		requestAnimationFrame(() => document.getElementById('section-top')?.scrollIntoView({behavior: 'smooth', block: 'start'}));
	};

	const update = (change: (p: Progress) => Progress) => setProgress((p) => change(p));

	const resetProgress = () => {
		if (window.confirm(`Clear all of ${site.learner}’s answers on this device?`)) {
			stopSpeaking();
			setProgress(emptyProgress());
		}
	};

	return (
		<>
			<header className="site-header">
				<div className="wrap">
					<a
						className="brand"
						href={`#${site.sections[0].id}`}
						onClick={(e) => {
							e.preventDefault();
							openSection(site.sections[0].id);
						}}
					>
						<span className="brand-mark" />
						<strong>{site.learner.toUpperCase()}</strong>
						<span>{site.brandLine}</span>
					</a>
					<div className="overall">
						<span>
							{answeredTotal} of {allQuestions.length} questions answered
						</span>
						<span className="bar" aria-hidden="true">
							<i style={{width: percent(answeredTotal, allQuestions.length)}} />
						</span>
					</div>
				</div>
			</header>

			<div className="wrap">
				<section className="hero">
					<div>
						<p className="eyebrow">Source · {site.source}</p>
						<h1>{site.title}</h1>
						<p className="lede">{site.intro}</p>
					</div>
					<div className="chips">
						<span className="chip">
							<b>{site.sections.length}</b> {site.sections.length === 1 ? 'section' : 'sections'}
						</span>
						<span className="chip">
							<b>{allQuestions.length}</b> practice questions
						</span>
					</div>
				</section>

				<div className="layout">
					<nav className="rail" aria-label="Sections">
						<p className="rail-title">Sections</p>
						{site.sections.map((s, i) => {
							const done = s.questions.filter((q) => progress.answers[q.id]).length;
							return (
								<button key={s.id} type="button" className="sec-btn" aria-current={s.id === section.id ? 'page' : undefined} onClick={() => openSection(s.id)}>
									<span className="row">
										<span className="code">
											{pad(i + 1)} · {s.code}
										</span>
										<span className="count">
											{done} / {s.questions.length}
										</span>
									</span>
									<span className="name">{s.short}</span>
									<span className="subject">{s.subject}</span>
									<span className="bar" aria-hidden="true">
										<i style={{width: percent(done, s.questions.length)}} />
									</span>
								</button>
							);
						})}
					</nav>

					<main className="content" id="section-top" key={section.id}>
						<div className="sec-head">
							<p className="eyebrow">
								Section {pad(sectionIndex + 1)} · {section.code} <span>/ {section.subject}</span>
							</p>
							<h2>{section.title}</h2>
							<p>{section.summary}</p>
						</div>

						<section className="stage" aria-labelledby={`${section.id}-watch`}>
							<h3 className="stage-label" id={`${section.id}-watch`}>
								<b>01</b> Watch &amp; think
							</h3>
							<VideoStage section={section} learner={site.learner} note={site.videoNote} autoPause={autoPause} onAutoPauseChange={setAutoPause} />
						</section>

						<section className="stage" aria-labelledby={`${section.id}-follow`}>
							<h3 className="stage-label" id={`${section.id}-follow`}>
								<b>02</b> Follow up
							</h3>
							<FollowUpCard followUp={section.followUp} />
						</section>

						<section className="stage" aria-labelledby={`${section.id}-practice`}>
							<h3 className="stage-label" id={`${section.id}-practice`}>
								<b>03</b> Practice · {site.questionsPerSet} at a time
							</h3>
							<PracticeSet
								section={section}
								learner={site.learner}
								perSet={Math.max(1, site.questionsPerSet)}
								progress={progress}
								update={update}
								nextSection={nextSection}
								onOpenSection={openSection}
							/>
						</section>
					</main>
				</div>
			</div>

			<footer className="site-footer">
				<div className="wrap">
					<span>
						<b>{site.learner.toUpperCase()} SELECTIVE</b> / {site.footer.left}
					</span>
					<span>{site.footer.right}</span>
					<button type="button" className="link-btn" onClick={resetProgress}>
						Reset progress on this device
					</button>
				</div>
			</footer>
		</>
	);
};
