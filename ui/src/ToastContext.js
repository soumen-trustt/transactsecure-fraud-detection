import React, { createContext, useContext, useState, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  const showToast = useCallback((message, severity = 'info') => {
    setToast({ open: true, message, severity });
  }, []);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setToast(t => ({ ...t, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3200}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 1400 }}
      >
        <MuiAlert onClose={handleClose} severity={toast.severity} elevation={6} variant="filled" sx={{ fontWeight: 600, fontSize: 17 }}>
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
