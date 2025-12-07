import { create } from 'zustand';
import type { AuthState, LoginRequest, RegisterRequest, User } from '../types/Types';
import { login as loginApi, register as registerApi } from '../services/authService';
import { getUserProfile } from '../services/userService';

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token') || null,
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token, isAuthenticated: !!token });
  },
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
  login: async (credentials: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loginApi(credentials);
      set({ token: response.token, user: response.usuario, isAuthenticated: true, isLoading: false });
      localStorage.setItem('token', response.token);
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  register: async (userData: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      const user = await registerApi(userData);
      set({ isLoading: false });
      // You might want to automatically log in the user after registration
      // For now, we just reset the loading state
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const userProfile = await getUserProfile();
      set({ user: userProfile, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      // If fetching user profile fails (e.g., token expired), log out the user
      useAuthStore.getState().logout();
    }
  },
}));
