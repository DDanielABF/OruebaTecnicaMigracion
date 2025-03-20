// src/services/auth.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const SALT_ROUNDS = 10;

const register = async ({ nombre, correo, contraseña, rol }) => {
  // Verificar si ya existe un usuario con el mismo correo.
  const existingUser = await User.findOne({ where: { correo } });
  if (existingUser) {
    throw new Error('El correo ya está registrado.');
  }
  
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(contraseña, salt);
  
  const user = await User.create({
    nombre,
    correo,
    contraseña: hashedPassword,
    rol,
  });
  
  // Retorna el id para que el usuario lo utilice en el login
  return { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol };
};

const login = async (id, contraseña) => {
  // Buscar usuario por id
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Credenciales inválidas.');
  }
  
  // Verifica que el usuario esté habilitado
  if (user.estado === false) {
    throw new Error('El usuario se encuentra inhabilitado.');
  }
  
  const isMatch = await bcrypt.compare(contraseña, user.contraseña);
  if (!isMatch) {
    throw new Error('Credenciales inválidas.');
  }
  
  const token = jwt.sign(
    { id: user.id, rol: user.rol },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '1d' }
  );
  
  // Retornamos un objeto con todos los datos requeridos
  return {
    token,
    rol: user.rol,
    id: user.id,
    nombre: user.nombre
  };
};


module.exports = {
  register,
  login,
};
