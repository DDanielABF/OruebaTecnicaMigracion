// src/components/PassportCards.tsx
import React from 'react';
import styles from './styles/PassportCards.module.scss';
import { Passport } from '../services/dashboard';

interface PassportCardsProps {
  passports: Passport[] | null;
}

const PassportCards: React.FC<PassportCardsProps> = ({ passports }) => {
  // Si passports es null o no es un arreglo, muestra un mensaje
  //console.table(passports.data)
  if (!Array.isArray(passports.data) || passports.data.length === 0) {
    return <p>No tienes pasaportes registrados.</p>;
  }

  return (
    <section>
      <h2>Mis Pasaportes</h2>
      <div className={styles.cardsContainer}>
        {passports.data.map(passport => (
          <div
            key={passport.id}
            className={`${styles.card} ${passport.activo ? styles.active : styles.inactive}`}
          >
            <h3>{passport.tipo_pasaporte}</h3>
            <p>Número: {passport.numero_pasaporte}</p>
            <p>Emisión: {passport.fecha_emision}</p>
            <p>Vencimiento: {passport.fecha_vencimiento}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PassportCards;
