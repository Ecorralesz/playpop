import EventPhotoViewer from '../EventPhotoViewer/EventPhotoViewer';
import { useState } from 'react';
import CategoryFilters from '../../common/CategoryFilters/CategoryFilters';
import { Col, Container, Row } from 'react-bootstrap';

import GalleryCard from '../../common/GalleryCard/GalleryCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { galleryCategories, getGalleryItemsByCategory } from '../../../data/galleryItems';
import './GalleryGrid.css';

function GalleryGrid() {
  const [collection, setCollection] = useState(null);
  const [category, setCategory] = useState('all');
  const galleryItems = getGalleryItemsByCategory(category);
  return (
    <section className="gallery-grid" aria-labelledby="gallery-grid-heading">
      <Container className="gallery-grid__container">
        <SectionHeader
          eyebrow="Una celebración llena de color"
          title="Momentos PlayPop"
          description="Recuerdos llenos de diversión, sonrisas y experiencias especiales."
          headingId="gallery-grid-heading"
        />

        <CategoryFilters
          options={galleryCategories}
          value={category}
          onChange={setCategory}
          label="Filtrar fotografías"
        />
        <p role="status">
          {galleryItems.length
            ? `${galleryItems.length} colecciones y fotografías`
            : 'Próximamente agregaremos fotografías reales de eventos PlayPop.'}
        </p>
        <Row className="g-4">
          {galleryItems.map((item) => (
            <Col className="d-flex" key={item.id} md={6} lg={4}>
              <GalleryCard item={item} onOpen={setCollection} />
            </Col>
          ))}
        </Row>
        {collection && (
          <EventPhotoViewer
            key={collection.id}
            collection={collection}
            onClose={() => setCollection(null)}
          />
        )}
      </Container>
    </section>
  );
}

export default GalleryGrid;
