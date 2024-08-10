const mongoose = require("mongoose");

mongoose.connect("mongoose://localhost:27017/paytm");
// create a Schema for user
const UserSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
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
