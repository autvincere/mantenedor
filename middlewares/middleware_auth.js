const jwt = require("jsonwebtoken");

const roleAuth = (roles) => {
  try {
    return (req, res, next) => {
      let token = req.get("Authorization");
      let payload = jwt.verify(token, process.env.TOKEN_KEY);

      if (roles.indexOf(payload.role) > -1) {
        req.usuario = payload;
        return next();
      }

      throw new Error("UsuariooRol no Autorizado");
    };
  } catch (error) {
    let err;
    err.data = error;
    err.statusCode = 401;
    next(err);
    new Error("Error de Token");
  }
};

const isAuth = (req, res, next) => {
     let token = req.get("Authorization");
     
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) return next(err);

    console.log("decoded", decoded);
    req.decoded = decoded;
    next();
  });
};

const renewToken = (req, res, next) => {
  const { iat, exp, ...payload } = req.decoded;

  //   const payload = {
  //     usuarioId: Heq.decoded.usuarioId,
  //     role: req.decoded.role,
  //   };

  console.log("new payload", payload);

  let token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: process.env.CADUCIDAD_TOKEN,
  });
  res.json(token);
};

module.exports = {
  roleAuth,
  isAuth,
  renewToken,
};
