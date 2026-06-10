import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useProfile } from "./useProfile";
import { useEditProfile } from "../EditProfile/useEditProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileDetails } from "./components/ProfileDetails";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { ActionCard } from "./components/ActionCard";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { LogoutPopUp } from "./components/LogoutPopUp";
import { DeleteAccountPopUp } from "./components/DeleteAccountPopUp";
import {
    IoClipboardOutline, IoPeopleOutline,
    IoRestaurantOutline, IoCreateOutline,
    IoHeartOutline, IoStarOutline
} from "react-icons/io5";

const Profile = () => {
    const { user: authUser, logout } = useAuthStore();
    const { data: user, isLoading, deleteAccount, isDeleting, ownerRestaurantId } = useProfile(authUser?.id || "");
    const {
        avatarUrl,
        fileInputRef,
        handleAvatarChange,
        handleTriggerFileInput,
        isUploading,
        uploadError,
    } = useEditProfile();
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    if (isLoading) return <ProfileSkeleton />;

    const renderSidebarButtons = () => {
        if (user?.role === 'admin') return (
            <>
                <ActionCard title="Requests" subtitle="View restaurant requests" icon={IoClipboardOutline} path="/admin/requests" color="text-primary" bg="bg-primary-light" />
                <ActionCard title="All Users" subtitle="View all users" icon={IoPeopleOutline} path="/admin/users" color="text-orange-500" bg="bg-orange-50" />
            </>
        );
        if (user?.role === 'owner') return (
            <>
                <ActionCard title="My Restaurant" subtitle="View my restaurant details" icon={IoRestaurantOutline} path={`/restaurant/${ownerRestaurantId}`} color="text-primary" bg="bg-primary-light" />
                <ActionCard title="Edit Restaurant" subtitle="Update my restaurant info" icon={IoCreateOutline} path={`/edit-restaurant/${ownerRestaurantId}`} color="text-orange-500" bg="bg-orange-50" />
            </>
        );
        return (
            <>
                <ActionCard title="My Favorites" subtitle={`${user?.favoritesCount || 0} Restaurants saved`} icon={IoHeartOutline} path="/favorites" color="text-primary" bg="bg-primary-light" />
                <ActionCard title="My Reviews" subtitle={`${user?.reviewsCount || 0} Reviews Published`} icon={IoStarOutline} path="/reviews" color="text-orange-500" bg="bg-orange-50" />
            </>
        );
    };

    return (
        <section className="max-w-6xl mx-auto py-12 px-4">
            <ProfileHeader
                user={user}
                avatarUrl={avatarUrl}
                fileInputRef={fileInputRef}
                handleAvatarChange={handleAvatarChange}
                handleTriggerFileInput={handleTriggerFileInput}
                isUploading={isUploading}
                uploadError={uploadError}
                restId={ownerRestaurantId}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ProfileDetails user={user} />
                </div>
                <ProfileSidebar
                    renderButtons={renderSidebarButtons}
                    onLogout={() => setIsLogoutOpen(true)}
                    onDelete={() => setIsDeleteOpen(true)}
                />
            </div>
            <LogoutPopUp
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={logout}
            />

            <DeleteAccountPopUp
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={deleteAccount}
                isLoading={isDeleting}
            />
        </section>
    );
};

export default Profile;