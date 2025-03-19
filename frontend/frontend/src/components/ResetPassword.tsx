// src/components/ResetPassword.tsx
import React, { useState } from 'react';
import styles from './styles/ResetPassword.module.scss';
import { updateUserPassword } from '../services/user'
import Swal from 'sweetalert2';

interface ResetPasswordProps {
  userId: number;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async () => {
    setError(null);
    setMessage(null);

    try {
      await updateUserPassword(userId, currentPassword, newPassword);
      setMessage('Contraseña actualizada correctamente.');
      // Puedes mostrar un SweetAlert2, por ejemplo:
      Swal.fire('¡Contraseña actualizada!', '', 'success');
      // Limpia los campos
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al actualizar la contraseña.');
    }
  };

  return (
    <section className={styles.resetPassword}>
      <h2>Restablecer Contraseña</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}

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
    </section>
  );
};

export default ResetPassword;
