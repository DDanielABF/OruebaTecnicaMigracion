// src/services/passport.service.js
const Passport = require('../models/passport.model');
const User = require('../models/user.model');

/**
 * Crea un nuevo pasaporte asociado a un usuario.
 * @param {Object} passportData - Datos del pasaporte (incluye user_id).
 * @returns {Promise<Object>} Pasaporte creado.
 */
const createPassport = async (passportData) => {
    if (passportData.activo) {
      const activePassport = await Passport.findOne({
        where: {
          user_id: passportData.user_id,
          activo: true,
        },
      });
      if (activePassport) {
        throw new Error('El usuario ya tiene un pasaporte activo.');
      }
    }
    
    const passport = await Passport.create(passportData);
    return passport;
  };
  
/**
 * Obtiene todos los pasaportes asociados a un usuario.
 * @param {number} userId - ID del usuario.
 * @returns {Promise<Array>} Lista de pasaportes.
 */
const getPassportsByUser = async (userId) => {
  // Verificar que el usuario exista
  await User.findByPk(userId);
  const passports = await Passport.findAll({ where: { user_id: userId } });
  return passports;
};

module.exports = {
  createPassport,
  getPassportsByUser,
};
