const Social = require("../models/Social");
const asynchandler = require("express-async-handler");
const { findOne } = require("../models/User");
exports.getSocials = asynchandler(async (req, res) => {
  const result = await Social.find();
  console.log("resssssssssssssssss", result);
  res.status(200).json({ message: "social fetched success", result });
});

exports.updateSocials = asynchandler(async (req, res) => {
  console.log("---------------------");
  const { id } = req.params;
  const { url } = req.body;
  console.log("id", id);

  const result = await Social.findByIdAndUpdate(id, { url }, { new: true });

  if (!result) {
    return res.status(404).json({ message: "Social not found" });
  }

  res.status(200).json({ message: "Social updated successfully", result });
});
