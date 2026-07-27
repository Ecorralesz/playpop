import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { WHATSAPP_URL } from '../../../config/contact';
import './GalleryPageHero.css';

function GalleryPageHero() {
  return (
    <section className="gallery-page-hero" aria-labelledby="gallery-page-heading">
      <Container className="gallery-page-hero__container">
        <Row className="align-items-center gy-4">
          <Col lg={8}>
            <p className="gallery-page-hero__eyebrow">Momentos para recordar</p>
            <h1 className="gallery-page-hero__heading" id="gallery-page-heading">
              Inspírate para tu próxima celebración
            </h1>
            <p className="gallery-page-hero__description">
              Explora una muestra ilustrativa de los espacios, colores y experiencias que queremos
              crear en cada evento.
            </p>
            <div className="gallery-page-hero__actions">
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
            <div className="gallery-page-hero__visual" aria-hidden="true">
              <i className="bi bi-camera" />
              <i className="bi bi-stars" />
              <i className="bi bi-balloon-heart" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default GalleryPageHero;
