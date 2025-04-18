import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  text: {
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  linksContainer: {
    marginTop: "20px",
    marginBottom: "40px",
  },
  linkButton: {
    display: "inline-block",
    margin: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  footer: {
    marginTop: "50px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
    fontSize: "0.9em",
    color: "#777",
  },
};

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a Nuestra Aplicación Full-Stack</h1>
      <p style={styles.text}>
        Este es un ejemplo de aplicación construida con React (TypeScript) en el
        frontend y Express (TypeScript) en el backend, con autenticación JWT y
        conexión a PostgreSQL.
      </p>

      {!isAuthenticated ? (
        <div style={styles.linksContainer}>
          <p style={styles.text}>
            Por favor, inicia sesión o regístrate para continuar:
          </p>
          <Link to="/login" style={styles.linkButton}>
            Iniciar Sesión
          </Link>
          <Link to="/register" style={styles.linkButton}>
            Registrarse
          </Link>
        </div>
      ) : (
        <div style={styles.linksContainer}>
          <p style={styles.text}>
            Ya has iniciado sesión. Puedes ir a tu panel:
          </p>
          <Link to="/dashboard" style={styles.linkButton}>
            Ir al Dashboard
          </Link>
        </div>
      )}

      <footer style={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Proyecto React. Valencia,
          España.
        </p>
        <p>
          Fecha y Hora Actual:{" "}
          {new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
