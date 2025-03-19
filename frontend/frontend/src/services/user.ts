// src/services/user.api.ts
import api from './api'; // Instancia de Axios con interceptor o configuración base

// Actualiza datos (nombre, correo) de un usuario
export const updateUserData = async (
  id: number,
  nombre: string,
  correo: string
): Promise<void> => {
  try {
    const token = localStorage.getItem('authToken') || '';
    const response = await api.put(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      nombre,
      correo,
    });
    return response.data; // Ajusta según tu backend (si devuelve algo)
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al actualizar datos del usuario');
  }
};

// Actualiza la contraseña del usuario
export const updateUserPassword = async (
  id: number,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    const token = localStorage.getItem('authToken') || '';
    const response = await api.put(`/users/${id}/password`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      currentPassword,
      newPassword,
    });
    return response.data; // Ajusta según tu backend (si devuelve algo)
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al actualizar la contraseña');
  }
};
