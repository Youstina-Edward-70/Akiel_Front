import React from 'react';
import { Link } from 'react-router-dom';
import { LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { useLogin } from './hooks/useLogin';

const Login: React.FC = () => {
  // Destructuring all operations from the custom hook
  const {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  } = useLogin();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-8 font-heading">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
        <p className="text-text-secondary text-sm font-medium font-sans">
          Your journey to Egypt's finest flavors starts here.
        </p>
      </div>

      <form className="w-full space-y-5 font-sans" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Email input field */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Email</label>
          <div className="relative">
            <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="email"
              {...register('email')}
              placeholder="Enter your email"
              className={`w-full pl-11 pr-4 py-3 text-sm bg-surface text-text-primary border ${
                errors.email ? 'border-danger focus:border-danger' : 'border-border-light focus:border-primary'
              } rounded-xl outline-none transition-all auth-input-shadow duration-200`}
            />
          </div>
          {errors.email && <p className="text-danger text-xs mt-1 font-medium pl-1">{errors.email.message}</p>}
        </div>

        {/* Password input field */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <Link to="/auth/forgot-password" className="text-xs font-bold text-primary hover:text-primary-hover hover:underline transition-colors">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              {...register('password')}
              placeholder="Enter your password"
              className={`w-full pl-11 pr-12 py-3 text-sm bg-surface text-text-primary border ${
                errors.password ? 'border-danger focus:border-danger' : 'border-border-light focus:border-primary'
              } rounded-xl outline-none transition-all auth-input-shadow duration-200`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer hover:text-text-secondary transition-colors"
            >
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-danger text-xs mt-1 font-medium pl-1">{errors.password.message}</p>}
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full py-4 rounded-xl text-base bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold tracking-wide mt-4 transition-all duration-200 shadow-md hover:shadow-lg active:scale-98"
        >
          Sign In
        </Button>

        {/* Footer Link */}
        <p className="text-center text-sm text-text-secondary mt-8">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-primary font-bold hover:text-primary-hover hover:underline transition-colors">
            Create one now
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;