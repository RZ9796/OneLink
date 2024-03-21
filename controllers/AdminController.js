const asynchandler = require("express-async-handler");
const Admin = require("../models/Admin");
const User = require("../models/User");
const fs = require("fs/promises");
const path = require("path");
const { uploadLogo } = require("../utils/Uploads");

exports.getLink = asynchandler(async (req, res) => {
  const data = await User.findById(req.body.userId);
  if (data) {
    const result = await Admin.find({ username: data.username });
    res.status(200).json({ message: "Link Added success", result });
  } else {
    res.status(400).json({ message: "Link fetched failed" });
  }
});

// add linkc
exports.addLink = asynchandler(async (req, res) => {
  const result = await User.findById(req.body.userId);

  if (result) {
    // await Admin.create({ ...req.body, username: result.username });
    uploadLogo(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: err.message || "unable to upload" });
      }
      if (req.file) {
        await Admin.create({
          ...req.body,
          username: result.username,

          avatar: req.file.filename,
        });
      } else {
        await Admin.create({
          ...req.body,
          username: result.username,
        });
      }
      res.status(200).json({ message: "Link Added success" });
    });
  } else {
    res.status(400).json({ message: "no result found" });
  }
});
// removelink
exports.deleteLink = asynchandler(async (req, res) => {
  const { linkId } = req.params;
  const result = await Admin.findById(linkId);
  if (result.avatar) {
    await fs.unlink(path.join(__dirname, "..", "logo", result.avatar));
  }
  await Admin.findByIdAndDelete(linkId);

  res.status(200).json({ message: "Link Delete success" });
});
// updatelink

exports.updateLink = asynchandler(async (req, res) => {
  const { linkId } = req.params;

  await Admin.findByIdAndUpdate(linkId, req.body);
  res.status(200).json({ message: "user update success" });
});
exports.updateLogo = asynchandler(async (req, res) => {
  const { linkId } = req.params;
  console.log("linkID", linkId);

  uploadLogo(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: err.message || "unable to Update image" });
    }

    const result = await Admin.findById(linkId);
    console.log("edit", result);
    if (req.file) {
      if (result.avatar) {
        await fs.unlink(path.join(__dirname, "..", "logo", result.avatar));
      }
      await Admin.findByIdAndUpdate(linkId, {
        avatar: req.file.filename,
      });
    }
    res.status(200).json({ message: "user update success" });
  });
  // await Admin.findByIdAndUpdate(linkId, req.body);
});

exports.addUsername = asynchandler(async (req, res) => {
  const result = await User.findByIdAndUpdate(
    req.body.userId,
    {
      username: req.body.username,
    },
    { new: true }
  );
  if (!result) {
    return res.status(400).json({ message: "Fail" });
  }
  res.json({ message: "employers Detail Fetch Success", result });
});
