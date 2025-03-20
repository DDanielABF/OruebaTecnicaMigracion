// src/containers/AdminPanelContainer.tsx
import React, { useEffect, useState } from 'react';
import AdminPanelView from '../pages/AdminPanelPage';
import {
  getAllUsers,
  getAllPassports,
  disableUser,
  updatePassportStatus,
  associatePassportToUser,
} from '../services/admin'; // Ajusta la ruta si difiere

interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: boolean;
}

interface Passport {
  id: number;
  tipo_pasaporte: string;
  // ...
  activo: boolean;
  user_id: number;
}

const AdminPanelContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [passports, setPassports] = useState<Passport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [allUsers, allPassports] = await Promise.all([
        getAllUsers(),
        getAllPassports(),
      ]);
      setUsers(allUsers.data);
      setPassports(allPassports.data);
    
    } catch (err: any) {
      setError(err.message || 'Error al cargar datos de administración');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDisableUser = async (userId: number) => {
    try {
      await disableUser(userId);
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, estado: false } : u))
      );
    } catch (err: any) {
      setError(err.message || 'Error al deshabilitar usuario');
    }
  };

  const handleUpdatePassportStatus = async (passportId: number, status: boolean) => {
    try {
      await updatePassportStatus(passportId, status);
      setPassports(prev =>
        prev.map(p => (p.id === passportId ? { ...p, activo: status } : p))
      );
    } catch (err: any) {
      setError(err.message || 'Error al actualizar estado del pasaporte');
    }
  };

  const handleAssociatePassport = async (passportData: any) => {
    try {
      await associatePassportToUser(passportData);
      // Recargar la lista de pasaportes
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Error al asociar pasaporte');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AdminPanelView
      users={users}
      passports={passports}
      onDisableUser={handleDisableUser}
      onUpdatePassportStatus={handleUpdatePassportStatus}
      onAssociatePassport={handleAssociatePassport}
    />
  );
};

export default AdminPanelContainer;
