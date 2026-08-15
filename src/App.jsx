import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import InflatablesPage from './pages/InflatablesPage';
import PackagesPage from './pages/PackagesPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/inflables" element={<InflatablesPage />} />
        <Route path="/paquetes" element={<PackagesPage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/inflables/:slug" element={<ProductDetailPage />} />
        <Route path="/juegos/:slug" element={<ProductDetailPage />} />
        <Route path="/snacks/:slug" element={<ProductDetailPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
