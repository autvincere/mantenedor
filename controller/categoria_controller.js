const ModelCategoria = require("../models/categoria_model");
const { utilHandler } = require("../middlewares/middleware_error");

/**
 * Guardar Categoria
 */
const guardar = (req, res, next) => {
  console.log(req.body);

  const data = { categoria_nombre: req.body.categoria_nombre };

  const documento = ModelCategoria(data);

  documento.save((err, doc) => {
    if (err) return utilHandler(doc, next, err);
    console.log(err);
    return res.json({
      data: doc,
    });
  });
};

/**
 * Listar Categoria
 */
const listar = (req, res) => {
  ModelCategoria.find((err, docs) => {
    res.json(docs);
  });
};

/**
 * Update Categoria
 */
const actualizar = (req, res) => {
  const id = req.params.id;
  const data = {
    categoria_nombre: req.body.categoria_nombre,
    status: req.body.status,
  };

  ModelCategoria.findByIdAndUpdate(id, data, { new: true }, (err, doc) => {
    res.json(doc);
  });
};

module.exports = {
  guardar,
  listar,
  actualizar,
};
