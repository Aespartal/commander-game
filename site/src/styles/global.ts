import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F4F4F",
    },
    secondary: {
      main: "#8B4513",
    },
    background: {
      default: "#2E3B3C",
      paper: "#4B5C5A"
    },
    text: {
      primary: '#F4F4F4',
      secondary: '#B0B0B0',
    },
    error: {
      main: '#D32F2F',
      light: '#FF6659',
      dark: '#9A0007',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: "-0.05em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "-0.03em",
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: "0.1em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          backgroundColor: "#3A5F43",
          color: "#F4F4F4",
          "&:hover": {
            backgroundColor: "#2C4A32",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#A9B7A3",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
            color: "#8A9A7A",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#3A5F43",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2E3B3C",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#4B5C5A",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#F4F4F4",
          borderRadius: "4px",
          "& .MuiInputBase-input": {
            color: "#2E3B3C",
          },
          "& .MuiInputLabel-root": {
            color: "#B0B0B0",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#B0B0B0",
            },
            "&:hover fieldset": {
              borderColor: "#8A9A7A",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3A5F43",
            },
          },
        },
      },
    },
  },
});

export default theme;
