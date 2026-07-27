import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import GalleryCard from '../../common/GalleryCard/GalleryCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import galleryPreviewItems from '../../../data/galleryPreviewItems';
import './GalleryPreview.css';

function GalleryPreview() {
  return (
    <section className="gallery-preview" aria-labelledby="gallery-preview-heading">
      <Container className="gallery-preview__container">
        <SectionHeader
          eyebrow="Momentos llenos de diversión"
          title="Así se vive una celebración con PlayPop"
          description="Explora una muestra de los espacios y experiencias que queremos crear para cada evento."
          headingId="gallery-preview-heading"
        />

        <Row className="g-4">
          {galleryPreviewItems.map((item) => (
            <Col className="d-flex" key={item.id} md={6} lg={4}>
              <GalleryCard item={item} />
            </Col>
          ))}
        </Row>

        <div className="gallery-preview__cta">
          <Link className="gallery-preview__link" to="/galeria">
            Ver galería completa
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default GalleryPreview;
