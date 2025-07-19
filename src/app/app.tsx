import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from 'pages/home';
import { ProductPage } from 'pages/product';
import { ProductListPage } from 'pages/product-list';

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:categorySlug" element={<ProductListPage />} />
        <Route path="/products/:categorySlug/:productSlug" element={<ProductPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
