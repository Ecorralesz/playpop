import { Container } from 'react-bootstrap';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { businessRules } from '../../../data/businessRules';
import './CoverageArea.css';

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
          {businessRules.transportation.coverageAreas.map((area) => (
            <li key={area}>
              <i className="bi bi-geo-alt-fill" aria-hidden="true" />
              {area}
            </li>
          ))}
        </ul>
        <p className="coverage-area__notice">
          <i className="bi bi-truck" aria-hidden="true" />
          {businessRules.transportation.notice}
        </p>
      </Container>
    </section>
  );
}
export default CoverageArea;
