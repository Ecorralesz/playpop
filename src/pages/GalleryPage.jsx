import GalleryGrid from '../components/gallery/GalleryGrid/GalleryGrid';
import GalleryNotice from '../components/gallery/GalleryNotice/GalleryNotice';
import GalleryPageHero from '../components/gallery/GalleryPageHero/GalleryPageHero';
import GalleryQuotationCTA from '../components/gallery/GalleryQuotationCTA/GalleryQuotationCTA';

function GalleryPage() {
  return (
    <>
      <GalleryPageHero />
      <GalleryNotice />
      <GalleryGrid />
      <GalleryQuotationCTA />
    </>
  );
}

export default GalleryPage;
