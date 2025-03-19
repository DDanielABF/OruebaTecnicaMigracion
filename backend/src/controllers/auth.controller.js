// src/controllers/auth.controller.js
const authService = require('../services/auth.service');

// src/controllers/auth.controller.js
exports.register = async (req, res, next) => {
    try {
      const { nombre, correo, contraseña, rol } = req.body;
      const newUser = await authService.register({ nombre, correo, contraseña, rol });
      res.status(201).json({
        message: 'Usuario registrado exitosamente. Guarda tu id de usuario para iniciar sesión.',
        data: newUser,  // Aquí newUser contiene el id
      });
    } catch (error) {
      next(error);
    }
  };
  
  exports.login = async (req, res, next) => { 
    try {
      const { id, contraseña } = req.body;
      const { token, rol, id: userId, nombre } = await authService.login(id, contraseña);
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        rol,
        id: userId,
        nombre
      });
    } catch (error) {
      next(error);
    }
  };
  
