import React, { useState } from "react";
import styles from "./styles/AdminPassportList.module.scss";

interface Passport {
  id: number;
  tipo_pasaporte: string;
  activo: boolean;
  user_id: number;
}

interface User {
  id: number;
  nombre: string;
}

interface AdminPassportListProps {
  passports: Passport[];
  users: User[];
  onUpdatePassportStatus: (passportId: number, status: boolean) => void;
  onAssociatePassport: (passportData: any) => void;
}

const AdminPassportList: React.FC<AdminPassportListProps> = ({
  passports,
  users,
  onUpdatePassportStatus,
  onAssociatePassport,
}) => {
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [tipoPasaporte, setTipoPasaporte] = useState("");

  const handleAssociate = () => {
    if (!selectedUser || !tipoPasaporte) return;
    const passportData = { user_id: selectedUser, tipo_pasaporte: tipoPasaporte };
    onAssociatePassport(passportData);
    setTipoPasaporte("");
    setSelectedUser(0);
  };

  return (
    <section className={styles.passportContainer}>
      <h2>Gestión de Pasaportes</h2>
      <table className={styles.passportTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {passports.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.tipo_pasaporte}</td>
              <td className={p.activo ? styles.active : styles.inactive}>
                {p.activo ? "Activo" : "Inactivo"}
              </td>
              <td>{p.user_id}</td>
              <td>
                <button
                  className={p.activo ? styles.disableButton : styles.enableButton}
                  onClick={() => onUpdatePassportStatus(p.id, !p.activo)}
                >
                  {p.activo ? "Deshabilitar" : "Habilitar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div className={styles.associateForm}>
      <h3>Asociar Nuevo Pasaporte</h3>
        <label>Usuario:</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(Number(e.target.value))}>
          <option value={0}>Selecciona un usuario</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre}
            </option>
          ))}
        </select>

        <label>Tipo de Pasaporte:</label>
        <input type="text" value={tipoPasaporte} onChange={(e) => setTipoPasaporte(e.target.value)} />

        <button onClick={handleAssociate}>Asociar</button>
      </div>
    </section>
  );
};

export default AdminPassportList;
