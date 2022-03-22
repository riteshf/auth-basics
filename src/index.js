const express = require("express");

const connect = require("./configs/db");
const userController = require("./controllers/user.controller");

let app = express();
app.use(express.json());
app.use("/users", userController);

app.listen(8000, async () => {
  try {
    await connect();
    console.log("Running on PORT: ", 8000);
  } catch (e) {
    console.log(e.message);
  }
});
