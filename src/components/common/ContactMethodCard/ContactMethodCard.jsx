import './ContactMethodCard.css';

function ContactMethodCard({ method }) {
  const { name, description, icon, status, href, external, ariaLabel, rel } = method;

  return (
    <article className="contact-method-card">
      {href && ariaLabel ? (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
          <i className={`bi ${icon} contact-method-card__icon`} aria-hidden="true" />
        </a>
      ) : (
        <i className={`bi ${icon} contact-method-card__icon`} aria-hidden="true" />
      )}
      <h3 className="contact-method-card__title">{name}</h3>
      <p className="contact-method-card__description">{description}</p>
      {href ? (
        <a
          className="contact-method-card__action"
          href={href}
          rel={external ? (rel ?? 'noreferrer') : undefined}
          aria-label={ariaLabel}
          target={external ? '_blank' : undefined}
        >
          {status}
          <i className="bi bi-arrow-up-right" aria-hidden="true" />
          {external && <span className="visually-hidden"> (abre en una nueva pestaña)</span>}
        </a>
      ) : (
        <span className="contact-method-card__status">
          <i className="bi bi-clock" aria-hidden="true" />
          {status}
        </span>
      )}
    </article>
  );
}

export default ContactMethodCard;
