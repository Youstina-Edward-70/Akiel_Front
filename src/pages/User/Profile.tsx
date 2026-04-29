import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart, FaStar, FaEdit, FaSignOutAlt, FaChevronRight, FaCamera, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { type IconType } from "react-icons";

interface ProfileInputs {
    fullname: string;
    email: string;
    phone: string;
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
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const { register } = useForm<ProfileInputs>({
        defaultValues: {
            fullname: user?.fullname || "",
            email: user?.email || '',
            phone: user?.phone || '',
            address: {
                governorate: user?.address?.[0]?.governorate || "Cairo",
                city: user?.address?.[0]?.city || "",
                street: user?.address?.[0]?.street || "",
                details: user?.address?.[0]?.details || ""
            }
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            toast.success("Profile picture updated locally");
        }
    };

    const handleConfirmLogout = () => {
        logout();
        setShowLogoutModal(false);
        toast.success("Logged out successfully");
        navigate("/auth/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-16 font-sans">
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex flex-col md:flex-row items-center gap-8 text-left">
                        <div className="relative">
                            <div className="w-36 h-36 rounded-full border-4 border-orange-50 p-1 overflow-hidden bg-gray-100">
                                <img
                                    src={selectedImage || (user?.profile_pic === "default.png" || !user?.profile_pic ? "/default-avatar.png" : user?.profile_pic)}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleImageChange} 
                                className="hidden" 
                                accept="image/*"
                            />
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-2 right-2 bg-[#E31E24] p-2.5 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
                            >
                                <FaCamera size={14} />
                            </button>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-black text-[#1A1A1A] mb-1">{user?.fullname || "User Name"}</h1>
                            <p className="text-gray-400 font-medium mb-4">{user?.email}</p>
                            
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="bg-[#FFF1F2] text-[#E31E24] px-5 py-2 rounded-full text-sm font-black flex items-center gap-2 border border-red-50">
                                    <FaHeart size={14} /> {user?.favoritesCount || 0} Favorites
                                </span>
                                <span className="bg-[#FFF7ED] text-[#F97316] px-5 py-2 rounded-full text-sm font-black flex items-center gap-2 border border-orange-50">
                                    <FaStar size={14} /> {user?.reviewsCount || 0} Reviews
                                </span>
                                <span className="bg-green-50 text-green-600 px-4 py-2 rounded-full text-xs font-bold italic border border-green-100">
                                    Verified
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link 
                                    to="/profile/edit" 
                                    className="bg-[#E31E24] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700 transition shadow-lg shadow-red-100"
                                >
                                    <FaEdit size={16} /> Edit Profile
                                </Link>
                                <Link 
                                    to="/add-restaurant" 
                                    className="bg-[#4B5563] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-700 transition shadow-lg shadow-slate-100"
                                >
                                    <FaPlus size={16} /> Add a new restaurant
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm p-8 border border-gray-100">
                    <h2 className="text-xl font-black text-[#1A1A1A] mb-1">Personal Details</h2>
                    <p className="text-gray-400 text-sm mb-8 font-medium border-b border-gray-50 pb-4">Keep your profile information up to date</p>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-500 uppercase ml-1 block">Full Name</label>
                                <input {...register("fullname")} readOnly className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none font-semibold text-slate-500 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-500 uppercase ml-1 block">Email Address</label>
                                <input {...register("email")} readOnly className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none font-semibold text-slate-500 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-500 uppercase ml-1 block">Phone Number</label>
                                <input {...register("phone")} readOnly className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none font-semibold text-slate-500 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-500 uppercase ml-1 block">Governorate</label>
                                <input {...register("address.governorate")} readOnly className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none font-semibold text-slate-500 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-500 uppercase ml-1 block">City</label>
                                <input {...register("address.city")} readOnly className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none font-semibold text-slate-500 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-500 uppercase ml-1 block">Street</label>
                                <input {...register("address.street")} readOnly className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none font-semibold text-slate-500 cursor-not-allowed" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black text-gray-500 uppercase ml-1 block">Address Details</label>
                                <textarea {...register("address.details")} readOnly className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none font-semibold h-24 resize-none text-slate-500 cursor-not-allowed" />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="space-y-4">
                    <ProfileLink icon={FaHeart} title="My Favorites" subtitle={`${user?.favoritesCount || 0} saved`} to="/favorites" iconColor="bg-red-50 text-[#E31E24]" />
                    <ProfileLink icon={FaStar} title="My Reviews" subtitle={`${user?.reviewsCount || 0} published`} to="/reviews" iconColor="bg-orange-50 text-orange-500" />

                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all group"
                    >
                        <div className="bg-gray-50 p-4 rounded-2xl text-gray-400 group-hover:text-[#E31E24] group-hover:bg-red-50 transition-colors">
                            <FaSignOutAlt size={22} />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-black text-[#1A1A1A]">Logout</h4>
                            <p className="text-xs text-gray-400 font-medium italic">Securely sign out</p>
                        </div>
                        <FaChevronRight className="text-gray-200" />
                    </button>

                    <button className="w-full bg-[#E31E24] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-red-100 hover:bg-red-700 transition-all mt-4">
                        Delete Account
                    </button>
                </div>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl text-center border border-gray-100">
                        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#E31E24]">
                            <div className="bg-red-100 p-3 rounded-xl">
                                <FaSignOutAlt size={28} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-[#1A1A1A] mb-3">Are you sure you want to logout?</h2>
                        <p className="text-gray-500 mb-10 text-sm leading-relaxed px-4 font-medium">
                            You will need to enter your credentials to access the admin dashboard and management tools again.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition">Cancel</button>
                            <button onClick={handleConfirmLogout} className="flex-1 py-4 bg-[#E31E24] text-white rounded-2xl font-black hover:bg-red-700 transition shadow-lg shadow-red-200">Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfileLink = ({ icon: Icon, title, subtitle, to, iconColor }: { icon: IconType; title: string, subtitle: string, to: string, iconColor: string }) => (
    <Link to={to} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all group text-left">
        <div className={`p-4 rounded-2xl transition-transform group-hover:scale-105 ${iconColor}`}>
            <Icon size={22} />
        </div>
        <div className="flex-1">
            <h4 className="font-black text-[#1A1A1A]">{title}</h4>
            <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
        </div>
        <span className="text-[#E31E24] font-black text-xs hover:underline">View All</span>
    </Link>
);

export default Profile;