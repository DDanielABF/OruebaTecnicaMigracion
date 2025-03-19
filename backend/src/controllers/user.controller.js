// src/controllers/user.controller.js
const userService = require('../services/user.service');

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Aquí podrías filtrar o validar qué campos se pueden actualizar
    const updatedUser = await userService.updateUser(id, req.body);
    res.status(200).json({ message: 'Usuario actualizado', data: updatedUser });
  } catch (error) {
    next(error);
  }
};
//actualizacion de contraseña
exports.updatePassword = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
      const result = await userService.updatePassword(id, currentPassword, newPassword);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
