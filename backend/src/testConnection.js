// testConnection.js
const sequelize = require('./config/db.config');


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  } finally {
    // Cerrar la conexión si es necesario
    await sequelize.close();
  }
})();
