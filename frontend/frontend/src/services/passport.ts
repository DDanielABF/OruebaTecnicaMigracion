import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface PassportData {
  tipo_pasaporte: string;
  fecha_emision: string;
  fecha_vencimiento: string;
  lugar_emision: string;
  pais_emision: string;
  numero_pasaporte: string;
  activo: boolean;
  user_id: number;
}

export const createPassport = async (passportData: PassportData) => {
  try {
    const token = localStorage.getItem('authToken') || '';
    const response = await axios.post(`${API_URL}/passports`, passportData, { 
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  } catch (error) {
    console.error("Error al crear el pasaporte:", error);
    throw error;
  }
};
