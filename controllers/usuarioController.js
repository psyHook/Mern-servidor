// Importar modelo usuario
const Usuario = require("../models/Usuario");

// Importando bcryptjs para hashear el password
const bcryptjs = require("bcryptjs");

// Importando validationResult de express-validator
const { validationResult } = require("express-validator");

// Importando jsonwebtoken
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Extraer email y password
  const { email, password } = req.body;

  try {
    // Revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    // Validar si el usuario existe
    if (usuario) {
      return res.status(400).json({ msg: "El Usuario ya Existe" });
    }

    // Crea el nuevo usuario
    usuario = new Usuario(req.body);

    // Hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    // Guardar usuario
    await usuario.save();

    // Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    };

    // Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600000 // 1 hora
      },
      (error, token) => {
        if (error) throw error;
        // Mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
