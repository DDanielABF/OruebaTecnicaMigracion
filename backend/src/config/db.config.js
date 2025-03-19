// src/config/db.config.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Utiliza las variables de entorno o valores por defecto (asegúrate de que DB_NAME sea 'migraciondb')
const sequelize = new Sequelize(
  process.env.DB_NAME || 'migraciondb', 
  process.env.DB_USER || 'root', 
  process.env.DB_PASS || '', 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Cambia a true si quieres ver las consultas SQL en consola
  }
);

module.exports = sequelize;
