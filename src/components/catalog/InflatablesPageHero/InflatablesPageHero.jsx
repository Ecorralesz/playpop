import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { WHATSAPP_URL } from '../../../config/contact';
import './InflatablesPageHero.css';

function InflatablesPageHero() {
  return (
    <section className="inflatables-page-hero" aria-labelledby="inflatables-page-heading">
      <Container className="inflatables-page-hero__container">
        <Row className="align-items-center gy-4">
          <Col lg={8}>
            <p className="inflatables-page-hero__eyebrow">Diversión para cada celebración</p>
            <h1 className="inflatables-page-hero__heading" id="inflatables-page-heading">
              Encuentra el inflable ideal para tu evento
            </h1>
            <p className="inflatables-page-hero__description">
              Explora nuestras opciones y solicita una cotización para confirmar disponibilidad,
              transporte y condiciones de instalación.
            </p>
            <div className="inflatables-page-hero__actions">
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
            <div className="inflatables-page-hero__visual" aria-hidden="true">
              <i className="bi bi-stars" />
              <i className="bi bi-balloon-heart" />
              <i className="bi bi-emoji-smile" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default InflatablesPageHero;
