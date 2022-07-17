// Module core
const http = require("http");

// Module npm
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

// Modulos propios
const app = require("./config/app");
const server = http.createServer(app);

// console.log(process.env.PORT);
const { MONGO_URL, PORT } = process.env;

// Moongose
mongoose.connect(MONGO_URL).then(() => {
  console.log("Mongo Ok");

  server.listen(PORT, () => {
    console.log("Server Up port", PORT);
  });
});
