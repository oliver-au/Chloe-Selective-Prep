import React from 'react';
import {Series, useVideoConfig} from 'remotion';
import {sceneSeconds} from './q14/timing';
import {
	Q14Exam,
	Q14Fold,
	Q14Hook,
	Q14Opposite,
	Q14Pocket,
	Q14Practice,
	Q14PracticeAnswer,
	Q14Predict,
	Q14Roll,
	Q14Trap,
} from './q14/Q14Scenes';

/* Scene id, title, component, quiet tail (seconds) after narration ends, and whether it pauses for prediction. */
export const Q14_SCENES: [string, string, React.FC, number, boolean][] = [
	['q14-hook', '01 · The puzzle', Q14Hook, 0.7, false],
	['q14-predict', '02 · Your guess', Q14Predict, 5.0, true],
	['q14-fold', '03 · Fold the tube', Q14Fold, 1.0, false],
	['q14-trap', '04 · The upside-down trap', Q14Trap, 1.3, false],
	['q14-opposite', '05 · Find the opposite', Q14Opposite, 1.2, false],
	['q14-roll', '06 · Roll the short way', Q14Roll, 1.4, false],
	['q14-exam', '07 · Check Question 14', Q14Exam, 1.4, false],
	['q14-practice', '08 · Your turn (8-sided)', Q14Practice, 5.5, true],
	['q14-practice-answer', '09 · Octagon proof', Q14PracticeAnswer, 1.5, false],
	['q14-pocket', '10 · Pocket rule', Q14Pocket, 2.2, false],
];

export const q14SceneFrames = (id: string, fps = 30) => {
	const scene = Q14_SCENES.find((s) => s[0] === id)!;
	return Math.ceil(sceneSeconds(id, scene[3]) * fps);
};

export const q14DurationFrames = (fps = 30) => Q14_SCENES.reduce((a, s) => a + q14SceneFrames(s[0], fps), 0);

export const Q14Video = () => {
	const {fps} = useVideoConfig();
	return (
		<Series>
			{Q14_SCENES.map(([id, name, Scene]) => (
				<Series.Sequence key={id} name={name} durationInFrames={q14SceneFrames(id, fps)} premountFor={fps}>
					<Scene />
				</Series.Sequence>
			))}
		</Series>
	);
};
