import { create } from 'zustand';
import { api } from '@/lib/axios';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  merchantId: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  loginWithGoogle: (code: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,

  // Inicialização: tenta renovar o token e desbloqueia o loading
  initialize: async () => {
    try {
      await get().refreshAccessToken();
    } catch {
      // já trata o erro internamente
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: (user) => set({ user }),

  loginWithGoogle: async (code: string) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/v1/auth/google', { code });
      const user = response.data.user as AuthUser;
      set({ user, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error('Falha ao iniciar sessão com Google.');
    }
  },

  refreshAccessToken: async () => {
    try {
      await api.post('/v1/auth/refresh');
      // Se o refresh foi bem‑sucedido, busca os dados do utilizador
      const meResponse = await api.get('/v1/merchants/me');
      set({ user: meResponse.data as AuthUser });
    } catch {
      // Se falhar, limpa o utilizador
      set({ user: null });
    }
  },

  logout: async () => {
    try {
      await api.post('/v1/auth/logout');
    } catch {
      // silencioso
    } finally {
      set({ user: null });
    }
  },
}));
