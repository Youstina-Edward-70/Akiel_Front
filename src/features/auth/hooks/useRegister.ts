import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import axiosInstance, { type ApiError } from '../../../lib/api';
import { API_ENDPOINTS } from '../../../lib/EndPoints';
import { RegisterSchema, type RegisterFormValues } from '../../../types/UserSchema';
import toast from 'react-hot-toast';

export const useRegister = () => {
    const navigate = useNavigate();

    // Password visibility switch states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form registration setup using zod schema validation criteria
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema)
    });

    const registerMutation = useMutation({
        mutationFn: async (data: RegisterFormValues) => {
            const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Account created! Please login.");
            navigate('/auth/login');
        },
        onError: (error: AxiosError<ApiError>) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || error.response?.data?.message || "Registration failed");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    });

    const onSubmit = (data: RegisterFormValues) => {
        registerMutation.mutate(data);
    };

    return {
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        register,
        handleSubmit,
        errors,
        isLoading: registerMutation.isPending,
        onSubmit
    };
};