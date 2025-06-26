

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import delete icon
import { API_BASE_URL } from "../../utils/constants.js";

export default function Viewskills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skills from the backend
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/skills`);
      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }
      const data = await response.json();
      setSkills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle skill deletion
  const handleDeleteSkill = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/skills/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete skill");
      }

      // Remove the deleted skill from the state
      setSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Skills
      </Typography>
      <Grid container spacing={4}>
        {skills.map((skill) => (
          <Grid item key={skill._id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={`${API_BASE_URL}${skill.logimage}`} // Ensure the image path is correct
                alt={skill.l_name}
                sx={{ height: 140, objectFit: "contain", p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {skill.l_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Level: {skill.level}
                </Typography>
              </CardContent>
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteSkill(skill._id)} // Call delete function
                sx={{ alignSelf: "flex-end", m: 1 }}
              >
                <DeleteIcon color="error" /> {/* Delete icon */}
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}