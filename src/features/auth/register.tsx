import { Link } from 'react-router-dom';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { useRegister } from './hooks/useRegister';

const Register: React.FC = () => {
  // Destructuring all operations from the custom hook
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit
  } = useRegister();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-8 font-heading">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Create an Account</h1>
        <p className="text-text-secondary text-sm font-medium font-sans">
          Join us and discover the best restaurants in Egypt.
        </p>
      </div>

      <form className="w-full space-y-5 font-sans" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Username input field */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Full Name</label>
          <input
            {...register("fullname")}
            type="text"
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 text-sm bg-surface text-text-primary border ${
              errors.fullname ? 'border-danger focus:border-danger' : 'border-border-light focus:border-primary'
            } rounded-xl outline-none transition-all auth-input-shadow duration-200`}
          />
          {errors.fullname && <p className="text-danger text-xs mt-1 font-medium">{errors.fullname.message}</p>}
        </div>

        {/* Email input field */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className={`w-full px-4 py-3 text-sm bg-surface text-text-primary border ${
              errors.email ? 'border-danger focus:border-danger' : 'border-border-light focus:border-primary'
            } rounded-xl outline-none transition-all auth-input-shadow duration-200`}
          />
          {errors.email && <p className="text-danger text-xs mt-1 font-medium">{errors.email.message}</p>}
        </div>

        {/* Phone input field */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Phone Number</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+20 123 456 7890"
            className={`w-full px-4 py-3 text-sm bg-surface text-text-primary border ${
              errors.phone ? 'border-danger focus:border-danger' : 'border-border-light focus:border-primary'
            } rounded-xl outline-none transition-all auth-input-shadow duration-200`}
          />
          {errors.phone && <p className="text-danger text-xs mt-1 font-medium">{errors.phone.message}</p>}
        </div>

        {/* Password input field */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Password</label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className={`w-full pl-4 pr-12 py-3 text-sm bg-surface text-text-primary border ${
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
          {errors.password && <p className="text-danger text-xs mt-1 font-medium">{errors.password.message}</p>}
        </div>

        {/* Confirm password input field */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Confirm Password</label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat your password"
              className={`w-full pl-4 pr-12 py-3 text-sm bg-surface text-text-primary border ${
                errors.confirmPassword ? 'border-danger focus:border-danger' : 'border-border-light focus:border-primary'
              } rounded-xl outline-none transition-all auth-input-shadow duration-200`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer hover:text-text-secondary transition-colors"
            >
              {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-danger text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>}
        </div>

        {/* Create Account Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full py-4 rounded-xl text-base bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold tracking-wide mt-4 transition-all duration-200 shadow-md hover:shadow-lg active:scale-98"
        >
          Create Account
        </Button>

        {/* Footer Link */}
        <p className="text-center text-sm text-text-secondary mt-8">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-primary font-bold hover:text-primary-hover hover:underline transition-colors">
            Login
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Register;