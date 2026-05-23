import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { useUserStore } from "../../../store/userStore";
import toast from "react-hot-toast";
import axiosInstance from "../../../lib/api";

interface ProfileUser {
    _id?: string; 
    id?: string; 
    role?: string; 
    fullname?: string; 
    email?: string;
    phone?: string; 
    profile_pic: {
        url: string;
        publicId?: string | null | undefined;
        _id?: string | undefined;
    } | null;
    image?: string;
    address?: { governorate: string; city: string; street: string; details: string; }[];
    favoritesCount?: number; 
    reviewsCount?: number; 
    restaurantId?: string;
}
interface AuthStoreType {
    user: ProfileUser | null;
    token: string | null;
    logout: () => void;
    updateUser: (u: ProfileUser) => void;
}
interface UserStoreType {
    profile: ProfileUser | null;
    updateProfile: (p: ProfileUser) => void;
    clearProfile: () => void;
}

export const useProfile = () => {
    const navigate = useNavigate();
    const authStore = useAuthStore() as unknown as AuthStoreType;
    const userStore = useUserStore() as unknown as UserStoreType;
    const userObj = authStore.user;
    const sessionToken = authStore.token || (userObj as unknown as { Token?: string })?.Token;
    const userId = userObj?._id || userObj?.id;
    const currentRole = userObj?.role?.toLowerCase() || "user";
    const [isLoadingState, setLoadingState] = useState<boolean>(!!(sessionToken && userId));
    const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    const updateProfile = userStore.updateProfile;

    useEffect(() => {
        if (!sessionToken || !userId) return;

        let isMounted = true;

        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get(`/user/getUserProfile/${userId}`, {
                    headers: { "Authorization": `Bearer ${sessionToken}` }
                });
                
                const actualData = res.data.user || res.data.Data;
                if (isMounted && actualData) {
                    updateProfile(actualData);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                if (isMounted) setLoadingState(false);
            }
        };

        fetchProfile();
        return () => { isMounted = false; };
    }, [userId, sessionToken, updateProfile]);
    
    const confirmExit = () => {
        userStore.clearProfile();
        authStore.logout();
        setIsLogoutOpen(false);
        navigate("/auth/login");
    };
    const processAccountDeletion = () => {
        const handleDelSuccess = () => {
            toast.success("Account deleted");
            userStore.clearProfile();
            authStore.logout();
            navigate("/auth/login");
        };
        const handleDelFailure = () => { 
            toast("Deletion failed", { icon: "❌" }); 
        };
        axiosInstance.delete(`/user/deleteAccount/${userId}`, {
            headers: { "Authorization": `Bearer ${sessionToken}` }
        }).then(handleDelSuccess, handleDelFailure);
    };
    const handleDeleteClick = () => {
        if (currentRole === "owner") {
            setIsDeleteOpen(true);
        } else {
            if (window.confirm("Are you sure you want to delete your account?")) {
                processAccountDeletion();
            }
        }
    };
    return {
        user: userObj,
        currentRole,
        isLoadingState,
        isLogoutOpen, setIsLogoutOpen,
        isDeleteOpen, setIsDeleteOpen,
        confirmExit,
        handleDeleteClick,
        processAccountDeletion,
        navigate
    };
};