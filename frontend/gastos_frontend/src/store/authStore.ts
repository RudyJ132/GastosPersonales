import { create } from 'zustand';
import type { AuthState, LoginRequest, RegisterRequest } from '../types/Types';
import { login as loginApi, register as registerApi } from '../services/authService';
import { getUserProfile } from '../services/userService';
import { setToken as setServiceToken, getToken } from '../services/tokenService';

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken(),
  user: null,
  isAuthenticated: !!getToken(),
  isLoading: false,
  error: null,
  setToken: (token) => {
    setServiceToken(token);
    set({ token, isAuthenticated: !!token });
  },
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: () => {
    setServiceToken(null);
    set({ token: null, user: null, isAuthenticated: false });
  },
  login: async (credentials: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loginApi(credentials);
      setServiceToken(response.token);
      set({ token: response.token, user: response.usuario, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  register: async (userData: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      await registerApi(userData);
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
