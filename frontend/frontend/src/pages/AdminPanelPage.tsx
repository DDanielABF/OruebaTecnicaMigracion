// src/components/AdminPanelView.tsx
import React, { useState } from 'react';
import AdminUserList from '../components/AdminUserList';
import AdminPassportList from '../components/AdminPassportList';
import CreatePassportModal from '../components/CreatePassportModal';
import Footer from '../components/Footer';
import styles from '../pages/styles/AdminPanelPage.module.scss'

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
  // ... otros campos
  activo: boolean;
  user_id: number;
}

interface AdminPanelViewProps {
  users: User[];
  passports: Passport[];
  onDisableUser: (userId: number) => void;
  onUpdatePassportStatus: (passportId: number, status: boolean) => void;
  onAssociatePassport: (passportData: any) => void;
  // Puedes agregar otros callbacks si es necesario (por ejemplo, onEnableUser)
}

const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  users,
  passports,
  onDisableUser,
  onUpdatePassportStatus,
  onAssociatePassport,
}) => {
  // Estado para controlar la visibilidad del modal de creación de pasaporte
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Callback opcional para refrescar la lista de pasaportes tras crear uno nuevo
  const handlePassportCreated = () => {
    console.log("Pasaporte creado");
    // Aquí podrías, por ejemplo, llamar a un callback del contenedor para refrescar los datos.
  };

  return (
    <div>
      <div className={styles.headerAdmin}>
        <h1>Panel de Administración</h1>
        <a href="/">Regresar</a>
      </div>
      <div className={styles.buttonPassport}>
        <button onClick={handleOpenModal}>Crear Pasaporte</button>
        <CreatePassportModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          users={users} // Puedes ajustar el userId o pasarlo dinámicamente
          onPassportCreated={handlePassportCreated}
        />
      </div>
      <AdminUserList
        users={users}
        onDisableUser={onDisableUser}
      />
      <AdminPassportList
        passports={passports}
        onUpdatePassportStatus={onUpdatePassportStatus}
        onAssociatePassport={onAssociatePassport}
        users={users}
      />
      <Footer/>
    </div>
  );
};

export default AdminPanelView;

