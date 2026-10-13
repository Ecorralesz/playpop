import { getPublicEventCollections } from './eventCollections';
import { getProductsByCategory } from './products';

export const galleryCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'event', label: 'Eventos' },
  { id: 'game', label: 'Juegos' },
  { id: 'inflatable', label: 'Inflables' },
];

// Images are imported by the catalog through Vite. Future event photos can be
// imported here and appended with id, image, category, imageAlt and caption.
const equipmentItems = [
  ...getProductsByCategory('inflatable'),
  ...getProductsByCategory('game'),
].map((product) => ({
  id: product.id,
  title: product.name,
  image: product.image,
  category: product.category,
  imageAlt: product.imageAlt,
  caption: null,
}));

const galleryItems = [...getPublicEventCollections(), ...equipmentItems];

export const getGalleryItemsByCategory = (category) =>
  category === 'all' ? galleryItems : galleryItems.filter((item) => item.category === category);

export default galleryItems;
