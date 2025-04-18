import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname ?? '/dashboard';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
       navigate(from, { replace: true });
    } catch (err) {
      // El error ya se maneja y almacena en el contexto (useAuth)
      console.error("Fallo el login desde el componente");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      {error && <p style={styles.errorText}>{error}</p>}
      <div style={styles.inputGroup}>
        <label htmlFor="login-email" style={styles.label}>Email:</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="login-password" style={styles.label}>Contraseña:</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" disabled={isLoading}
      style={isLoading ? styles.buttonDisabled : styles.button}>
        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "40px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "25px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box", // Para que padding no aumente el tamaño total
  },
  button: {
    padding: "12px 15px",
    backgroundColor: "#28a745", // Verde para registro
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1em",
    transition: "background-color 0.3s ease",
  },
  buttonDisabled: {
    padding: "12px 15px",
    backgroundColor: "#aaa",
    color: "#eee",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
    fontSize: "1em",
  },
  errorText: {
    color: "#dc3545", // Rojo para errores
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "0.9em",
  },
  successText: {
    color: "#155724", // Verde oscuro para éxito
    backgroundColor: "#d4edda",
    border: "1px solid #c3e6cb",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "0.9em",
  },
  // button:hover (no deshabilitado) - añadir en CSS: background-color: #218838;
};


export default LoginForm;