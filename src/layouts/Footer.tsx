import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-background-dark text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between gap-8">
                <div className="flex flex-col md:flex-row gap-12 justify-around">
                    {/* Logo and description */}
                    <div className="flex flex-col gap-4 md:max-w-[30%] max-w-nonet items-center md:items-start">
                        <div className="logo"><img src="/LogoLight.svg" alt="logo" /></div>
                        <p className="text-sm opacity-90 md:text-left">
                            Your ultimate guide to discovering the best
                            authentic Egyptian dining experiences. Explore our
                            curated selection of top-rated eateries.
                        </p>
                    </div>
                    {/* Quick Explore links */}
                    <div className="flex flex-col gap-4 md:max-w-[30%] max-w-none items-center md:items-start">
                        <h3>Quick Explore</h3>
                        <ul className="flex flex-col gap-2 opacity-90 text-sm md:text-left">
                            <li>
                                <NavLink to="/" className="hover:text-accent">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/search" className="hover:text-accent">Restaurants</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="hover:text-accent">About Us</NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* Contact information */}
                    <div className="flex flex-col gap-4 md:max-w-[30%] max-w-none items-center md:items-start">
                        <h3>Connect With Us</h3>
                        <p className="text-sm opacity-90 md:text-left">
                            Follow us on social media for the
                            latest food trends and restaurant
                            openings.
                        </p>
                        <div className="flex gap-4 text-lg justify-center md:justify-start">
                            <a href="https://www.facebook.com/" className="border border-border-light p-1.5 rounded-full hover:bg-white hover:text-background-dark transition"><FaFacebookF /></a>
                            <a href="https://www.instagram.com/" className="border border-border-light p-1.5 rounded-full hover:bg-white hover:text-background-dark transition"><FaInstagram /></a>
                            <a href="https://www.twitter.com/" className="border border-border-light p-1.5 rounded-full hover:bg-white hover:text-background-dark transition"><FaTwitter /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-12 mt-8">
                <p className="text-center text-sm opacity-90 border-t border-gray-700 pt-4">
                    © 2026 Akiel Egyptian Restaurant Guide. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer