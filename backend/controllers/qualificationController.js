const Qualification = require("../models/qualificationModel");

// Add new qualification
exports.addQualification = async (req, res) => {
  try {
    const qualification = new Qualification(req.body);
    await qualification.save();
    res.status(201).json({ message: "Qualification added", qualification });
  } catch (err) {
    res.status(500).json({ message: "Failed to add qualification", error: err.message });
  }
};

// Get all qualifications
exports.getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch qualifications", error: err.message });
  }
};

// Get qualifications by user ID
exports.getUserQualifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const qualifications = await Qualification.find({ userId });
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user qualifications", error: err.message });
  }
};

// Delete qualification
exports.deleteQualification = async (req, res) => {
  try {
    const deleted = await Qualification.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Qualification not found" });
    res.json({ message: "Qualification deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
};
// Update qualification
exports.updateQualification = async (req, res) => {
  try {
    const updated = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Qualification not found" });
    res.json({ message: "Qualification updated", qualification: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update qualification", error: err.message });
  }
};
