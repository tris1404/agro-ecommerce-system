import axiosClient from '../../../api/axiosClient';

interface LoginResponse {
    accessToken: string;
    [key: string]: any;
}

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

interface VerifyData {
    email: string;
    verificationCode: string;
}

interface LoginData {
    email: string;
    password: string;
}

const authService = {
    // Login user
    login: async (data: LoginData): Promise<LoginResponse> => {
        const response = await axiosClient.post<LoginResponse>('/auth/login', data);
        return response.data;
    },

    // Register new user
    register: async (data: RegisterData): Promise<void> => {
        await axiosClient.post('/auth/signup', data);
    },

    // Verify user account
    verify: async (data: VerifyData): Promise<void> => {
        await axiosClient.post('/auth/verify', data);
    },

    // Logout user
    logout: (): void => {
        localStorage.removeItem('accessToken');
    },

    // Get access token
    getAccessToken: (): string | null => {
        return localStorage.getItem('accessToken');
    },

    // Set access token
    setAccessToken: (token: string): void => {
        localStorage.setItem('accessToken', token);
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('accessToken');
    },
};

export default authService;
