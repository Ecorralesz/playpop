import { useEffect, useId, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { welcomePromotion } from '../../config/promotions';
import { dismissPromotion, isPromotionActive, isPromotionDismissed } from '../../utils/promotions';
import './PromotionModal.css';

function PromotionModal({ campaign = welcomePromotion }) {
  const [show, setShow] = useState(false);
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isPromotionActive(campaign) || isPromotionDismissed(campaign)) return;
    let timer;
    let didShow = false;
    const check = () => {
      if (!isPromotionActive(campaign) || isPromotionDismissed(campaign)) {
        setShow(false);
        return;
      }
      // Wait for a gallery/video viewer to close rather than stacking welcome overlays.
      if (!didShow && !document.querySelector('.modal.show, [role="dialog"][aria-modal="true"]')) {
        didShow = true;
        setShow(true);
      }
      // Recheck expiry even when the visitor leaves the dialog open overnight.
      timer = window.setTimeout(check, 1000);
    };
    const handleStorage = (event) => {
      if (event.key === campaign.dismissalKey && event.newValue === 'true') {
        window.clearTimeout(timer);
        setShow(false);
      }
    };
    timer = window.setTimeout(check, campaign.delayMs);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('storage', handleStorage);
    };
  }, [campaign]);

  const close = () => {
    dismissPromotion(campaign);
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={close}
      centered
      scrollable
      autoFocus
      enforceFocus
      restoreFocus
      keyboard
      backdrop
      className="promotion-modal"
      dialogClassName="promotion-modal__dialog"
      backdropClassName="promotion-modal__backdrop"
      aria-labelledby={titleId}
      onEntered={() => closeRef.current?.focus()}
      onKeyDown={(event) => {
        // This poster-only dialog has one control; wrap Tab before it can reach browser chrome.
        if (event.key === 'Tab') {
          event.preventDefault();
          closeRef.current?.focus();
        }
      }}
      style={{ '--promotion-poster-ratio': campaign.posterWidth / campaign.posterHeight }}
    >
      <Modal.Header className="promotion-modal__header">
        <h2 className="visually-hidden" id={titleId}>
          {campaign.title}
        </h2>
        <button
          ref={closeRef}
          type="button"
          className="promotion-modal__close"
          onClick={close}
          aria-label="Cerrar promoción"
        >
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
      </Modal.Header>
      <Modal.Body className="promotion-modal__body">
        <img
          className="promotion-modal__poster"
          src={campaign.poster}
          alt={campaign.posterAlt}
          width={campaign.posterWidth}
          height={campaign.posterHeight}
        />
      </Modal.Body>
    </Modal>
  );
}

export default PromotionModal;
