const {
  getSocials,
  updateSocials,
} = require("../controllers/SocialController");
const { userProtected } = require("../middleware/Protected");

const router = require("express").Router();

router.get("/get-social", getSocials);
router.put("/update-social/:id", updateSocials);
module.exports = router;
