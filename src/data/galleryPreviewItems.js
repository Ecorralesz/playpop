import { getGalleryItemsByCategory } from './galleryItems';

// Reuse approved collection covers without duplicating photo records.
export default getGalleryItemsByCategory('photos');
