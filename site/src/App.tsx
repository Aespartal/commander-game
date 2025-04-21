import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import Box from "@mui/material/Box";
import { Footer } from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Envuelve todo con el proveedor de autenticación */}
      <Router>
        <Navigation /> {/* Barra de navegación */}
        <Box sx={{ 
          display: "flex",
          width: "100%",
          flexDirection: "column",
          padding: "16px",
          backgroundColor: "#f5f5f5",
          height: "calc(100vh - 140px)",
        }}>
          {" "}
          {/* Estilo simple */}
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas Protegidas */}
            <Route element={<ProtectedRoute />}>
              {" "}
              {/* Envoltura para rutas protegidas */}
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* Añade aquí otras rutas protegidas */}
              {/* <Route path="/settings" element={<SettingsPage />} /> */}
            </Route>

            {/* Ruta para páginas no encontradas */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
        <Footer /> {/* Pie de página */}
      </Router>
    </AuthProvider>
  );
}

export default App;
