// Instancia de Axios configurada
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Aquí podrías desloguear al usuario automáticamente
      console.error("Error de autenticación detectado:", error.response.data.message);
      // Ejemplo: llamar a una función de logout del AuthContext
      // logout(); // Necesitarías acceso al contexto aquí o manejarlo de otra forma
      localStorage.removeItem('authToken'); // Limpieza básica
      // Redirigir al login (esto puede ser complicado desde un interceptor)
      // window.location.href = '/login';
    }
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);


export default axiosInstance;