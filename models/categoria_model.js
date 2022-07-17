const mongoose = require("mongoose");

const schemaCategoria = mongoose.Schema(
  {
    categoria_nombre: {
      type: String,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("modelCategoria", schemaCategoria);

module.exports = model;
