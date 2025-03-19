// src/containers/RegisterContainer.tsx
import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import RegisterView from '../pages/RegisterPage';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { registerUserApi } from '../services/auth';
import Swal from 'sweetalert2';

interface RegisterFormInputs {
  nombre: string;
  correo: string;
  contraseña: string;
  rol: 'administrador' | 'ciudadano';
}

const RegisterContainer: React.FC = () => {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await registerUserApi(data.nombre, data.correo, data.contraseña, data.rol);
      // Después del registro, redirige a la página de login.
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Tu cuenta ha sido creada correctamente. Por favor, inicia sesión.',
      }).then(() => {
        window.location.href = '/';
      });
    } catch (error: any) {
      console.error('Error en registro:', error);
      setRegisterError(error.message || 'Error en el registro. Inténtalo de nuevo.');
    }
  };

  
  return (
    <RegisterView
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      registerError={registerError}
    />
  );
};

export default RegisterContainer;
