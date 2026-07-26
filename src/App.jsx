import { Routes, Route } from 'react-router';

import HomePage from './pages/HomePage';
import InflatablesPage from './pages/InflatablesPage';
import PackagesPage from './pages/PackagesPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inflables" element={<InflatablesPage />} />
      <Route path="/paquetes" element={<PackagesPage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/galeria" element={<GalleryPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;