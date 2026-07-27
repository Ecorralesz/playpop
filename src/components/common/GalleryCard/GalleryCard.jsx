import './GalleryCard.css';

function GalleryCard({ item }) {
  const { title, image, imageAlt, badge } = item;

  return (
    <article className="gallery-card">
      <div className="gallery-card__visual">
        {image ? (
          <img className="gallery-card__image" src={image} alt={imageAlt} />
        ) : (
          <div className="gallery-card__placeholder">
            <i className="bi bi-camera" aria-hidden="true" />
            <span>Fotografía próximamente</span>
          </div>
        )}
        <span className="gallery-card__badge">{badge}</span>
      </div>
      <div className="gallery-card__body">
        <h3 className="gallery-card__title">{title}</h3>
      </div>
    </article>
  );
}

export default GalleryCard;
