import { Link } from 'react-router-dom';
import { formatColones } from '../../../data/pricing';
import { getProductRoute } from '../../../data/products';

import './ProductCard.css';

function ProductCard({ product }) {
  const { name, image, imageAlt, badge, price, rentalHours, courtesyGameCount } = product;

  return (
    <article className="product-card">
      <div className="product-card__media">
        {image ? (
          <img className="product-card__image" src={image} alt={imageAlt} loading="lazy" />
        ) : (
          <div className="product-card__placeholder" aria-hidden="true">
            <i className="bi bi-stars product-card__placeholder-star" />
            <i className="bi bi-balloon product-card__placeholder-balloon" />
            <i className="bi bi-image product-card__placeholder-icon" />
          </div>
        )}
        {badge && <span className="product-card__badge">{badge}</span>}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">
          <strong>{formatColones(price)}</strong>
          {rentalHours
            ? ` / ${rentalHours} horas`
            : product.priceUnit
              ? ` ${product.priceUnit}`
              : ''}
          {courtesyGameCount
            ? ` · Incluye ${courtesyGameCount} ${courtesyGameCount === 1 ? 'juego' : 'juegos'} de cortesía`
            : ''}
        </p>
        <Link
          className="product-card__link"
          to={getProductRoute(product)}
          aria-label={`Ver detalles de ${name}`}
        >
          Ver detalles
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
