export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  username: string;
}

export interface UserInfo {
  id: number | string;
  email: string;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserInfo;
}

export interface RegisterResponse {
    message: string;
    userId?: number | string;
  }