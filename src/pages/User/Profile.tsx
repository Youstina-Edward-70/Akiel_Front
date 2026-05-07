import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { useNavigate, Link } from "react-router-dom";
import { 
    FaHeart, FaStar, FaEdit, FaSignOutAlt, FaChevronRight, 
    FaCamera, FaPlus, FaTrash, FaRegUser, FaRegEnvelope, FaMapMarkerAlt 
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import toast from "react-hot-toast";
import { type IconType } from "react-icons";

const API_URL = "https://all-restaurants-in-one.vercel.app";

// دالة معالجة الصور لضمان عدم ظهور صورة مكسورة
const getValidImageUrl = (url: any) => {
    if (!url || typeof url !== 'string' || url === "undefined" || url === "null" || url === "/default-avatar.png") return "/default-avatar.png";
    if (url.startsWith("http") || url.startsWith("blob:") || url.startsWith("data:")) return url;
    return `${API_URL}/${url.replace(/^\/+/, '')}`;
};

const Profile = () => {
    const authUser = useAuthStore((state) => state.user);
    const updateUserAuth = useAuthStore((state) => (state as any).updateUser);
    const { profile, updateProfile, clearProfile } = useUserStore();
    
    const safeProfile = profile as any;
    const safeAuthUser = authUser as any;
    
    const token = (useAuthStore.getState() as any).token || safeAuthUser?.Token || safeAuthUser?.token;
    const userId = safeAuthUser?._id || safeAuthUser?.id;

    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // ================= الحل الجذري لاختفاء البيانات =================
    // جلب أحدث بيانات من السيرفر فور فتح الصفحة
    useEffect(() => {
        const fetchLatestProfile = async () => {
            if (!token || !userId) return;
            try {
                const response = await fetch(`${API_URL}/user/profile/${userId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    // تحديث المخازن بالبيانات الجديدة الحقيقية من الداتابيز
                    updateProfile(data);
                    if (typeof updateUserAuth === "function") updateUserAuth(data);
                }
            } catch (error) {
                console.error("Failed to sync profile:", error);
            }
        };
        fetchLatestProfile();
    }, [token, userId, updateProfile, updateUserAuth]);
    // ==========================================================

    const currentFullName = safeProfile?.fullname || safeAuthUser?.fullname || "";
    const currentEmail = safeProfile?.email || safeAuthUser?.email || "";
    const currentPhone = safeProfile?.phone || safeAuthUser?.phone || "";
    const currentAddress = safeProfile?.address?.[0] || safeAuthUser?.address?.[0] || { governorate: "", city: "", street: "", details: "" };
    
    const currentPic = getValidImageUrl(selectedImage || safeProfile?.profile_pic || safeAuthUser?.profile_pic || safeAuthUser?.image);

    const fullAddress = [currentAddress?.street, currentAddress?.city, currentAddress?.governorate]
        .filter(Boolean)
        .join(", ");

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const toastId = toast.loading("Uploading photo...");
        try {
            const response = await fetch(`${API_URL}/user/uploadProfilePhoto`, {
                method: "PATCH",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                const photoData = await response.json();
                const newPic = photoData?.profile_pic || photoData?.user?.profile_pic || URL.createObjectURL(file);
                
                setSelectedImage(newPic);
                updateProfile({ profile_pic: newPic }); 
                
                const updatedUser = { ...safeAuthUser, profile_pic: newPic, image: newPic };
                if (typeof updateUserAuth === "function") {
                    updateUserAuth(updatedUser);
                } else {
                    useAuthStore.setState({ user: updatedUser });
                }

                toast.success("Profile picture updated!", { id: toastId });
            } else {
                toast.error("Failed to upload image", { id: toastId });
            }
        } catch (error) {
            toast.error("Network error", { id: toastId });
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to permanently delete your account?")) return;
        try {
            const response = await fetch(`${API_URL}/user/deleteAccount/${userId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                toast.success("Account deleted successfully");
                clearProfile();
                logout();
                navigate("/auth/login");
            } else {
                toast.error("Failed to delete account");
            }
        } catch (error) {
            toast.error("Network error");
        }
    };

    const handleConfirmLogout = () => {
        clearProfile();
        logout();
        setShowLogoutModal(false);
        toast.success("Logged out successfully");
        navigate("/auth/login");
    };

    return (
        <div className="min-h-screen bg-surface pb-16 font-sans">
            <div className="max-w-6xl mx-auto px-4 pt-8">
                
                {/* Profile Card */}
                <div className="bg-background rounded-[2rem] p-8 shadow-sm border border-border-light relative overflow-hidden mb-8">
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden md:block">
                        <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2V9C11 10.6569 9.65685 12 8 12V22H6V12C4.34315 12 3 10.6569 3 9V2H4.5V8.5H5.5V2H7V8.5H8V2H9.5V8.5H10.5V2H11ZM21 2C21 8 18 10 18 12V22H16V12C16 10 16 6 16 2H21Z" /></svg>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 text-left relative z-10">
                        <div className="relative">
                            <div className="w-36 h-36 rounded-full p-2 bg-[#FDEADD] overflow-hidden flex items-center justify-center">
                                <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-sm border-2 border-white">
                                    <img src={currentPic} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                            <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 bg-primary p-2.5 rounded-full text-white shadow-lg hover:bg-primary-hover transition-colors border-2 border-white">
                                <FaCamera size={14} />
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-heading font-black text-text-primary mb-1">{currentFullName || "User"}</h1>
                            <p className="text-text-secondary font-medium mb-6">User Account</p>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <Link to="/profile/edit" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-primary-hover transition shadow-sm">
                                    <FaEdit size={16} /> Edit Profile
                                </Link>
                                <Link to="/add-restaurant" className="bg-slate-500 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-slate-600 transition shadow-sm">
                                    <FaPlus size={16} /> Add a new restaurant
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                    <div className="lg:col-span-2 bg-background rounded-[2rem] shadow-sm p-8 border border-border-light relative flex flex-col">
                        <h2 className="text-xl font-heading font-black text-text-primary mb-1">Personal Details</h2>
                        <p className="text-text-muted text-sm mb-8 pb-6 border-b border-border-light">Keep your profile information up to date</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 flex-1">
                            <DetailItem icon={FaRegUser} label="Full Name" value={currentFullName} />
                            <DetailItem icon={FaRegEnvelope} label="Email" value={currentEmail} />
                            <DetailItem icon={FiPhone} label="Phone" value={currentPhone || "Not provided"} />
                            <DetailItem icon={FaMapMarkerAlt} label="Address" value={fullAddress || "Not provided"} />
                        </div>

                        <div className="mt-8 pt-4">
                            <Link to="/change-password" className="text-primary font-bold text-sm hover:underline">Change Password</Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <ProfileLink icon={FaHeart} title="My Favorites" subtitle={`${safeAuthUser?.favoritesCount || 0} Saved`} to="/favorites" iconColor="text-primary" iconBg="bg-primary-light" />
                        <ProfileLink icon={FaStar} title="My Reviews" subtitle={`${safeAuthUser?.reviewsCount || 0} Reviews`} to="/reviews" iconColor="text-orange-500" iconBg="bg-orange-50" />

                        <button onClick={() => setShowLogoutModal(true)} className="w-full bg-background p-5 rounded-[1.5rem] shadow-sm border border-border-light flex items-center gap-4 hover:shadow-md transition-all group">
                            <div className="bg-surface p-3.5 rounded-xl text-text-muted group-hover:text-primary transition-colors"><FaSignOutAlt size={20} /></div>
                            <div className="flex-1 text-left"><h4 className="font-black text-text-primary">Logout</h4><p className="text-xs text-text-muted font-medium">Securely sign out</p></div>
                            <FaChevronRight className="text-border-light" />
                        </button>

                        <button onClick={handleDeleteAccount} className="w-full bg-primary text-white py-4 rounded-[1.5rem] font-bold text-lg hover:bg-primary-hover transition-all mt-4 flex items-center justify-center gap-2"><FaTrash size={16} /> Delete Account</button>
                    </div>
                </div>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="bg-background rounded-[2rem] p-8 max-w-md w-full shadow-2xl text-center border border-border-light">
                        <div className="bg-primary-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"><FaSignOutAlt size={28} /></div>
                        <h2 className="text-2xl font-black text-text-primary mb-3">Are you sure?</h2>
                        <p className="text-text-muted mb-8 text-sm">You will need to login again to access your account.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-3.5 border border-border-light rounded-xl font-bold text-text-secondary hover:bg-surface transition">Cancel</button>
                            <button onClick={handleConfirmLogout} className="flex-1 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition">Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DetailItem = ({ icon: Icon, label, value }: { icon: IconType, label: string, value: string }) => (
    <div className="flex items-start gap-4">
        <div className="bg-surface p-3.5 rounded-xl text-text-secondary border border-border-light/50"><Icon size={20} /></div>
        <div><p className="text-sm font-bold text-text-primary mb-1">{label}</p><p className="text-sm text-text-secondary">{value}</p></div>
    </div>
);

const ProfileLink = ({ icon: Icon, title, subtitle, to, iconColor, iconBg }: any) => (
    <Link to={to} className="bg-background p-5 rounded-[1.5rem] shadow-sm border border-border-light flex items-center gap-4 hover:shadow-md transition-all group text-left">
        <div className={`p-3.5 rounded-xl transition-transform group-hover:scale-105 ${iconBg} ${iconColor}`}><Icon size={20} /></div>
        <div className="flex-1"><h4 className="font-black text-text-primary">{title}</h4><p className="text-xs text-text-muted font-medium">{subtitle}</p></div>
        <FaChevronRight className="text-border-light" />
    </Link>
);

export default Profile;