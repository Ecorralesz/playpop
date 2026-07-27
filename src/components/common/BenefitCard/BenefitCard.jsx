import './BenefitCard.css';

function BenefitCard({ benefit }) {
  const { icon, title, description } = benefit;

  return (
    <article className="benefit-card">
      <div className="benefit-card__icon" aria-hidden="true">
        <i className={`bi ${icon}`} />
      </div>
      <h3 className="benefit-card__title">{title}</h3>
      <p className="benefit-card__description">{description}</p>
    </article>
  );
}

export default BenefitCard;
