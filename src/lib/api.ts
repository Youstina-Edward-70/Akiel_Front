import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
    baseURL: 'https://all-restaurants-in-one.vercel.app/',
    withCredentials: true,
});

export interface ApiError {
    message: string;
    error?: string;
}

let isRefreshing = false;

interface FailedRequestQueueItem {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}

let failedQueue: FailedRequestQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
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

        // Let browser set multipart boundaries for FormData requests.
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
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
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (originalRequest.url?.includes('/login') || originalRequest.url?.includes('/refresh')) {
                useAuthStore.getState().logout();
                window.location.href = '/auth/login';
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axios.create().get(
                    'https://all-restaurants-in-one.vercel.app/api/refresh',
                    { withCredentials: true }
                );

                const { accessToken } = response.data;

                if (accessToken) {
                    const currentUser = useAuthStore.getState().user;
                    if (currentUser) {
                        useAuthStore.getState().updateUser({
                            ...currentUser,
                            Token: accessToken,
                            accessToken: accessToken
                        });
                    }

                    processQueue(null, accessToken);

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    return api(originalRequest);

                }
            } catch (refreshError) {
                processQueue(refreshError, null);

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