import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
    baseURL: 'https://all-restaurants-in-one.vercel.app/',
    withCredentials: true,
});

export interface ApiError {
    message: string;
    error?: string;
}

interface FailedQueueItem {
    resolve: (Token: string) => void;
    reject: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: AxiosError | null, Token: string | null = null) => {
    failedQueue.forEach((item) => {
        if (error) {
            item.reject(error);
        } else if (Token) {
            item.resolve(Token);
        }
    });
    failedQueue = [];
};

// Requests Interceptor
api.interceptors.request.use(
    (config) => {
        const Token = useAuthStore.getState().user?.Token;

        if (Token) {
            config.headers.Authorization = `Bearer ${Token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Responses Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            
            if (originalRequest.url?.includes('/refresh')) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then((token) => {
                    originalRequest.headers!.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;
            try {
                const { data } = await api.get<{ accessToken: string }>('/refresh');
                const newToken = data.accessToken;
                
                useAuthStore.getState().setToken(newToken);
                
                processQueue(null, newToken);
                originalRequest.headers!.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null);
                useAuthStore.getState().logout();
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default api;