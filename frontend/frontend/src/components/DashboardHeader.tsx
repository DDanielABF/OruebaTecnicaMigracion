import React from "react";
import styles from "./styles/DashboardHeader.module.scss";

import { Link, Navigate } from "react-router-dom";

interface DashboardHeaderProps {
  user: {
    nombre: string;
    rol: string;
  } | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link to="/">
          <img src='https://directoriogpb.s3.us-east-1.amazonaws.com/utils/Logotipo_azul.webp' alt="Logo" />
        </Link>
      </div>

      {/* Información del usuario */}
       {/* ✅ Mostrar "Ir a Panel" solo si el usuario es Administrador */}
       
      <div className={styles.userInfo}>
      {user?.rol === "administrador" && (
          <p className={styles.adminPanel}>
            <Link to="/admin">Ir a Panel Administracion</Link>
          </p>
        )}
        <p className={styles.welcome}>¡Hola, {user?.nombre || "Usuario"}!</p>
        <p className={styles.role}>Rol: {user?.rol || "Desconocido"}</p>
         
      </div>
    </header>
  );
};

export default DashboardHeader;
