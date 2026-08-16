import { Col, Container, Row } from 'react-bootstrap';
import PackageCard from '../../common/PackageCard/PackageCard';
import ProductCard from '../../common/ProductCard/ProductCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import packages from '../../../data/packages';
import { getProductsByCategory } from '../../../data/products';
import './PackagesGrid.css';

function PackagesGrid() {
  return (
    <section className="packages-grid" aria-labelledby="packages-grid-heading">
      <Container className="packages-grid__container">
        <SectionHeader
          eyebrow="Combinaciones para celebrar"
          title="Nuestros paquetes"
          description="Paquetes reales para combinar inflables, juegos y snacks durante 3 horas."
          headingId="packages-grid-heading"
        />
        <aside className="packages-grid__notice">
          <i className="bi bi-info-circle-fill" aria-hidden="true" />
          <p>
            El transporte se calcula según la ubicación y se agrega a la cotización. Los juegos se
            eligen sujetos a disponibilidad.
          </p>
        </aside>
        <Row className="g-4">
          {packages.map((item) => (
            <Col className="d-flex" key={item.id} md={6} lg={4}>
              <PackageCard packageData={item} />
            </Col>
          ))}
        </Row>
        <div className="mt-5">
          <SectionHeader
            eyebrow="Alquiler estándar"
            title="Ofertas de inflables"
            description="Cada inflable conserva su precio normal y los juegos de cortesía indicados."
            headingId="inflatable-offers-heading"
          />
        </div>
        <Row className="g-4">
          {getProductsByCategory('inflatable').map((product) => (
            <Col className="d-flex" key={product.id} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
export default PackagesGrid;
