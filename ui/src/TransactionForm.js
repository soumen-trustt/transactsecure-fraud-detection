import React, { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import axios from "./axiosConfig";

export default function TransactionForm({ onSuccess }) {
  const [form, setForm] = useState({
    userId: "",
    amount: "",
    merchant: "",
    status: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.userId || isNaN(form.userId)) {
      setError("Invalid userId. Please enter a valid numeric user ID.");
      return;
    }
    try {
      // Compose transaction object
      const tx = {
        ...form,
        userId: Number(form.userId),
        amount: parseFloat(form.amount),
        timestamp: new Date().toISOString(),
      };
      await axios.post("/api/transactions", tx);
      setForm({ userId: "", amount: "", merchant: "", status: "" });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to submit transaction: " + (err.response?.data?.message || err.message));
    }
  };



  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>New Transaction</Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField label="User ID" name="userId" value={form.userId} onChange={handleChange} required fullWidth />
          <TextField label="Amount" name="amount" value={form.amount} onChange={handleChange} required type="number" fullWidth />
          <TextField label="Merchant" name="merchant" value={form.merchant} onChange={handleChange} required fullWidth />
          <TextField label="Status" name="status" value={form.status} onChange={handleChange} required fullWidth />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </form>
    </Paper>
  );
}
