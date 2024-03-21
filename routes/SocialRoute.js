const {
  getSocials,
  updateSocials,
} = require("../controllers/SocialController");

const router = require("express").Router();
router.get("/", getSocials);
router.put("/update-social/:id", updateSocials);
module.exports = router;
