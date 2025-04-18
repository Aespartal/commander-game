import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Envuelve todo con el proveedor de autenticación */}
      <Router>
        <Navigation /> {/* Barra de navegación */}
        <div className="container" style={{ padding: "20px" }}>
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
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
