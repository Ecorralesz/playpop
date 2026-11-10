import { useEffect, useRef, useState } from 'react';
import { createVideoPlaybackSession, pauseOtherVideos } from '../../utils/videoPlayback';
import './Videos.css';

function VideoPlayer({ video, startOnOpen = false }) {
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(!startOnOpen);
  const playerRef = useRef(null);
  const sessionRef = useRef(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const session = createVideoPlaybackSession(playerRef.current, setStatus);
    sessionRef.current = session;
    if (startOnOpen) session.play();
    return () => {
      session.stop();
      sessionRef.current = null;
    };
  }, [video.src, startOnOpen]);

  return (
    <div className="playpop-video-player">
      <video
        ref={playerRef}
        data-playpop-video
        className="playpop-video-player__media"
        controls
        playsInline
        muted={!startOnOpen}
        preload="none"
        poster={video.poster}
        src={video.src}
        aria-label={video.title}
        onPlay={(event) => {
          pauseOtherVideos(event.currentTarget);
          setStatus('playing');
          setFailed(false);
        }}
        onLoadStart={() => setFailed(false)}
        onError={() => setFailed(true)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
      >
        Tu navegador no admite videos HTML5.
      </video>
      {status === 'blocked' && (
        <div className="playpop-video-player__retry">
          <p role="status">El navegador no pudo iniciar la reproducción. Pulsa Reproducir video.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => sessionRef.current?.play({ withSound: !playerRef.current.muted })}
            aria-label={`Reproducir video: ${video.title}`}
          >
            <i className="bi bi-play-fill me-2" aria-hidden="true" />
            Reproducir video
          </button>
        </div>
      )}
      <button
        className="playpop-video-player__sound"
        type="button"
        onClick={() => {
          playerRef.current.muted = !playerRef.current.muted;
        }}
        aria-label={`${muted ? 'Activar sonido' : 'Silenciar'}: ${video.title}`}
      >
        <i className={`bi ${muted ? 'bi-volume-mute' : 'bi-volume-up'}`} aria-hidden="true" />
        {muted ? 'Activar sonido' : 'Silenciar'}
      </button>
      {failed && <p role="alert">No se pudo reproducir el video. Intenta abrirlo directamente.</p>}
      <a className="playpop-video-player__fallback" href={video.src}>
        Abrir video directamente <span className="visually-hidden">: {video.title}</span>
      </a>
    </div>
  );
}

export default VideoPlayer;
