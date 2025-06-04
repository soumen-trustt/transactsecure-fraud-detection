import React, { useState } from "react";
import { useToast } from "./ToastContext";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import axios from "./axiosConfig";

export default function TransactionForm({ onSuccess }) {
  const [form, setForm] = useState({
    userId: "",
    amount: "",
    merchant: "",
    status: "",
  });
  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || isNaN(form.userId)) {
      showToast("Invalid userId. Please enter a valid numeric user ID.", "error");
      return;
    }
    try {
      const tx = { ...form, userId: Number(form.userId), amount: parseFloat(form.amount), timestamp: new Date().toISOString() };
      await axios.post("/api/transactions", tx);
      setForm({ userId: "", amount: "", merchant: "", status: "" });
      showToast("Transaction submitted!", "success");
      if (onSuccess) setTimeout(onSuccess, 600);
    } catch (err) {
      showToast("Failed to submit transaction: " + (err.response?.data?.message || err.response?.data || err.message), "error");
    }
  };



  return (
    <Paper
      sx={theme => ({
        p: 3,
        mb: 3,
        borderRadius: 4,
        boxShadow: '0 6px 32px 0 rgba(0,188,212,0.18)',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(120deg, #23263a 80%, #212738 100%)'
          : 'linear-gradient(120deg, #e0f7fa 80%, #b2ebf2 100%)',
        transition: 'box-shadow 0.4s, background 0.6s',
        animation: 'fadeInUp 1s',
      })}
      elevation={6}
    >
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Typography variant="h6" gutterBottom sx={{
        color: '#ff4081',
        fontWeight: 700,
        letterSpacing: 1,
        textShadow: '0 2px 8px #00bcd4a0',
        mb: 2,
        animation: 'fadeInDown 1s',
      }}>
        New Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField label="User ID" name="userId" value={form.userId} onChange={handleChange} required fullWidth
            InputLabelProps={{
              sx: {
                fontWeight: 700,
                background: 'linear-gradient(90deg, #00bcd4 30%, #ff9800 70%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: 1,
              },
            }}
            sx={{
              background: '#fff',
              borderRadius: 2,
              transition: 'box-shadow 0.3s',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#00bcd4' },
                '&.Mui-focused fieldset': { borderColor: '#ff4081', boxShadow: '0 0 0 2px #ff408144' },
              },
            }}
          />
          <TextField label="Amount" name="amount" value={form.amount} onChange={handleChange} required type="number" fullWidth
            InputLabelProps={{
              sx: {
                fontWeight: 700,
                color: 'linear-gradient(90deg, #ff4081 30%, #00bcd4 70%)',
                background: '-webkit-linear-gradient(90deg, #ff4081 30%, #00bcd4 70%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: 1,
              },
            }}
            sx={{
              background: '#fff',
              borderRadius: 2,
              transition: 'box-shadow 0.3s',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#00bcd4' },
                '&.Mui-focused fieldset': { borderColor: '#ff4081', boxShadow: '0 0 0 2px #ff408144' },
              },
            }}
          />
          <TextField label="Merchant" name="merchant" value={form.merchant} onChange={handleChange} required fullWidth
            InputLabelProps={{
              sx: {
                fontWeight: 700,
                background: 'linear-gradient(90deg, #ff9800 30%, #00bcd4 70%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: 1,
              },
            }}
            sx={{
              background: '#fff',
              borderRadius: 2,
              transition: 'box-shadow 0.3s',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#00bcd4' },
                '&.Mui-focused fieldset': { borderColor: '#ff4081', boxShadow: '0 0 0 2px #ff408144' },
              },
            }}
          />
          <TextField label="Status" name="status" value={form.status} onChange={handleChange} required fullWidth
            InputLabelProps={{
              sx: {
                fontWeight: 700,
                background: 'linear-gradient(90deg, #00bcd4 30%, #ff4081 70%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: 1,
              },
            }}
            sx={{
              background: '#fff',
              borderRadius: 2,
              transition: 'box-shadow 0.3s',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#00bcd4' },
                '&.Mui-focused fieldset': { borderColor: '#ff4081', boxShadow: '0 0 0 2px #ff408144' },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
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
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
