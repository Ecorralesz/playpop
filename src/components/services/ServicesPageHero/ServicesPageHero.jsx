import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { GENERAL_QUOTATION_URL } from '../../../config/contact';
import './ServicesPageHero.css';

function ServicesPageHero() {
  return (
    <section className="services-page-hero" aria-labelledby="services-page-heading">
      <Container className="services-page-hero__container">
        <Row className="align-items-center gy-4">
          <Col lg={8}>
            <p className="services-page-hero__eyebrow">Un detalle para compartir</p>
            <h1 className="services-page-hero__heading" id="services-page-heading">
              Snacks para tu evento
            </h1>
            <p className="services-page-hero__description">
              Palomitas de maíz preparadas frescas durante el evento y algodón de azúcar preparado y
              empacado previamente por PlayPop.
            </p>
            <div className="services-page-hero__actions">
              <Button
                href={GENERAL_QUOTATION_URL}
                rel="noreferrer"
                target="_blank"
                variant="success"
              >
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
              <i className="bi bi-cup-straw" />
              <i className="bi bi-basket" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ServicesPageHero;
