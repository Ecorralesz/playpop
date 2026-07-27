import './SectionHeader.css';

function SectionHeader({ eyebrow, title, description, alignment = 'center', headingId }) {
  return (
    <header className={`section-header section-header--${alignment}`}>
      {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
      <h2 className="section-header__title" id={headingId}>
        {title}
      </h2>
      {description && <p className="section-header__description">{description}</p>}
    </header>
  );
}

export default SectionHeader;
