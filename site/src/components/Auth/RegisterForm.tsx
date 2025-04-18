// frontend/src/components/Auth/RegisterForm.tsx
import React, { useState, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// Opcional: si quieres redirigir después del registro
// import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null); // Para errores del formulario (ej. contraseñas no coinciden)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { register, error: apiError, isLoading } = useAuth();
  const navigate = useNavigate(); // Descomentar si quieres redirigir

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null); // Limpiar errores locales previos
    setSuccessMessage(null); // Limpiar mensaje de éxito previo

    // Validación básica: contraseñas coinciden
    if (password !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden.");
      return;
    }

    // Validación básica: longitud de contraseña (ejemplo)
    if (password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await register({ name, username, email, password });
      // Éxito en el registro
      setSuccessMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
      // Limpiar formulario
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // Opcional: Redirigir al login tras un breve instante o directamente
      setTimeout(() => navigate('/login'), 1500);
      // navigate('/login'); // Redirección inmediata
    } catch (err) {
      // El error de la API ya se maneja y almacena en 'apiError' a través del contexto useAuth.
      // No es necesario hacer nada más aquí, a menos que quieras un manejo específico adicional.
      console.error("Fallo el registro desde el componente:", err);
      setSuccessMessage(null); // Asegurarse de que no hay mensaje de éxito si falla
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Crear una Cuenta</h2>

      {/* Mostrar error de la API (del contexto) */}
      {apiError && !localError && <p style={styles.errorText}>{apiError}</p>}

      {/* Mostrar error local (del formulario) */}
      {localError && <p style={styles.errorText}>{localError}</p>}

      {/* Mostrar mensaje de éxito */}
      {successMessage && <p style={styles.successText}>{successMessage}</p>}

      <div style={styles.inputGroup}>
        <label htmlFor="register-name" style={styles.label}>
          Nombre:
        </label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
          placeholder="Tu nombre completo"
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="register-username" style={styles.label}>
          Nombre de Usuario:
        </label>
        <input
          id="register-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
          placeholder="Tu nombre de usuario"
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="register-email" style={styles.label}>
          Email:
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
          placeholder="tu.correo@ejemplo.com"
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="register-password" style={styles.label}>
          Contraseña:
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="register-confirm-password" style={styles.label}>
          Confirmar Contraseña:
        </label>
        <input
          id="register-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
          placeholder="Repite tu contraseña"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={isLoading ? styles.buttonDisabled : styles.button}
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

// Estilos básicos en línea para el ejemplo
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

export default RegisterForm;
