// src/components/EditUserData.tsx
import React, { useState } from "react";
import styles from "./styles/EditUserData.module.scss";
import { updateUserData } from "../services/user"; // Ajusta la ruta si difiere
import Swal from 'sweetalert2';

interface EditUserDataProps {
  user: {
    id: number;
    nombre: string;
    correo: string;
  } | null;
}

const EditUserData: React.FC<EditUserDataProps> = ({ user }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [nombre, setNombre] = useState<string>(user?.nombre || "");
  const [correo, setCorreo] = useState<string>(user?.correo || "");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateUserData(user.id, nombre, correo);
      setEditing(false);
      setError(null);
      // Puedes mostrar un mensaje de éxito, por ejemplo con SweetAlert2
       Swal.fire('¡Datos actualizados!', '', 'success');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al actualizar los datos.');
    }
  };

  return (
    <section className={styles.editUserData}>
      <h2>Editar Datos Personales</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {editing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
          />
          <div className={styles.buttonGroup}>
            <button className={styles.save} onClick={handleSave}>
              Guardar
            </button>
            <button className={styles.cancel} onClick={() => setEditing(false)}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.userInfo}>
          <p><strong>Nombre:</strong> {nombre}</p>
          <p><strong>Correo:</strong> {correo}</p>
          <button className={styles.edit} onClick={() => setEditing(true)}>
            Editar
          </button>
        </div>
      )}
    </section>
  );
};

export default EditUserData;
