import { Container } from 'react-bootstrap';
import CardGrid from '../../common/CardGrid/CardGrid';

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
          description="Cuatro opciones con precios por duración de 2 a 5 horas. La duración estándar es de 3 horas; instalación y retiro incluidos."
          headingId="inflatables-grid-heading"
        />

        <aside className="inflatables-grid__notice" aria-label="Información sobre el catálogo">
          <i className="bi bi-info-circle-fill" aria-hidden="true" />
          <p>
            El costo de transporte se calcula según la ubicación del evento y se agrega a la
            cotización final. La disponibilidad debe confirmarse con PlayPop.
          </p>
        </aside>

        <CardGrid columns={2}>
          {inflatables.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CardGrid>
      </Container>
    </section>
  );
}

export default InflatablesGrid;
