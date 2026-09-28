import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService, { LoginData, RegisterData } from '../services/authService';

export interface UserState {
  username: string;
  email: string;
  fullName?: string;
  roles: string[];
}

interface AuthStore {
  user: UserState | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  verify: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: UserState | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      isLoading: false,
      error: null,

      clearError: () => set({ error: null }),

      setUser: (user) => {
        const isAdmin = user?.roles?.some(r => r.includes('ADMIN')) || false;
        set({ user, isAuthenticated: !!user, isAdmin });
      },

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authService.login(credentials);
          authService.setAccessToken(response.accessToken);

          const roles = response.roles || (response.username === 'admin' ? ['ROLE_ADMIN'] : ['ROLE_USER']);
          const userObj: UserState = {
            username: response.username,
            email: response.email,
            roles,
          };

          const isAdmin = roles.some(r => r.includes('ADMIN'));

          set({
            user: userObj,
            token: response.accessToken,
            isAuthenticated: true,
            isAdmin,
            isLoading: false,
          });
        } catch (err: any) {
          const msg = err.response?.data?.message || err.message || 'Đăng nhập không thành công';
          set({ error: msg, isLoading: false });
          throw err;
        }
      },

      register: async (registerData) => {
        try {
          set({ isLoading: true, error: null });
          await authService.register(registerData);
          set({ isLoading: false });
        } catch (err: any) {
          const msg = err.response?.data?.message || err.message || 'Đăng ký không thành công';
          set({ error: msg, isLoading: false });
          throw err;
        }
      },

      verify: async (email, code) => {
        try {
          set({ isLoading: true, error: null });
          await authService.verify({ email, verificationCode: code });
          set({ isLoading: false });
        } catch (err: any) {
          const msg = err.response?.data?.message || err.message || 'Mã xác thực không đúng';
          set({ error: msg, isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        await authService.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
          error: null,
        });
      },
    }),
    {
      name: 'agro-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);
