import './GalleryCard.css';

function GalleryCard({ item, onOpen }) {
  const { title, image, imageAlt, badge, caption, description, photos } = item;
  if (!image) return null;

  return (
    <article
      className={`gallery-card${item.category === 'game' || item.category === 'inflatable' ? ' gallery-card--artwork' : ''}`}
    >
      <div className="gallery-card__visual">
        <img className="gallery-card__image" src={image} alt={imageAlt} loading="lazy" />
        {badge && <span className="gallery-card__badge">{badge}</span>}
      </div>
      <div className="gallery-card__body">
        <div>
          <h3 className="gallery-card__title">{title}</h3>
          {description && <p className="mt-2 mb-0">{description}</p>}
          {photos && onOpen && (
            <>
              <p className="text-muted mt-2">
                {photos.length} {photos.length === 1 ? 'fotografía' : 'fotografías'}
              </p>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => onOpen(item)}
                aria-label={`Ver momentos: ${title}`}
              >
                Ver momentos
              </button>
            </>
          )}
          {caption && <p className="mt-2 mb-0">{caption}</p>}
        </div>
      </div>
    </article>
  );
}

export default GalleryCard;
