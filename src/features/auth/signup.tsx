import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../lib/api';
import { API_ENDPOINTS } from '../../lib/EndPoints';
import { SignupSchema, type SignupFormValues } from '../../types/UserSchema';
import toast from 'react-hot-toast';
import Button from '../../ui/Button';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema)
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormValues) => {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account created! Please login.");
      navigate('/auth/login');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  });

  const onSubmit = (data: SignupFormValues) => {
    signupMutation.mutate(data);
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Create an Account</h1>
        <p className="text-gray-500 text-xs">Join us and discover the best restaurants in Cairo.</p>
      </div>

      <form className="space-y-4 text-left" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Field */}
        <div className="flex flex-col gap-1">
          <label className="block text-[11px] font-bold text-gray-500 mb-1 tracking-wider">Full Name</label>
          <input
            {...register("fullname")}
            required
            type="text"
            placeholder="Enter your full name"
            className={`w-full p-3 bg-surface border rounded-lg outline-none transition-all text-sm ${errors.fullname ? 'border-danger' : 'border-gray-200 focus:border-primary'}`} />
          {errors.fullname && <p className="text-danger text-[10px] mt-1">{errors.fullname.message}</p>}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label className="block text-[11px] font-bold text-gray-500 mb-1 tracking-wider">Email</label>
          <input
            {...register("email")}
            required
            type="email"
            placeholder="name@example.com"
            className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-lg outline-none focus:border-primary transition-all text-sm"
          />
          {errors.email && <p className="text-danger text-[10px] mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone Field */}
        <div className="flex flex-col gap-1">
          <label className="block text-[11px] font-bold text-gray-500 mb-1 tracking-wider">Phone Number</label>
          <input
            {...register("phone")}
            required
            type="tel"
            placeholder="+20 123 456 7890"
            className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-lg outline-none focus:border-primary transition-all text-sm"
          />
          {errors.phone && <p className="text-danger text-[10px] mt-1">{errors.phone.message}</p>}
        </div>

        {/* Passwords Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div className='flex flex-col gap-1'>
            <label className="block text-[11px] font-bold text-gray-500 mb-1 tracking-wider">Password</label>
            <input
              {...register("password")}
              required
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-lg outline-none focus:border-primary transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-1 tracking-wider">Confirm</label>
            <input
              {...register("confirmPassword")}
              required
              type="password"
              placeholder="Repeat password"
              className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-lg outline-none focus:border-primary transition-all text-sm"
            />
          </div>
        </div>

        {(errors.password || errors.confirmPassword) && (
          <p className="text-danger text-[10px] font-medium">
            {errors.password?.message || errors.confirmPassword?.message}
          </p>
        )}

        {/* Terms and Conditions */}
        <div className="flex items-center gap-2 pt-2">
          <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer" />
          <label htmlFor="terms" className="text-[10px] text-gray-500 leading-tight">
            I agree to the <span className="text-primary font-bold">Terms & Conditions</span> and <span className="text-primary font-bold">Privacy Policy</span>
          </label>
        </div>

        <Button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 shadow-lg shadow-red-100 hover:bg-primary-hover transition-all active:scale-[0.98]">
          {signupMutation.isPending ? "Creating Account..." : "Create Account"}
        </Button>

        <p className="text-center text-xs text-gray-500 mt-6 font-medium">
          Already have an account? <Link to="/auth/login" className="text-primary font-bold hover:underline ml-1">Login</Link>
        </p>
      </form>
    </>
  );
};

export default Signup;