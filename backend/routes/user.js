// backend/routes/user.js
const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db.scheme");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const signupSchema = zod.object({
  username: zod.string(),
  firstname: zod.string(),
  password: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  const success = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = User.findOne({
    username: username,
  });

  if (user._id) {
    return res.status(411).json({
      message: "Email already taken /Incorrect inputs",
    });
  }

  const dbUser = await User.create({
    username: username,
    firstname: firstname,
    lastname: lastname,
    password: password,
  });

  const userId = dbUser._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created Succesfully",
    token: token,
  });
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const success = signinSchema.parse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  // check for user

  const user = User.findOne({
    username: username,
    password: password,
  });

  if (!user._id) {
    return res.status(411).json({
      message: "User did not exist",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
});

module.exports = router;
