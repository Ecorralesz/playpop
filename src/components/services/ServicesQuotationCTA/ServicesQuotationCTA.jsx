import { Button, Container } from 'react-bootstrap';

import { WHATSAPP_URL } from '../../../config/contact';
import './ServicesQuotationCTA.css';

function ServicesQuotationCTA() {
  return (
    <section className="services-quotation-cta" aria-labelledby="services-quotation-heading">
      <Container className="services-quotation-cta__container">
        <div className="services-quotation-cta__content">
          <h2 className="services-quotation-cta__heading" id="services-quotation-heading">
            ¿Quieres complementar tu evento?
          </h2>
          <p className="services-quotation-cta__description">
            Escríbenos por WhatsApp para consultar cuáles servicios podrían acompañar tu
            celebración.
          </p>
          <Button href={WHATSAPP_URL} rel="noreferrer" target="_blank" variant="light">
            <i className="bi bi-whatsapp" aria-hidden="true" />
            Cotizar por WhatsApp
            <span className="visually-hidden"> (abre en una nueva pestaña)</span>
          </Button>
          <p className="services-quotation-cta__disclaimer">
            Enviar una solicitud no confirma la reservación.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default ServicesQuotationCTA;
