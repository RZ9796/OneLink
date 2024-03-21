const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  heading: { type: String },
  url: { type: String },
  status: { type: Boolean, default: false },
  username: String,
  avatar: String,
 
  // userId: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "user",
  // },
});

module.exports = mongoose.model("links", adminSchema);
