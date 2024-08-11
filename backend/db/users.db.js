const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// Validating the candidate password with stored hash and hash function
UserSchema.methods.validatePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password validation failed");
  }
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});
const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
