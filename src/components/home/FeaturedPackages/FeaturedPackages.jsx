import { Col, Container, Row } from 'react-bootstrap';

import PackageCard from '../../common/PackageCard/PackageCard';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import featuredPackages from '../../../data/packages';
import './FeaturedPackages.css';

function FeaturedPackages() {
  return (
    <section className="featured-packages" aria-labelledby="featured-packages-heading">
      <Container className="featured-packages__container">
        <SectionHeader
          eyebrow="Celebra sin complicaciones"
          title="Paquetes para momentos inolvidables"
          description="Opciones pensadas para combinar diversión y facilitar la organización de tu evento."
          headingId="featured-packages-heading"
        />

        <Row className="g-4">
          {featuredPackages.map((packageData) => (
            <Col className="d-flex" key={packageData.id} md={6} lg={4}>
              <PackageCard packageData={packageData} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturedPackages;
