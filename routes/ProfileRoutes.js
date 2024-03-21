const {
  addProfile,
  getProfile,
  getProfileByusername,
  updateProfilePicture,
} = require("../controllers/Profilecontroller");

const router = require("express").Router();

router.get("/get-Profile", getProfile);
router.get("/get-ProfileBYusername/:username", getProfileByusername);
router.post("/add-Profile", addProfile);
router.put("/ProfilePicture/:linkId", updateProfilePicture);
module.exports = router;
