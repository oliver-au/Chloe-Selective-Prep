import React from 'react';

type IconProps = {size?: number; color?: string};

export const LockIcon: React.FC<IconProps> = ({size = 16, color = 'currentColor'}) => (
	<svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
		<rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke={color} strokeWidth="1.5" />
		<path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke={color} strokeWidth="1.5" />
	</svg>
);

export const TickIcon: React.FC<IconProps> = ({size = 18, color = 'currentColor'}) => (
	<svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
		<path d="M3 8.5l3 3 7-7" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export const CrossIcon: React.FC<IconProps> = ({size = 18, color = 'currentColor'}) => (
	<svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
		<path d="M4 4l8 8M12 4l-8 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
	</svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({size = 16, color = 'currentColor'}) => (
	<svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
		<path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export const SpeakerIcon: React.FC<IconProps> = ({size = 16, color = 'currentColor'}) => (
	<svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
		<path d="M2.5 6h2.5l3.5-3v10l-3.5-3H2.5z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
		<path d="M11 5.5a3.5 3.5 0 0 1 0 5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

export const StopIcon: React.FC<IconProps> = ({size = 16, color = 'currentColor'}) => (
	<svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
		<rect x="4" y="4" width="8" height="8" rx="1.5" fill={color} />
	</svg>
);

export const ChatIcon: React.FC<IconProps> = ({size = 16, color = 'currentColor'}) => (
	<svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
		<path d="M2.5 3.5h11v7h-6l-3 2.5v-2.5h-2z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
	</svg>
);

export const WarnIcon: React.FC<IconProps> = ({size = 20, color = 'currentColor'}) => (
	<svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
		<path d="M10 2.5 18 17H2z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
		<path d="M10 8v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
		<circle cx="10" cy="14.3" r="1" fill={color} />
	</svg>
);
