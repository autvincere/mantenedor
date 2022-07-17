const ModelProducto = require("../models/producto_model");
const { utilHandler } = require("../middlewares/middleware_error");

/**
 * Guardar Producto
 */
const guardar = (req, res, next) => {
  const data = ({
    producto_nombre,
    descripcion,
    precio,
    stock,
    categoria_nombre,
  } = req.body);

  const documento = new ModelProducto(data);

  documento.save((err, doc) => {
    // console.log(err);

    // Verificacion en caso de error
    if (err) return utilHandler(doc, next, err);

    return res.json(doc);
  });
};

/**
 * Get Producto
 */

const getById = (req, res, next) => {
  const idProduct = req.params.id;

  const query = ModelProducto.findById(idProduct);

  query.exec((err, doc) => {
    if (err) return utilHandler(doc, next, err);

    return res.json(doc);
  });
};

/**
 * Delete Producto
 */

const deleteProducto = (req, res, next) => {
  const idProduct = req.params.id;

  const query = ModelProducto.findByIdAndUpdate(
    idProduct,
    { disponible: false },
    { new: true }
  );

  query.exec((err, doc) => {
    if (err) return utilHandler(doc, next, err);

    return res.json(doc);
  });
};

/**
 * Update Producto
 */

const updateProducto = (req, res, next) => {
  const idProduct = req.params.id;
  const data = ({
    producto_nombre,
    descripcion,
    precio,
    stock,
  } = req.body);

  const query = ModelProducto.findByIdAndUpdate(idProduct, data, { new: true });

  query.exec((err, doc) => {
    if (err) return utilHandler(doc, next, err);

    return res.json(doc);
  });
};

module.exports = {
  guardar,
  getById,
  deleteProducto,
  updateProducto,
};
