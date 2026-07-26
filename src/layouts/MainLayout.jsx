import { Outlet } from 'react-router';

import PlayPopNavbar from '../components/Navbar/PlayPopNavbar';
import './MainLayout.css';

function MainLayout() {
  return (
    <div className="d-flex min-vh-100 flex-column">
      <a
        className="visually-hidden-focusable position-absolute m-3 btn btn-primary"
        href="#main-content"
      >
        Skip to main content
      </a>

      <header>
        <PlayPopNavbar />
      </header>

      <main id="main-content" className="flex-grow-1">
        <div className="main-layout__wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
