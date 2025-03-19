// src/controllers/admin.controller.js
const adminService = require('../services/admin.service');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

exports.getAllPassports = async (req, res, next) => {
  try {
    const passports = await adminService.getAllPassports();
    res.status(200).json({ data: passports });
  } catch (error) {
    next(error);
  }
};

exports.disableUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await adminService.disableUser(id);
    res.status(200).json({ message: 'Usuario deshabilitado', data: user });
  } catch (error) {
    next(error);
  }
};

exports.updatePassportStatus = async (req, res, next) => {
  try {
    const { passportId } = req.params;
    const { status } = req.body; // status debería ser true o false
    const passport = await adminService.updatePassportStatus(passportId, status);
    res.status(200).json({ message: 'Estado del pasaporte actualizado', data: passport });
  } catch (error) {
    next(error);
  }
};

exports.associatePassportToUser = async (req, res, next) => {
  try {
    const passport = await adminService.associatePassportToUser(req.body);
    res.status(201).json({ message: 'Pasaporte asociado al usuario', data: passport });
  } catch (error) {
    next(error);
  }
};
