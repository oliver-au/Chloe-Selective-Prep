export type Progress = {
	version: 1;
	/** Chosen option key per question id. */
	answers: Record<string, string>;
	/** Sets the learner has checked with the tutor, keyed by setKey(). */
	checked: Record<string, boolean>;
	/** The set each section is showing. */
	setBySection: Record<string, number>;
};

export const emptyProgress = (): Progress => ({version: 1, answers: {}, checked: {}, setBySection: {}});

export const setKey = (sectionId: string, setIndex: number) => `${sectionId}:${setIndex}`;

export function loadProgress(storageKey: string): Progress {
	try {
		const raw = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
		if (raw?.version === 1) {
			return {version: 1, answers: raw.answers ?? {}, checked: raw.checked ?? {}, setBySection: raw.setBySection ?? {}};
		}
	} catch {
		// Unreadable storage: start fresh.
	}
	return emptyProgress();
}

export function saveProgress(storageKey: string, progress: Progress) {
	try {
		localStorage.setItem(storageKey, JSON.stringify(progress));
	} catch {
		// Private mode or full storage: progress lasts for this visit only.
	}
}
