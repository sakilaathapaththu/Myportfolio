
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_BASE_URL } from "../../utils/constants";

export default function ViewQualifications() {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState(null);

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/qualifications`);
      if (!response.ok) throw new Error("Failed to fetch qualifications");
      const data = await response.json();
      setQualifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/qualifications/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete qualification");
      setQualifications((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (qualification) => {
    setSelectedQualification({ ...qualification }); // clone to avoid direct state change
    setEditOpen(true);
  };

  const handleEditChange = (field, value) => {
    setSelectedQualification((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/qualifications/${selectedQualification._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedQualification),
      });
      if (!response.ok) throw new Error("Failed to update qualification");

      setQualifications((prev) =>
        prev.map((q) =>
          q._id === selectedQualification._id ? selectedQualification : q
        )
      );
      setEditOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        All Qualifications
      </Typography>
      <Grid container spacing={3}>
        {qualifications.map((q) => (
          <Grid item xs={12} sm={6} md={4} key={q._id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", p: 1 }}>
              <CardContent>
                <Typography variant="h6">{q.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {q.type}
                </Typography>
                {q.position && <Typography variant="body2">Position: {q.position}</Typography>}
                <Typography variant="body2">Organization: {q.organization}</Typography>
                {q.certificateLink && (
                  <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                    Certificate: <a href={q.certificateLink} target="_blank" rel="noreferrer">View</a>
                  </Typography>
                )}
                {q.description && (
                  <Typography variant="body2">Description: {q.description}</Typography>
                )}
                <Typography variant="body2">
                  Duration: {q.startDate?.slice(0, 7)} to {q.endDate?.slice(0, 7)}
                </Typography>
              </CardContent>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, px: 1, pb: 1 }}>
                <Tooltip title="Edit">
                  <IconButton color="primary" onClick={() => handleEdit(q)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => handleDelete(q._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🛠️ Edit Modal */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle>Edit Qualification</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Type"
            margin="dense"
            value={selectedQualification?.type || ""}
            onChange={(e) => handleEditChange("type", e.target.value)}
          >
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="certification">Certification</MenuItem>
            <MenuItem value="experience">Experience</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Title"
            margin="dense"
            value={selectedQualification?.title || ""}
            onChange={(e) => handleEditChange("title", e.target.value)}
          />

          {selectedQualification?.type === "experience" && (
            <TextField
              fullWidth
              label="Position"
              margin="dense"
              value={selectedQualification?.position || ""}
              onChange={(e) => handleEditChange("position", e.target.value)}
            />
          )}

          <TextField
            fullWidth
            label="Organization"
            margin="dense"
            value={selectedQualification?.organization || ""}
            onChange={(e) => handleEditChange("organization", e.target.value)}
          />

          {selectedQualification?.type === "certification" && (
            <TextField
              fullWidth
              label="Certificate Link"
              margin="dense"
              value={selectedQualification?.certificateLink || ""}
              onChange={(e) => handleEditChange("certificateLink", e.target.value)}
            />
          )}

          <TextField
            fullWidth
            label="Description"
            margin="dense"
            multiline
            rows={3}
            value={selectedQualification?.description || ""}
            onChange={(e) => handleEditChange("description", e.target.value)}
          />

          <TextField
            fullWidth
            label="Start Date"
            type="month"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={selectedQualification?.startDate?.slice(0, 7) || ""}
            onChange={(e) => handleEditChange("startDate", `${e.target.value}-01`)}
          />

          <TextField
            fullWidth
            label="End Date"
            type="month"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={selectedQualification?.endDate?.slice(0, 7) || ""}
            onChange={(e) => handleEditChange("endDate", `${e.target.value}-01`)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
