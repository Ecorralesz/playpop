import { Button, Container } from 'react-bootstrap';

import { WHATSAPP_URL } from '../../../config/contact';
import './GalleryQuotationCTA.css';

function GalleryQuotationCTA() {
  return (
    <section className="gallery-quotation-cta" aria-labelledby="gallery-quotation-heading">
      <Container className="gallery-quotation-cta__container">
        <div className="gallery-quotation-cta__content">
          <h2 className="gallery-quotation-cta__heading" id="gallery-quotation-heading">
            ¿Quieres crear un momento especial?
          </h2>
          <p className="gallery-quotation-cta__description">
            Escríbenos por WhatsApp y cuéntanos qué tipo de celebración estás organizando para
            ayudarte a revisar las opciones disponibles.
          </p>
          <Button href={WHATSAPP_URL} rel="noreferrer" target="_blank" variant="light">
            <i className="bi bi-whatsapp" aria-hidden="true" />
            Cotizar por WhatsApp
            <span className="visually-hidden"> (abre en una nueva pestaña)</span>
          </Button>
          <p className="gallery-quotation-cta__disclaimer">
            Enviar una solicitud no confirma la reservación.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default GalleryQuotationCTA;
