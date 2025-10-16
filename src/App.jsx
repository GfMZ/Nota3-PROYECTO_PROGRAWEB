import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import UserDetailsPage from './pages/UserDetailsPage';
import CategoryListAdmin from './pages/CategoryListAdmin';
import OrderDetailsPage from './pages/OrderDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuario" element={<UserDetailsPage />} />
        <Route path="/admin/categorias" element={<CategoryListAdmin />} />
        <Route path="/orden/detalles" element={<OrderDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;