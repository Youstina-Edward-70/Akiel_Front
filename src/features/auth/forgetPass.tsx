import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../../lib/api';
import { API_ENDPOINTS } from '../../lib/EndPoints';
import { ForgetSchema, type ForgetFormValues } from '../../types/UserSchema';
import toast from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa";
import Button from '../../ui/Button';

const ForgetPass: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<ForgetFormValues>({
    resolver: zodResolver(ForgetSchema)
  });

  const forgetMutation = useMutation({
    mutationFn: async (data: ForgetFormValues) => {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success("OTP code sent to your email!");
      // Navigate to reset password page with email in state
      navigate('/auth/reset-password', { state: { email: variables.email } });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to send OTP");
      } else {
        toast.error("Something went wrong");
      }
    }
  });

  const onSubmit = (data: ForgetFormValues) => {
    forgetMutation.mutate(data);
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-3">Forgot Password?</h1>
        <p className="text-gray-500 text-sm leading-relaxed px-4 font-medium">
          Enter the email or phone number associated with your account and we will send you a reset link.
        </p>
      </div>

      <form className="space-y-6 text-left" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label className="block text-sm text-gray-700 mb-1.5 font-medium">Email</label>
          <input
            type="email"
            required
            {...register('email')}
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-sm bg-surface border border-gray-200 rounded-lg focus:border-primary outline-none transition-all"
          />
          {errors.email && <p className="text-danger text-[10px] font-medium">{errors.email.message}</p>}
        </div>

        <Button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-primary-hover transition-all active:scale-[0.98]">
          Send OTP Code
        </Button>

        <div className="text-center pt-4">
          <Link to="/auth/login" className="text-primary font-bold text-sm flex items-center justify-center gap-2 hover:gap-3 transition-all">
            <span><FaArrowLeft /></span> Back to Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgetPass;