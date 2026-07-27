import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { WHATSAPP_URL } from '../../../config/contact';
import './ServicesPageHero.css';

function ServicesPageHero() {
  return (
    <section className="services-page-hero" aria-labelledby="services-page-heading">
      <Container className="services-page-hero__container">
        <Row className="align-items-center gy-4">
          <Col lg={8}>
            <p className="services-page-hero__eyebrow">Más diversión para tu celebración</p>
            <h1 className="services-page-hero__heading" id="services-page-heading">
              Servicios para complementar tu evento
            </h1>
            <p className="services-page-hero__description">
              Explora opciones preliminares de juegos, snacks y experiencias estilo carnaval para
              acompañar tu celebración.
            </p>
            <div className="services-page-hero__actions">
              <Button href={WHATSAPP_URL} rel="noreferrer" target="_blank" variant="success">
                <i className="bi bi-whatsapp" aria-hidden="true" />
                Cotizar por WhatsApp
                <span className="visually-hidden"> (abre en una nueva pestaña)</span>
              </Button>
              <Button as={Link} to="/" variant="outline-primary">
                Volver al inicio
              </Button>
            </div>
          </Col>
          <Col lg={4}>
            <div className="services-page-hero__visual" aria-hidden="true">
              <i className="bi bi-stars" />
              <i className="bi bi-joystick" />
              <i className="bi bi-ticket-perforated" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ServicesPageHero;
