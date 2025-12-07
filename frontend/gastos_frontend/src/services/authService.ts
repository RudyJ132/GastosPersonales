import apiClient from './apiClient';
import type { LoginRequest, LoginResponse, RegisterRequest, User } from '../types/Types';

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  return apiClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const register = async (userData: RegisterRequest): Promise<User> => {
  return apiClient<User>('/auth/registro', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};
