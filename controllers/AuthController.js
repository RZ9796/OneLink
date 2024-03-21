const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Social = require("../models/Social");

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
// exports.ContinueWithGoogle = asyncHandler(async (req, res) => {
//   const { username, state } = req.body;
//   console.log(username);
//   console.log(state.state.credential);

//   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//   const verify = await client.verifyIdToken({ idToken: state.credential });
//   console.log(verify);
//   if (!verify) {
//     res.status(400).json({ message: "unable to verify" });
//   }
//   const { email, name, picture } = verify.payload;
//   const result = await User.findOne({ email });

//   if (!result) {
//     const userData = await User.create({
//       name,
//       email,
//       photo: picture,
//       username
//     });

//     const token = jwt.sign(
//       { username: userData.username },
//       process.env.JWT_KEY,
//       {
//         expiresIn: "7d",
//       }
//     );

//     res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
//     return res.json({
//       message: "register success",
//       result: { name, email, photo: picture, username },
//     });
//   } else {
//     const token = jwt.sign({ username: result.username }, process.env.JWT_KEY, {
//       expiresIn: "1d",
//     });

//     res.cookie("auth", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
//     return res.json({ message: "Login  Success ", result });
//   }
// });
exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("auth");
  res.json({ message: "logout success" });
});
exports.hasUsername = asyncHandler(async (req, res) => {
  const result = await User.findOne({ username: req.params.username });

  console.log("username res", result);
  console.log("hasusername", result);
  if (!result) {
    return res.status(400).json({ message: "Emplouer Detail Fetch Fail" });
  }
  res.json({ message: "employers Detail Fetch Success", result });
});
