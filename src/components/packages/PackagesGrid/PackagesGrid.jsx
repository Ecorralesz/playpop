import { Col, Container, Row } from 'react-bootstrap';

import PackageCard from '../../common/PackageCard/PackageCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import packages from '../../../data/packages';
import './PackagesGrid.css';

function PackagesGrid() {
  return (
    <section className="packages-grid" aria-labelledby="packages-grid-heading">
      <Container className="packages-grid__container">
        <SectionHeader
          eyebrow="Opciones para diferentes celebraciones"
          title="Nuestros paquetes"
          description="Estas opciones son preliminares mientras confirmamos contenidos, fotografías y precios finales."
          headingId="packages-grid-heading"
        />

        <aside className="packages-grid__notice" aria-label="Información sobre los paquetes">
          <i className="bi bi-info-circle-fill" aria-hidden="true" />
          <p>
            Los contenidos, la disponibilidad, el transporte y el precio final de cada paquete deben
            ser confirmados directamente por PlayPop.
          </p>
        </aside>

        <Row className="g-4">
          {packages.map((packageData) => (
            <Col className="d-flex" key={packageData.id} md={6} xl={3}>
              <PackageCard packageData={packageData} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default PackagesGrid;
