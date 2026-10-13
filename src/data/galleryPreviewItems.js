import galleryItems from './galleryItems';

// Keep equipment previews here; event collections open their viewer in /galeria.
export default galleryItems.filter((item) => item.category !== 'event').slice(0, 6);
