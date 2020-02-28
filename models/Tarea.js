const mongoose = require("mongoose");

const TareaSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  estado: {
    type: Boolean,
    default: false
  },
  creado: {
    type: Date,
    dafault: Date.now()
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto"
  }
});

module.exports = mongoose.model("Tarea", TareaSchema);
