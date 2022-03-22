const express = require("express");
require("dotenv").config();
const connect = require("./configs/db");
const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");

let app = express();
app.use(express.json());
app.use("/auth", authController);
app.use("/users", userController);
app.use("/products", productController);

app.listen(8000, async () => {
  try {
    await connect();
    console.log("Running on PORT: ", 8000);
  } catch (e) {
    console.log(e.message);
  }
});
