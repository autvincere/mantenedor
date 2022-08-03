// Module core
const http = require("http");

// Module npm
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "dev") {
  require("dotenv").config({ path: "./.env.dev" });
}

if (process.env.NODE_ENV === "prod") {
  require("dotenv").config({ path: "./.env.prod" });
}

// Modulos propios
const app = require("./config/app");
const server = http.createServer(app);

console.log(process.env.MONGO_URL);
const { MONGO_URL, PORT } = process.env;

// Moongose
mongoose.connect(MONGO_URL).then(() => {
  console.log("Mongo Ok");

  server.listen(PORT, () => {
    console.log("Server Up port", PORT);
  });
});
