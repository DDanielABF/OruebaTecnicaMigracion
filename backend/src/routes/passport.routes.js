// src/routes/passport.routes.js
const express = require('express');
const router = express.Router();
const passportController = require('../controllers/passport.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

//************ documentacion swagger */
/**
 * @swagger
 * /api/passports:
 *   post:
 *     summary: Crear un pasaporte para un usuario
 *     tags: [Pasaportes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Objeto JSON que contiene los datos del pasaporte a crear
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_pasaporte:
 *                 type: string
 *                 example: "Ordinario"
 *               fecha_emision:
 *                 type: string
 *                 format: date
 *                 example: "2022-02-01"
 *               fecha_vencimiento:
 *                 type: string
 *                 format: date
 *                 example: "2032-02-01"
 *               lugar_emision:
 *                 type: string
 *                 example: "Guatemala"
 *               pais_emision:
 *                 type: string
 *                 example: "Guatemala"
 *               numero_pasaporte:
 *                 type: string
 *                 example: "12345ABCDE"
 *               activo:
 *                 type: boolean
 *                 example: true
 *               user_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Pasaporte creado exitosamente
 *       400:
 *         description: Error en la creación del pasaporte
 */

/**
 * @swagger
 * /api/passports/user/{user_id}:
 *   get:
 *     summary: Obtener todos los pasaportes asociados a un usuario
 *     tags: [Pasaportes]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID del usuario del que se quieren obtener los pasaportes
 *         schema:
 *           type: integer
 *         example: 2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pasaportes asociados al usuario
 *       404:
 *         description: Usuario o pasaportes no encontrados
 */


// Ruta para crear un pasaporte
router.post('/', verifyToken, passportController.createPassport);

// Ruta para obtener todos los pasaportes de un usuario (por ejemplo, usando un parámetro en la URL)
router.get('/user/:user_id', verifyToken, passportController.getUserPassports);

module.exports = router;
