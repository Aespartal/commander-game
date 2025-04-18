// frontend/src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh', // Ocupa buena parte de la pantalla
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '6em', // Tamaño grande para el 404
    color: '#dc3545', // Un color rojo de error
    margin: '0',
  },
  subtitle: {
    fontSize: '2em',
    color: '#333',
    margin: '10px 0 20px 0',
  },
  text: {
    color: '#555',
    marginBottom: '30px',
  },
  linkButton: {
    display: 'inline-block',
    padding: '10px 25px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};


const NotFoundPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Página No Encontrada</h2>
      <p style={styles.text}>
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link to="/" style={styles.linkButton}>
        Volver a la Página de Inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;