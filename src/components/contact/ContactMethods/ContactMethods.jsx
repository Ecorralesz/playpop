import { Container } from 'react-bootstrap';
import CardGrid from '../../common/CardGrid/CardGrid';
import ContactMethodCard from '../../common/ContactMethodCard/ContactMethodCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import contactMethods from '../../../data/contactMethods';
import './ContactMethods.css';

function ContactMethods() {
  return (
    <section className="contact-methods" aria-labelledby="contact-methods-heading">
      <Container className="contact-methods__container">
        <SectionHeader
          eyebrow="Elige cómo contactarnos"
          title="Canales de contacto"
          description="WhatsApp es actualmente el medio principal para solicitar información y cotizaciones."
          headingId="contact-methods-heading"
        />
        <CardGrid columns={2} equalRows>
          {contactMethods.map((method) => (
            <ContactMethodCard key={method.id} method={method} />
          ))}
        </CardGrid>
      </Container>
    </section>
  );
}
export default ContactMethods;
