import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart, FaStar, FaEdit, FaSignOutAlt, FaChevronRight, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { type IconType } from "react-icons";

interface ProfileInputs {
    fullname: string;
    email: string;
    address: {
        governorate: string;
        city: string;
        street: string;
        details: string;
    };
}

const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const { register } = useForm<ProfileInputs>({
        defaultValues: {
            fullname: user?.fullname || "",
            email: user?.email || '',
            address: {
                governorate: user?.address?.[0]?.governorate || "",
                city: user?.address?.[0]?.city || "",
                street: user?.address?.[0]?.street || "",
                details: user?.address?.[0]?.details || ""
            }
        }
    });

    const handleConfirmLogout = () => {
        logout();
        setShowLogoutModal(false);
        toast.success("Logged out successfully");
        navigate("/auth/login");
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
            {/* Top Section */}
            <div className="bg-background rounded-[2.5rem] shadow-sm p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden mb-10 border border-border-light/20 text-left">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full p-1 bg-primary-light">
                        <img
                            src={user?.profile_pic === "default.png" || !user?.profile_pic ? "/default-avatar.png" : user?.profile_pic}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl font-extrabold text-text-primary mb-1">{user?.fullname}</h1>
                    <p className="text-text-secondary text-sm mb-4">{user?.email}</p>

                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                            <FaHeart /> {user?.favoritesCount || 0} Favorites
                        </span>
                        <span className="bg-orange-50 text-orange-500 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                            <FaStar /> {user?.reviewsCount || 0} Reviews
                        </span>
                        <span className="bg-green-50 text-success px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 italic">
                            <FaCheckCircle /> Verified
                        </span>
                    </div>

                    <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-hover transition shadow-md shadow-primary/10 flex items-center gap-2">
                        <FaEdit size={14} /> Edit Profile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left mb-16">
                {/* Account Info Form */}
                <div className="lg:col-span-2 bg-background rounded-4xl shadow-sm p-8 border border-border-light/20">
                    <h2 className="text-xl font-bold mb-8 text-text-primary flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full"></span>
                        Account Information
                    </h2>

                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text-secondary uppercase ml-1">Full Name</label>
                                <input {...register("fullname")} className="w-full bg-surface border border-border-light/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-primary/20 text-black font-semibold transition" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text-secondary uppercase ml-1">Email Address</label>
                                <input {...register("email")} className="w-full bg-surface border border-border-light/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-primary/20 text-black font-semibold transition" />
                            </div>
                        </div>

                        <div className="pt-4 space-y-6">
                            <h3 className="text-md font-bold text-text-primary italic border-b border-border-light/10 pb-2 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-primary/50" size={14} /> Location Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-secondary ml-1">Governorate</label>
                                    <input {...register("address.governorate")} placeholder="e.g. Qena" className="w-full bg-surface border border-border-light/10 rounded-2xl p-4 text-black font-semibold outline-none focus:ring-primary/20 transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-secondary ml-1">City</label>
                                    <input {...register("address.city")} placeholder="e.g. Qena City" className="w-full bg-surface border border-border-light/10 rounded-2xl p-4 text-black font-semibold outline-none focus:ring-primary/20 transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-secondary ml-1">Street</label>
                                    <input {...register("address.street")} placeholder="Street name" className="w-full bg-surface border border-border-light/10 rounded-2xl p-4 text-black font-semibold outline-none focus:ring-primary/20 transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-secondary ml-1">Details</label>
                                    <input {...register("address.details")} placeholder="Building, Floor..." className="w-full bg-surface border border-border-light/10 rounded-2xl p-4 text-black font-semibold outline-none focus:ring-primary/20 transition" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-4">
                    <ProfileLink icon={FaHeart} title="My Favorites" subtitle={`${user?.favoritesCount || 0} saved`} to="/favorites" iconColor="text-primary" />
                    <ProfileLink icon={FaStar} title="My Reviews" subtitle={`${user?.reviewsCount || 0} published`} to="/reviews" iconColor="text-orange-400" />

                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full bg-background p-6 rounded-3xl shadow-sm border border-border-light/20 flex items-center gap-4 hover:bg-surface transition group"
                    >
                        <div className="bg-info/10 p-3 rounded-xl text-info group-hover:bg-info group-hover:text-white transition">
                            <FaSignOutAlt />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-bold text-text-primary">Logout</h4>
                            <p className="text-xs text-text-muted italic">Securely sign out</p>
                        </div>
                        <FaChevronRight className="text-border-light" />
                    </button>
                </div>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full mx-4 shadow-2xl text-center">
                        <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaSignOutAlt className="text-primary text-3xl rotate-180" />
                        </div>
                        <h2 className="text-2xl font-black text-text-primary mb-3">Are you sure?</h2>
                        <div className="flex gap-4">
                            <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-4 border rounded-2xl font-bold">Cancel</button>
                            <button onClick={handleConfirmLogout} className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold">Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfileLink = ({ icon: Icon, title, subtitle, to, iconColor }: { icon: IconType; title: string, subtitle: string, to: string, iconColor?: string }) => (
    <Link to={to} className="bg-background p-6 rounded-3xl shadow-sm border border-border-light/20 flex items-center gap-4 hover:bg-surface transition group text-left">
        <div className={`bg-surface p-3 rounded-xl group-hover:bg-background transition border border-transparent group-hover:border-border-light/50 ${iconColor}`}>
            <Icon />
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-text-primary">{title}</h4>
            <p className="text-[11px] text-text-muted font-medium">{subtitle}</p>
        </div>
        <span className="text-primary font-bold text-[10px] uppercase tracking-tighter">View All</span>
    </Link>
);

export default Profile;