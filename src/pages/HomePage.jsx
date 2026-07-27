import Hero from '../components/home/Hero/Hero';
import FeaturedInflatables from '../components/home/FeaturedInflatables/FeaturedInflatables';
import FeaturedPackages from '../components/home/FeaturedPackages/FeaturedPackages';
import WhyChoosePlayPop from '../components/home/WhyChoosePlayPop/WhyChoosePlayPop';

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedInflatables />
      <FeaturedPackages />
      <WhyChoosePlayPop />
    </>
  );
}

export default HomePage;
