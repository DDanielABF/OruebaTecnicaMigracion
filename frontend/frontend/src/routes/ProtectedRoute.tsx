// src/routes/ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/AuthContext';

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, user,logout } = useContext<AuthContextType>(AuthContext);
  const location = useLocation();

  // Si el usuario no está autenticado, redirige a la página de login.
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Si se requiere un rol específico y el usuario no lo posee,
  // redirige a '/admin' si es administrador, o a '/dashboard' en caso contrario.
 // console.log(user)
  //console.log(user?.rol);
 // console.log(requiredRole)
  //logout()
  if (requiredRole && user?.rol.toLowerCase() !== requiredRole.toLowerCase()) {
    return (
      <Navigate
        to={user?.rol === 'administrador' ?  '/dashboard' :'/admin' }
        replace
        state={{ from: location }}
      />
    );
  }

  // Si no se requiere rol o el usuario cumple con el rol, renderiza las rutas hijas.
  return <Outlet />;
};

export default ProtectedRoute;
