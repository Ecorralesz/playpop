import { useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import VideoPlayer from '../../videos/VideoPlayer';
import { featuredVideos } from '../../../data/videos';
import './VideoReels.css';

function VideoReels() {
  const trackRef = useRef(null);

  const navigate = (direction) => {
    const track = trackRef.current;
    const card = track.querySelector('article');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="video-reels" aria-labelledby="video-reels-heading">
      <Container>
        <SectionHeader
          title="PlayPop en Acción"
          description="Mira cómo vivimos la diversión en cada evento."
          headingId="video-reels-heading"
        />
        <div className="video-reels__navigation" aria-label="Navegación de videos">
          <button type="button" onClick={() => navigate(-1)} aria-controls="video-reels-track">
            <i className="bi bi-arrow-left" aria-hidden="true" />
            <span className="visually-hidden">Videos anteriores</span>
          </button>
          <button type="button" onClick={() => navigate(1)} aria-controls="video-reels-track">
            <i className="bi bi-arrow-right" aria-hidden="true" />
            <span className="visually-hidden">Videos siguientes</span>
          </button>
        </div>
        <div
          id="video-reels-track"
          className="video-reels__track"
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Videos destacados; desliza o usa las flechas para explorar"
        >
          {featuredVideos.map((video) => (
            <article className="video-reels__card" key={video.id}>
              <VideoPlayer video={video} />
              <h3>{video.title}</h3>
            </article>
          ))}
        </div>
        <div className="video-reels__cta">
          <Link className="video-reels__link" to="/galeria?filter=videos#gallery-grid-heading">
            Ver todos los videos <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default VideoReels;
