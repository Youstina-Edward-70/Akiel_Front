import { NavLink, Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore";
import Button from "../ui/Button";

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const activeLink = ({ isActive }: { isActive: boolean }) => 
        `transition ${isActive ? "text-primary font-bold" : "text-text-primary hover:text-primary/90"}`;

    return (
        <nav className="bg-white shadow w-full top-0 left-0 z-10 sticky">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/Logo.svg" alt="Logo" className="h-8 w-auto" />
                        </Link>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex justify-between items-center">
                    <div className="hidden md:flex space-x-8">
                        <NavLink to="/" className={activeLink}>
                            Home
                        </NavLink>
                        {user?.role === 'restaurant_owner' && (
                            <NavLink to="/my-restaurant" className={activeLink}>
                                My Restaurant
                            </NavLink>
                        )}
                        <NavLink to="/search" className={activeLink}>
                            Restaurants
                        </NavLink>
                        <NavLink to="/about" className={activeLink}>
                            About Us
                        </NavLink>
                    </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link to="/auth/login" className="px-4 py-2 text-text-primary hover:text-primary/90 transition">
                                Sign In
                            </Link>
                            <Button  onClick={() => navigate('/auth/signup')}
                                className="px-5 py-1.5 rounded-full">
                                Join
                            </Button>
                        </>
                    ) : (
                        <Link to="/profile" className="flex items-center gap-3 group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-text-primary group-hover:text-primary transition">
                                    {user.fullname}
                                </p>
                                <p className="text-xs text-text-secondary font-bold capitalize">{user.role.replace('_', ' ')}</p>
                            </div>
                            <img
                                src={user.profile_pic? user.profile_pic : `https://ui-avatars.com/api/?name=${user.fullname}`}
                                alt="Profile"
                                className="rounded-full border-2 border-border-light w-10 h-10 object-cover p-0.5"
                            />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;