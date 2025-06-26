import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_BASE_URL } from "../../utils/constants";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/fetch`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project");

      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (project) => {
    console.log("Edit clicked:", project);
    // TODO: Open modal or route to edit form
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {project.images && project.images.length > 0 && (
                <CardMedia
                  component="img"
                  image={`${API_BASE_URL}/${project.images[0]}`}
                  alt={project.title}
                  sx={{ height: 180, objectFit: "cover" }}
                />
              )}
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.shortDescription}
                </Typography>
                <Typography variant="caption" display="block" mt={1}>
                  Language: {project.language}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1, pb: 1 }}>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEdit(project)} color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(project._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
