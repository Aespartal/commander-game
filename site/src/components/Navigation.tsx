// frontend/src/components/Navigation.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Estilos básicos en línea
const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    backgroundColor: "#333", // Fondo oscuro para la barra
    padding: "10px 20px",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex", // Elementos en línea
    alignItems: "center", // Centrar verticalmente
  },
  navItem: {
    marginLeft: "15px", // Espacio entre elementos
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  // navLink:hover - añadir en CSS: background-color: #555;
  userInfo: {
    color: "#ccc", // Un color más tenue para la info del usuario
    marginRight: "15px",
  },
  logoutButton: {
    backgroundColor: "#dc3545", // Rojo para logout
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9em",
    transition: "background-color 0.3s ease",
  },
  // logoutButton:hover - añadir en CSS: background-color: #c82333;
  pushRight: {
    marginLeft: "auto", // Empuja los elementos siguientes a la derecha
  },
  loadingText: {
    color: "#aaa",
  },
};

const Navigation: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirigir al home o al login después del logout
    navigate("/");
  };

  // No renderizar nada o un placeholder mientras carga el estado inicial
  // para evitar parpadeo de links incorrectos
  if (isLoading) {
    return (
      <nav style={styles.nav}>
        <div style={styles.navList}>
          <span style={styles.loadingText}>Cargando navegación...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>
            Inicio
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li style={styles.navItem}>
              <Link to="/dashboard" style={styles.navLink}>
                Dashboard
              </Link>
            </li>
            {/* Separador visual a la derecha */}
            <li style={{ ...styles.navItem, ...styles.pushRight }}>
              <span style={styles.userInfo}>
                Hola, {user?.email ?? "Usuario"}
              </span>
            </li>
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Separador visual a la derecha */}
            <li style={{ ...styles.navItem, ...styles.pushRight }}>
              <Link to="/login" style={styles.navLink}>
                Iniciar Sesión
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/register" style={styles.navLink}>
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
