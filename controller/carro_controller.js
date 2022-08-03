const ModelUsuario = require("../models/usuario_model");
const ModelProducto = require("../models/producto_model");

const addCarro = async (req, res, next) => {
  const { productoId, usuarioId } = req.body;

  try {
    const docProducto = await ModelProducto.findById(productoId).exec();
    if (!docProducto) {
      let err = new Error("No Existe");
      err.statusCode = 404;
      throw console.err;
    }

    let cantidad = 1;

    const items = [
      {
        productId: docProducto._id,
        cantidad,
        total: cantidad + docProducto.precio,
      },
    ];

    let docUsuario = await ModelUsuario.findById(usuarioId).exec();
    docUsuario.cart.items = items;
    await docUsuario.save();
    return res.json({ docUsuario });
  } catch (err) {
    next(err);
  }
};

const listarCarro = (req, res, next) => {
  const { idUsuario } = req.params;
  ModelUsuario.findById(idUsuario)
    .populate("cart.items.productId")
    .exec((err, doc) => {
      if (err) return next(err);

      return res.json({ doc });
    });
};

module.exports = {
  addCarro,
  listarCarro,
};
