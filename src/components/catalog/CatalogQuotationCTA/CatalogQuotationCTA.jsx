import { Button, Container } from 'react-bootstrap';

import { WHATSAPP_URL } from '../../../config/contact';
import './CatalogQuotationCTA.css';

function CatalogQuotationCTA() {
  return (
    <section className="catalog-quotation-cta" aria-labelledby="catalog-quotation-heading">
      <Container className="catalog-quotation-cta__container">
        <div className="catalog-quotation-cta__content">
          <h2 className="catalog-quotation-cta__heading" id="catalog-quotation-heading">
            ¿Encontraste una opción para tu celebración?
          </h2>
          <p className="catalog-quotation-cta__description">
            Escríbenos por WhatsApp para consultar disponibilidad y recibir una cotización según los
            detalles de tu evento.
          </p>
          <Button href={WHATSAPP_URL} rel="noreferrer" target="_blank" variant="light">
            <i className="bi bi-whatsapp" aria-hidden="true" />
            Cotizar por WhatsApp
            <span className="visually-hidden"> (abre en una nueva pestaña)</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default CatalogQuotationCTA;
