const express = require("express");
const morgan = require("morgan");

const routerV1 = require("../routers/v1/index");
const { handler } = require("../middlewares/middleware_error");
const app = express();

//=====
// Middlewares
//======

// body-parser
app.use(express.json());

// morgan
app.use(morgan("dev"));

//=====
// ROUTERS
//======
routerV1(app);

//=====
// HANDLER
//======
app.use(handler);

module.exports = app;
