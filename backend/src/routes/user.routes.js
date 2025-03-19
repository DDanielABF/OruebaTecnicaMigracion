// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// Opcional: un middleware de autenticación si la ruta requiere seguridad.
const { verifyToken } = require('../middlewares/auth.middleware');
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener datos de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar datos de un usuario
 *     tags: [Usuarios]
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: Objeto con los datos actualizables del usuario (por ejemplo, nombre, etc.)
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Nuevo Nombre"
 *              
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error en la actualización
 */

/**
 * @swagger
 * /api/users/{id}/password:
 *   put:
 *     summary: Actualizar la contraseña del usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario cuya contraseña se actualizará
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: Objeto que contiene la contraseña actual y la nueva contraseña
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "contraseñaActual"
 *               newPassword:
 *                 type: string
 *                 example: "nuevaContraseña123"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Error en la actualización de la contraseña
 */

router.get('/:id', verifyToken, userController.getUser);
router.put('/:id', verifyToken, userController.updateUser);
router.put('/:id/password', verifyToken, userController.updatePassword);

module.exports = router;
