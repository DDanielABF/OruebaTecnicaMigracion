// src/components/DashboardView.tsx
import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardStats from '../components/DashboardStats';
import PassportCards from '../components/PassportCards';
import EditUserData from '../components/EditUserData';
import ResetPassword from '../components/ResetPassword';
import Footer from '../components/Footer';
import  {  useContext } from 'react';
import { Passport } from '../services/dashboard';
import styles from './styles/DashboardView.module.scss'; // Asegúrate de tener estilos para el modal
import { AuthContext, AuthContextType } from '../context/AuthContext';

interface DashboardStatsData {
  totalPasaportes: number;
}

interface DashboardData {
  passports: Passport[];
  stats: DashboardStatsData;
}

interface DashboardViewProps {
  user: {
    id: number;
    nombre: string;
    rol: string;
  } | null;
  dashboardData: DashboardData;
}

const DashboardView: React.FC<DashboardViewProps> = ({ user, dashboardData }) => {
  const {  logout } = useContext<AuthContextType>(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const totalPasaportes = dashboardData.passports.data?.length || 0;
  return (
    <>
    <div>
      <div className={styles.logout} >
      <button onClick={() => logout()}>Cerrar Sesion</button>
       
      <DashboardHeader user={user} />
      </div>
    
      <div className={styles.actionButtons}>
      <button onClick={() => setShowEditModal(true)}>Editar datos</button>
       
        <button onClick={() => setShowResetModal(true)}>Restablecer Contraseña </button>
      </div>
      <div className={styles.datos}>
      <DashboardStats stats={totalPasaportes} />
      </div>
      <div className={styles.pasaporte}>
      <PassportCards passports={dashboardData.passports} />
      </div>

     
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowEditModal(false)}>X</button>
            <EditUserData user={user} />
            
          </div>
        </div>
      )}

      {showResetModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowResetModal(false)}>X</button>
            <ResetPassword userId={user?.id!} />
          </div>
        </div>
      )}
    </div>
    <footer>
    <Footer/>
    </footer>
    </>
  );
};

export default DashboardView;
