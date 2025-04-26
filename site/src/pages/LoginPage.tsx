import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { Link } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const LoginPage: React.FC = () => {
  return (
    <StyledContainer maxWidth="sm">
      <Box width="100%">
        <LoginForm />
      </Box>
      <Typography variant="body1" mt={2}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </Typography>
    </StyledContainer>
  );
};

export default LoginPage;
