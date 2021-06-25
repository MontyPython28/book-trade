const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: { type: String, default: "generic"},
  user_email: {type: String },
  aboutme: {type: String, default: "generic"},
  wishlist: [{type: String}],
  listing: [{type: String}]
});

module.exports = mongoose.model("User", user);