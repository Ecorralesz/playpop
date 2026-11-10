import PackagesGrid from '../components/packages/PackagesGrid/PackagesGrid';
import PackagesPageHero from '../components/packages/PackagesPageHero/PackagesPageHero';
import PackagesProcess from '../components/packages/PackagesProcess/PackagesProcess';
import PackagesQuotationCTA from '../components/packages/PackagesQuotationCTA/PackagesQuotationCTA';

function PackagesPage() {
  return (
    <>
      <PackagesPageHero />
      <PackagesGrid />
      <PackagesProcess />
      <PackagesQuotationCTA />
    </>
  );
}

export default PackagesPage;
