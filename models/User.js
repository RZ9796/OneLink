const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    photo: {
      type: String,
      default: "dummy.png",
    },
    background: {
      type: String,
      default: "from-green-400 to-blue-500",
      // required: true,
    },

    bio: String,
    ProfileName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
