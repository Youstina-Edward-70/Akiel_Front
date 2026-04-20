import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
    baseURL: 'https://all-restaurants-in-one.vercel.app/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface ApiError {
    message: string;
}

// Requests Interceptor
api.interceptors.request.use(
    (config) => {
        const Token = useAuthStore.getState().user?.Token;

        if (Token) {
            config.headers.Authorization = `Bearer ${Token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Responses Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default api;