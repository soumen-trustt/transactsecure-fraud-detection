import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    // Optionally redirect after a delay
    setTimeout(() => navigate("/login"), 1000);
  }, [logout, navigate]);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, textAlign: "center" }}>
      <Typography variant="h6">You have been logged out.</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/login")}>Go to Login</Button>
    </Box>
  );
}
