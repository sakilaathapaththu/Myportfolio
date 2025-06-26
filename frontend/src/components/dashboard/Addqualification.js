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
} from "@mui/material";
import { API_BASE_URL } from "../../utils/constants.js";

export default function AddQualification() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [organization, setOrganization] = useState("");
  const [certificateLink, setCertificateLink] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setType("");
    setTitle("");
    setPosition("");
    setOrganization("");
    setCertificateLink("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const userId = localStorage.getItem("userId");
  console.log("userId:", userId); // ✅ for debugging

  if (!userId || !type || !title || !organization || !startDate || !endDate) {
    setMessage("Required fields are missing or user is not logged in.");
    return;
  }

  setLoading(true);
  setMessage("");

  const payload = {
    userId,
    type,
    title,
    position: type === "experience" ? position : undefined,
    organization,
    certificateLink: type === "certification" ? certificateLink : undefined,
    description,
    startDate,
    endDate,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/api/qualifications/add`, payload);
    setMessage(response.data.message || "Qualification added successfully.");
    handleReset();
  } catch (error) {
    const errorMsg = error?.response?.data?.error || "Failed to add qualification.";
    setMessage(errorMsg);
  } finally {
    setLoading(false);
  }
};


  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Add Qualification
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              margin="normal"
              required
            >
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="certification">Certification</MenuItem>
              <MenuItem value="experience">Experience</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />

            {type === "experience" && (
              <TextField
                fullWidth
                label="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                margin="normal"
              />
            )}

            <TextField
              fullWidth
              label="Organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              margin="normal"
              required
            />

            {type === "certification" && (
              <TextField
                fullWidth
                label="Certificate Link"
                value={certificateLink}
                onChange={(e) => setCertificateLink(e.target.value)}
                margin="normal"
              />
            )}

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />

            <TextField
  fullWidth
  type="month"
  label="Start Date"
  InputLabelProps={{ shrink: true }}
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  margin="normal"
  required
  inputProps={{
    max: new Date().toISOString().slice(0, 7), // yyyy-MM
  }}
/>

<TextField
  fullWidth
  type="month"
  label="End Date"
  InputLabelProps={{ shrink: true }}
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
  margin="normal"
  required
  inputProps={{
    max: new Date().toISOString().slice(0, 7), // yyyy-MM
  }}
/>


            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Qualification"}
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
            <Typography sx={{ mt: 2 }} color="error">
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
