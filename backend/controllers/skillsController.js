const Skill = require("../models/skillModel");

exports.addSkill = async (req, res) => {
  try {
    const { l_name, level } = req.body;
    const logimage = req.file ? `/uploads/${req.file.filename}` : null;

    if (!l_name || !level || !logimage) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newSkill = new Skill({
      l_name,
      level,
      logimage,
    });

    await newSkill.save();
    res.status(201).json({ message: "Skill added successfully!", skill: newSkill });
  } catch (error) {
    console.error("Error adding skill:", error);
    res.status(500).json({ message: "Failed to add skill." });
  }
};
