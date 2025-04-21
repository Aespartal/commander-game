import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Typography, Container, Box, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  color: "#2e312f",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "rgba(100, 100, 100, 0.3)", 
  border: "2px solid #664d03",
  borderRadius: theme.spacing(1),
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  marginBottom: theme.spacing(3),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1),
  textDecoration: "none",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: "#556B2F", 
  color: "#fff",
  "&:hover": {
    backgroundColor: "#3e4c22",
  },
}));

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Bienvenido a Nuestra Aplicación Full-Stack
        </Typography>
        <Typography variant="body1" paragraph>
          Este es un ejemplo de aplicación construida con React (TypeScript) en
          el frontend y Express (TypeScript) en el backend, con autenticación
          JWT y conexión a PostgreSQL.
        </Typography>
        <Box mt={3}>
          {!isAuthenticated ? (
            <>
              <Typography variant="body2" paragraph>
                Por favor, inicia sesión o regístrate para continuar:
              </Typography>
              <StyledLink to="/login">
                <StyledButton variant="contained">Iniciar Sesión</StyledButton>
              </StyledLink>
              <StyledLink to="/register">
                <StyledButton variant="contained">Registrarse</StyledButton>
              </StyledLink>
            </>
          ) : (
            <>
              <Typography variant="body2" paragraph>
                Ya has iniciado sesión. Puedes ir a tu panel:
              </Typography>
              <StyledLink to="/dashboard">
                <StyledButton variant="contained">Ir al Dashboard</StyledButton>
              </StyledLink>
            </>
          )}
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default HomePage;
