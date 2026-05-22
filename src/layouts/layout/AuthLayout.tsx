import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  const location = useLocation();

  const getPageConfig = () => {
    if (location.pathname.includes('login')) {
      return {
        image: "/images/authImages/login.png",
        title: "Taste the Heart of Egypt",
        subtitle: "Discover authentic flavors, hidden gems, and the finest restaurants across the Nile valley."
      };
    }

    if (location.pathname.includes('register')) {
      return {
        image: "/images/authImages/register.png",
        title: "The Heart of Egypt's Dining",
        subtitle: "Join thousands of food lovers and discover hidden culinary gems in the city."
      };
    }

    if (location.pathname.includes('forget-password')) {
      return {
        image: "/images/authImages/forgetPass.png",
        title: "Akiel",
        subtitle: "Discover the best culinary experiences."
      };
    }
    
    if (location.pathname.includes('reset-password')) {
      return {
        image: "/images/authImages/resetPass.png",
        title: "Back to the Heart of Dining",
        subtitle: "Reset your access to continue exploring authentic flavors and hidden culinary gems."
      };
    }

    if (location.pathname.includes('change-password')) {
      return {
        image: "/images/authImages/changePass.png",
        title: "A Feast Awaits",
        subtitle: "Explore Egypt's most delightful and hidden culinary gems."
      };
    }

    // Default (otp-verification)
    return {
      image: "/images/authImages/OTP_verification.png",
      title: "Secure Your Taste of Egypt",
      subtitle: "Your security ensures a seamless journey through the finest flavors across the Nile valley."
    };
  };

  const config = getPageConfig();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-white rounded-4xl shadow-2xl flex overflow-hidden max-w-250 w-full min-h-150 border border-gray-100">
        <div className="hidden md:flex md:w-1/2 relative flex-col justify-end p-10 text-white">
          <div className="absolute inset-0 z-0">
            <img src={config.image} alt="Auth" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/20 to-transparent" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 leading-tight">{config.title}</h2>
            <p className="text-gray-200 text-lg">{config.subtitle}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center relative">
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/LogoIcon.svg"
                  alt="Akiel Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Login - Sign Up - ForgetPass - ResetPass */}
            <Outlet />

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;