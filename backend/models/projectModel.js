const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String },
  images: [{ type: String }], // Array to store image URLs
  demoVideo: { type: String }, // Video URL
  language: [{ type: String, required: true }] // ✅ now an array of strings
});

module.exports = mongoose.model('Project', projectSchema);
