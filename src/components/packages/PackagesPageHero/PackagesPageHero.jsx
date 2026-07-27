import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { WHATSAPP_URL } from '../../../config/contact';
import './PackagesPageHero.css';

function PackagesPageHero() {
  return (
    <section className="packages-page-hero" aria-labelledby="packages-page-heading">
      <Container className="packages-page-hero__container">
        <Row className="align-items-center gy-4">
          <Col lg={8}>
            <p className="packages-page-hero__eyebrow">Opciones para celebrar</p>
            <h1 className="packages-page-hero__heading" id="packages-page-heading">
              Encuentra un paquete para tu evento
            </h1>
            <p className="packages-page-hero__description">
              Explora opciones preliminares y contáctanos para confirmar contenidos, disponibilidad,
              transporte y precio final.
            </p>
            <div className="packages-page-hero__actions">
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
            <div className="packages-page-hero__visual" aria-hidden="true">
              <i className="bi bi-gift" />
              <i className="bi bi-stars" />
              <i className="bi bi-balloon" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PackagesPageHero;
