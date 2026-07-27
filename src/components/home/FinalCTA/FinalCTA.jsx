import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { WHATSAPP_URL } from '../../../config/contact';
import './FinalCTA.css';

const trustItems = [
  'Atención personalizada',
  'Cotización sin compromiso',
  'Opciones para diferentes celebraciones',
];

function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-heading">
      <Container className="final-cta__container">
        <Row className="align-items-center gy-5">
          <Col md={7} lg={7}>
            <div className="final-cta__content">
              <p className="final-cta__eyebrow">¿Listo para celebrar?</p>
              <h2 className="final-cta__heading" id="final-cta-heading">
                Hagamos realidad tu próximo evento
              </h2>
              <p className="final-cta__description">
                Cuéntanos qué celebración estás organizando y con gusto te ayudaremos a encontrar la
                mejor opción para ese día.
              </p>

              <div className="final-cta__actions">
                <Button
                  className="final-cta__primary-action"
                  href={WHATSAPP_URL}
                  rel="noreferrer"
                  target="_blank"
                  variant="light"
                >
                  <i className="bi bi-whatsapp" aria-hidden="true" />
                  Cotizar por WhatsApp
                  <span className="visually-hidden"> (abre en una nueva pestaña)</span>
                </Button>
                <Button
                  as={Link}
                  className="final-cta__secondary-action"
                  to="/inflables"
                  variant="outline-light"
                >
                  Ver inflables
                </Button>
              </div>

              <ul className="final-cta__trust-list" aria-label="Beneficios de cotizar con PlayPop">
                {trustItems.map((item) => (
                  <li className="final-cta__trust-item" key={item}>
                    <i className="bi bi-check-circle-fill" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col md={5} lg={5}>
            <div className="final-cta__visual" aria-hidden="true">
              <span className="final-cta__confetti final-cta__confetti--one" />
              <span className="final-cta__confetti final-cta__confetti--two" />
              <span className="final-cta__confetti final-cta__confetti--three" />
              <div className="final-cta__balloon final-cta__balloon--left" />
              <div className="final-cta__balloon final-cta__balloon--right" />
              <div className="final-cta__castle">
                <span className="final-cta__flag" />
                <span className="final-cta__tower final-cta__tower--left" />
                <span className="final-cta__tower final-cta__tower--right" />
                <span className="final-cta__door" />
              </div>
              <span className="final-cta__ground" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default FinalCTA;
