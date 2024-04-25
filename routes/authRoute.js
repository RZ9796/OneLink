const {
  ContinueWithGoogle,
  logout,
  addUsername,
  hasUsername,
  registerUser,
  loginUser,
} = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/continueWithGoogle", ContinueWithGoogle);
router.post("/logout", logout);
// router.post("/addusername", addUsername);
router.get(`/has-username/:username`, hasUsername);
module.exports = router;
