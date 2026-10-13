import Hero from '../components/home/Hero/Hero';
import FeaturedInflatables from '../components/home/FeaturedInflatables/FeaturedInflatables';
import FeaturedPackages from '../components/home/FeaturedPackages/FeaturedPackages';
import WhyChoosePlayPop from '../components/home/WhyChoosePlayPop/WhyChoosePlayPop';
import GalleryPreview from '../components/home/GalleryPreview/GalleryPreview';
import FinalCTA from '../components/home/FinalCTA/FinalCTA';
import VideoReels from '../components/home/VideoReels/VideoReels';

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedInflatables />
      <FeaturedPackages />
      <WhyChoosePlayPop />
      <GalleryPreview />
      <VideoReels />
      <FinalCTA />
    </>
  );
}

export default HomePage;
