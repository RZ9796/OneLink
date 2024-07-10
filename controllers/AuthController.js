const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Social = require("../models/Social");

exports.registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already registered" });
  }
  const hashPass = await bcrypt.hash(password, 10);
  await User.create({ ...req.body, username: "", password: hashPass });
  res.status(201).json({ message: "User Register Success" });
  res.status(500).json({
    message: "Something went wrong",
  });
});
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email: email });
  console.log(result);
  if (!result) {
    return res.status(401).json({ message: "invalid email" });
  }
  // check pass
  const verify = await bcrypt.compare(password, result.password);
  if (!verify) {
    return res.status(401).json({ message: "invalid password" });
  }
  // ///////////
  const socialDataExists = await Social.exists({ userId: result._id });
  if (!socialDataExists) {
    const arr = [
      { name: "Facebook", icon: "faFacebook" },
      { name: "Instagram", icon: "faInstagram" },
      { name: "LinkedIn", icon: "faLinkedin" },
      { name: "Github", icon: "faGithub" },
      { name: "Whatsapp", icon: "faWhatsapp" },
      { name: "Twitter", icon: "faTwitter" },
      { name: "Youtube", icon: "faYoutube" },
      { name: "Telegram", icon: "faTelegram" },
      { name: "Email", icon: "faEnvelope" },
    ];

    const data = arr.map((item) => {
      return {
        name: item.name,
        url: "",
        icons: item.icon,
        userId: result._id,
      };
    });
    await Social.create(data);
  }

  const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, {
    expiresIn: "15d",
  });

  res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 24 * 15 });
  res.status(200).json({
    message: "User Login Success",
    result: {
      _id: result._id,
      name: result.name,
      email: result.email,
      photo: result.photo,
      background: result.background,
      username: result.username,
    },
  });
  res.status(500).json({
    message: error.message || "Something went wrong",
  });
});

//
exports.ContinueWithGoogle = asyncHandler(async (req, res) => {
  const { credential } = req.body;

  console.log(credential);
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const verify = await client.verifyIdToken({ idToken: credential });
  if (!verify) {
    res.status(400).json({ message: "unable to verify" });
  }
  const { email, name, picture } = verify.payload;
  // console.log(verify.payload);
  const result = await User.findOne({ email });

  if (!result) {
    const userData = await User.create({
      name,
      email,
      photo: picture,
    });

    // social form
    const arr = [
      { name: "Facebook", icon: "faFacebook" },
      { name: "Instagram", icon: "faInstagram" },
      { name: "Linkidn", icon: "faLinkedin" },
      { name: "Github", icon: "faGithub" },
      { name: "Whatsapp", icon: "faWhatsapp" },
      { name: "Twitter", icon: "faTwitter" },
      { name: "Youtube", icon: "faYoutube" },
      { name: "Telegram", icon: "faTelegram" },
      { name: "Email", icon: "faEnvelope" },
    ];

    const data = arr.map((item) => {
      return {
        name: item.name,
        url: "",
        icons: item.icon,
        userId: userData._id,
      };
    });
    await Social.create(data);

    //
    const token = jwt.sign({ userId: userData._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    return res.json({
      message: "register success",
      result: { name, email, photo: picture },
    });
  } else {
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    //

    return res.json({
      message: "Login  Success ",
      result: {
        _id: result._id,
        name: result.name,
        email: result.email,
        photo: result.photo,
        username: result.username,
      },
    });
  }
});

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("auth");
  res.json({ message: "logout success" });
});
exports.hasUsername = asyncHandler(async (req, res) => {
  const result = await User.findOne({ username: req.params.username });
  if (!result) {
    return res.status(400).json({ message: "Emplouer Detail Fetch Fail" });
  }
  res.json({ message: "employers Detail Fetch Success", result });
});
