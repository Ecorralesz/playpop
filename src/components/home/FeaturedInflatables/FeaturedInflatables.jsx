import { Col, Container, Row } from 'react-bootstrap';

import ProductCard from '../../common/ProductCard/ProductCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { getProductsByCategory } from '../../../data/products';
import './FeaturedInflatables.css';

function FeaturedInflatables() {
  const inflatables = getProductsByCategory('inflatable');
  const featuredInflatables = [
    'inflable-con-tobogan',
    'castillo-inflable',
    'inflable-deportivo-3-en-1',
    'baby-gym',
  ]
    .map((slug) => inflatables.find((product) => product.slug === slug))
    .filter(Boolean);
  return (
    <section className="featured-inflatables" aria-labelledby="featured-inflatables-heading">
      <Container className="featured-inflatables__container">
        <SectionHeader
          eyebrow="Diversión para todos"
          title="Nuestros inflables más populares"
          description="Descubre algunas opciones ideales para cumpleaños, fiestas y eventos especiales."
          headingId="featured-inflatables-heading"
        />

        <Row className="g-4">
          {featuredInflatables.map((product) => (
            <Col className="d-flex" key={product.id} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturedInflatables;
