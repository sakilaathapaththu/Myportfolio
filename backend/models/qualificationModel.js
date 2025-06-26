const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["education", "certification", "experience"],
    required: true,
  },
  title: { type: String, required: true },
  position: String, // Only for experience
  organization: { type: String, required: true },
  certificateLink: String, // Only for certification
  description: String,
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Qualification", qualificationSchema);
