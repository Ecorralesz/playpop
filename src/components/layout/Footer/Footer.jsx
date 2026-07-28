import { Link } from 'react-router-dom';

import playPopLogo from '../../../assets/images/playpop-logo.png';
import { WHATSAPP_URL } from '../../../config/contact';
import './Footer.css';

const navigationItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Inflables', to: '/inflables' },
  { label: 'Paquetes', to: '/paquetes' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Galería', to: '/galeria' },
  { label: 'Contacto', to: '/contacto' },
];

const pendingContactItems = ['Instagram', 'Facebook', 'Correo electrónico'];

const coverageAreas = ['Gran Área Metropolitana (GAM)', 'Occidente', 'Pérez Zeledón'];

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="playpop-footer">
      <div className="main-layout__wrapper playpop-footer__inner">
        <div className="playpop-footer__grid">
          <section className="playpop-footer__brand" aria-labelledby="footer-brand-title">
            <Link className="playpop-footer__logo-link" to="/" aria-label="PlayPop - Inicio">
              <img
                className="playpop-footer__logo"
                src={playPopLogo}
                alt="Logo de PlayPop"
                width="144"
                height="144"
              />
            </Link>
            <h2 className="playpop-footer__brand-name" id="footer-brand-title">
              PlayPop
            </h2>
            <p className="playpop-footer__description">
              Diversión para cumpleaños, celebraciones y eventos especiales en Costa Rica.
            </p>
          </section>

          <nav className="playpop-footer__section" aria-labelledby="footer-navigation-title">
            <h2 className="playpop-footer__heading" id="footer-navigation-title">
              Explora
            </h2>
            <ul className="playpop-footer__list playpop-footer__navigation">
              {navigationItems.map(({ label, to }) => (
                <li key={to}>
                  <Link className="playpop-footer__link" to={to}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="playpop-footer__section" aria-labelledby="footer-contact-title">
            <h2 className="playpop-footer__heading" id="footer-contact-title">
              Contacto
            </h2>
            <a
              className="playpop-footer__whatsapp"
              href={WHATSAPP_URL}
              rel="noreferrer"
              target="_blank"
            >
              <i className="bi bi-whatsapp" aria-hidden="true" />
              Cotizar por WhatsApp
              <span className="visually-hidden"> (abre en una nueva pestaña)</span>
            </a>
            <ul className="playpop-footer__list playpop-footer__pending-list">
              {pendingContactItems.map((item) => (
                <li className="playpop-footer__pending-item" key={item}>
                  <span>{item}</span>
                  <span className="playpop-footer__status">Pendiente</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="playpop-footer__section" aria-labelledby="footer-coverage-title">
            <h2 className="playpop-footer__heading" id="footer-coverage-title">
              Cobertura
            </h2>
            <ul className="playpop-footer__list playpop-footer__coverage-list">
              {coverageAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <p className="playpop-footer__note">
              El transporte y la disponibilidad deben confirmarse en la cotización final.
            </p>
          </section>
        </div>

        <div className="playpop-footer__bottom">
          <p className="playpop-footer__copyright">
            © {currentYear} PlayPop. Todos los derechos reservados.
          </p>
          <button className="playpop-footer__top-button" type="button" onClick={handleBackToTop}>
            Volver arriba
            <i className="bi bi-arrow-up" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
