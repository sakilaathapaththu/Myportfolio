import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { API_BASE_URL } from "../../utils/constants";

const languageOptions = [
  "HTML", "CSS", "MUI", "Tailwind CSS", "React Js", "Node Js", "Laravel", "Java",
  "Python", "Spring Boot", "Php", "JavaScript", "C++", "GitHub", "Figma", "Canva",
  "Flask", "ML", "Flutter", "MERN", "IOT"
];

export default function Addproject() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    demoVideo: "",
    language: [],
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLanguageChange = (e) => {
    setFormData({ ...formData, language: e.target.value });
  };

  const handleFileChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.title || !formData.shortDescription || formData.language.length === 0 || images.length === 0) {
      setMessage("Title, short description, at least one language and one image are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((value) => data.append(`${key}[]`, value));
      } else {
        data.append(key, formData[key]);
      }
    });
    Array.from(images).forEach((file) => data.append("images", file));

    try {
      const response = await axios.post(`${API_BASE_URL}/api/projects/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      setFormData({
        title: "",
        shortDescription: "",
        fullDescription: "",
        demoVideo: "",
        language: [],
      });
      setImages([]);
    } catch (error) {
      setMessage("Failed to add project. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      shortDescription: "",
      fullDescription: "",
      demoVideo: "",
      language: [],
    });
    setImages([]);
    setMessage("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Add New Project
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              variant="outlined"
              margin="normal"
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Short Description"
              name="shortDescription"
              variant="outlined"
              margin="normal"
              value={formData.shortDescription}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Full Description"
              name="fullDescription"
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              value={formData.fullDescription}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Demo Video URL"
              name="demoVideo"
              variant="outlined"
              margin="normal"
              value={formData.demoVideo}
              onChange={handleInputChange}
            />

            {/* ✅ Multi-select for Languages */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="language-label">Languages</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                multiple
                value={formData.language}
                onChange={handleLanguageChange}
                input={<OutlinedInput label="Languages" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {languageOptions.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* File Upload */}
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Images
              <input type="file" multiple hidden onChange={handleFileChange} />
            </Button>
            {images.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {images.length} files selected
              </Typography>
            )}

            {/* Submit + Reset */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Project"}
            </Button>
            <Button
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </form>

          {/* Message */}
          {message && (
            <Typography color={message.includes("success") ? "primary" : "error"} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
