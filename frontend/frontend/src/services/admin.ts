// src/services/admin.api.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getAllUsers = async () => {
  const token = localStorage.getItem('authToken') || '';
  const response = await axios.get(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllPassports = async () => {
  const token = localStorage.getItem('authToken') || '';
  const response = await axios.get(`${API_URL}/admin/passports`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
// PUT /api/admin/users/{id}/disable -> Deshabilitar un usuario
export const disableUser = async (userId: number) => {
    const token = localStorage.getItem('authToken') || '';
    const response = await axios.put(`${API_URL}/admin/users/${userId}/disable`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  //  Actualizar estado de un pasaporte
  // Se envía un body { status: boolean }
  export const updatePassportStatus = async (passportId: number, status: boolean) => {
    const token = localStorage.getItem('authToken') || '';
    try {
      const response = await axios.put(`${API_URL}/admin/passports/${passportId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al actualizar el estado del pasaporte');
    }
  };
  
  //  Asociar un nuevo pasaporte a un usuario
  // Recibe en el body los datos del pasaporte, incluido user_id
  export const associatePassportToUser = async (passportData: any) => {
    const token = localStorage.getItem('authToken') || '';
    const response = await axios.post('/admin/passports/associate', passportData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  };
// Y así sucesivamente con disableUser, updatePassportStatus, associatePassportToUser...
