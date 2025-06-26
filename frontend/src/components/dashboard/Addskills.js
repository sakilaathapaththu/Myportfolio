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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { API_BASE_URL } from "../../utils/constants.js";

export default function AddSkills() {
  const [lName, setLName] = useState("");
  const [level, setLevel] = useState("");
  const [logImage, setLogImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setLogImage(event.target.files[0]);
  };

  const handleReset = () => {
    setLName("");
    setLevel("");
    setLogImage(null);
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!lName || !level || !logImage) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("l_name", lName);
    formData.append("level", level);
    formData.append("logimage", logImage);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/skills/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      handleReset(); // Reset the form after successful submission
    } catch (error) {
      setMessage("Failed to add skill. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Add New Skill
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Skill Name"
              variant="outlined"
              margin="normal"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Skill Level"
              variant="outlined"
              margin="normal"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Image
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {logImage && (
              <Typography variant="body2" sx={{ mt: 1 }}>{logImage.name}</Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Skill"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </Button>
          </form>
          {message && (
            <Typography color="error" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
