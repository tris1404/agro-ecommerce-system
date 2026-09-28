import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from '../modules/home/pages/HomePage';
import LoginPage from '../modules/auth/pages/LoginPage';
import RegisterPage from '../modules/auth/pages/RegisterPage';
import VerifyPage from '../modules/auth/pages/VerifyPage';

import ProductListPage from '../modules/products/pages/ProductListPage';
import ProductDetailPage from '../modules/products/pages/ProductDetailPage';

import CartPage from '../modules/cart/pages/CartPage';
import CheckoutPage from '../modules/checkout/pages/CheckoutPage';
import OrderSuccessPage from '../modules/checkout/pages/OrderSuccessPage';

import ProfilePage from '../modules/account/pages/ProfilePage';
import OrderHistoryPage from '../modules/account/pages/OrderHistoryPage';
import OrderDetailPage from '../modules/account/pages/OrderDetailPage';

// Admin
import AdminLayout from '../modules/admin/layout/AdminLayout';
import DashboardPage from '../modules/admin/pages/DashboardPage';
import AdminProductListPage from '../modules/admin/pages/AdminProductListPage';
import AdminProductFormPage from '../modules/admin/pages/AdminProductFormPage';
import AdminOrderListPage from '../modules/admin/pages/AdminOrderListPage';
import AdminCustomerListPage from '../modules/admin/pages/AdminCustomerListPage';

// Route Guards
import { PrivateRoute, AdminRoute } from './Guards';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Storefront Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />

        {/* Product Catalog */}
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />

        {/* Shopping Cart & Checkout */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:orderCode" element={<OrderSuccessPage />} />

        {/* Protected Customer Account Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/orders" element={<OrderHistoryPage />} />
          <Route path="/account/orders/:id" element={<OrderDetailPage />} />
          <Route path="/account/addresses" element={<ProfilePage />} />
          <Route path="/account/password" element={<ProfilePage />} />
        </Route>

        {/* Protected Admin Portal Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<AdminProductListPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/edit/:id" element={<AdminProductFormPage />} />
            <Route path="orders" element={<AdminOrderListPage />} />
            <Route path="customers" element={<AdminCustomerListPage />} />
          </Route>
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
