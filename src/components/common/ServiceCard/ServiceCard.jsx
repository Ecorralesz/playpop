import { Link } from 'react-router-dom';

import './ServiceCard.css';

function ServiceCard({ service }) {
  const { name, shortDescription, icon, badge, route } = service;

  return (
    <article className="service-card">
      <div className="service-card__icon" aria-hidden="true">
        <i className={`bi ${icon}`} />
      </div>
      <div className="service-card__body">
        <span className="service-card__badge">{badge}</span>
        <h3 className="service-card__name">{name}</h3>
        <p className="service-card__description">{shortDescription}</p>
        <Link className="service-card__link" to={route}>
          Consultar servicio
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default ServiceCard;
