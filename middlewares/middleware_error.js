const handler = (err, req, res, next) => {
  // console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, data: err.data });
};

const utilHandler = (doc, next, err = null) => {
  if (err) {
    return next(err);
  }

  if (!doc) {
    let error = new Error("No existe!");
    error.statusCode = 400;
    return next(error);
  }
};

module.exports = {
  handler,
  utilHandler,
};
