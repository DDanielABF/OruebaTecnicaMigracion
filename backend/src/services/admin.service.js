// src/services/admin.service.js
const User = require('../models/user.model');
const Passport = require('../models/passport.model');

/**
 * Obtiene la lista de todos los usuarios registrados.
 * @returns {Promise<Array>} Lista de usuarios.
 */
const getAllUsers = async () => {
  return await User.findAll();
};

/**
 * Obtiene la lista de todos los pasaportes registrados.
 * @returns {Promise<Array>} Lista de pasaportes.
 */
const getAllPassports = async () => {
  return await Passport.findAll();
};

/**
 * Deshabilita un usuario cambiando su estado a false.
 * @param {number} userId - ID del usuario a deshabilitar.
 * @returns {Promise<Object>} Usuario actualizado.
 */
const disableUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('Usuario no encontrado.');
  }
  // Se asume que el modelo User tiene el campo "estado"
  await user.update({ estado: false });
  return user;
};

/**
 * Habilita o deshabilita un pasaporte.
 * @param {number} passportId - ID del pasaporte.
 * @param {boolean} status - true para habilitar, false para deshabilitar.
 * @returns {Promise<Object>} Pasaporte actualizado.
 */
const updatePassportStatus = async (passportId, status) => {
  const passport = await Passport.findByPk(passportId);
  if (!passport) {
    throw new Error('Pasaporte no encontrado.');
  }
  await passport.update({ activo: status });
  return passport;
};

/**
 * Asocia un nuevo pasaporte a un usuario.
 * @param {Object} passportData - Datos del pasaporte, incluyendo user_id.
 * @returns {Promise<Object>} Pasaporte creado.
 */
const associatePassportToUser = async (passportData) => {
  // Aquí puedes agregar lógica adicional (por ejemplo, asegurarte de que el usuario no tenga ya un pasaporte activo)
  const passport = await Passport.create(passportData);
  return passport;
};

module.exports = {
  getAllUsers,
  getAllPassports,
  disableUser,
  updatePassportStatus,
  associatePassportToUser,
};
