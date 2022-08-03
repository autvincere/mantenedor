const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemalUsuario = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER_ROLE",
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "modelProducto",
        },
        cantidad: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

const model = mongoose.model("modelUsuario", schemalUsuario);

module.exports = model;
