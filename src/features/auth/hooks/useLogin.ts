import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import axiosInstance, { type ApiError } from '../../../lib/api';
import { API_ENDPOINTS } from '../../../lib/EndPoints';
import { useAuthStore } from '../../../store/authStore';
import { LoginSchema, type LoginFormValues, type User } from '../../../types/UserSchema';
import toast from 'react-hot-toast';

interface LoginResponse {
    user: Omit<User, 'Token'>;
    Token: string;
    message?: string;
}

export const useLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';
    const loginAction = useAuthStore((state) => state.login);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: async (data: LoginFormValues) => {
            const response = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
            return response.data;
        },
        onSuccess: (data) => {
            const userData = { ...data.user, Token: data.Token };
            loginAction(userData);
            toast.success("Welcome back!");
            navigate(from, { replace: true });
        },
        onError: (error: AxiosError<ApiError>) => {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.response?.data?.error || "Login failed"
                : "Something went wrong";
            toast.error(message);
        }
    });

    const onSubmit = (data: LoginFormValues) => {
        loginMutation.mutate(data);
    };

    return {
        showPassword,
        setShowPassword,
        register,
        handleSubmit,
        errors,
        isLoading: loginMutation.isPending,
        onSubmit,
    };
};