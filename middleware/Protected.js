const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// const User = require("../model/User");
exports.userProtected = asynchandler((req, res, next) => {
  const token = req.cookies.auth;
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "No cookie found" });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: err.message || "jwt error" });
    }
    console.log("---------");
    console.log(decode);
    console.log("---------");
    req.body.userId = decode.userId;
    // req.body.username = decode.username;
    next();
  });
});
