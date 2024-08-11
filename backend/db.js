const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 3,
      maxLength: 30,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    firstname: {
      type: String,
      trim: true,
      required: true,
      maxLength: 50,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      maxLength: 50,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
