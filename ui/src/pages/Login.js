import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import axios from "../axiosConfig";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token); // Store JWT
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      let errMsg = err.response?.data;
      if (typeof errMsg === "string") {
        setError(errMsg);
      } else if (errMsg && typeof errMsg === "object" && errMsg.error) {
        setError(errMsg.error);
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      <Box sx={{ mt: 2 }}>
        <Link href="/signup" underline="hover">Don't have an account? Sign Up</Link>
      </Box>
    </Box>
  );
}
