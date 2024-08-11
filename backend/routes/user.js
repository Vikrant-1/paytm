const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const { ERROR } = require("../contents");

// signup route
const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    // get params
    const { username, firstname, lastname, password } = req.body;
    // validate with zod
    const zodCheck = signupSchema.safeParse({
      username,
      password,
      firstname,
      lastname,
    });
    if (!zodCheck) {
      return res.status(400).json({
        message: "Validation Error",
      });
    }
    // check user already exisit or not
    const userCheck = await User.findOne({ username });
    if (userCheck?._id) {
      return res.status(409).json({
        message: "The username you provided is already taken.",
      });
    }
    // create user and return
    const newUser = new User({
      username,
      password,
      firstname,
      lastname,
    });
    await newUser.save();

    // sign token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    res.status(201).json({
      message: "User Created Successfully",
      data: {
        token: token,
        username: newUser.username,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        userId: newUser._id,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
});

const loginSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    // zod parse
    const { success } = loginSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }

    // check user exist or not
    const user = await User.findOne({ username });

    if (!user) {
      res.status(411).json({
        message: "Invalid username or password",
        type: ERROR,
        error: "User not found",
      });
    }
    // validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(411).json({
        message: "Password is wrong",
        type: ERROR,
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    return res.status(200).json({
      message: "User Logged in Successfully",
      data: {
        token: token,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        userId: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      type: ERROR,
      error: error.message,
    });
  }
});

// update user details

const updateSchema = zod.object({
  firstname: zod.string().max(50).optional(),
  lastname: zod.string().max(50).optional(),
  password: zod.string().min(6).optional(),
});

router.put("/", async (req, res) => {
  try {
    const userId = req.userId;
    const { firstname, lastname, password } = req.body;

    // zod check
    const zodCheck = updateSchema.safeParse(req.body);

    if (!zodCheck.success) {
      res.status(401).json({
        message: "Invalid data",
        type: ERROR,
      });
    }

    // check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User did't exsist",
      });
    }
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (password) user.password = password;

    await user.save();
    res.status(200).json({
      message: "User updated Successfully !!",
    });
  } catch (error) {
    res.status(401).json({
      message: "Failed to Update User details",
    });
  }
});

module.exports = router;
