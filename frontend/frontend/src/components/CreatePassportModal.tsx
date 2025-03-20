// src/components/CreatePassportModal.tsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Asegúrate de instalarlo: npm install sweetalert2
import styles from './styles/CreatePassportModal.module.scss';
import { createPassport, PassportData } from '../services/passport';
interface User {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
    estado: boolean;
  }

interface CreatePassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onPassportCreated?: () => void; // Callback para refrescar datos en el padre
}

const CreatePassportModal: React.FC<CreatePassportModalProps> = ({
  isOpen,
  onClose,
  users,
  onPassportCreated,
}) => {
const [selectedUser, setSelectedUser] = useState<number>(users.length > 0 ? users[0].id : 0);
  const [tipoPasaporte, setTipoPasaporte] = useState('');
  const [fechaEmision, setFechaEmision] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [lugarEmision, setLugarEmision] = useState('');
  const [paisEmision, setPaisEmision] = useState('');
  const [numeroPasaporte, setNumeroPasaporte] = useState('');
  const [activo, setActivo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
   // Si la lista de usuarios cambia, se puede actualizar el usuario seleccionado
   useEffect(() => {
    if (users.length > 0) {
      setSelectedUser(users[0].id);
    }
  }, [users]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const passportData: PassportData = {
      tipo_pasaporte: tipoPasaporte,
      fecha_emision: fechaEmision,
      fecha_vencimiento: fechaVencimiento,
      lugar_emision: lugarEmision,
      pais_emision: paisEmision,
      numero_pasaporte: numeroPasaporte,
      activo,
      user_id: selectedUser,
    };

    try {
      await createPassport(passportData);
      // Muestra SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: 'Pasaporte creado',
        text: 'El pasaporte se ha creado correctamente.',
      }).then(() => {
        if (onPassportCreated) {
          onPassportCreated();
        }
        onClose();
      });
    } catch (err: any) {
      console.error("Error al crear el pasaporte:", err);
      setError(err.message || "Error al crear el pasaporte.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Crear Pasaporte</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
        <label>
            Seleccionar Usuario:
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(Number(e.target.value))}
              required
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tipo de Pasaporte:
            <input
              type="text"
              value={tipoPasaporte}
              onChange={(e) => setTipoPasaporte(e.target.value)}
              required
            />
          </label>
          <label>
            Fecha de Emisión:
            <input
              type="date"
              value={fechaEmision}
              onChange={(e) => setFechaEmision(e.target.value)}
              required
            />
          </label>
          <label>
            Fecha de Vencimiento:
            <input
              type="date"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              required
            />
          </label>
          <label>
            Lugar de Emisión:
            <input
              type="text"
              value={lugarEmision}
              onChange={(e) => setLugarEmision(e.target.value)}
              required
            />
          </label>
          <label>
            País de Emisión:
            <input
              type="text"
              value={paisEmision}
              onChange={(e) => setPaisEmision(e.target.value)}
              required
            />
          </label>
          <label>
            Número de Pasaporte:
            <input
              type="text"
              value={numeroPasaporte}
              onChange={(e) => setNumeroPasaporte(e.target.value)}
              required
            />
          </label>
          <label>
            Activo:
            <input
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Pasaporte"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePassportModal;

