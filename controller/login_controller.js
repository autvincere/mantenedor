// Paquete para encriptacion
const bcrypt = require("bcrypt");
// Login
const jwt = require("jsonwebtoken");

const ModelUsuario = require("../models/usuario_model");
const { utilHandler } = require("../middlewares/middleware_error");

const signUp = (req, res, next) => {
  console.log(req.body);

  const salt = bcrypt.genSaltSync();
  // console.log({ salt });

  const data = ({ nombre, email, password, role } = req.body);
  const dataEncrypt = { ...data, password: bcrypt.hashSync(password, salt) };

  const docUsuario = ModelUsuario(dataEncrypt);
  docUsuario.save((err, doc) => {
    if (err) return utilHandler(doc, next, err);

    res.json({
      doc,
    });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);

  ModelUsuario.findOne({ email }, (err, doc) => {
    if (err) return utilHandler(doc, next, err);

    if (!bcrypt.compareSync(password, doc.password)) {
      let error = new Error("Usuario o password incorrecto");
      error.statusCode = 404;
      return next(error);
    }

    const payload = {
      usuarioId: doc._id,
      role: doc.role,
    };

    const token = jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: "1hr",
    });

    return res.json({
      // doc,
      usuario: {
        usuarioId: doc._id,
        nombre: doc.nombre,
        role: doc.role,
      },
      token,
    });
  });
};

module.exports = {
  signUp,
  login,
};
