import React, { useState } from "react";
import styles from "./styles/EditUserData.module.scss";

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

  const handleSave = () => {
    // Aquí llamarías a la API para actualizar los datos del usuario.
    setEditing(false);
  };

  return (
    <section className={styles.editUserData}>
      <h2>Editar Datos Personales</h2>
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
