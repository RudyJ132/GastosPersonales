import { useUIStore } from '../store/uiStore';
import { getToken, setToken } from './tokenService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
  isProtected?: boolean;
  responseType?: 'json' | 'blob';
}

export const api = async <T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> => {
  const { setLoading, showMessage } = useUIStore.getState();

  setLoading(true);

  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };

  if (!(options?.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (options?.isProtected && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401 && options?.isProtected) {
        setToken(null); // Clear token on 401
        window.location.href = '/login';
      }
      try {
        const errorData = await response.json();
        showMessage('error', errorData.message || 'Something went wrong');
        throw new Error(errorData.message || 'Something went wrong');
      } catch (e) {
        showMessage('error', `Error ${response.status}: ${response.statusText}`);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    }

    if (response.status === 204) {
      return null as T;
    }

    if (options?.responseType === 'blob') {
      return response.blob() as Promise<T>;
    }

    try {
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (e) {
      console.error("Failed to parse JSON response", e);
      throw new Error("Invalid JSON response from server");
    }
  } catch (error) {
    console.error('API call error:', error);
    showMessage('error', (error as Error).message || 'Network error');
    throw error;
  } finally {
    setLoading(false);
  }
};


