import { Container } from 'react-bootstrap';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import './CoverageArea.css';

const areas = ['Gran Área Metropolitana (GAM)', 'Occidente', 'Pérez Zeledón'];
function CoverageArea() {
  return (
    <section className="coverage-area" aria-labelledby="coverage-area-heading">
      <Container className="coverage-area__container">
        <SectionHeader
          eyebrow="Dónde trabajamos"
          title="Áreas de cobertura"
          description="La disponibilidad y el costo de transporte dependen de la ubicación, el equipo seleccionado y las condiciones del lugar."
          headingId="coverage-area-heading"
        />
        <ul className="coverage-area__list">
          {areas.map((area) => (
            <li key={area}>
              <i className="bi bi-geo-alt-fill" aria-hidden="true" />
              {area}
            </li>
          ))}
        </ul>
        <p className="coverage-area__notice">
          <i className="bi bi-truck" aria-hidden="true" />
          El transporte es pagado por el cliente y debe confirmarse como parte de la cotización
          final.
        </p>
      </Container>
    </section>
  );
}
export default CoverageArea;
