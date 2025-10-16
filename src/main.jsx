import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import './styles.css';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CategoryListAdmin from './pages/CategoryListAdmin.jsx';
import UserDetailsPage from './pages/UserDetailsPage.jsx';
import OrderDetailsPage from './pages/OrderDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutAddressPage from './pages/CheckoutAddressPage.jsx';
import CheckoutPaymentPage from './pages/CheckoutPaymentPage.jsx';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage.jsx';
import OrderCompletedPage from './pages/OrderCompletedPage.jsx';

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
        path: 'producto/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: 'search',
        element: <SearchResultsPage />,
      },
      {
        path: 'carro',
        element: <CartPage />,
      },
      {
        path: 'checkout/direccion',
        element: <CheckoutAddressPage />,
      },
      {
        path: 'checkout/pago',
        element: <CheckoutPaymentPage />,
      },
      {
        path: 'checkout/confirmacion/:method',
        element: <PaymentConfirmationPage />,
      },
      {
        path: 'orden/completada',
        element: <OrderCompletedPage />,
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