import axiosClient from '../../../api/axiosClient';
import { API_ENDPOINTS } from '../../../api/endpoints';

export interface LoginResponse {
  accessToken: string;
  username: string;
  email: string;
  roles?: string[];
  [key: string]: any;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface VerifyData {
  email: string;
  verificationCode: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const authService = {
  // Login user
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  // Register new user
  register: async (data: RegisterData): Promise<any> => {
    const response = await axiosClient.post(API_ENDPOINTS.AUTH.SIGNUP, data);
    return response.data;
  },

  // Verify user account
  verify: async (data: VerifyData): Promise<any> => {
    const response = await axiosClient.post(API_ENDPOINTS.AUTH.VERIFY, data);
    return response.data;
  },

  // Resend code
  resendVerificationCode: async (email: string): Promise<any> => {
    const response = await axiosClient.post(`${API_ENDPOINTS.AUTH.RESEND}?email=${encodeURIComponent(email)}`);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // Ignore network errors during logout
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  },

  // Get current user profile
  getCurrentUser: async (): Promise<any> => {
    const response = await axiosClient.get(API_ENDPOINTS.USER.ME);
    return response.data;
  },

  // Token helpers
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  setAccessToken: (token: string): void => {
    localStorage.setItem('accessToken', token);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
};

export default authService;
