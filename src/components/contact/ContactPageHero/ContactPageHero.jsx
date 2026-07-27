import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { WHATSAPP_URL } from '../../../config/contact';
import './ContactPageHero.css';

function ContactPageHero() {
  return (
    <section className="contact-page-hero" aria-labelledby="contact-page-heading">
      <Container className="contact-page-hero__container">
        <Row className="align-items-center gy-4">
          <Col lg={8}>
            <p className="contact-page-hero__eyebrow">Estamos para ayudarte</p>
            <h1 className="contact-page-hero__heading" id="contact-page-heading">
              Hablemos sobre tu próximo evento
            </h1>
            <p className="contact-page-hero__description">
              Cuéntanos qué estás organizando y revisaremos contigo las opciones disponibles para tu
              celebración.
            </p>
            <div className="contact-page-hero__actions">
              <Button href={WHATSAPP_URL} rel="noreferrer" target="_blank" variant="success">
                <i className="bi bi-whatsapp" aria-hidden="true" /> Escribir por WhatsApp
                <span className="visually-hidden"> (abre en una nueva pestaña)</span>
              </Button>
              <Button as={Link} to="/" variant="outline-primary">
                Volver al inicio
              </Button>
            </div>
          </Col>
          <Col lg={4}>
            <div className="contact-page-hero__visual" aria-hidden="true">
              <i className="bi bi-chat-heart" />
              <i className="bi bi-stars" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactPageHero;
