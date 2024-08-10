const mongoose = require("mongoose");

mongoose.connect("mongoose://localhost:27017/paytm")
// create a Schema for user
const UserScehma = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
});


const User = mongoose.model("User", UserScehma);

module.exports = {
  User,
};