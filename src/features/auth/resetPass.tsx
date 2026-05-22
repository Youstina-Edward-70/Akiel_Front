import { Link } from 'react-router-dom';
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import Button from '../../ui/Button';
import { useResetPass } from './hooks/useResetPass';

const ResetPass: React.FC = () => {
  // Destructuring all operations from the custom hook
  const {
    email,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit
  } = useResetPass();

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-3 font-heading">Reset Password</h1>
        <p className="text-text-secondary text-sm font-medium leading-relaxed px-4 font-sans">
          Enter your new password for <span className="text-text-primary font-semibold">{email}</span> to regain access.
        </p>
      </div>

      <form
        className="space-y-5 text-left font-sans"
        onSubmit={handleSubmit(onSubmit)}
      >

        {/* New Password input field */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">New Password</label>
          <div className="relative">
            <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              {...register('password')}
              placeholder="Enter new password"
              className={`w-full pl-11 pr-12 py-3 text-sm bg-surface text-text-primary border ${errors.password ? 'border-danger focus:border-danger' : 'border-border-light focus:border-primary'
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

        {/* Confirm Password input field */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Confirm Password</label>
          <div className="relative">
            <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register('confirmPassword')}
              placeholder="Re-enter new password"
              className={`w-full pl-11 pr-12 py-3 text-sm bg-surface text-text-primary border ${errors.confirmPassword ? 'border-danger focus:border-danger' : 'border-border-light focus:border-primary'
                } rounded-xl outline-none transition-all auth-input-shadow duration-200`}
            />
            <button
              type="button"
              onClick={() => { setShowConfirmPassword(!showConfirmPassword); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer hover:text-text-secondary transition-colors"
            >
              {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-danger text-xs mt-1 font-medium pl-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* Change Password Button */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full py-4 rounded-xl text-base font-bold tracking-wide mt-4"
        >
          Change Password
        </Button>

        {/* Footer Link */}
        <div className="text-center pt-2">
          <Link to="/auth/login" className="text-primary font-bold text-sm hover:text-primary-hover hover:underline transition-colors">
            Back to Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default ResetPass;