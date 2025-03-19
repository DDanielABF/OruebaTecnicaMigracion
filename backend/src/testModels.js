// src/testModels.js
const { initModels, User, Passport, Metadata } = require('./models');

(async () => {
  try {
    // Inicializa la conexión y sincroniza modelos
    await initModels();
    
    // 1. Crear un usuario de prueba
    const user = await User.create({
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      contraseña: '123456',
      rol: 'administrador',
    });
    console.log('Usuario creado:', user.toJSON());

    // 2. Crear un pasaporte asociado al usuario
    const passport = await Passport.create({
      tipo_pasaporte: 'Ordinario',
      fecha_emision: '2022-01-01',
      fecha_vencimiento: '2032-01-01',
      lugar_emision: 'Ciudad X',
      pais_emision: 'País Y',
      numero_pasaporte: 'AB1234567',
      activo: true,
      user_id: user.id, // Asociamos al usuario recién creado
    });
    console.log('Pasaporte creado:', passport.toJSON());

    // 3. Crear una entrada en metadata
    const meta = await Metadata.create({
      llave: 'version',
      valor: '1.0.0',
      descripcion: 'Versión inicial del sistema',
    });
    console.log('Metadata creada:', meta.toJSON());

    // 4. Consultar los pasaportes del usuario
    const userWithPassports = await User.findOne({
      where: { id: user.id },
      include: Passport, // Incluir pasaportes asociados
    });
    console.log('Usuario con pasaportes:', JSON.stringify(userWithPassports, null, 2));
    
  } catch (error) {
    console.error('Error en la prueba de modelos:', error);
  } finally {
    process.exit(0); // Cierra el proceso Node
  }
})();
