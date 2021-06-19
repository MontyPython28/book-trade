const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
  confirmed: { type: Boolean, default: false}
});

module.exports = mongoose.model("User", user);
