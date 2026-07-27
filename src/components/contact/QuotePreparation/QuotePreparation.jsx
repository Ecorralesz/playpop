import { Container } from 'react-bootstrap';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import './QuotePreparation.css';

const details = [
  ['bi-calendar-event', 'Fecha del evento'],
  ['bi-clock', 'Hora aproximada'],
  ['bi-geo-alt', 'Ubicación'],
  ['bi-balloon', 'Tipo de celebración'],
  ['bi-stars', 'Productos o servicios de interés'],
];
function QuotePreparation() {
  return (
    <section className="quote-preparation" aria-labelledby="quote-preparation-heading">
      <Container className="quote-preparation__container">
        <SectionHeader
          eyebrow="Antes de escribirnos"
          title="Información útil para preparar tu cotización"
          description="Compartir estos datos desde el inicio nos ayuda a entender mejor tu evento."
          headingId="quote-preparation-heading"
        />
        <ul className="quote-preparation__list">
          {details.map(([icon, label]) => (
            <li key={label}>
              <i className={`bi ${icon}`} aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
export default QuotePreparation;
