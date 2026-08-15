import { Col, Container, Row } from 'react-bootstrap';

import ProductCard from '../../common/ProductCard/ProductCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { getProductsByCategory } from '../../../data/products';
import './InflatablesGrid.css';

function InflatablesGrid() {
  const inflatables = getProductsByCategory('inflatable');
  return (
    <section className="inflatables-grid" aria-labelledby="inflatables-grid-heading">
      <Container className="inflatables-grid__container">
        <SectionHeader
          eyebrow="Opciones para tu evento"
          title="Nuestro catálogo de inflables"
          description="Tres opciones reales para disfrutar durante 3 horas, con beneficios de juegos de cortesía."
          headingId="inflatables-grid-heading"
        />

        <aside className="inflatables-grid__notice" aria-label="Información sobre el catálogo">
          <i className="bi bi-info-circle-fill" aria-hidden="true" />
          <p>
            El costo de transporte se calcula según la ubicación del evento y se agrega a la
            cotización final. La disponibilidad debe confirmarse con PlayPop.
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
