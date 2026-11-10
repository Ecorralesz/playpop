import { Col, Container, Row } from 'react-bootstrap';

import SectionHeader from '../../common/SectionHeader/SectionHeader';
import './PackagesProcess.css';

const steps = [
  {
    id: 'event',
    icon: 'bi-calendar-event',
    title: 'Cuéntanos sobre tu evento',
    description: 'Comparte la fecha, ubicación y tipo de celebración.',
  },
  {
    id: 'review',
    icon: 'bi-search-heart',
    title: 'Revisamos las opciones',
    description: 'PlayPop confirma disponibilidad, transporte y condiciones aplicables.',
  },
  {
    id: 'quotation',
    icon: 'bi-chat-heart',
    title: 'Recibe tu cotización',
    description: 'Te enviamos la información final para que puedas decidir.',
  },
];

function PackagesProcess() {
  return (
    <section className="packages-process" aria-labelledby="packages-process-heading">
      <Container className="packages-process__container">
        <SectionHeader
          eyebrow="Un proceso sencillo"
          title="¿Cómo solicitar un paquete?"
          description="Cuéntanos los detalles de tu celebración y te ayudaremos a revisar las opciones disponibles."
          headingId="packages-process-heading"
        />

        <Row className="g-4">
          {steps.map((step, index) => (
            <Col className="d-flex" key={step.id} md={4}>
              <article className="packages-process__step">
                <div className="packages-process__step-header">
                  <span className="packages-process__number" aria-hidden="true">
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

export default PackagesProcess;
