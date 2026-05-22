import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import axiosInstance, { type ApiError } from '../../../lib/api';
import { API_ENDPOINTS } from '../../../lib/EndPoints';
import { ChangePasswordSchema, type ChangePasswordFormValues } from '../../../types/UserSchema';
import toast from 'react-hot-toast';

export const useChangePass = () => {
    const navigate = useNavigate();

    // Visibility control states for individual inputs
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    // ChangePass mutation handler
    const changeMutation = useMutation({
        mutationFn: async (data: ChangePasswordFormValues) => {
            const response = await axiosInstance.patch(
                API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
                {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword
                }
            );
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Password changed successfully!");
            navigate('/profile', { replace: true });
        },
        onError: (error: AxiosError<ApiError>) => {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message || error.response?.data?.error || "Failed to change password";
                toast.error(msg);
            } else {
                toast.error("Something went wrong");
            }
        }
    });

    const onSubmit = (data: ChangePasswordFormValues) => {
        changeMutation.mutate(data);
    };

    return {
        showCurrentPassword,
        setShowCurrentPassword,
        showNewPassword,
        setShowNewPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        register,
        handleSubmit,
        errors,
        isLoading: changeMutation.isPending,
        onSubmit
    };
};