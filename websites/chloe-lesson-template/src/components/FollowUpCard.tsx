import React from 'react';
import type {FollowUp} from '../content/types';
import {WarnIcon} from './Icons';

export const FollowUpCard: React.FC<{followUp: FollowUp}> = ({followUp}) => (
	<div className="card follow">
		<div>
			<p className="kicker">The habit to keep</p>
			<p className="rule">{followUp.rule}</p>
		</div>
		{followUp.steps.length > 0 && (
			<ol className="steps">
				{followUp.steps.map((step, i) => (
					<li key={step} className="step">
						<b>{String(i + 1).padStart(2, '0')}</b>
						<p>{step}</p>
					</li>
				))}
			</ol>
		)}
		{followUp.pitfall && (
			<div className="pitfall">
				<WarnIcon color="#ff6756" />
				<p>
					<b>Watch for:</b> {followUp.pitfall}
				</p>
			</div>
		)}
	</div>
);
