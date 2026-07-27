import { Button, Container } from 'react-bootstrap';

import { WHATSAPP_URL } from '../../../config/contact';
import './PackagesQuotationCTA.css';

function PackagesQuotationCTA() {
  return (
    <section className="packages-quotation-cta" aria-labelledby="packages-quotation-heading">
      <Container className="packages-quotation-cta__container">
        <div className="packages-quotation-cta__content">
          <h2 className="packages-quotation-cta__heading" id="packages-quotation-heading">
            ¿Quieres conocer las opciones para tu evento?
          </h2>
          <p className="packages-quotation-cta__description">
            Escríbenos por WhatsApp para revisar los paquetes disponibles según la fecha, ubicación
            y necesidades de tu celebración.
          </p>
          <Button href={WHATSAPP_URL} rel="noreferrer" target="_blank" variant="light">
            <i className="bi bi-whatsapp" aria-hidden="true" />
            Cotizar por WhatsApp
            <span className="visually-hidden"> (abre en una nueva pestaña)</span>
          </Button>
          <p className="packages-quotation-cta__disclaimer">
            Enviar una solicitud no confirma la reservación.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default PackagesQuotationCTA;
