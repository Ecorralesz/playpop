import { Link } from 'react-router-dom';
import { formatColones } from '../../../data/pricing';
import { getPackageCardFeatures, getPackageRoute } from '../../../data/packages';

import './PackageCard.css';

function PackageCard({ packageData }) {
  const { name, shortDescription, badge, price, priceLabel, rentalHours, details } = packageData;

  return (
    <article className="package-card">
      <div className="package-card__body">
        <span className="package-card__badge">{badge}</span>
        <h3 className="package-card__name">{name}</h3>
        <p>
          <strong>{priceLabel ?? formatColones(price)}</strong>
          {rentalHours ? ` / ${rentalHours} horas` : ''}
        </p>
        <p className="package-card__description">{shortDescription}</p>
        <ul className="package-card__features" aria-label={`Características de ${name}`}>
          {getPackageCardFeatures(packageData).map((feature) => (
            <li key={feature}>
              <i className="bi bi-check-circle-fill" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        {details?.map((detail) => (
          <p className="package-card__detail" key={detail}>
            {detail}
          </p>
        ))}
        <Link className="package-card__link" to={getPackageRoute(packageData)}>
          Ver paquete
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default PackageCard;
