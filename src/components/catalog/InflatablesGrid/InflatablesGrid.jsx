import { Col, Container, Row } from 'react-bootstrap';

import ProductCard from '../../common/ProductCard/ProductCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import inflatables from '../../../data/inflatables';
import './InflatablesGrid.css';

function InflatablesGrid() {
  return (
    <section className="inflatables-grid" aria-labelledby="inflatables-grid-heading">
      <Container className="inflatables-grid__container">
        <SectionHeader
          eyebrow="Opciones para tu evento"
          title="Nuestro catálogo de inflables"
          description="Estas opciones son ilustrativas mientras completamos el catálogo con fotografías y detalles confirmados."
          headingId="inflatables-grid-heading"
        />

        <aside className="inflatables-grid__notice" aria-label="Información sobre el catálogo">
          <i className="bi bi-info-circle-fill" aria-hidden="true" />
          <p>
            La disponibilidad, el transporte, las condiciones de instalación y el precio final deben
            ser confirmados directamente por PlayPop.
          </p>
        </aside>

        <Row className="g-4">
          {inflatables.map((product) => (
            <Col className="d-flex" key={product.id} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default InflatablesGrid;
