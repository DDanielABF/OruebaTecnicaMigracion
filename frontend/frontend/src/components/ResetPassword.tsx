// src/components/ResetPassword.tsx
import React, { useState } from 'react';
import styles from './styles/ResetPassword.module.scss';

interface ResetPasswordProps {
  userId: number;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async () => {
    // Aquí llamarías a la API para cambiar la contraseña.
    // Ejemplo:
    // await updatePasswordApi(userId, currentPassword, newPassword);
    setMessage('Contraseña actualizada correctamente.');
  };

  return (
    <section className={styles.resetPassword}>
      <h2>Restablecer Contraseña</h2>
      <input
        type="password"
        placeholder="Contraseña actual"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Actualizar Contraseña</button>
      {message && <p className={styles.successMessage}>{message}</p>}
    </section>
  );
};

export default ResetPassword;
