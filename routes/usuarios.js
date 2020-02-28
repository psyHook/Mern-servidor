// Rutas para crear usuarios
const express = require("express");
const router = express.Router();

// Importanto usuarioController
const usuarioController = require("../controllers/usuarioController");

// Importando express validator
const { check } = require("express-validator");

// Crea un usuario
// api/usuarios - endpoint
router.post(
  "/",
  [
    check("nombre", "El Nombre es obligatorio")
      .not()
      .isEmpty(),
    check("email", "Agrega un Email válido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6
    })
  ],
  usuarioController.crearUsuario
);

module.exports = router;
