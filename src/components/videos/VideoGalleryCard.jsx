import './Videos.css';

function VideoGalleryCard({ video, onOpen }) {
  return (
    <button
      className="video-gallery-card"
      type="button"
      onClick={() => onOpen(video)}
      aria-label={`Ver video: ${video.title}`}
    >
      <span className="video-gallery-card__visual">
        <img src={video.poster} alt="" loading="lazy" width="576" height="1024" />
        <span className="video-gallery-card__play" aria-hidden="true">
          <i className="bi bi-play-fill" />
        </span>
      </span>
      <span className="video-gallery-card__title">{video.title}</span>
      <span className="video-gallery-card__action">Ver video</span>
    </button>
  );
}

export default VideoGalleryCard;
