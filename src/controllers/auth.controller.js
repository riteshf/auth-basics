const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();
const newToken = (user) => {
  console.log(process.env.JWT_SECRET_KEY);
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

router.post("/register", async (req, res) => {
  try {
    // Check if user exisit with similar email id
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      // if yes, return error, user already exist
      return res.status(400).json({ message: "User Already Exisit" });
    }

    // if not create a new users with hashed password
    user = await User.create(req.body);

    // after creating user, create token
    return res.status(200).json({ token: newToken(user) });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    // get user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // if yes, return error, user already exist
      return res
        .status(400)
        .json({ message: "User email or password incorrect" });
    }

    // if user is found then we will match the passwords
    const match = user.checkPassword(req.body.password);

    if (!match)
      return res
        .status(400)
        .send({ message: "Please try another email or password" });

    // then we will create the token for that user
    const token = newToken(user);

    // then return the user and the token
    res.send({ user, token });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

module.exports = router;
