const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");

const logoStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
    console.log(cb);
  },
  destination: (req, file, cb) => {
    cb(null, "logo");
  },
});
const ProfileStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
    console.log(cb);
  },
  destination: (req, file, cb) => {
    cb(null, "profilePicture");
  },
});

const uploadLogo = multer({ storage: logoStorage }).single("avatar");
const uploadProfile = multer({ storage: ProfileStorage }).single("photo");

module.exports = { uploadLogo, uploadProfile };
