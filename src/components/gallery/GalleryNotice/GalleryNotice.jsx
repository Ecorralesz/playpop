import { Container } from 'react-bootstrap';

import './GalleryNotice.css';

function GalleryNotice() {
  return (
    <aside className="gallery-notice" aria-label="Aviso sobre las imágenes de la galería">
      <Container className="gallery-notice__container">
        <div className="gallery-notice__content">
          <i className="bi bi-info-circle" aria-hidden="true" />
          <p>
            Fotografías reales de nuestros equipos y momentos PlayPop. Explora las colecciones para
            ver más recuerdos.
          </p>
        </div>
      </Container>
    </aside>
  );
}

export default GalleryNotice;
