import {useEffect, useId, useLayoutEffect, useState} from 'react';
import {AbsoluteFill, Html5Video, useBufferState, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Scene} from './types';

type FilmScene = Pick<Scene, 'id' | 'title' | 'start' | 'durationInFrames' | 'captions'>;
type FilmFile = {id: string; url?: string; error?: string};
type FilmProps = {id: string; title: string; scenes: FilmScene[]; file: FilmFile | null};

export const filmSource = (id: string) => './films/' + encodeURIComponent(id) + '.mp4';

// The public host serves complete responses for MP4 byte-range requests. A local
// Blob URL lets the browser seek its own copy, including on subsequent tab visits.
export function useSelectedFilm(id: string) {
  const [file, setFile] = useState<FilmFile | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    let objectUrl: string | undefined;
    async function load() {
      try {
        const response = await fetch(filmSource(id), {signal: controller.signal});
        if (!response.ok) throw new Error('Film download failed (HTTP ' + response.status + ').');
        const blob = await response.blob();
        if (controller.signal.aborted) return;
        if (!blob.size) throw new Error('The downloaded film is empty.');
        objectUrl = URL.createObjectURL(blob.type === 'video/mp4' ? blob : blob.slice(0, blob.size, 'video/mp4'));
        setFile({id, url: objectUrl});
      } catch (error) {
        if (!controller.signal.aborted) setFile({id, error: error instanceof Error ? error.message : String(error)});
      }
    }
    void load();
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [id]);
  return file?.id === id ? file : null;
}

function LoadingFilm() {
  const {delayPlayback} = useBufferState();
  useLayoutEffect(() => delayPlayback().unblock, [delayPlayback]);
  return <AbsoluteFill role="status" style={{justifyContent: 'center', alignItems: 'center', color: '#f4efe2', background: '#101d20', font: '42px Manrope Variable, Arial, sans-serif'}}>Loading film…</AbsoluteFill>;
}

export function ReviewedFilm({id, title, scenes, file}: FilmProps) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const descriptionId = useId();
  const [error, setError] = useState<Error | null>(null);
  const [metadataReady, setMetadataReady] = useState(false);
  if (error) throw error;
  if (file?.error) throw new Error(file.error);

  const scene = scenes.find(s => frame >= s.start && frame < s.start + s.durationInFrames) ?? scenes[0];
  // These lead-ins are part of the encoded films.
  const voiceStart = id === 'C3' ? 9 : Math.round(fps * 0.25);
  const elapsedMs = (frame - scene.start - voiceStart) * 1000 / fps;
  const cue = scene.captions.find(c => elapsedMs >= c.startMs && elapsedMs < c.endMs);

  return <AbsoluteFill data-scene-id={scene.id} style={{background: '#101d20'}}>
    {file?.url && <Html5Video
      src={file.url}
      data-film-src={filmSource(id)}
      onLoadedMetadata={() => setMetadataReady(true)}
      name={title}
      aria-label={title}
      aria-describedby={descriptionId}
      style={{width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none'}}
      pauseWhenBuffering
      onError={setError}
    />}
    {(!file?.url || !metadataReady) && <LoadingFilm/>}
    <div className="sr-only" id={descriptionId}>
      <span>Current chapter. {scene.title}.</span>
      {cue && <>{' '}<span data-caption>{cue.text}</span></>}
    </div>
  </AbsoluteFill>;
}
