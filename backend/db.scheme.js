const mongoose = require("mongoose");

mongoose.connect("mongoose://localhost:27017/paytm");
// create a Schema for user
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 50,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 50,
  },
});

const User = mongoose.model("User", UserSchema);

const AccountsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Accounts = mongoose.model("Accounts", AccountsSchema);

module.exports = {
  User,
  Accounts,
};
