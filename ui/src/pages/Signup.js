import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await axios.post("/api/auth/signup", { email, password });
      setSuccess("Signup successful! Please log in.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      let errMsg = err.response?.data;
      if (typeof errMsg === "string") {
        setError(errMsg);
      } else if (errMsg && typeof errMsg === "object" && errMsg.error) {
        setError(errMsg.error);
      } else {
        setError("Signup failed");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" gutterBottom>Sign Up</Typography>
      <form onSubmit={handleSignup}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>
      <Box sx={{ mt: 2 }}>
        <Link href="/login" underline="hover">Already have an account? Login</Link>
      </Box>
    </Box>
  );
}
