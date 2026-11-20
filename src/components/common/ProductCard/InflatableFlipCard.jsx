import { useRef, useState } from 'react';

const mouseHover = '(hover: hover) and (pointer: fine)';

function InflatableFlipCard({ className, product, children, detailsLink }) {
  const [flip, setFlip] = useState(null);
  const mouseInside = useRef(false);
  const flipped = flip !== null;
  const name = product.catalogName ?? product.name;
  const action = flipped ? 'Volver' : 'Girar';

  function handlePointerEnter(event) {
    if (event.pointerType !== 'mouse' || !window.matchMedia(mouseHover).matches) return;
    mouseInside.current = true;
    if (
      !event.target.closest('a, button') &&
      !event.currentTarget.contains(document.activeElement)
    ) {
      setFlip((current) => current ?? 'hover');
    }
  }

  function handlePointerLeave(event) {
    if (event.pointerType !== 'mouse') return;
    mouseInside.current = false;
    if (!event.currentTarget.contains(document.activeElement)) resetHover();
  }

  function resetHover() {
    setFlip((current) => (current === 'hover' ? null : current));
  }

  return (
    <article
      className={`${className} product-card--flip`}
      data-flipped={flipped}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlur={(event) => {
        if (!mouseInside.current && !event.currentTarget.contains(event.relatedTarget)) {
          resetHover();
        }
      }}
    >
      <button
        className="product-card__flip-control"
        type="button"
        aria-label={`${action} · ${name}`}
        onClick={() => setFlip((current) => (current ? null : 'control'))}
      >
        <i className="bi bi-arrow-repeat" aria-hidden="true" />
        {action}
      </button>
      <div className="product-card__rotor">
        <div className="product-card__face" inert={flipped} aria-hidden={flipped || undefined}>
          {children}
        </div>
        <div
          className="product-card__face product-card__face--back"
          inert={!flipped}
          aria-hidden={!flipped || undefined}
        >
          <div className="product-card__body">
            <div className="product-card__back-content">
              <h3 className="product-card__name">{name}</h3>
              <p className="product-card__summary">{product.shortDescription}</p>
              <p className="product-card__capacity">
                <i className="bi bi-people-fill" aria-hidden="true" />
                <span>{product.capacity}</span>
              </p>
            </div>
            {detailsLink}
          </div>
        </div>
      </div>
    </article>
  );
}

export default InflatableFlipCard;
