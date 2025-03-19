// src/models/index.js
const sequelize = require('../config/db.config');
const User = require('./user.model');
const Passport = require('./passport.model');
const Metadata = require('./metadata.model');

// Definimos asociaciones (User - Passport)
User.hasMany(Passport, {
  foreignKey: 'user_id',   // Nombre de la columna en Passport
  onDelete: 'CASCADE',     // Si el usuario se borra, se borran sus pasaportes
});
Passport.belongsTo(User, {
  foreignKey: 'user_id',
});

const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');
    // Sincroniza los modelos con la base de datos
    // Usa { alter: true } para actualizar el esquema en desarrollo, pero ten cuidado en producción
    await sequelize.sync({ alter: false });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Passport,
  Metadata,
  initModels,
};
