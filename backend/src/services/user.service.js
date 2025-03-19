// src/services/user.service.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
/**
 * Obtiene un usuario por su ID.
 * @param {number} id - ID del usuario.
 * @returns {Promise<Object>} Usuario encontrado.
 */
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado.');
  }
  return user;
};

/**
 * Actualiza los datos del usuario (excepto su ID y/o campos inmutables).
 * @param {number} id - ID del usuario a actualizar.
 * @param {Object} updateData - Datos a actualizar.
 * @returns {Promise<Object>} Usuario actualizado.
 */
const updateUser = async (id, updateData) => {
  const user = await getUserById(id);
  // Evitar actualizar campos inmutables, por ejemplo, el ID o el correo (si se requiere)
  // Aquí podrías filtrar updateData según lo que se permita actualizar.
  await user.update(updateData);
  return user;
};
/**
 * Actualiza la contraseña del usuario.
 * @param {number} id - ID del usuario.
 * @param {string} currentPassword - Contraseña actual.
 * @param {string} newPassword - Nueva contraseña.
 * @returns {Promise<Object>} Mensaje de éxito.
 */
const updatePassword = async (id, currentPassword, newPassword) => {
    const user = await getUserById(id);
    // Verificar la contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.contraseña);
    if (!isMatch) {
      throw new Error('La contraseña actual es incorrecta.');
    }
    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // Actualizar el registro del usuario con la nueva contraseña
    await user.update({ contraseña: hashedPassword });
    return { message: 'Contraseña actualizada correctamente.' };
  };

module.exports = {
  getUserById,
  updateUser,
  updatePassword
};
