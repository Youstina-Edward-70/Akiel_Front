import { useOtpVerify } from './hooks/useOtpVerify';
import Button from '../../ui/Button';

const OtpVerify: React.FC = () => {
    const {
        email,
        otp,
        inputRefs,
        isVerifying,
        isResending,
        handleChange,
        handleKeyDown,
        handlePaste,
        handleSubmit,
        resendOtp
    } = useOtpVerify();

    return (
        <>
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-3 font-heading">Verify Your Identity</h1>
                <p className="text-text-secondary text-sm leading-relaxed px-4 font-medium font-sans">
                    We have sent a code to <span className="text-text-primary font-semibold">{email}</span>. Please enter it below to continue.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 text-left font-sans">
                <div>
                    <label className="block text-sm text-text-primary mb-3 font-semibold text-center">
                        OTP Code
                    </label>

                    {/* OTP inputs */}
                    <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                ref={(el) => {
                                    if (el) {
                                        inputRefs.current[index] = el;
                                    }
                                }}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold bg-surface border border-border-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all auth-input-shadow duration-200 text-text-primary"
                            />
                        ))}
                    </div>
                </div>

                {/* Submit action button */}
                <Button
                    type="submit"
                    variant="primary"
                    isLoading={isVerifying}
                    className="w-full py-4 rounded-xl text-base font-bold tracking-wide mt-4"
                >
                    Confirm
                </Button>

                {/* Resend actions triggers */}
                <div className="text-center text-sm font-medium text-text-secondary">
                    Did not receive the code?{" "}
                    <button
                        type="button"
                        disabled={isResending}
                        onClick={resendOtp}
                        className="text-primary font-bold hover:underline cursor-pointer disabled:text-text-muted transition-colors"
                    >
                        Resend
                    </button>
                </div>
            </form>
        </>
    );
};

export default OtpVerify;