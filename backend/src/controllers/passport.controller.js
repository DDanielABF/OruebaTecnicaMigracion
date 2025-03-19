// src/controllers/passport.controller.js
const passportService = require('../services/passport.service');

// src/controllers/passport.controller.js
exports.createPassport = async (req, res, next) => {
    try {
      const passport = await passportService.createPassport(req.body);
      res.status(201).json({ message: 'Pasaporte creado', data: passport });
    } catch (error) {
      console.error("Detalles del error:", error.errors);
      next(error);
    }
  };
  

exports.getUserPassports = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const passports = await passportService.getPassportsByUser(user_id);
    res.status(200).json({ data: passports });
  } catch (error) {
    next(error);
  }
};
