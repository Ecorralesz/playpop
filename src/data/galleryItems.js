import { getPublicEventCollections } from './eventCollections';
import { videos } from './videos';

export const galleryCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'photos', label: 'Fotos' },
  { id: 'videos', label: 'Videos' },
];

const galleryItems = [
  ...getPublicEventCollections(),
  ...videos.map((video) => ({ ...video, category: 'video' })),
];

export const getGalleryItemsByCategory = (category) => {
  if (category === 'photos') return galleryItems.filter((item) => item.category === 'event');
  if (category === 'videos') return galleryItems.filter((item) => item.category === 'video');
  return galleryItems;
};

export default galleryItems;
