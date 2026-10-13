import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CategoryFilters from '../components/common/CategoryFilters/CategoryFilters';
import ProductCard from '../components/common/ProductCard/ProductCard';
import CatalogQuotationCTA from '../components/catalog/CatalogQuotationCTA/CatalogQuotationCTA';
import { getProductsByCategory } from '../data/products';
import { gameTierLabels } from '../data/pricing';

const filters = [
  { id: 'all', label: 'Todos' },
  ...Object.entries(gameTierLabels).map(([id, label]) => ({ id, label })),
];

function GamesPage() {
  const [tier, setTier] = useState('all');
  const games = getProductsByCategory('game').filter(
    (product) => tier === 'all' || product.tier === tier,
  );
  return (
    <>
      <section className="py-5" aria-labelledby="games-heading">
        <Container>
          <p className="text-primary fw-semibold">Diversión por turnos</p>
          <h1 id="games-heading">Juegos PlayPop</h1>
          <p>
            Conoce nuestros juegos estándar y premium. Alquiler estándar de 3 horas; selección
            sujeta a disponibilidad.
          </p>
          <CategoryFilters
            options={filters}
            value={tier}
            onChange={setTier}
            label="Filtrar juegos"
          />
          <p className="visually-hidden" role="status">
            {games.length} juegos en esta categoría.
          </p>
          <Row className="g-4">
            {games.map((product) => (
              <Col className="d-flex" key={product.id} md={6} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <CatalogQuotationCTA />
    </>
  );
}
export default GamesPage;
