import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import TransactionsTable from "./TransactionsTable";
import FraudAlertsTable from "./FraudAlertsTable";
import TransactionForm from "./TransactionForm";
import { Container, Typography, Tabs, Tab, Box, Button } from "@mui/material";

function Dashboard() {
  const [tab, setTab] = React.useState(0);
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        TransactSecure Dashboard
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button href="/logout" variant="outlined" color="secondary">Logout</Button>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Transactions" />
        <Tab label="Fraud Alerts" />
      </Tabs>
      <Box mt={4}>
        {tab === 0 && <>
          <TransactionForm onSuccess={() => window.location.reload()} />
          <TransactionsTable />
        </>}
        {tab === 1 && <FraudAlertsTable />}
      </Box>
    </Container>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
