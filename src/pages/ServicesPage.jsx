import ServicesGrid from '../components/services/ServicesGrid/ServicesGrid';
import ServicesPageHero from '../components/services/ServicesPageHero/ServicesPageHero';
import ServicesProcess from '../components/services/ServicesProcess/ServicesProcess';
import ServicesQuotationCTA from '../components/services/ServicesQuotationCTA/ServicesQuotationCTA';

function ServicesPage() {
  return (
    <>
      <ServicesPageHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesQuotationCTA />
    </>
  );
}

export default ServicesPage;
