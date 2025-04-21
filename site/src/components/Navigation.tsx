import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Logo } from "../logo/Logo";

export const Navigation: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)"); // Define breakpoint for mobile view

  useEffect(() => {
    console.log("isMobile:", isMobile);
  }, [isMobile]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key="home" disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        {isAuthenticated ? (
          <>
            <ListItem key="dashboard" disablePadding>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem key="logout" disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Cerrar Sesión" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem key="login" disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Iniciar Sesión" />
              </ListItemButton>
            </ListItem>
            <ListItem key="register" disablePadding>
              <ListItemButton component={Link} to="/register">
                <ListItemText primary="Registrarse" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  if (isLoading) {
    return <Typography>Cargando navegación...</Typography>;
  }

  const navButtons = (
    <Box
      sx={{
        display: "flex",

        mt: isMobile ? 1 : 0,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {isAuthenticated ? (
        <>
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
            sx={{ display: isMobile ? "none" : "block" }}
          >
            Dashboard
          </Button>
          <Button
            onClick={handleLogout}
            color="inherit"
            sx={{ display: isMobile ? "none" : "block" }}
          >
            Cerrar Sesión
          </Button>
        </>
      ) : (
        <>
          <Button
            component={Link}
            to="/login"
            color="inherit"
            sx={{ display: isMobile ? "none" : "block" }}
          >
            Iniciar Sesión
          </Button>
          <Button
            component={Link}
            to="/register"
            color="inherit"
            sx={{ display: isMobile ? "none" : "block" }}
          >
            Registrarse
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Link
              style={{ textDecoration: "none", display: "contents" }}
              to="/"
              
            >
              <Logo />
            </Link>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAuthenticated ?? (
              <Typography
                variant="body1"
                sx={{
                  mr: 2,
                  display: isMobile ? "none" : "block",
                  padding: "6px 8px",
                }}
              >
                Hola, {user?.email ?? "Usuario"}
              </Typography>
            )}
            <Button component={Link} to="/" color="inherit">
              Inicio
            </Button>
            {<>{navButtons}</>}
          </Box>
        </Box>
        {isMobile && navButtons}
      </Toolbar>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </AppBar>
  );
};
