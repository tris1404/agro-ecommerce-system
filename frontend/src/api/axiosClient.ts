import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for HttpOnly cookie
});

// Request interceptor - attach access token
axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle refresh token (prepared for future implementation)
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // TODO: Implement refresh token logic here
        // const originalRequest = error.config;
        // if (error.response?.status === 401 && !originalRequest._retry) {
        //   originalRequest._retry = true;
        //   try {
        //     const { data } = await axios.post('http://localhost:8080/api/auth/refresh', {}, { withCredentials: true });
        //     localStorage.setItem('accessToken', data.accessToken);
        //     originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        //     return axiosClient(originalRequest);
        //   } catch (refreshError) {
        //     localStorage.removeItem('accessToken');
        //     window.location.href = '/login';
        //     return Promise.reject(refreshError);
        //   }
        // }
        return Promise.reject(error);
    }
);

export default axiosClient;
