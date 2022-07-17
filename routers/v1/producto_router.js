const router = require("express").Router();

const {
  guardar,
  getById,
  deleteProducto,
  updateProducto,
} = require("../../controller/producto_controller");

router.post("/producto", guardar);
router.get("/producto/:id", getById);
router.delete("/producto/:id", deleteProducto);
router.put("/producto/:id", updateProducto);

module.exports = router;
