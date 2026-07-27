import { Col, Container, Row } from 'react-bootstrap';
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
        <Row className="g-4">
          {contactMethods.map((method) => (
            <Col key={method.id} xs={12} md={6} xl={3}>
              <ContactMethodCard method={method} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
export default ContactMethods;
