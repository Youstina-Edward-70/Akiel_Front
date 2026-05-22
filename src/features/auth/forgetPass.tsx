import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import Button from '../../ui/Button';
import { useForgetPass } from './hooks/useForgetPass';

const ForgetPass: React.FC = () => {
  // Destructuring all operations from the custom hook
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit
  } = useForgetPass();

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-3 font-heading">Forgot Password</h1>
        <p className="text-text-secondary text-sm leading-relaxed px-4 font-medium font-sans">
          Enter the email or phone number associated with your account and we will send you a reset link.
        </p>
      </div>

      <form className="space-y-6 text-left font-sans" onSubmit={handleSubmit(onSubmit)}>

        {/* Email input field */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm text-text-primary mb-1.5 font-semibold">Email</label>
          <input
            type="email"
            {...register('email')}
            placeholder="Enter your email"
            className={`w-full px-4 py-3 text-sm bg-surface border ${errors.email ? 'border-danger focus:border-danger' : 'border-border-light focus:border-primary'
              } rounded-xl outline-none transition-all auth-input-shadow duration-200 text-text-primary`}
          />
          {errors.email && <p className="text-danger text-xs mt-1 font-medium pl-1">{errors.email.message}</p>}
        </div>

        {/* Send OTP Button */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full py-4 rounded-xl text-base font-bold tracking-wide mt-4"
        >
          Send OTP
        </Button>

        {/* Footer Link */}
        <div className="text-center pt-2">
          <Link to="/auth/login" className="text-primary font-bold text-sm flex items-center justify-center gap-2 hover:gap-3 transition-all duration-200">
            <FaArrowLeft size={12} /> Back to Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgetPass;