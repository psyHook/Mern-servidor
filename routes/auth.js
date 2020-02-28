// Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();

// Importando express validator
const { check } = require("express-validator");

// Importanto authController
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Iniciar sesion
// api/auth - endpoint
router.post("/", authController.autenticarUsuario);

// Obtiene el usuario autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
