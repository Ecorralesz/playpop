import { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getNextPhotoIndex, getSwipeDirection } from './navigation';
import './EventPhotoViewer.css';

function EventPhotoViewer({ collection, onClose }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const photo = collection.photos[index];
  const hasMultiple = collection.photos.length > 1;
  const move = (direction) =>
    setIndex((current) => getNextPhotoIndex(current, direction, collection.photos.length));

  const handleKeyDown = (event) => {
    if (!hasMultiple || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  };

  return (
    <Modal
      show
      onHide={onClose}
      centered
      size="xl"
      aria-labelledby="event-viewer-title"
      onKeyDown={handleKeyDown}
    >
      <Modal.Header closeButton closeLabel="Cerrar momentos">
        <Modal.Title id="event-viewer-title">{collection.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="event-viewer__stage"
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current =
              event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchEnd={(event) => {
            const touch = event.changedTouches[0];
            const direction = getSwipeDirection(
              touchStart.current,
              touch ? { x: touch.clientX, y: touch.clientY } : null,
            );
            touchStart.current = null;
            if (hasMultiple && direction) move(direction);
          }}
          onTouchCancel={() => {
            touchStart.current = null;
          }}
        >
          <img
            key={photo.id}
            className="event-viewer__image"
            src={photo.image}
            alt={photo.imageAlt}
            width={photo.width}
            height={photo.height}
            decoding="async"
          />
        </div>
        <div className="event-viewer__controls">
          <Button
            variant="outline-primary"
            onClick={() => move(-1)}
            disabled={!hasMultiple}
            aria-label="Fotografía anterior"
          >
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </Button>
          <p className="mb-0" role="status" aria-live="polite" aria-atomic="true">
            {index + 1} / {collection.photos.length}
          </p>
          <Button
            variant="outline-primary"
            onClick={() => move(1)}
            disabled={!hasMultiple}
            aria-label="Fotografía siguiente"
          >
            <i className="bi bi-chevron-right" aria-hidden="true" />
          </Button>
        </div>
        {hasMultiple && (
          <p className="text-center text-muted mt-3 mb-0">
            Usa las flechas o desliza para ver más fotografías.
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}
export default EventPhotoViewer;
