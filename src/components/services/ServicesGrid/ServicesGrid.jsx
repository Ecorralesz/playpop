import { Col, Container, Row } from 'react-bootstrap';

import ServiceCard from '../../common/ServiceCard/ServiceCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import services from '../../../data/services';
import './ServicesGrid.css';

function ServicesGrid() {
  return (
    <section className="services-grid" aria-labelledby="services-grid-heading">
      <Container className="services-grid__container">
        <SectionHeader
          eyebrow="Opciones para complementar"
          title="Nuestros servicios"
          description="Estas opciones son preliminares mientras confirmamos detalles, disponibilidad y condiciones finales."
          headingId="services-grid-heading"
        />

        <aside className="services-grid__notice" aria-label="Información sobre los servicios">
          <i className="bi bi-info-circle-fill" aria-hidden="true" />
          <p>
            Los detalles, la disponibilidad, el transporte y el precio final de cada servicio deben
            confirmarse directamente con PlayPop.
          </p>
        </aside>

        <Row className="g-4">
          {services.map((service) => (
            <Col className="d-flex" key={service.id} md={6} xl={3}>
              <ServiceCard service={service} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ServicesGrid;
