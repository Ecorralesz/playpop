import { Modal } from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import { getAdjacentVideo } from '../../utils/videoPlayback';

function VideoViewer({ video, videos = [], onSelect, onClose }) {
  const index = videos.findIndex((item) => item.id === video?.id);
  const hasNavigation = index >= 0 && videos.length > 1 && Boolean(onSelect);
  const navigate = (direction) => {
    const next = getAdjacentVideo(videos, video?.id, direction);
    if (next) onSelect(next);
  };

  return (
    <Modal
      show={Boolean(video)}
      onHide={onClose}
      centered
      size="lg"
      aria-labelledby="video-viewer-title"
      onKeyDown={(event) => {
        if (!hasNavigation || event.altKey || event.ctrlKey || event.metaKey) return;
        // Leave native seeking, volume, and form keyboard controls intact.
        if (event.target.closest?.('video, input, textarea, select')) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          navigate(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <Modal.Header closeButton closeLabel="Cerrar video">
        <Modal.Title id="video-viewer-title">{video?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="playpop-video-viewer">
        {video && <VideoPlayer video={video} startOnOpen />}
        {video && hasNavigation && (
          <div className="playpop-video-viewer__navigation">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate(-1)}
              aria-label="Video anterior"
            >
              <i className="bi bi-chevron-left" aria-hidden="true" />
            </button>
            <p className="mb-0" role="status" aria-live="polite">
              {index + 1} / {videos.length}
            </p>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate(1)}
              aria-label="Video siguiente"
            >
              <i className="bi bi-chevron-right" aria-hidden="true" />
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default VideoViewer;
