const express = require("express");
const mongoose = require("mongoose");
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
    origin: "http://localhost:5173",
    // origin: "*",
    credentials: true,
  })
);
//
app.use("/api/v1/profile", userProtected, require("./routes/ProfileRoutes"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/admin", userProtected, require("./routes/AdminRoutes"));
app.use("/api/v1/social", require("./routes/SocialRoute"));
//
mongoose.connection.once("open", () => {
  console.log("mongo connected");
  app.listen(process.env.PORT, console.log("server running"));
});
