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
// DELETE: Delete a skill by ID
exports.deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.id; // Get the skill ID from the request parameters

    // Find and delete the skill by ID
    const deletedSkill = await Skill.findByIdAndDelete(skillId);

    // If the skill is not found, return a 404 error
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // If the skill is successfully deleted, return a success message
    res.status(200).json({ message: "Skill deleted successfully", skill: deletedSkill });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ message: "Failed to delete skill", error: error.message });
  }
};
