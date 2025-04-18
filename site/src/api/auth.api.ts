// Funciones para llamar a la API de auth// frontend/src/api/auth.api.ts
import axiosInstance from "./axiosInstance";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  UserInfo,
} from "../types/auth"

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<any> => {
  // Ajusta el tipo de retorno según tu API
  try {
    const response = await axiosInstance.post("/auth/register", credentials);
    return response.data; // Devuelve la respuesta del backend (ej. { message: '...' })
  } catch (error: any) {
    console.error(
      "Error en el registro:",
      error.response?.data ?? error.message
    );
    throw error.response?.data ?? new Error("Error en el registro");
  }
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data; // Devuelve { message, token, user }
  } catch (error: any) {
    console.error("Error en el login:", error.response?.data ?? error.message);
    throw error.response?.data ?? new Error("Error en el login");
  }
};

// Ejemplo de llamada a una API protegida
export const fetchUserProfile = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/protected/profile"); // Usa la ruta protegida
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching profile:",
      error.response?.data ?? error.message
    );
    throw error.response?.data ?? new Error("Error al obtener el perfil");
  }
};
