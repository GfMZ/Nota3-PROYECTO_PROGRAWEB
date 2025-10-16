import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import './styles.css';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import ProductsPage from './pages/ProductsPage.jsx'; // Necesitamos crear esta página
import CategoryListAdmin from './pages/CategoryListAdmin.jsx';
import UserDetailsPage from './pages/UserDetailsPage.jsx';
import OrderDetailsPage from './pages/OrderDetailPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'productos',
        element: <ProductsPage />,
      },
      {
        path: 'usuario',
        element: <UserDetailsPage />,
      },
      {
        path: 'admin/categorias',
        element: <CategoryListAdmin />,
      },
      {
        path: 'orden/detalles',
        element: <OrderDetailsPage />,
      },
      // Puedes agregar aquí las rutas para 'nosotros' y 'ofertas'
      {
        path: 'nosotros',
        element: <div>Página de Nosotros</div>
      },
      {
        path: 'ofertas',
        element: <div>Página de Ofertas</div>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);