// Página Protegida
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchUserProfile } from "../api/auth.api";
import BaseMenu from "../components/BaseMenu";
import { Box, Typography, Button, CircularProgress, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Cargar datos protegidos al montar la página
  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      setProfileError(null);
      try {
        const data = await fetchUserProfile();
        setProfileData(data);
      } catch (error: any) {
        setProfileError(error.message ?? "Error al cargar el perfil");
      } finally {
        setLoadingProfile(false);
      }
    };
    loadProfile();
  }, []);

  const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 3),
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        height: "100vh",
      }}
    >
      <Paper elevation={4} sx={{ maxWidth: 280, borderRadius: 2 }}>
        <BaseMenu />
      </Paper>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard (Protegido)
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bienvenido, {user?.email ?? "Usuario"}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Datos del Perfil (API Protegida)
        </Typography>
        {loadingProfile && <CircularProgress />}
        {profileError && <Typography color="error">{profileError}</Typography>}
        {profileData && <pre>{JSON.stringify(profileData, null, 2)}</pre>}

        <StyledButton variant="contained" color="primary" onClick={logout}>
          Cerrar Sesión
        </StyledButton>
      </Box>
    </Box>
  );
};

export default DashboardPage;
