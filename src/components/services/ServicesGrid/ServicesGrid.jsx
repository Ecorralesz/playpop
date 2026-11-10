import { Container } from 'react-bootstrap';
import CardGrid from '../../common/CardGrid/CardGrid';
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
        <CardGrid columns={2}>
          {snacks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CardGrid>
      </Container>
    </section>
  );
}
export default ServicesGrid;
