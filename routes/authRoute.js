const {
  ContinueWithGoogle,
  logout,
  addUsername,
  hasUsername,
} = require("../controllers/AuthController");

const router = require("express").Router();
router.post("/continueWithGoogle", ContinueWithGoogle);
router.post("/logout", logout);
// router.post("/addusername", addUsername);
router.get(`/has-username/:username`, hasUsername);
module.exports = router;
