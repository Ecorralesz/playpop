import { Col, Container, Row } from 'react-bootstrap';

import GalleryCard from '../../common/GalleryCard/GalleryCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import galleryItems from '../../../data/galleryItems';
import './GalleryGrid.css';

function GalleryGrid() {
  return (
    <section className="gallery-grid" aria-labelledby="gallery-grid-heading">
      <Container className="gallery-grid__container">
        <SectionHeader
          eyebrow="Una celebración llena de color"
          title="Nuestra galería"
          description="Descubre ideas visuales para imaginar cómo podría sentirse tu próximo evento con PlayPop."
          headingId="gallery-grid-heading"
        />

        <Row className="g-4">
          {galleryItems.map((item) => (
            <Col className="d-flex" key={item.id} md={6} lg={4}>
              <GalleryCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default GalleryGrid;
