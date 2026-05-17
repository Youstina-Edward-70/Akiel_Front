import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useMyRestaurant } from "../pages/Owner/hooks/useMyRestaurant";
import Button from "../ui/Button";

const API_URL = "https://all-restaurants-in-one.vercel.app";

type ImageUrlType = string | null | undefined;

const getValidImageUrl = (url: ImageUrlType) => {
    if (!url || typeof url !== 'string' || url === "undefined" || url === "null" || url === "/default-avatar.png") return null;
    if (url.startsWith("http") || url.startsWith("blob:") || url.startsWith("data:")) return url;
    return `${API_URL}/${url.replace(/^\/+/, '')}`;
};
interface NavbarUser {
    fullname?: string;
    role?: string;
    profile_pic?: string;
}

const Navbar = () => {
    const authStoreState = useAuthStore() as unknown as { user: NavbarUser | null };
    const user = authStoreState.user;
    const navigate = useNavigate();
    const { data: myRestaurant } = useMyRestaurant();
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

                <div className="flex justify-between items-center">
                    <div className="hidden md:flex space-x-8">
                        <NavLink to="/" className={activeLink}>
                            Home
                        </NavLink>
                        {myRestaurant && (
                            <NavLink to={`/restaurant/${myRestaurant._id}`} className={activeLink}>
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

                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link to="/auth/login" className="px-4 py-2 text-text-primary hover:text-primary/90 transition">
                                Sign In
                            </Link>
                            <Button onClick={() => navigate('/auth/signup')} className="px-5 py-1.5 rounded-full">
                                Join
                            </Button>
                        </>
                    ) : (
                        <Link to="/profile" className="flex items-center gap-3 group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-text-primary group-hover:text-primary transition">
                                    {user.fullname}
                                </p>
                                <p className="text-xs text-text-secondary font-bold capitalize">
                                    {user.role?.replace('_', ' ')}
                                </p>
                            </div>
                            <img
                                src={getValidImageUrl(user.profile_pic) || `https://ui-avatars.com/api/?name=${user.fullname}`}
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