import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { businessRules } from '../data/businessRules';
import { formatColones, gameTierLabels, getInflatablePrice, pricing } from '../data/pricing';
import { getProductBySlug } from '../data/products';
import { getQuotationUrl } from '../config/contact';
import '../components/catalog/ProductDetail/ProductDetail.css';

const categoryNames = { inflatable: 'Inflable', game: 'Juego', snack: 'Snack' };
function ProductDetailPage() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const product = getProductBySlug(slug);
  if (product?.id === 'baby-gym' && pathname.startsWith('/juegos/'))
    return <Navigate to="/inflables/baby-gym" replace />;
  if (!product)
    return (
      <Container className="py-5">
        <h1>Producto no encontrado</h1>
        <Link
          to={
            pathname.startsWith('/inflables/')
              ? '/inflables'
              : pathname.startsWith('/juegos/')
                ? '/juegos'
                : '/servicios'
          }
        >
          Volver al catálogo
        </Link>
      </Container>
    );
  return <ProductDetails key={product.id} product={product} />;
}

function ProductDetails({ product }) {
  const [selectedHours, setSelectedHours] = useState(pricing.standardRentalHours);
  const isInflatable = product.category === 'inflatable';
  const selectedPrice = isInflatable
    ? getInflatablePrice(product.id, selectedHours)
    : product.price;
  const duration = isInflatable ? selectedHours : product.rentalHours;
  const extraHour =
    product.category === 'game'
      ? pricing.additionalHour[product.tier === 'standard' ? 'courtesy' : product.tier]
      : null;
  const quoteUrl = getQuotationUrl({ name: product.name, hours: duration, price: selectedPrice });
  return (
    <section className="product-detail">
      <Container>
        <Row className="g-5 align-items-start">
          <Col lg={6}>
            <img
              className={`product-detail__image${product.imageFit === 'contain' ? ' product-detail__image--contain' : ''}`}
              src={product.image}
              alt={product.imageAlt}
            />
          </Col>
          <Col lg={6}>
            <p className="product-detail__eyebrow">
              {categoryNames[product.category]}
              {product.tier ? ` · ${gameTierLabels[product.tier]}` : ''}
            </p>
            <h1>{product.name}</h1>
            {product.badge && (
              <p>
                <strong>{product.badge}</strong>
              </p>
            )}
            {isInflatable && (
              <fieldset className="product-detail__duration">
                <legend className="h2">Duración del alquiler</legend>
                <p>{pricing.standardRentalHours} horas es la duración estándar.</p>
                <div className="d-flex flex-wrap gap-2">
                  {pricing.inflatableDurations.map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      className={`btn ${selectedHours === hours ? 'btn-primary' : 'btn-outline-primary'}`}
                      aria-pressed={selectedHours === hours}
                      onClick={() => setSelectedHours(hours)}
                    >
                      {hours} horas{hours === pricing.standardRentalHours ? ' (estándar)' : ''}:{' '}
                      {formatColones(getInflatablePrice(product.id, hours))}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            <dl className="product-detail__facts" aria-live="polite" aria-atomic="true">
              <div className="product-detail__fact">
                <dt>Precio</dt>
                <dd>
                  {formatColones(selectedPrice)}
                  {product.priceUnit ? ` ${product.priceUnit}` : ''}
                </dd>
              </div>
              <div className="product-detail__fact">
                <dt>Duración</dt>
                <dd>{duration ? `${duration} horas` : 'No aplica'}</dd>
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
            {product.description && <p>{product.description}</p>}
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
            {isInflatable && (
              <p>
                <strong>Después de {pricing.additionalHour.afterHours} horas:</strong>{' '}
                {formatColones(pricing.additionalHour.inflatable)} por hora adicional por inflable.{' '}
                {businessRules.additionalTime}
              </p>
            )}
            <p>
              <i className="bi bi-truck" aria-hidden="true" /> {businessRules.transportation.notice}
            </p>
            {isInflatable && product.installationIncluded && <p>{businessRules.installation}</p>}
            <p>{businessRules.reservation.deposit}</p>
            <p>{businessRules.reservation.balance}</p>
            <p>Enviar un mensaje por WhatsApp no confirma disponibilidad ni reservación.</p>
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
    </section>
  );
}
export default ProductDetailPage;
