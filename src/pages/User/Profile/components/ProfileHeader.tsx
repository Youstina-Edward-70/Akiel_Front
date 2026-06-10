import { BsForkKnife } from "react-icons/bs";
import { IoCameraOutline, IoAddCircleOutline, IoEyeOutline, IoNotificationsOutline, IoCloudUploadOutline, IoAlertCircleOutline } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "../../../../ui/Button";
import type { User } from "../../../../types/UserSchema";

interface ProfileHeaderProps {
    avatarUrl?: string;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTriggerFileInput: () => void;
    isUploading: boolean;
    uploadError: string | null;
    user: User | undefined;
    restId: string;
}

export const ProfileHeader = ({
    avatarUrl,
    fileInputRef,
    handleAvatarChange,
    handleTriggerFileInput,
    isUploading,
    uploadError,
    user,
    restId
}: ProfileHeaderProps) => {
    const navigate = useNavigate();

    return (
        <header className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 mb-8 relative overflow-hidden">
            <div className="absolute right-8 -bottom-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <BsForkKnife size={200} />
            </div>
            <div className="relative group">
                <img
                    src={avatarUrl}
                    alt={user?.fullname}
                    className={`w-24 h-24 md:w-30 md:h-30 rounded-full object-cover border-2 border-gray-100 shadow-xl shrink-0 transition-opacity ${isUploading ? 'opacity-50' : 'opacity-100'}`}
                />

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={isUploading}
                />

                <Button
                    type="button"
                    onClick={handleTriggerFileInput}
                    disabled={isUploading}
                    className="absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center"
                >
                    {isUploading ? (
                        <IoCloudUploadOutline className="text-sm animate-bounce" />
                    ) : (
                        <IoCameraOutline className="text-sm" />
                    )}
                </Button>
            </div>

            {uploadError && (
                <p className="text-xs text-danger font-medium bg-red-50 px-3 py-1 rounded-full flex items-center gap-1">
                    <IoAlertCircleOutline /> {uploadError}
                </p>
            )}

            <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">{user?.fullname}</h1>
                    <p className="text-gray-500 capitalize">{user?.role}</p>
                </div>
                {user && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <Button
                            className="px-6 py-2.5 text-sm rounded-2xl font-bold flex items-center gap-2"
                            onClick={() => navigate(`/profile/edit/${user._id}`)}
                        >
                            <IoMdCreate size={16} /> Edit Profile
                        </Button>
                        {!user.isRestaurantOwner && user.role !== "admin" && (
                            <Button variant="secondary" className="px-6 py-2.5 text-sm rounded-2xl font-bold flex items-center gap-2" onClick={() => navigate('/add-restaurant')}>
                                <IoAddCircleOutline size={20} /> Add a new restaurant
                            </Button>
                        )}
                        {user.isRestaurantOwner && user.role === "user" && (
                            <>
                                <Button
                                    variant="secondary"
                                    className="px-6 py-2.5 text-sm rounded-2xl font-bold flex items-center gap-2"
                                    onClick={() => navigate(`/my-dashboard/${restId}`)}
                                >
                                    <IoEyeOutline size={20} /> View my restaurant
                                </Button>
                                <Button
                                    variant="normal"
                                    className="bg-blue-500 text-white hover:bg-blue-400 shadow-md shadow-blue-100 px-6 py-2.5 text-sm rounded-2xl font-bold flex items-center gap-2"
                                    onClick={() => navigate(`/my-notifications`)}
                                >
                                    <IoNotificationsOutline size={20} /> My notifications
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};