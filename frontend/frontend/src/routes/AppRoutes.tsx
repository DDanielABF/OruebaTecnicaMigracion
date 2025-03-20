//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../containers/LoginContainer';
import RegisterPage from '../containers/RegisterContainer';
import DashboardPage from '../containers/DashboardContainer';
import ProfilePage from '../pages/ProfilePage';
import AdminPanelPage from '../containers/AdminPanelContainer';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas para usuarios autenticados */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Rutas protegidas para administradores */}
      <Route element={<ProtectedRoute requiredRole="administrador" />}>
        <Route path="/admin" element={<AdminPanelPage />} />
      </Route>

      {/* Ruta catch-all para 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
