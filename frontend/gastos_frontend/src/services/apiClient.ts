import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore'; // Import useUIStore

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
  isProtected?: boolean;
  responseType?: 'json' | 'blob'; // Add responseType option
}

const apiClient = async <T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> => {
  const { token, logout } = useAuthStore.getState();
  const { setLoading, showMessage } = useUIStore.getState(); // Get setLoading and showMessage from useUIStore

  setLoading(true); // Set loading to true before the API call

  const headers: HeadersInit = {
    ...options?.headers,
  };

  // Only set Content-Type: application/json if body is not FormData
  if (!(options?.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

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
        logout(); // Log out if token is expired or invalid for a protected route
        window.location.href = '/login'; // Redirect to login page
      }
      const errorData = await response.json();
      showMessage('error', errorData.message || 'Something went wrong'); // Display error message
      throw new Error(errorData.message || 'Something went wrong');
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return null as T;
    }

    // Handle different response types
    if (options?.responseType === 'blob') {
      return response.blob() as Promise<T>;
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    showMessage('error', (error as Error).message || 'Network error'); // Display network error
    throw error;
  } finally {
    setLoading(false); // Set loading to false after the API call (success or error)
  }
};

export default apiClient;
