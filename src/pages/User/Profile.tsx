import { FaUser, FaEnvelope, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProfile } from "./hooks/useProfile";
import ProfileHeader from "./ui/ProfileHeader";
import RoleActions from "./ui/RoleActions";
interface InfoProps {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
}

const Profile = () => {
    const { 
        user, currentRole, isLoadingState, isLogoutOpen, setIsLogoutOpen, 
        isDeleteOpen, setIsDeleteOpen, confirmExit, handleDeleteClick, 
        processAccountDeletion
    } = useProfile();

    if (isLoadingState) return <div className="min-h-screen flex justify-center items-center font-bold text-text-muted bg-surface">Loading Profile...</div>;
    const addr = user?.address?.[0];
    const fullAddress = addr ? `${addr.street}, ${addr.city}, ${addr.governorate}` : "Not provided";
    const profilePic = user?.profile_pic || user?.image || "";

    return (
        <div className="min-h-screen bg-surface pb-16 font-sans text-left">
            <div className="max-w-6xl mx-auto px-4 pt-8">
                
                <ProfileHeader name={user?.fullname || ""} role={currentRole} pic={profilePic} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-background rounded-4xl shadow-sm p-8 border border-border-light flex flex-col">
                        <h2 className="text-xl font-black text-text-primary mb-1">Personal Details</h2>
                        <p className="text-text-muted text-sm mb-8 pb-6 border-b border-border-light">Keep your profile information up to date</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 flex-1">
                            <InfoItem icon={FaUser} label="Full Name" value={user?.fullname || ""} />
                            <InfoItem icon={FaEnvelope} label="Email" value={user?.email || ""} />
                            <InfoItem icon={FiPhone} label="Phone" value={user?.phone || "Not provided"} />
                            <InfoItem icon={FaMapMarkerAlt} label="Address" value={fullAddress} />
                        </div>
                        
                        <div className="mt-8 pt-4">
                            <Link to="/auth/change-password" className="text-primary font-bold text-sm hover:underline">Change Password</Link>
                        </div>
                    </div>
                    <div>
                        <RoleActions 
                            role={currentRole} 
                            onLogout={() => setIsLogoutOpen(true)} 
                            favoritesCount={user?.favoritesCount}
                            reviewsCount={user?.reviewsCount}
                        />
                        <button onClick={handleDeleteClick} className="w-full bg-danger text-white py-4 rounded-3xl font-bold text-lg hover:bg-danger/90 transition mt-4 flex items-center justify-center gap-2">
                            <FaTrash size={16} /> Delete Account
                        </button>
                    </div>
                </div>
            </div>
            {isLogoutOpen && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="bg-background rounded-4xl p-8 max-w-md w-full text-center border border-border-light shadow-2xl">
                        <h2 className="text-2xl font-black text-text-primary mb-3">Sign Out?</h2>
                        <p className="text-text-muted mb-8">Are you sure you want to leave?</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsLogoutOpen(false)} className="flex-1 py-3.5 border border-border-light rounded-xl font-bold text-text-secondary hover:bg-surface transition">Cancel</button>
                            <button onClick={confirmExit} className="flex-1 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition">Logout</button>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteOpen && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="bg-background rounded-4xl p-8 max-w-md w-full text-center border border-border-light shadow-2xl">
                        <div className="text-danger mb-4"><FaTrash size={40} className="mx-auto" /></div>
                        <h2 className="text-2xl font-black text-text-primary mb-3">Delete Restaurant Permanently?</h2>
                        <p className="text-text-muted mb-8 text-sm">You are about to delete your account and all your restaurant data. Are you absolutely sure about this decision?</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={processAccountDeletion} className="w-full py-3.5 bg-danger text-white rounded-xl font-bold hover:bg-danger/90 transition">Yes, delete my restaurant & account</button>
                            <button onClick={() => setIsDeleteOpen(false)} className="w-full py-3.5 border border-border-light rounded-xl font-bold text-text-secondary hover:bg-surface transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
const InfoItem = ({ icon: Icon, label, value }: InfoProps) => (
    <div className="flex items-start gap-4 text-left">
        <div className="bg-surface p-3.5 rounded-xl text-text-secondary border border-border-light/50"><Icon size={20} /></div>
        <div><p className="text-sm font-bold text-text-primary mb-1">{label}</p><p className="text-sm text-text-secondary">{value}</p></div>
    </div>
);

export default Profile;