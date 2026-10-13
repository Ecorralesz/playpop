import { Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../../common/ProductCard/ProductCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { getProductsByCategory } from '../../../data/products';
import './ServicesGrid.css';

function ServicesGrid() {
  const snacks = getProductsByCategory('snack');
  return (
    <section className="services-grid" aria-labelledby="services-grid-heading">
      <Container className="services-grid__container">
        <SectionHeader
          eyebrow="Opciones para complementar"
          title="Palomitas y algodón de azúcar"
          description="Consulta precios, pedidos mínimos y preparación de cada producto."
          headingId="services-grid-heading"
        />
        <Row className="g-4">
          {snacks.map((product) => (
            <Col className="d-flex" key={product.id} md={6} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
export default ServicesGrid;
