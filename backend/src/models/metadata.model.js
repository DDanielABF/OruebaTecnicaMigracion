// src/models/Metadata.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Metadata = sequelize.define('Metadata', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  llave: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  valor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'metadata',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion',
});

module.exports = Metadata;
