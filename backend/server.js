// server.js
require('dotenv').config();
const app = require('./src/app');
const { initModels } = require('./src/models');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initModels(); // Inicializa y sincroniza los modelos con la BD
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
})();
