import { createTheme } from '@mui/material/styles';

const themeSettings = (mode = 'light') => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#00e5ff' : '#00bcd4',
    },
    secondary: {
      main: mode === 'dark' ? '#ff80ab' : '#ff4081',
    },
    background: {
      default: mode === 'dark' ? '#181a20' : '#f5f6fa',
      paper: mode === 'dark' ? '#23263a' : '#fff',
    },
    text: {
      primary: mode === 'dark' ? '#fff' : '#181a20',
      secondary: mode === 'dark' ? '#b2ebf2' : '#555',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial',
    fontWeightBold: 700,
    fontWeightRegular: 500,
    fontWeightLight: 400,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: mode === 'dark' ? 'linear-gradient(120deg, #23263a 80%, #212738 100%)' : undefined,
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)',
          transition: 'box-shadow 0.3s',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: mode === 'dark' ? '#23263a' : '#fff',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#ff4081',
          height: 4,
          borderRadius: 2,
        },
      },
    },
  },
});

export default themeSettings;
