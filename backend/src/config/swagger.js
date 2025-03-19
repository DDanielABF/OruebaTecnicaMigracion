// src/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
const options = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI
    info: {
      title: 'API de Registro y Gestión de Usuarios y Pasaportes',
      version: '1.0.0',
      description: 'Documentación de la API para prueba tecnica en Departamento de Migracion',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base del servidor
      },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
  },
  // Archivos donde se encuentran las anotaciones JSDoc para generar la documentación
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
