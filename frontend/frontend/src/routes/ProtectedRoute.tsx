// src/routes/ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/AuthContext';

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  // Se asume que AuthContext está tipado y provee isAuthenticated y user.
  const { isAuthenticated, user } = useContext<AuthContextType>(AuthContext);

  // Si el usuario no está autenticado, redirige a la página de login.
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si se requiere un rol específico y el usuario no lo posee, redirige a Dashboard (o a otra ruta)
  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si todo está bien, renderiza las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;
