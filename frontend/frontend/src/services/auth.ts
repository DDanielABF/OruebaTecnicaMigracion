// src/services/auth.api.ts
import axios from 'axios';

// Configura la URL base (puedes usar tu variable de entorno, ej. VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface LoginResponse {
  token: string;
  // Ajusta los campos según lo que devuelva tu backend
  user: {
    id: number;
    rol: string;
    nombre: string;
  };
}

export const loginUserApi = async (id: number, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      id,
      contraseña: password, // asegúrate de usar el nombre de propiedad que espera tu API
    });
    return response.data;
  } catch (error: any) {
    // Puedes mejorar el manejo de errores según sea necesario
    throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
  }
};
