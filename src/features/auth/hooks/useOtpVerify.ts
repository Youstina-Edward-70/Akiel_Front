import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import axiosInstance, { type ApiError } from '../../../lib/api';
import { API_ENDPOINTS } from '../../../lib/EndPoints';
import toast from 'react-hot-toast';

interface LocationState {
    email: string;
    verificationToken: string;
}

interface VerifyOtpResponse {
    message: string;
    resetToken: string;
}

interface ResendOtpResponse {
    message: string;
    otp: string;
    verificationToken: string;
}

export const useOtpVerify = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { email, verificationToken: initialToken } = (location.state as LocationState) || {};

    const [currentToken, setCurrentToken] = useState(initialToken);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);

    // Protect route from direct access without required state
    useEffect(() => {
        if (!email || !initialToken) {
            toast.error("Invalid session. Please request a new OTP.");
            navigate('/auth/forget-password', { replace: true });
        }
    }, [email, initialToken, navigate]);

    // Handle typing inside inputs and auto focus next input
    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value.replace(/[^0-9]/g, "");
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle backspace key to move focus backwards
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];

            if (!otp[index] && index > 0) {
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputRefs.current[index - 1].focus();
            } else {
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    // Handle pasted text for the whole 6 digits
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim().replace(/[^0-9]/g, "").substring(0, 6);

        if (pasteData.length === 6) {
            const newOtp = pasteData.split("");
            setOtp(newOtp);
            inputRefs.current[5].focus();
        }
    };

    // Mutation for verifying OTP and receiving resetToken
    const verifyOtpMutation = useMutation({
        mutationFn: async (otpCode: string) => {
            const response = await axiosInstance.post<VerifyOtpResponse>(
                API_ENDPOINTS.AUTH.VERIFY_OTP,
                { otp: otpCode },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            );
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("Identity verified successfully!");
            // Navigate to reset password with the fresh resetToken from backend response
            navigate('/auth/reset-password', {
                state: { email, resetToken: data.resetToken }
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = axios.isAxiosError(error)
                ? error.response?.data?.message || error.response?.data?.error || "Invalid OTP code"
                : "Verification failed";
            toast.error(msg);
        }
    });

    // Mutation for resending OTP and updating the authorization token
    const resendOtpMutation = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post<ResendOtpResponse>(
                API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
                { email }
            );
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("A new OTP code has been sent!");
            setCurrentToken(data.verificationToken);
            setOtp(new Array(6).fill(""));
            inputRefs.current[0].focus();
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = axios.isAxiosError(error)
                ? error.response?.data?.message || error.response?.data?.error || "Failed to resend OTP"
                : "Something went wrong";
            toast.error(msg);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullOtp = otp.join("");

        if (fullOtp.length < 6) {
            toast.error("Please enter the full code");
            return;
        }
        verifyOtpMutation.mutate(fullOtp);
    };

    return {
        email,
        otp,
        inputRefs,
        isVerifying: verifyOtpMutation.isPending,
        isResending: resendOtpMutation.isPending,
        handleChange,
        handleKeyDown,
        handlePaste,
        handleSubmit,
        resendOtp: () => resendOtpMutation.mutate()
    };
};