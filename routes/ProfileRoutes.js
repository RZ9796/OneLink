const {
  addProfile,
  getProfile,
  getProfileByusername,
  updateProfilePicture,
} = require("../controllers/Profilecontroller");
const { userProtected } = require("../middleware/Protected");

const router = require("express").Router();

router.get("/get-Profile", userProtected, getProfile);
router.get("/get-ProfileBYusername/:username", getProfileByusername);
router.post("/add-Profile", userProtected, addProfile);
router.put("/ProfilePicture/:linkId", userProtected, updateProfilePicture);
module.exports = router;
