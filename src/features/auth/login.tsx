import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import toast from 'react-hot-toast';
import axiosInstance, { type ApiError } from '../../lib/api';
import { API_ENDPOINTS } from '../../lib/EndPoints';
import { useAuthStore } from '../../store/authStore';
import { LoginSchema, type LoginFormValues } from '../../types/UserSchema';
import { AxiosError } from 'axios';
import Button from '../../ui/Button';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  // Get Login action from Zustand store
  const loginAction = useAuthStore((state) => state.login);

  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
      return response.data;
    },
    onSuccess: (data) => {
      const userData = { ...data.user, Token: data.Token };
      loginAction(userData);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log("youstina", error);
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
  }
  });

const onSubmit = (data: LoginFormValues) => {
  loginMutation.mutate(data);
};

return (
  <>
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
      <p className="text-gray-500 text-sm font-medium">Your journey to Egypt's finest flavors starts here.</p>
    </div>

    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
        <div className="relative">
          <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            required
            {...register('email')}
            placeholder="name@example.com"
            className={"w-full pl-10 pr-4 py-3 text-sm bg-surface border border-gray-200 rounded-lg outline-none transition-all focus:border-primary"} />
        </div>
        {errors.email && <p className="text-danger text-xs mt-1 font-medium">{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <Link to="/auth/forget-password" title="Forget-password" className="text-xs font-bold text-primary hover:underline">Forgot Password?</Link>
        </div>
        <div className="relative">
          <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            required
            {...register('password')}
            placeholder="••••••••"
            className={"w-full pl-10 pr-12 py-3 text-sm bg-surface border border-gray-200 rounded-lg outline-none transition-all focus:border-primary "} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
            {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-danger text-xs mt-1 font-medium">{errors.password.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-primary/80 transition-all active:scale-[0.98]">
        {loginMutation.isPending ? "Signing In..." : "Sign In"}
      </Button>

      <p className="text-center text-sm text-gray-500 mt-8">
        Don't have an account? <Link to="/auth/signup" className="text-primary font-bold hover:underline">Create one now</Link>
      </p>
    </form>
  </>
);
};

export default Login;