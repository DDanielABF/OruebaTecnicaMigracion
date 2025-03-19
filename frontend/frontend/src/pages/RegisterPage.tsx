import React from 'react';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <h1>Registro</h1>
      <form>
        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
