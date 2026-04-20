import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../../lib/api';
import { API_ENDPOINTS } from '../../lib/EndPoints';
import { ResetPasswordSchema, type ResetPasswordFormValues } from '../../types/UserSchema';
import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import { FaLock } from 'react-icons/fa';

const ResetPass: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pre-fill email if coming from forget-password page
  const emailFromState = location.state?.email || '';

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: emailFromState,
      otp: '',
      password: '',
      confirmPassword: ''
    }
  });

  const resetMutation = useMutation({
    mutationFn: async (data: ResetPasswordFormValues) => {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
      navigate('/auth/login');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Invalid OTP or request failed");
      } else {
        toast.error("Something went wrong");
      }
    }
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    resetMutation.mutate(data);
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Reset Password</h1>
        <p className="text-gray-500 text-sm font-medium leading-relaxed px-4">
          Enter your new password and OTP to reset it.
        </p>
      </div>
      <form className="space-y-6 text-left" onSubmit={handleSubmit(onSubmit)}>
        {/* OTP Field */}
        <div className='flex flex-col gap-1'>
          <label className="text-sm font-bold text-gray-500 mb-2 tracking-wider">OTP Code</label>
          <input
            required
            {...register('otp')}
            placeholder="Enter 6-digit OTP"
            className={`w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all text-sm ${errors.otp ? 'border-danger focus:ring-1 focus:ring-danger' : 'border-gray-200 focus:border-primary'
              }`}
          />
          {errors.otp && <p className="text-danger text-[10px] font-medium">{errors.otp.message}</p>}
        </div>

        {/* New Password */}
        <div>
          <label className="text-sm font-bold text-gray-500 mb-2 tracking-wider">New Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            <input
              type="password"
              required
              {...register('password')}
              placeholder="Enter new password"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl outline-none transition-all text-sm ${errors.password ? 'border-danger focus:ring-1 focus:ring-danger' : 'border-gray-200 focus:border-primary'
                }`}
            />
          </div>
          {errors.password && <p className="text-danger text-[10px] font-medium">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className='flex flex-col gap-1'>
          <label className="text-sm font-bold text-gray-500 mb-2 tracking-wider">Confirm Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            <input
              type="password"
              required
              {...register('confirmPassword')}
              placeholder="Re-enter new password"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl outline-none transition-all text-sm ${errors.confirmPassword ? 'border-danger focus:ring-1 focus:ring-danger' : 'border-gray-200 focus:border-primary'
                }`}
            />
          </div>
          {errors.confirmPassword && <p className="text-danger text-[10px] font-medium">{errors.confirmPassword.message}</p>}
        </div>

        <Button 
        type="submit" 
        disabled={resetMutation.isPending}
        className="w-full py-3.5 rounded-xl shadow-lg shadow-red-100 mt-2">
          {resetMutation.isPending ? "Changing Password..." : "Change Password"}
        </Button>

        <div className="text-center pt-4">
          <Link to="/auth/login" className="text-primary font-bold text-sm hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default ResetPass;