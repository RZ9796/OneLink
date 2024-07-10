const Admin = require("../models/Admin");
const User = require("../models/User");
const asynchandler = require("express-async-handler");
const { uploadLogo, uploadProfile } = require("../utils/Uploads");
const fs = require("fs/promises");
const fsss = require("fs");
const path = require("path");
const Social = require("../models/Social");
//Profile
exports.getProfileByusername = asynchandler(async (req, res) => {
  const { username } = req.params;
  console.log("username", username);

  const x = await User.findOne({ username });
  const y = await Admin.find({ username });
  const z = await Social.find({ userId: x._id });
  const userP = new Array(x);
  console.log("userP", userP);
  console.log("xxxxxxx", x);
  console.log("yyyyyyy", y);
  console.log("zzzzzzzz", z);

  if (!y) {
    return res.status(400).json({ message: "User not found" });
  }

  res
    .status(200)
    .json({ message: "Profile added successfully", result: { y, userP, z } });
  res.status(500).json({ message: "Invalid Url" });
});

exports.getProfile = asynchandler(async (req, res) => {
  // console.log("get profile", req.body);
  const result = await User.find({ _id: req.body.userId });
  // console.log("x", result);
  if (!result) {
    return res.status(400).json({ message: "usernot found " });
  }

  res.status(200).json({ message: "profile fetched success", result });
});
exports.addProfile = asynchandler(async (req, res) => {
  // console.log("addddd", req.body);
  // const x = await User.findOne({ username: req.body.username });//before
  const x = await User.findById(req.body.userId); //after
  // console.log("adddprofile", x);
  if (!x) {
    return res.status(400).json({ message: "username error" });
  }
  await User.findByIdAndUpdate(x._id, {
    ProfileName: req.body.ProfileName,
    bio: req.body.bio,
    background: req.body.background,
  });
  res.status(200).json({ message: "profile Added success" });
});
exports.updateProfilePicture = asynchandler(async (req, res) => {
  const { linkId } = req.params;
  // console.log("linkID edit", linkId);

  uploadProfile(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: err.message || "unable to Update image" });
    }
    let updatedImg;
    const result = await User.findById(linkId);
    // console.log("edit", result);
    if (req.file) {
      if (fsss.existsSync(`/profilePicture/${result.photo}`)) {
        await fs.unlink(
          path.join(__dirname, "..", "profilePicture", result.photo)
        );
      }
      // if (result.photo) {
      // }
      updatedImg = await User.findByIdAndUpdate(
        linkId,
        {
          photo: req.file.filename,
        },
        { new: true }
      );
    }
    res.status(200).json({
      message: "user update success",
      updatedImg: {
        _id: updatedImg._id,
        name: updatedImg.name,
        email: updatedImg.email,
        photo: updatedImg.photo,
        username: updatedImg.username,
      },
    });
  });
  // await Admin.findByIdAndUpdate(linkId, req.body);
});
