import { Link } from 'react-router-dom';
import { formatColones, gameTierLabels } from '../../../data/pricing';
import { getProductRoute } from '../../../data/products';

import './ProductCard.css';

function ProductCard({ product }) {
  const { name, image, imageAlt, price, rentalHours } = product;

  return (
    <article
      className={`product-card${product.imageFit === 'contain' ? ' product-card--contain' : ''}`}
    >
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
        </p>
        {product.description && <p>{product.description}</p>}
        {product.tier && (
          <p>
            <strong>{gameTierLabels[product.tier]}</strong>
          </p>
        )}
        {product.minimumQuantity && (
          <p className="text-muted">Mínimo: {product.minimumQuantity} unidades.</p>
        )}
        {product.preparation && <p className="text-muted">{product.preparation}</p>}
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
