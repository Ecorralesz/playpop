import { Container } from 'react-bootstrap';

import './GalleryNotice.css';

function GalleryNotice() {
  return (
    <aside className="gallery-notice" aria-label="Aviso sobre las imágenes de la galería">
      <Container className="gallery-notice__container">
        <div className="gallery-notice__content">
          <i className="bi bi-info-circle" aria-hidden="true" />
          <p>
            Las imágenes actuales son ilustrativas. Próximamente incorporaremos fotografías reales
            de eventos y experiencias de PlayPop.
          </p>
        </div>
      </Container>
    </aside>
  );
}

export default GalleryNotice;
