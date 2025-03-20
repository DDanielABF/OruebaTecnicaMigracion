import React from "react";
import styles from "./styles/AdminUserList.module.scss";

interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: boolean;
}

interface AdminUserListProps {
  users: User[];
  onDisableUser: (userId: number) => void;
}

const AdminUserList: React.FC<AdminUserListProps> = ({ users, onDisableUser }) => {
  return (
    <section className={styles.userListContainer}>
      <h2>Usuarios Registrados</h2>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td className={u.estado ? styles.active : styles.inactive}>
                {u.estado ? "Habilitado" : "Deshabilitado"}
              </td>
              <td>
                <button
                  className={u.estado ? styles.disableButton : styles.enableButton}
                  onClick={() => onDisableUser(u.id)}
                >
                  {u.estado ? "Deshabilitar" : "Habilitar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminUserList;
