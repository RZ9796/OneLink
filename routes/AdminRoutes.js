const {
  getLink,
  addLink,
  deleteLink,
  updateLink,
  addUsername,
  updateLogo,
} = require("../controllers/AdminController");
const router = require("express").Router();
router.get("/", getLink);
router.post("/add-link", addLink);
router.delete("/delete-link/:linkId", deleteLink);
router.put("/update-link/:linkId", updateLink);
router.put("/update-logo/:linkId", updateLogo);

router.post("/addusername", addUsername);
module.exports = router;
