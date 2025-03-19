// src/models/Passport.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Passport = sequelize.define('Passport', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo_pasaporte: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_emision: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_vencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  lugar_emision: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais_emision: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero_pasaporte: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // user_id será la clave foránea (se define la asociación en index.js)
  // "active_unique" es una columna generada en la BD. Si deseas mapearla:
  // la podrías definir como un campo virtual o DataTypes.TINYINT con "readOnly"
  // pero no es obligatorio para la lógica básica de Sequelize.

}, {
  tableName: 'passports',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion',
});

module.exports = Passport;
