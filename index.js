const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar Cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// Puerto de la app
const port = process.env.PORT || 4000;

// Importar Rutas (routes)
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

// Definir la pagina principal
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

// Arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(
    `El Servidor esta funcionando en el puerto ${port}`
  );
});
