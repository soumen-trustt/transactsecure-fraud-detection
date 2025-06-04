import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import axios from "axios";
import { useToast } from "../ToastContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", { email, password });
      showToast("Signup successful! Please log in.", "success");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      let errMsg = err.response?.data;
      if (typeof errMsg === "string") {
        showToast(errMsg, "error");
      } else if (errMsg && typeof errMsg === "object" && errMsg.error) {
        showToast(errMsg.error, "error");
      } else {
        showToast("Signup failed", "error");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #23263a 80%, #212738 100%)'
          : 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 60%, #ff80ab 100%)',
        py: 8,
      }}
    >
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Box sx={{
        maxWidth: 420,
        mx: 'auto',
        mt: 8,
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 4,
        boxShadow: '0 8px 40px 0 rgba(0,188,212,0.18)',
        p: 4,
        animation: 'fadeInUp 1s',
      }}>
        <Typography variant="h5" gutterBottom sx={{
          fontWeight: 700,
          color: '#ff4081',
          letterSpacing: 1,
          textShadow: '0 2px 8px #00bcd4a0',
          mb: 2,
          animation: 'fadeInDown 1s',
        }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            sx={{
              background: '#fff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#00bcd4' },
                '&.Mui-focused fieldset': { borderColor: '#ff4081', boxShadow: '0 0 0 2px #ff408144' },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            sx={{
              background: '#fff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#00bcd4' },
                '&.Mui-focused fieldset': { borderColor: '#ff4081', boxShadow: '0 0 0 2px #ff408144' },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              background: 'linear-gradient(90deg, #00bcd4 60%, #ff4081 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: '0 2px 12px 0 #00bcd488',
              transition: 'transform 0.2s, box-shadow 0.3s',
              '&:hover': {
                background: 'linear-gradient(90deg, #ff4081 60%, #00bcd4 100%)',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 20px 0 #ff408188',
              },
            }}
          >
            Sign Up
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Link href="/login" underline="hover" sx={{ color: '#00bcd4', fontWeight: 600 }}>
            Already have an account? Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
