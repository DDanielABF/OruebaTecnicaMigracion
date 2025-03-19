// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define la interfaz que describe el estado y funciones de autenticación
export interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    nombre: string;
    id: number;
    rol: string;
    // Agrega otros campos del usuario que necesites
  } | null;
  login: (token: string, userData: { id: number; rol: string;nombre: string; }) => void;
  logout: () => void;
}

// Crea el contexto con un valor inicial vacío
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estado para el token y los datos del usuario
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; rol: string } | null>(null);

  // Función de login: guarda el token y los datos del usuario en el estado
  const login = (token: string, userData: { id: number; rol: string; nombre: string; }) => {
    setToken(token);
    setUser(userData);
    // Puedes guardar en el localStorage si deseas persistencia
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Función de logout: limpia el estado
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  // Verificar si ya hay datos guardados (por ejemplo, en localStorage)
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('userData');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
