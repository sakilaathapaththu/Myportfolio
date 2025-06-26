const express = require("express");
const multer = require("multer");
const Skill = require("../models/skillModel");
const { addSkill, deleteSkill } = require("../controllers/skillsController");

const router = express.Router();

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// API route for adding a new skill
router.post("/add", upload.single("logimage"), addSkill);


// GET: Fetch all skills
router.get("/", async (req, res) => {
    try {
      const skills = await Skill.find();
      res.status(200).json(skills);
    } catch (err) {
      res.status(500).json({ message: "Error fetching skills", error: err });
    }
  });
  // DELETE: Delete a skill by ID
router.delete("/:id", deleteSkill); // Add this route
module.exports = router;
