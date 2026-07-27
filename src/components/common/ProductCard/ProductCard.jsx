import { Link } from 'react-router-dom';

import './ProductCard.css';

function ProductCard({ product }) {
  const { name, image, imageAlt, shortDescription, badge, route } = product;

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img className="product-card__image" src={image} alt={imageAlt} loading="lazy" />
        <span className="product-card__badge">{badge}</span>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">{shortDescription}</p>
        <Link className="product-card__link" to={route}>
          Ver inflable
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
