import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { businessRules } from '../data/businessRules';
import { formatColones, pricing } from '../data/pricing';
import { getProductBySlug } from '../data/products';
import { WHATSAPP_URL } from '../config/contact';
import '../components/catalog/ProductDetail/ProductDetail.css';

const categoryNames = { inflatable: 'Inflable', game: 'Juego', snack: 'Snack' };
function ProductDetailPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  if (!product)
    return (
      <Container className="py-5">
        <h1>Producto no encontrado</h1>
        <Link to="/servicios">Volver al catálogo</Link>
      </Container>
    );
  const extraHour =
    product.category === 'inflatable'
      ? pricing.additionalHour.inflatable
      : product.category === 'game'
        ? pricing.additionalHour[product.tier]
        : null;
  const quoteUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, deseo cotizar ${product.name}.`)}`;
  return (
    <main className="product-detail">
      <Container>
        <Row className="g-5 align-items-start">
          <Col lg={6}>
            <img className="product-detail__image" src={product.image} alt={product.imageAlt} />
          </Col>
          <Col lg={6}>
            <p className="product-detail__eyebrow">
              {categoryNames[product.category]}
              {product.tier ? ` · ${product.tier === 'courtesy' ? 'Cortesía' : 'Premium'}` : ''}
            </p>
            <h1>{product.name}</h1>
            {product.badge && (
              <p>
                <strong>{product.badge}</strong>
              </p>
            )}
            <dl className="product-detail__facts">
              <div className="product-detail__fact">
                <dt>Precio</dt>
                <dd>
                  {formatColones(product.price)}
                  {product.priceUnit ? ` ${product.priceUnit}` : ''}
                </dd>
              </div>
              <div className="product-detail__fact">
                <dt>Duración</dt>
                <dd>{product.rentalHours ? `${product.rentalHours} horas` : 'No aplica'}</dd>
              </div>
              <div className="product-detail__fact">
                <dt>Dimensiones</dt>
                <dd>{product.dimensions ?? 'Por confirmar'}</dd>
              </div>
              <div className="product-detail__fact">
                <dt>Edad / recomendación</dt>
                <dd>{product.ageRestriction ?? 'Por confirmar'}</dd>
              </div>
            </dl>
            {product.minimumQuantity && (
              <p>
                <strong>Cantidad mínima:</strong> {product.minimumQuantity} unidades
              </p>
            )}
            {product.preparation && (
              <>
                <h2>Preparación</h2>
                <p>{product.preparation}</p>
              </>
            )}
            <h2>Reglas de uso</h2>
            <ul>
              {product.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            {extraHour && (
              <p>
                <strong>Hora adicional:</strong> +{formatColones(extraHour)}.{' '}
                {businessRules.additionalTime}
              </p>
            )}
            <p>
              <i className="bi bi-truck" aria-hidden="true" /> {businessRules.transportation.notice}
            </p>
            <a
              className="product-detail__whatsapp"
              href={quoteUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Cotizar ${product.name} por WhatsApp`}
            >
              <i className="bi bi-whatsapp" aria-hidden="true" />
              Cotizar por WhatsApp
            </a>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
export default ProductDetailPage;
