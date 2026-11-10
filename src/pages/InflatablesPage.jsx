import CatalogQuotationCTA from '../components/catalog/CatalogQuotationCTA/CatalogQuotationCTA';
import InflatablesGrid from '../components/catalog/InflatablesGrid/InflatablesGrid';
import InflatablesPageHero from '../components/catalog/InflatablesPageHero/InflatablesPageHero';

function InflatablesPage() {
  return (
    <>
      <InflatablesPageHero />
      <InflatablesGrid />
      <CatalogQuotationCTA />
    </>
  );
}

export default InflatablesPage;
