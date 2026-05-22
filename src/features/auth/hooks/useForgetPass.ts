import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import axiosInstance, { type ApiError } from '../../../lib/api';
import { API_ENDPOINTS } from '../../../lib/EndPoints';
import { ForgetSchema, type ForgetFormValues } from '../../../types/UserSchema';
import toast from 'react-hot-toast';

interface ForgotPasswordResponse {
    message: string;
    otp: string;
    verificationToken: string;
}

export const useForgetPass = () => {
    const navigate = useNavigate();

    // Initialize react hook form with zod framework schema criteria
    const { register, handleSubmit, formState: { errors } } = useForm<ForgetFormValues>({
        resolver: zodResolver(ForgetSchema)
    });

    const forgetMutation = useMutation({
        mutationFn: async (data: ForgetFormValues) => {
            const response = await axiosInstance.post<ForgotPasswordResponse>(
                API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
                data
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            toast.success("OTP sent to email successfully!");

            navigate('/auth/otp-verification', {
                state: {
                    email: variables.email,
                    verificationToken: data.verificationToken
                }
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message || error.response?.data?.error || "Failed to send OTP";
                toast.error(msg);
            } else {
                toast.error("Something went wrong");
            }
        }
    });

    const onSubmit = (data: ForgetFormValues) => {
        forgetMutation.mutate(data);
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading: forgetMutation.isPending,
        onSubmit
    };
};