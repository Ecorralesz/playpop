import { Col, Container, Row } from 'react-bootstrap';

import ProductCard from '../../common/ProductCard/ProductCard';
import featuredInflatables from '../../../data/featuredInflatables';
import './FeaturedInflatables.css';

function FeaturedInflatables() {
  return (
    <section className="featured-inflatables" aria-labelledby="featured-inflatables-heading">
      <Container className="featured-inflatables__container">
        <header className="featured-inflatables__header">
          <p className="featured-inflatables__eyebrow">Diversión para todos</p>
          <h2 className="featured-inflatables__heading" id="featured-inflatables-heading">
            Nuestros inflables más populares
          </h2>
          <p className="featured-inflatables__description">
            Descubre algunas opciones ideales para cumpleaños, fiestas y eventos especiales.
          </p>
        </header>

        <Row className="g-4">
          {featuredInflatables.map((product) => (
            <Col className="d-flex" key={product.id} md={6} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturedInflatables;
