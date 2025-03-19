// src/services/passport.api.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Passport {
  id: number;
  tipo_pasaporte: string;
  fecha_emision: string;
  fecha_vencimiento: string;
  lugar_emision: string;
  pais_emision: string;
  numero_pasaporte: string;
  activo: boolean;
  user_id: number;
}

export const getPassportsByUser = async (userId: number, token: string): Promise<Passport[]> => {
  try {
    const response = await axios.get(`${API_URL}/passports/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   // console.table(response.data )
    return response.data;
  
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error al obtener los pasaportes del usuario');
  }
};
