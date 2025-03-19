// src/containers/LoginContainer.tsx
import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import LoginView from '../pages/LoginPage';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { loginUserApi } from '../services/auth';

interface LoginFormInputs {
  id: number;
  password: string;
}

const LoginContainer: React.FC = () => {
  const { isAuthenticated, login } = useContext<AuthContextType>(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await loginUserApi(data.id, data.password);
      // Aquí llamamos a la función login del contexto para actualizar el estado global
      login(response.token, {
        id: response.user.id,
        rol: response.user.rol,
        nombre: response.user.nombre,
      });
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      setLoginError(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <LoginView
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      showPassword={showPassword}
      toggleShowPassword={toggleShowPassword}
      loginError={loginError}
    />
  );
};

export default LoginContainer;
