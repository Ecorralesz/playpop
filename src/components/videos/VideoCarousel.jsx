import { useEffect, useId, useRef, useState } from 'react';
import VideoGalleryCard from './VideoGalleryCard';
import './VideoCarousel.css';

function VideoCarousel({ videos, onOpen }) {
  const trackRef = useRef(null);
  const trackId = useId();
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = () => {
    const track = trackRef.current;
    const start = track.scrollLeft <= 1;
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    setEdges((previous) =>
      previous.start === start && previous.end === end ? previous : { start, end },
    );
  };

  useEffect(() => {
    const track = trackRef.current;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const navigate = (direction) => {
    const track = trackRef.current;
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey)
      return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(event.key === 'ArrowRight' ? 1 : -1);
    }
  };

  return (
    <div className="video-carousel">
      <div className="video-carousel__toolbar">
        <p className="text-muted mb-0">Desliza o usa las flechas para explorar los videos.</p>
        <div className="video-carousel__navigation" role="group" aria-label="Navegación de videos">
          <button
            type="button"
            disabled={edges.start}
            onClick={() => navigate(-1)}
            aria-controls={trackId}
          >
            <i className="bi bi-arrow-left" aria-hidden="true" />
            <span className="visually-hidden">Videos anteriores</span>
          </button>
          <button
            type="button"
            disabled={edges.end}
            onClick={() => navigate(1)}
            aria-controls={trackId}
          >
            <i className="bi bi-arrow-right" aria-hidden="true" />
            <span className="visually-hidden">Videos siguientes</span>
          </button>
        </div>
      </div>
      <div
        id={trackId}
        className="video-carousel__track"
        ref={trackRef}
        role="region"
        aria-label="Carrusel de videos PlayPop en Acción"
        tabIndex={0}
        onScroll={updateEdges}
        onKeyDown={handleKeyDown}
      >
        {videos.map((video) => (
          <div className="video-carousel__item" key={video.id}>
            <VideoGalleryCard video={video} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoCarousel;
