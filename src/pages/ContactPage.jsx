import ContactMethods from '../components/contact/ContactMethods/ContactMethods';
import ContactPageHero from '../components/contact/ContactPageHero/ContactPageHero';
import ContactReservationNotice from '../components/contact/ContactReservationNotice/ContactReservationNotice';
import CoverageArea from '../components/contact/CoverageArea/CoverageArea';
import QuotePreparation from '../components/contact/QuotePreparation/QuotePreparation';

function ContactPage() {
  return (
    <>
      <ContactPageHero />
      <ContactMethods />
      <QuotePreparation />
      <CoverageArea />
      <ContactReservationNotice />
    </>
  );
}

export default ContactPage;
