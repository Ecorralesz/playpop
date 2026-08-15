import { Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../../common/ProductCard/ProductCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { getProductsByCategory } from '../../../data/products';
import './ServicesGrid.css';

function ServicesGrid() {
  const games = getProductsByCategory('game');
  const snacks = getProductsByCategory('snack');
  return (
    <section className="services-grid" aria-labelledby="services-grid-heading">
      <Container className="services-grid__container">
        <SectionHeader
          eyebrow="Opciones para complementar"
          title="Juegos y snacks"
          description="Conoce los juegos de cortesía, juegos premium y snacks reales de PlayPop."
          headingId="services-grid-heading"
        />
        <h3 className="mt-4">Juegos</h3>
        <Row className="g-4">
          {games.map((product) => (
            <Col className="d-flex" key={product.id} md={6} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        <h3 className="mt-5">Snacks</h3>
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
