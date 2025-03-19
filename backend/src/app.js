// src/app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const passportRoutes = require('./routes/passport.routes');
const adminRoutes = require('./routes/admin.routes');

// Montar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/passports', passportRoutes);
app.use('/api/admin', adminRoutes);
// Configuración de Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de manejo de errores (debe ir al final)
const errorMiddleware = require('./middlewares/error.middleware');
app.use(errorMiddleware);

module.exports = app;
