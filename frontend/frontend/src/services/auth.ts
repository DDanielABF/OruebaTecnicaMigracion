// src/services/auth.api.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface LoginResponse {
  token: string;
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
      contraseña: password,
    });
    // Transforma la respuesta para que tenga la propiedad "user"
    return {
      token: response.data.token,
      user: {
        id: response.data.id,
        rol: response.data.rol,
        nombre: response.data.nombre,
      },
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
  }
};
export interface RegisterResponse {
  id: number;
  nombre: string;
  correo: string;
  rol: 'administrador' | 'ciudadano';
}

export const registerUserApi = async (
  nombre: string,
  correo: string,
  contraseña: string,
  rol: 'administrador' | 'ciudadano'
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      nombre,
      correo,
      contraseña,
      rol,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error en el registro');
  }
};