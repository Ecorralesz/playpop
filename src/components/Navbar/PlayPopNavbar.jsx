import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router';

import playPopLogo from '../../assets/images/playpop-logo.png';
import { WHATSAPP_URL } from '../../config/contact';
import './PlayPopNavbar.css';

const navigationItems = [
  { label: 'Inicio', to: '/', end: true },
  { label: 'Inflables', to: '/inflables' },
  { label: 'Paquetes', to: '/paquetes' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Galería', to: '/galeria' },
  { label: 'Contacto', to: '/contacto' },
];

function PlayPopNavbar() {
  return (
    <Navbar className="playpop-navbar" expand="lg" collapseOnSelect>
      <Container className="playpop-navbar__container">
        <Navbar.Brand
          as={NavLink}
          className="playpop-navbar__brand"
          to="/"
          aria-label="PlayPop - Inicio"
        >
          <img
            className="playpop-navbar__logo"
            src={playPopLogo}
            alt="PlayPop"
            width="60"
            height="60"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="playpop-navigation" aria-label="Abrir menú de navegación" />

        <Navbar.Collapse id="playpop-navigation">
          <Nav className="playpop-navbar__links ms-auto align-items-lg-center">
            {navigationItems.map(({ label, to, end }) => (
              <Nav.Link
                as={NavLink}
                className="playpop-navbar__link"
                end={end}
                eventKey={to}
                key={to}
                to={to}
              >
                {label}
              </Nav.Link>
            ))}

            <Nav.Link
              className="playpop-navbar__whatsapp btn btn-success"
              href={WHATSAPP_URL}
              rel="noreferrer"
              target="_blank"
            >
              <i className="bi bi-whatsapp" aria-hidden="true" />
              WhatsApp
              <span className="visually-hidden"> (abre en una nueva pestaña)</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PlayPopNavbar;
