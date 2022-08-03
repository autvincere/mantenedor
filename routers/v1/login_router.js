const { validatorSignUp, validatorLogin } = require("../../validators/vlogin");
const { signUp, login } = require("../../controller/login_controller");
const { isAuth, renewToken } = require("../../middlewares/middleware_auth");

const router = require("express").Router();

// validatorSignUp, middleware intermedio que valida formato, antes de verificar algun dato en BD
router.post("/signup", validatorSignUp, signUp);
router.post("/login", validatorLogin, login);

router.get("/token/renew", isAuth, renewToken);

module.exports = router;
