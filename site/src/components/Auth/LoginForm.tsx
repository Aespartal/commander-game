import React, { useState, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  width: "100%",
  margin: theme.spacing(4, "auto"),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  fontFamily: theme.typography.fontFamily,
}));

const StyledError = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  backgroundColor: theme.palette.error.light,
  border: `1px solid ${theme.palette.error.dark}`,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontSize: "0.9em",
}));

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname ?? "/dashboard";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await login({ email, password });
    if (!error) {
      navigate(from, { replace: true });
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      {error && <StyledError>{error}</StyledError>}
      <TextField
        id="login-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        id="login-password"
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? "Iniciando..." : "Iniciar Sesión"}
      </Button>
    </StyledForm>
  );
};

export default LoginForm;
