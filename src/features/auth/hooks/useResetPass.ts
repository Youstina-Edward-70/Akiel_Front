import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import axiosInstance, { type ApiError } from '../../../lib/api';
import { API_ENDPOINTS } from '../../../lib/EndPoints';
import { ResetPasswordSchema, type ResetPasswordFormValues } from '../../../types/UserSchema';
import toast from 'react-hot-toast';

interface LocationState {
    email: string;
    resetToken: string;
}

export const useResetPass = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Visibility states for password inputs
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { email, resetToken } = (location.state as LocationState) || {};

    // Route guard configuration
    useEffect(() => {
        if (!resetToken) {
            toast.error("Session expired. Please verify your OTP again.");
            navigate('/auth/forgot-password', { replace: true });
        }
    }, [resetToken, navigate]);

    // Hook form initializing using zod schema criteria
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    // Reset Mutation operation
    const resetMutation = useMutation({
        mutationFn: async (data: ResetPasswordFormValues) => {
            const response = await axiosInstance.patch(
                API_ENDPOINTS.AUTH.RESET_PASSWORD,
                {
                    password: data.password,
                    confirmPassword: data.confirmPassword
                },
                {
                    headers: { Authorization: `Bearer ${resetToken}` }
                }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Password updated successfully!");
            navigate('/auth/login', { replace: true });
        },
        onError: (error: AxiosError<ApiError>) => {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message || error.response?.data?.error || "Reset password failed";
                toast.error(msg);
            } else {
                toast.error("Something went wrong");
            }
        }
    });

    const onSubmit = (data: ResetPasswordFormValues) => {
        resetMutation.mutate(data);
    };

    return {
        email,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        register,
        handleSubmit,
        errors,
        isLoading: resetMutation.isPending,
        onSubmit
    };
};