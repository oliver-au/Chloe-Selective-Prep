import React from 'react';
import {Series, useVideoConfig} from 'remotion';
import {sceneSeconds} from './q18/timing';
import {
	Q18Apply,
	Q18Exam,
	Q18Hook,
	Q18Pocket,
	Q18Practice,
	Q18PracticeAnswer,
	Q18Predict,
	Q18Shades,
	Q18Shapes,
	Q18Trap,
} from './q18/Q18Scenes';

export const Q18_SCENES: [string, string, React.FC, number, boolean][] = [
	['q18-hook', '01 · The puzzle', Q18Hook, 0.7, false],
	['q18-predict', '02 · Your guess', Q18Predict, 5.0, true],
	['q18-trap', '03 · The sticky-paint trap', Q18Trap, 1.3, false],
	['q18-shapes', '04 · Track the shapes', Q18Shapes, 1.3, false],
	['q18-shades', '05 · Track the shades', Q18Shades, 1.4, false],
	['q18-apply', '06 · Build the answer', Q18Apply, 1.4, false],
	['q18-exam', '07 · Check Question 18', Q18Exam, 1.4, false],
	['q18-practice', '08 · Your turn (new rule)', Q18Practice, 5.5, true],
	['q18-practice-answer', '09 · New puzzle proof', Q18PracticeAnswer, 1.5, false],
	['q18-pocket', '10 · Pocket rule', Q18Pocket, 2.2, false],
];

export const q18SceneFrames = (id: string, fps = 30) => {
	const scene = Q18_SCENES.find((s) => s[0] === id)!;
	return Math.ceil(sceneSeconds(id, scene[3]) * fps);
};

export const q18DurationFrames = (fps = 30) => Q18_SCENES.reduce((a, s) => a + q18SceneFrames(s[0], fps), 0);

export const Q18Video = () => {
	const {fps} = useVideoConfig();
	return (
		<Series>
			{Q18_SCENES.map(([id, name, Scene]) => (
				<Series.Sequence key={id} name={name} durationInFrames={q18SceneFrames(id, fps)} premountFor={fps}>
					<Scene />
				</Series.Sequence>
			))}
		</Series>
	);
};
