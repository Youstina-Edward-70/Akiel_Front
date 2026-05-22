import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-background-dark text-gray-300 py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
                
                {/* Logo and description */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="logo">
                        <img src="/LogoLight.svg" alt="logo" className="h-8" />
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                        Your ultimate guide to discovering the best
                        authentic Egyptian dining experiences. Explore our
                        curated selection of top-rated eateries.
                    </p>
                </div>

                {/* Quick Explore links */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <h3 className="text-white font-semibold text-base tracking-wide">
                        Quick Explore
                    </h3>
                    <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
                        <li>
                            <NavLink to="/" className="hover:text-accent transition-colors duration-200">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/search" className="hover:text-accent transition-colors duration-200">Restaurants</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className="hover:text-accent transition-colors duration-200">About Us</NavLink>
                        </li>
                    </ul>
                </div>

                {/* Contact information */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <h3 className="text-white font-semibold text-base tracking-wide">
                        Connect With Us
                    </h3>
                    <p className="text-sm text-gray-400 max-w-sm">
                        Follow us on social media for the latest food trends and restaurant openings.
                    </p>
                    <div className="flex gap-3 text-base pt-2">
                        <a href="https://www.facebook.com/" aria-label="Facebook" className="border border-gray-700 p-2.5 rounded-full hover:bg-white hover:text-background-dark hover:border-white transition-all duration-300">
                            <FaFacebookF className="w-4 h-4" />
                        </a>
                        <a href="https://www.instagram.com/" aria-label="Instagram" className="border border-gray-700 p-2.5 rounded-full hover:bg-white hover:text-background-dark hover:border-white transition-all duration-300">
                            <FaInstagram className="w-4 h-4" />
                        </a>
                        <a href="https://www.twitter.com/" aria-label="Twitter" className="border border-gray-700 p-2.5 rounded-full hover:bg-white hover:text-background-dark hover:border-white transition-all duration-300">
                            <FaTwitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>

            </div>

            {/* Copyright Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
                <p className="text-center text-xs text-gray-500 border-t border-gray-800 pt-6">
                    © 2026 Akiel Egyptian Restaurant Guide. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;