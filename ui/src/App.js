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
import { Container, Typography, Tabs, Tab, Box, Button, Avatar, Menu, MenuItem, IconButton as MIconButton, Tooltip, ListItemIcon } from "@mui/material";
import { ColorModeProvider, useColorMode } from './ColorModeContext';
import { ToastProvider } from './ToastContext';
import { AuthContext } from './AuthContext';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function UserProfileMenu() {
  const { email, logout } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleClose();
    logout();
    window.location.href = '/login';
  };
  const initial = email ? email.charAt(0).toUpperCase() : '?';
  return (
    <>
      <Tooltip title={email || 'User'}>
        <MIconButton onClick={handleMenu} sx={{ p: 0, mr: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>{initial}</Avatar>
        </MIconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}
        PaperProps={{ elevation: 3, sx: { mt: 1.5, minWidth: 180 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disabled>
          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main', color: 'white' }}>{initial}</Avatar>
          {email || 'User'}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Brightness4Icon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

function Dashboard() {
  const [tab, setTab] = React.useState(0);
  const { mode, toggleColorMode } = useColorMode();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #23263a 80%, #212738 100%)'
          : 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 60%, #ff80ab 100%)',
        py: 6,
        transition: 'background 0.6s',
      }}
    >
      <Container maxWidth="md" sx={{
        background: 'rgba(255,255,255,0.93)',
        borderRadius: 4,
        boxShadow: '0 8px 40px 0 rgba(0,188,212,0.15)',
        p: 4,
        mt: 6,
        transition: 'box-shadow 0.3s',
      }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
          <UserProfileMenu />
          <IconButton onClick={toggleColorMode} color="inherit" sx={{ ml: 1 }} aria-label="toggle dark mode">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Montserrat, Roboto, Arial',
            letterSpacing: 2,
            fontWeight: 900,
            background: 'linear-gradient(90deg, #00bcd4 0%, #ff4081 45%, #ff9800 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 24px #00bcd488',
            animation: 'fadeInDown 1s',
            fontSize: { xs: 28, sm: 36, md: 44 },
          }}
        >
          TRANSACTION DASHBOARD
        </Typography>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Transactions" />
          <Tab label="Fraud Alerts" />
        </Tabs>
        <Box mt={4} sx={{ transition: 'all 0.4s', minHeight: 400 }}>
          {tab === 0 && <>
            <TransactionForm onSuccess={() => window.location.reload()} />
            <TransactionsTable />
          </>}
          {tab === 1 && <FraudAlertsTable />}
        </Box>
      </Container>
      <style>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}

function App() {
  return (
    <ColorModeProvider>
      <ToastProvider>
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
      </ToastProvider>
    </ColorModeProvider>
  );
}

export default App;
