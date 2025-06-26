const express = require("express");
const router = express.Router();
const {
  addQualification,
  getAllQualifications,
  getUserQualifications,
  deleteQualification,
  updateQualification, // ✅ new import
} = require("../controllers/qualificationController");

router.post("/add", addQualification);
router.get("/", getAllQualifications);
router.get("/user/:userId", getUserQualifications);
router.delete("/:id", deleteQualification);
router.put("/:id", updateQualification); // ✅ new route


module.exports = router;
