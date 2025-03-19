// src/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Middleware que verifique el token y el rol de administrador
router.use(verifyToken, isAdmin);
//doucmentacion swagger 
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Obtener la lista de todos los usuarios (Administrador)
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/admin/passports:
 *   get:
 *     summary: Obtener la lista de todos los pasaportes (Administrador)
 *     tags: [Administración]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pasaportes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Passport'
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/admin/users/{id}/disable:
 *   put:
 *     summary: Deshabilitar un usuario (Administrador)
 *     tags: [Administración]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a deshabilitar
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario deshabilitado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/admin/passports/{passportId}/status:
 *   put:
 *     summary: Actualizar el estado de un pasaporte (Administrador)
 *     tags: [Administración]
 *     parameters:
 *       - in: path
 *         name: passportId
 *         required: true
 *         description: ID del pasaporte
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: Objeto que contiene el nuevo estado del pasaporte
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 example: false
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estado del pasaporte actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Passport'
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/admin/passports/associate:
 *   post:
 *     summary: Asociar un nuevo pasaporte a un usuario (Administrador)
 *     tags: [Administración]
 *     requestBody:
 *       required: true
 *       description: Objeto JSON con los datos del pasaporte a asociar
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
 *                 example: "2022-03-01"
 *               fecha_vencimiento:
 *                 type: string
 *                 format: date
 *                 example: "2032-03-01"
 *               lugar_emision:
 *                 type: string
 *                 example: "Guatemala"
 *               pais_emision:
 *                 type: string
 *                 example: "Guatemala"
 *               numero_pasaporte:
 *                 type: string
 *                 example: "98765ZYXWV"
 *               activo:
 *                 type: boolean
 *                 example: true
 *               user_id:
 *                 type: integer
 *                 example: 2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pasaporte asociado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Passport'
 *       401:
 *         description: No autorizado
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         correo:
 *           type: string
 *         rol:
 *           type: string
 *           enum: [administrador, ciudadano]
 *         estado:
 *           type: boolean
 *     Passport:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         tipo_pasaporte:
 *           type: string
 *         fecha_emision:
 *           type: string
 *           format: date
 *         fecha_vencimiento:
 *           type: string
 *           format: date
 *         lugar_emision:
 *           type: string
 *         pais_emision:
 *           type: string
 *         numero_pasaporte:
 *           type: string
 *         activo:
 *           type: boolean
 *         user_id:
 *           type: integer
 */


// Rutas para administración
router.get('/users', adminController.getAllUsers);
router.get('/passports', adminController.getAllPassports);
router.put('/users/:id/disable', adminController.disableUser);
router.put('/passports/:passportId/status', adminController.updatePassportStatus);
router.post('/passports/associate', adminController.associatePassportToUser);

module.exports = router;
