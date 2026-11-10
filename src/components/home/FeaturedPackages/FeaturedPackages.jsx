import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CardGrid from '../../common/CardGrid/CardGrid';

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

        <CardGrid columns={3}>
          {featuredPackages.map((packageData) => (
            <PackageCard key={packageData.id} packageData={packageData} />
          ))}
        </CardGrid>
        <Link className="btn btn-outline-primary mt-4" to="/paquetes">
          Ver todos los paquetes
        </Link>
      </Container>
    </section>
  );
}

export default FeaturedPackages;
