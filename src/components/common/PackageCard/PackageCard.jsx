import { Link } from 'react-router-dom';

import './PackageCard.css';

function PackageCard({ packageData }) {
  const { name, shortDescription, badge, route, features } = packageData;

  return (
    <article className="package-card">
      <div className="package-card__body">
        <span className="package-card__badge">{badge}</span>
        <h3 className="package-card__name">{name}</h3>
        <p className="package-card__description">{shortDescription}</p>
        <ul className="package-card__features" aria-label={`Características de ${name}`}>
          {features.map((feature) => (
            <li key={feature}>
              <i className="bi bi-check-circle-fill" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        <Link className="package-card__link" to={route}>
          Ver paquetes
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default PackageCard;
