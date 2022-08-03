const { body, validationResult } = require("express-validator");
const ModelUsuario = require("../models/usuario_model");

const paramSignUp = [
  body("email")
    .isEmail()
    .withMessage("Ingrese un email valido")
    .custom((value) => {
      return ModelUsuario.findOne({ email: value }).then((doc) => {
        if (doc) return Promise.reject("Este correo ya existe");
      });
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Minimo 6 caracteres")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.1%*#7&])/)
    .withMessage(
      "Debe tener numeros, caracteres y algun caracter especial (ej: @$.1%*#7&)"
    ),
];

const paramLogin = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Minimo 6 caracteres")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.1%*#7&])/)
    .withMessage(
      "Debe tener numeros, caracteres y algun caracter especial (ej: @$.1%*#7&)"
    ),
];

const vSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let err = new Error("Error en los campos");
    err.statusCode = 422;
    err.data = errors.array();
    throw err;
  }
  next();
};

const validatorSignUp = [paramSignUp, vSignUp];
const validatorLogin = [paramLogin, vSignUp];

module.exports = {
  validatorSignUp,
  validatorLogin,
};
