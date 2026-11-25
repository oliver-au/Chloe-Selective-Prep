let currentAudio: HTMLAudioElement | null = null;

export function stopSpeaking() {
	if (currentAudio) {
		currentAudio.pause();
		currentAudio = null;
	}
	if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

/** Plays a narrated file if there is one, otherwise reads the text with an Australian browser voice. */
export function speak(text: string, audioSrc: string | undefined, onEnd: () => void) {
	stopSpeaking();
	if (audioSrc) {
		const audio = new Audio(audioSrc);
		currentAudio = audio;
		audio.onended = onEnd;
		audio.onerror = onEnd;
		audio.play().catch(onEnd);
		return;
	}
	if (!('speechSynthesis' in window)) {
		onEnd();
		return;
	}
	const synth = window.speechSynthesis;
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = 'en-AU';
	const voices = synth.getVoices();
	const voice = voices.find((v) => v.lang === 'en-AU') ?? voices.find((v) => v.lang.startsWith('en'));
	if (voice) utterance.voice = voice;
	utterance.rate = 0.95;
	utterance.onend = onEnd;
	utterance.onerror = onEnd;
	synth.speak(utterance);
}
