import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GalleryCard from '../../common/GalleryCard/GalleryCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { galleryCategories, getGalleryItemsByCategory } from '../../../data/galleryItems';
import EventPhotoViewer from '../EventPhotoViewer/EventPhotoViewer';
import VideoGalleryCard from '../../videos/VideoGalleryCard';
import VideoViewer from '../../videos/VideoViewer';
import VideoCarousel from '../../videos/VideoCarousel';
import './GalleryGrid.css';

function GalleryGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [collection, setCollection] = useState(null);
  const requestedFilter = searchParams.get('filter');
  const filter = ['photos', 'videos'].includes(requestedFilter) ? requestedFilter : 'all';
  const photoCollections = getGalleryItemsByCategory('photos');
  const videoItems = getGalleryItemsByCategory('videos');

  const selectFilter = (value) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value === 'all') next.delete('filter');
        else next.set('filter', value);
        return next;
      },
      { preventScrollReset: true },
    );
  };

  return (
    <section className="gallery-grid" aria-labelledby="gallery-grid-heading">
      <Container className="gallery-grid__container">
        <SectionHeader
          eyebrow="Una celebración llena de color"
          title="Nuestra galería"
          description="Descubre ideas visuales para imaginar cómo podría sentirse tu próximo evento con PlayPop."
          headingId="gallery-grid-heading"
        />

        <div className="gallery-grid__filters" role="group" aria-label="Filtrar galería">
          {galleryCategories.map(({ id: value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => selectFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        {filter !== 'videos' && (
          <section className="gallery-grid__section" aria-labelledby="gallery-photos-heading">
            <h3 className="gallery-grid__section-title" id="gallery-photos-heading">
              Momentos PlayPop
            </h3>
            <Row className="g-4 gallery-grid__photos">
              {photoCollections.map((item) => (
                <Col className="d-flex" key={item.id} xs={12} md={6} lg={4}>
                  <GalleryCard item={item} onOpen={setCollection} />
                </Col>
              ))}
            </Row>
          </section>
        )}
        {filter !== 'photos' && (
          <section className="gallery-grid__section" aria-labelledby="gallery-videos-heading">
            <h3 className="gallery-grid__section-title" id="gallery-videos-heading">
              PlayPop en Acción
            </h3>
            {filter === 'all' ? (
              <VideoCarousel videos={videoItems} onOpen={setSelectedVideo} />
            ) : (
              <div className="gallery-grid__videos">
                {videoItems.map((video) => (
                  <VideoGalleryCard key={video.id} video={video} onOpen={setSelectedVideo} />
                ))}
              </div>
            )}
          </section>
        )}
        {collection && (
          <EventPhotoViewer
            key={collection.id}
            collection={collection}
            onClose={() => setCollection(null)}
          />
        )}
        <VideoViewer
          video={selectedVideo}
          videos={videoItems}
          onSelect={setSelectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      </Container>
    </section>
  );
}

export default GalleryGrid;
