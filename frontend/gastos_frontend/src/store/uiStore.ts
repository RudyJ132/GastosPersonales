import { create } from 'zustand';

interface UIState {
  isLoading: boolean;
  message: { type: 'success' | 'error' | 'info'; text: string } | null;
  setLoading: (isLoading: boolean) => void;
  showMessage: (type: 'success' | 'error' | 'info', text: string) => void;
  clearMessage: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  message: null,
  setLoading: (isLoading) => set({ isLoading }),
  showMessage: (type, text) => set({ message: { type, text } }),
  clearMessage: () => set({ message: null }),
}));
