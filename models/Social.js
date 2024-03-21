const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  name: { type: String },
  url: { type: String },
  icons: { type: String },
});

module.exports = mongoose.model("social", socialSchema);

// [ {name:"insta",url:"aaaa"},{name:"insta",url:"aaaa"}]
