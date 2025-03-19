// src/components/RegisterView.tsx
import React from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import styles from './styles/RegisterPage.module.scss';

interface RegisterFormInputs {
  nombre: string;
  correo: string;
  contraseña: string;
  rol: 'administrador' | 'ciudadano';
}

interface RegisterViewProps {
  register: UseFormRegister<RegisterFormInputs>;
  handleSubmit: UseFormHandleSubmit<RegisterFormInputs>;
  errors: FieldErrors<RegisterFormInputs>;
  registerError: string | null;
}

const RegisterView: React.FC<RegisterViewProps> = ({
  register,
  handleSubmit,
  errors,
  registerError,
}) => {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2>Regístrate</h2>
          <p>Completa el formulario para crear una cuenta</p>
          {registerError && <p className={styles.errorMessage}>{registerError}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              {...register('nombre', { required: 'El nombre es obligatorio' })}
              className={errors.nombre ? styles.inputError : ''}
            />
            {errors.nombre && <span className={styles.errorMessage}>{errors.nombre.message}</span>}

            <input
              type="email"
              placeholder="Correo electrónico"
              {...register('correo', { required: 'El correo es obligatorio' })}
              className={errors.correo ? styles.inputError : ''}
            />
            {errors.correo && <span className={styles.errorMessage}>{errors.correo.message}</span>}

            <input
              type="password"
              placeholder="Contraseña"
              {...register('contraseña', { required: 'La contraseña es obligatoria' })}
              className={errors.contraseña ? styles.inputError : ''}
            />
            {errors.contraseña && <span className={styles.errorMessage}>{errors.contraseña.message}</span>}

            <select {...register('rol', { required: 'El rol es obligatorio' })} className={errors.rol ? styles.inputError : ''}>
              <option value="">Seleccione un rol</option>
              <option value="ciudadano">Ciudadano</option>
              <option value="administrador">Administrador</option>
            </select>
            {errors.rol && <span className={styles.errorMessage}>{errors.rol.message}</span>}

            <button type="submit">REGISTRAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
