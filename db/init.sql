-- Crear la base de datos (modifica "mi_basedatos" según sea necesario)
CREATE DATABASE IF NOT EXISTS mi_basedatos;
USE mi_basedatos;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'ciudadano') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

--  Crear la tabla passports con la columna generada active_unique
CREATE TABLE passports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_pasaporte VARCHAR(255) NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    lugar_emision VARCHAR(255) NOT NULL,
    pais_emision VARCHAR(255) NOT NULL,
    numero_pasaporte VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT FALSE,
    user_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active_unique TINYINT GENERATED ALWAYS AS (IF(activo, 1, NULL)) STORED,
    CONSTRAINT fk_passports_users FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--  Crear un índice único para el número de pasaporte
CREATE UNIQUE INDEX idx_numero_pasaporte ON passports (numero_pasaporte);

--  Crear el índice único para asegurar que solo un pasaporte activo exista por usuario
CREATE UNIQUE INDEX idx_active_unique ON passports (user_id, active_unique);

-- Tabla de metadatos
CREATE TABLE metadata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    llave VARCHAR(255) NOT NULL UNIQUE,
    valor VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
