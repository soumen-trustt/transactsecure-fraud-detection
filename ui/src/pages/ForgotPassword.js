import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import axios from "../axiosConfig";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      setMessage(res.data || "If your email exists, a reset link has been sent.");
    } catch (err) {
      setMessage(err.response?.data || "If your email exists, a reset link has been sent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: theme => theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #23263a 80%, #212738 100%)'
      : 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 60%, #ff80ab 100%)', py: 8 }}>
      <style>{`
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
      <Box sx={{ maxWidth: 420, mx: 'auto', mt: 8, background: 'rgba(255,255,255,0.97)', borderRadius: 4, boxShadow: '0 8px 40px 0 rgba(0,188,212,0.18)', p: 4, animation: 'fadeInUp 1s' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#ff4081', letterSpacing: 1, mb: 2 }}>
          Forgot Password?
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            sx={{ background: '#fff', borderRadius: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2, background: 'linear-gradient(90deg, #ff4081 60%, #00bcd4 100%)', color: '#fff', fontWeight: 700, fontSize: 18, px: 4, py: 1.5, borderRadius: 3, boxShadow: '0 2px 12px 0 #ff408188', '&:hover': { background: 'linear-gradient(90deg, #00bcd4 60%, #ff4081 100%)', transform: 'scale(1.04)', boxShadow: '0 4px 20px 0 #00bcd488' } }}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        {message && <Typography sx={{ mt: 2, color: '#00bcd4', fontWeight: 500 }}>{message}</Typography>}
        <Box sx={{ mt: 2 }}>
          <Link href="/login" underline="hover">Back to Login</Link>
        </Box>
      </Box>
    </Box>
  );
}
