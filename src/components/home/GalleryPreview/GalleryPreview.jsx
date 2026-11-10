import { Container } from 'react-bootstrap';
import CardGrid from '../../common/CardGrid/CardGrid';
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
          description="Explora fotografías reales de nuestros eventos y momentos para recordar."
          headingId="gallery-preview-heading"
        />

        <CardGrid columns={2}>
          {galleryPreviewItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </CardGrid>

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
