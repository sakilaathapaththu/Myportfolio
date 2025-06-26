

import { useAuth } from "../../utils/AuthContext"; // ✅ Fix import
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/constants.js";
import { Checkbox, TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // ✅ Use `useAuth` instead of `AuthContext`
  const navigate = useNavigate();
  const [tandc, setTandc] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      login(res.data); // ✅ Call login function
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Box sx={{ width: 300, marginTop: "10%", marginLeft: "auto", marginRight: "auto", padding: 3, boxShadow: 3, borderRadius: 2, color: "black", backgroundColor: "white" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Box display="flex" alignItems="center" mt={2}>
          <Checkbox
            name="tandc"
            value="true"
            color="primary"
            checked={tandc}
            onChange={(e) => setTandc(e.target.checked)}
            sx={{ padding: 0.5, "& .MuiSvgIcon-root": { fontSize: 20 } }}
          />
          <Typography variant="body2">I agree with the T&C</Typography>
        </Box>
        <Button type="submit" variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
}
