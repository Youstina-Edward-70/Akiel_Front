import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useMyRestaurant } from "../pages/Owner/hooks/useMyRestaurant";
import Button from "../ui/Button";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const { data: myRestaurant } = useMyRestaurant();
    
    const activeLink = ({ isActive }: { isActive: boolean }) => 
        `transition-all duration-300 ease-in-out block py-2 md:py-0 whitespace-nowrap ${
            isActive ? "text-primary font-bold" : "text-text-primary hover:text-primary font-medium"
        }`;

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white shadow w-full top-0 left-0 z-999 sticky">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link to="/" className="flex items-center">
                            <img src="/Logo.svg" alt="Logo" className="h-8 w-auto" />
                        </Link>
                    </div>
                    
                    {/* NavLinks */}
                    <div className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-8 mx-4 overflow-hidden">
                        <NavLink to="/" className={activeLink}>Home</NavLink>
                        {myRestaurant && (
                            <NavLink to={`/restaurant/${myRestaurant._id}`} className={activeLink}>
                                My Restaurant
                            </NavLink>
                        )}
                        <NavLink to="/search" className={activeLink}>Restaurants</NavLink>
                        <NavLink to="/about" className={activeLink}>About Us</NavLink>
                    </div>

                    {/* Auth */}
                    <div className="flex shrink-0 items-center gap-4">
                        {/* Desktop Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            {!user ? (
                                <>
                                    <Link to="/auth/login" className="px-4 py-2 text-text-primary hover:text-primary/90 transition-colors duration-300 whitespace-nowrap">
                                        Login
                                    </Link>
                                    <Button onClick={() => navigate('/auth/register')} className="px-5 py-1.5 rounded-full shadow-sm hover:shadow transition-all duration-300 whitespace-nowrap">
                                        Register
                                    </Button>
                                </>
                            ) : (
                                <Link to="/profile" className="flex items-center gap-3 group">
                                    <div className="text-right hidden lg:block">
                                        <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                                            {user.fullname}
                                        </p>
                                        <p className="text-xs text-text-secondary font-bold capitalize whitespace-nowrap">
                                            {user.role?.replace('_', ' ')}
                                        </p>
                                    </div>
                                    <img
                                        src={user.profile_pic?.url || `https://ui-avatars.com/api/?name=${user.fullname}`}
                                        alt="Profile"
                                        className="rounded-full border-2 border-border-light w-10 h-10 object-cover p-0.5 group-hover:border-primary transition-colors duration-300 shrink-0"
                                    />
                                </Link>
                            )}
                        </div>

                        {/* Menu button for mobile */}
                        <div className="flex md:hidden">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="text-gray-600 hover:text-primary p-2 transition-colors duration-300"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Menu Navbar for mobile */}
            <div className={`md:hidden bg-white border-t border-gray-100 px-6 absolute w-full left-0 shadow-lg transition-all duration-300 ease-in-out origin-top ${
                isOpen ? "opacity-100 scale-y-100 max-h-100 py-4 space-y-3 visible" : "opacity-0 scale-y-95 max-h-0 overflow-hidden invisible"
            }`}>
                <NavLink to="/" onClick={() => setIsOpen(false)} className={activeLink}>
                    Home
                </NavLink>
                {myRestaurant && (
                    <NavLink to={`/restaurant/${myRestaurant._id}`} onClick={() => setIsOpen(false)} className={activeLink}>
                        My Restaurant
                    </NavLink>
                )}
                <NavLink to="/search" onClick={() => setIsOpen(false)} className={activeLink}>
                    Restaurants
                </NavLink>
                <NavLink to="/about" onClick={() => setIsOpen(false)} className={activeLink}>
                    About Us
                </NavLink>
                
                {/* Auth for mobile */}
                <div className="pt-4 border-t border-gray-100">
                    {!user ? (
                        <div className="flex flex-col gap-2">
                            <Link 
                                to="/auth/login" 
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center py-2 text-text-primary hover:text-primary transition-colors duration-300"
                            >
                                Login
                            </Link>
                            <Button 
                                onClick={() => { navigate('/auth/register'); setIsOpen(false); }} 
                                className="w-full py-2 rounded-full"
                            >
                                Register
                            </Button>
                        </div>
                    ) : (
                        <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2">
                            <img
                                src={user.profile_pic?.url || `https://ui-avatars.com/api/?name=${user.fullname}`}
                                alt="Profile"
                                className="rounded-full border-2 border-border-light w-10 h-10 object-cover p-0.5"
                            />
                            <div>
                                <p className="text-sm font-bold text-text-primary">{user.fullname}</p>
                                <p className="text-xs text-text-secondary capitalize">{user.role?.replace('_', ' ')}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;