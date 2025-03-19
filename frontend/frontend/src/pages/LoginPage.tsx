import React from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import styles from './styles/LoginPage.module.scss';
import { Link } from 'react-router-dom';

interface LoginFormInputs {
  id: number;
  password: string;
}

interface LoginViewProps {
  register: UseFormRegister<LoginFormInputs>;
  handleSubmit: UseFormHandleSubmit<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  showPassword: boolean;
  toggleShowPassword: () => void;
  loginError: string | null;
}

const LoginView: React.FC<LoginViewProps> = ({
  register,
  handleSubmit,
  errors,
  showPassword,
  toggleShowPassword,
  loginError,
}) => {
  return (
    <div className={styles.loginContainer}>
      {/* 📌 Sección de la imagen */}
      <div className={styles.imageSection}></div>

      {/* 📌 Sección del formulario */}
      <div className={styles.formSection}>
        {/* 📌 Enlace de registro en la esquina superior derecha */}
        <div className={styles.registerLink}>
          <Link to="/register">¿No tienes cuenta? Regístrate</Link>
        </div>

        <div className={styles.formContainer}>
          <h2>¡Bienvenido!</h2>
          <p>Ingresa tu ID y contraseña para iniciar sesión</p>

          {loginError && <p className={styles.errorMessage}>{loginError}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Ingrese su ID"
              {...register('id', { required: 'El ID es obligatorio' })}
              className={errors.id ? styles.inputError : ''}
            />
            {errors.id && <span className={styles.errorMessage}>{errors.id.message}</span>}

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                {...register('password', { required: 'La contraseña es obligatoria' })}
                className={errors.password ? styles.inputError : ''}
              />
              <span onClick={toggleShowPassword} className={styles.passwordToggle}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}

            <button type="submit">INGRESAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
