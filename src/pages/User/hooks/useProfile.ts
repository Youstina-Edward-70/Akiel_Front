import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { useUserStore } from "../../../store/userStore";
import toast from "react-hot-toast";
import axiosInstance from "../../../lib/api";

interface ProfileUser {
    _id?: string; id?: string; role?: string; fullname?: string; email?: string;
    phone?: string; profile_pic?: string; image?: string;
    address?: { governorate: string; city: string; street: string; details: string; }[];
    favoritesCount?: number; reviewsCount?: number;
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
interface ProfileResponse {
    data: { user?: ProfileUser; Data?: ProfileUser };
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

    useEffect(() => {
        if (sessionToken && userId) {
            const handleDataArrival = (res: ProfileResponse) => {
                const actualData = res.data.user || res.data.Data;
                if (actualData) {
                    userStore.updateProfile(actualData);
                }
                setLoadingState(false);
            };
            const handleDataFailure = () => {
                setLoadingState(false);
            };
            axiosInstance.get(`/user/profile/${userId}`, {
                headers: { "Authorization": `Bearer ${sessionToken}` }
            }).then(handleDataArrival, handleDataFailure);
        }
    }, [userId, sessionToken, userStore]);
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