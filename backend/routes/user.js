// backend/routes/user.js
const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db.scheme");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

// sign up user
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

//  sign in user
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

// update user
const updateUserSchema = zod.object({
  username: zod.string().optional(),
  firstname: zod.string().optional(),
  password: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const success = updateUserSchema.parse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Input fields are not valid",
    });
  }

  await User.updateOne({ _id: userId }, req.body);

  res.json({
    message: "Updated Successfully",
  });
});

// filter and get users

router.get("/bulk", authMiddleware, async (req, res) => {
  const { filter = "" } = req.query; // query params

  if (!filter)
    return res.json({
      message: "No Users found",
    });

  const bulkUsers = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  return res.json({
    message: "Filter Users Successfully",
    data: bulkUsers.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
