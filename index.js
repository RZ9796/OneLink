const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieparser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const { userProtected } = require("./middleware/Protected");

mongoose.connect(process.env.MONGO_URL);
const app = express();
// middleware
app.use(express.json());
app.use(express.static("logo"));
app.use(express.static("profilePicture"));
app.use(cookieparser());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://onelink-4jy9.onrender.com",
    // origin: "*",
    credentials: true,
  })
);
// production code
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/v1/profile", require("./routes/ProfileRoutes"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/admin", userProtected, require("./routes/AdminRoutes"));
app.use("/api/v1/social", userProtected, require("./routes/SocialRoute"));

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "something went wrong " });
});
// production code
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

mongoose.connection.once("open", () => {
  console.log("mongo connected");
  app.listen(process.env.PORT, console.log("server running"));
});
