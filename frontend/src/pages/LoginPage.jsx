import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      onLogin(user, token);
    } catch (error) {
      setError("Invalid credentials");
      console.error("Login error", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box mt={2} textAlign="center">
            <Typography>
              Not a member yet?{" "}
              <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                Sign Up here
              </Link>
            </Typography>
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;
