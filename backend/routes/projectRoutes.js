const express = require('express');
const multer = require('multer');
const Project = require('../models/projectModel');
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route to add a project
router.post('/add', upload.array('images', 10), async (req, res) => {
  try {
    const { title, shortDescription, fullDescription, demoVideo, language } = req.body;

    const images = req.files ? req.files.map(file => file.path) : [];
    // const demoVideo = req.files['demoVideo'] ? req.files['demoVideo'][0].path : null;

    const newProject = new Project({ title, shortDescription, fullDescription, images, demoVideo, language });
    await newProject.save();

    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all projects
router.get('/fetch', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project", error: err.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project updated", project: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update project", error: err.message });
  }
});

module.exports = router;
