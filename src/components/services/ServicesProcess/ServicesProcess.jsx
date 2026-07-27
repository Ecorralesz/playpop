import { Col, Container, Row } from 'react-bootstrap';

import SectionHeader from '../../common/SectionHeader/SectionHeader';
import './ServicesProcess.css';

const steps = [
  {
    id: 'details',
    icon: 'bi-calendar-event',
    title: 'Comparte los detalles',
    description: 'Indica la fecha, ubicación y tipo de celebración.',
  },
  {
    id: 'options',
    icon: 'bi-stars',
    title: 'Elige opciones',
    description: 'Revisa los servicios preliminares que podrían acompañar tu evento.',
  },
  {
    id: 'quotation',
    icon: 'bi-chat-heart',
    title: 'Recibe la cotización',
    description: 'PlayPop confirma disponibilidad, condiciones y precio final.',
  },
];

function ServicesProcess() {
  return (
    <section className="services-process" aria-labelledby="services-process-heading">
      <Container className="services-process__container">
        <SectionHeader
          eyebrow="Un proceso sencillo"
          title="¿Cómo agregar servicios a tu celebración?"
          description="Cuéntanos qué estás organizando y revisaremos contigo las opciones que podrían complementar tu evento."
          headingId="services-process-heading"
        />

        <Row className="g-4">
          {steps.map((step, index) => (
            <Col className="d-flex" key={step.id} md={4}>
              <article className="services-process__step">
                <div className="services-process__step-header">
                  <span className="services-process__number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <i className={`bi ${step.icon}`} aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ServicesProcess;
