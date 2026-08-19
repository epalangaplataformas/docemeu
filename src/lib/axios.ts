import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { env } from '@/schemas/env';

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const csrfCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrf_token='))
    ?.split('=')[1];

  if (csrfCookie && config.method && !['get', 'head', 'options'].includes(config.method)) {
    config.headers['X-CSRF-Token'] = csrfCookie;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function executePendingRequests(error: Error | null) {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  pendingRequests = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    const isAuthRoute =
      originalRequest.url?.includes('/v1/auth/refresh') ||
      originalRequest.url?.includes('/v1/auth/logout');

    // @ts-expect-error - Custom property para evitar loop infinito
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      // @ts-expect-error
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        // Usar a store já instanciada para evitar race conditions
        const authStore = useAuthStore.getState();
        await authStore.refreshAccessToken();

        executePendingRequests(null);
        return api(originalRequest);
      } catch (refreshError) {
        executePendingRequests(refreshError as Error);
        useAuthStore.getState().setUser(null); // Forçar logout limpo
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
