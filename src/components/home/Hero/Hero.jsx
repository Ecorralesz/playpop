import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router';

import playPopLogo from '../../../assets/images/playpop-logo.png';
import { WHATSAPP_URL } from '../../../config/contact';
import './Hero.css';

const trustItems = [
  { icon: 'bi-calendar2-check', text: 'Reserva con 50%' },
  { icon: 'bi-phone', text: 'Pago por SINPE Móvil' },
  {
    icon: 'bi-geo-alt',
    text: 'Cobertura en GAM, Occidente y Pérez Zeledón',
  },
];

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Container className="hero__container">
        <Row className="align-items-center gy-5">
          <Col lg={7} xl={6}>
            <div className="hero__content">
              <p className="hero__eyebrow">Diversión para momentos inolvidables</p>
              <h1 className="hero__heading" id="hero-heading">
                Haz que su celebración sea inolvidable
              </h1>
              <p className="hero__description">
                Inflables, juegos y paquetes para cumpleaños y eventos especiales. Llevamos
                diversión segura y colorida hasta su celebración.
              </p>

              <div className="hero__actions">
                <Button
                  className="hero__primary-action"
                  href={WHATSAPP_URL}
                  rel="noreferrer"
                  target="_blank"
                  variant="success"
                >
                  <i className="bi bi-whatsapp" aria-hidden="true" />
                  Cotizar por WhatsApp
                  <span className="visually-hidden"> (abre en una nueva pestaña)</span>
                </Button>
                <Button
                  as={Link}
                  className="hero__secondary-action"
                  to="/inflables"
                  variant="outline-primary"
                >
                  Ver inflables
                </Button>
              </div>

              <ul className="hero__trust-list" aria-label="Información de reserva y cobertura">
                {trustItems.map(({ icon, text }) => (
                  <li className="hero__trust-item" key={text}>
                    <i className={`bi ${icon}`} aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col lg={5} xl={{ span: 5, offset: 1 }}>
            <div className="hero__visual">
              <span className="hero__accent hero__accent--top" aria-hidden="true" />
              <span className="hero__accent hero__accent--bottom" aria-hidden="true" />
              <img
                className="hero__image"
                src={playPopLogo}
                alt="Logo de PlayPop con un castillo inflable, rueda de la fortuna y juegos para fiestas infantiles"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
