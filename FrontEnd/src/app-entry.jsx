import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
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
import Login from './pages/Login.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import OffersPage from './pages/OffersPage.jsx';
import ProductListAdmin from './pages/ProductListAdmin.jsx';
import AdminOrdersPage from './pages/AdminOrdersPage.jsx';
import AdminUsersPage from './pages/AdminUsersPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'registro', element: <RegisterPage /> },
      { path: 'productos', element: <ProductsPage /> },
      { path: 'producto/:productId', element: <ProductDetailPage /> },
      { path: 'search', element: <SearchResultsPage /> },
      { path: 'carro', element: <CartPage /> },
      { path: 'checkout/direccion', element: <CheckoutAddressPage /> },
      { path: 'checkout/pago', element: <CheckoutPaymentPage /> },
      { path: 'checkout/confirmacion/:method', element: <PaymentConfirmationPage /> },
      { path: 'orden/completada', element: <OrderCompletedPage /> },
      { path: 'usuario', element: <UserDetailsPage /> },
      { path: 'admin/categorias', element: <CategoryListAdmin /> },
      { path: 'orden/detalles/:id', element: <OrderDetailsPage /> },
      { path: 'nosotros', element: <AboutPage /> },
      { path: 'ofertas', element: <OffersPage /> },
      { path: 'admin/ordenes', element: <AdminOrdersPage /> },
      { path: 'admin/productos', element: <ProductListAdmin /> },
      { path: 'admin/usuarios', element: <AdminUsersPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password/:token', element: <ResetPasswordPage /> },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);