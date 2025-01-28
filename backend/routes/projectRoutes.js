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

module.exports = router;
