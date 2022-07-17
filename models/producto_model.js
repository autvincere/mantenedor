const ModelCategoria = require("./categoria_model");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * funcion para determinar si existe una categoria
 * @param {string}
 * @returns {boolean}
 */
const validator_categoria = (value) =>
  ModelCategoria.exists({ categoria_nombre: value });

const schemaProducto = new Schema(
  {
    producto_nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    precio: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    vendidos: {
      type: Number,
      default: 0,
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    categoria_nombre: {
      type: String,
      required: true,
      validate: {
       validator: validator_categoria,
        // message: `${categoria_nombre} Categoria no existe`,
        // validator: props => `${props.value} Categoria no existe!`
        message: props => `${props.value} Categoria no existe!`
      },
    },
    imagen: {
      type: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("modelProducto", schemaProducto);

module.exports = model;
