const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swagger.config.json");
const swaggerJsdoc = require("swagger-jsdoc");

const routerV1 = require("../routers/v1/index");
const { handler } = require("../middlewares/middleware_error");
const app = express();

//=====
// Middlewares
//======

// body-parser
app.use(express.json());

//Cors
app.use(cors());

// morgan
app.use(morgan("dev"));

// Swagger
const swaggerDocs = swaggerJsdoc(swaggerConfig);
app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, { explorer: true })
);

//=====
// ROUTERS
//======
routerV1(app);

//=====
// HANDLER
//======
app.use(handler);

module.exports = app;
