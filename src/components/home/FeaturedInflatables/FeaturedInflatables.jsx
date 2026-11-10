import { Container } from 'react-bootstrap';
import CardGrid from '../../common/CardGrid/CardGrid';

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

        <CardGrid columns={2}>
          {featuredInflatables.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CardGrid>
      </Container>
    </section>
  );
}

export default FeaturedInflatables;
