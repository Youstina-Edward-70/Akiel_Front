import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { useUserStore } from "../../../store/userStore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../../lib/api";

interface EditFormInput { fullname: string; email: string; phone: string; address: { governorate: string; city: string; street: string; details: string; }; }
interface StoreUser { _id?: string; id?: string; Token?: string; token?: string; fullname?: string; email?: string; phone?: string; 
    profile_pic: {
        url: string;
        publicId?: string | null | undefined;
        _id?: string | undefined;
    } | null;
    image?: string; address?: { governorate: string; city: string; street: string; details: string; }[]; }
interface FailureResponse { response?: { data?: { message?: string } } }

export const useEditProfile = () => {
    const navigate = useNavigate();
    const authStore = useAuthStore() as unknown as { user: StoreUser | null; token: string | null; updateUser: (u: StoreUser) => void };
    const userStore = useUserStore() as unknown as { profile: StoreUser | null; updateProfile: (u: StoreUser) => void };
    const authUser = authStore.user;
    const sessionToken = authStore.token || authUser?.Token || authUser?.token;
    const userId = authUser?._id || authUser?.id;
    const safeProfile = userStore.profile;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const currentFullName = safeProfile?.fullname || authUser?.fullname || "";
    const currentEmail = safeProfile?.email || authUser?.email || "";
    const currentPhone = safeProfile?.phone || authUser?.phone || "";
    const currentAddress = safeProfile?.address?.[0] || authUser?.address?.[0] || { governorate: "", city: "", street: "", details: "" };
    const currentPic = selectedImage || safeProfile?.profile_pic?.url || authUser?.profile_pic?.url || authUser?.image || "/default-avatar.png";
    const formMethods = useForm<EditFormInput>({
        defaultValues: { fullname: currentFullName, email: currentEmail, phone: currentPhone, address: currentAddress }
    });
    const { register, handleSubmit } = formMethods;
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { setImageFile(file); setSelectedImage(URL.createObjectURL(file)); }
    };
    const saveProfileData = (formDataPayload: EditFormInput) => {
        if (!userId || !sessionToken) { toast("Session expired", { icon: "⚠️" }); return; }
        const toastId = toast.loading("Updating profile...");

        const finishUpdate = (finalImgUrl: string) => {
            const newUserData = {
                ...authUser, fullname: formDataPayload.fullname, email: formDataPayload.email,
                phone: formDataPayload.phone, address: [formDataPayload.address],
                profile_pic: { url: finalImgUrl }, image: finalImgUrl
            };
            userStore.updateProfile(newUserData);
            if (typeof authStore.updateUser === "function") authStore.updateUser(newUserData);

            toast.success("Profile updated successfully!", { id: toastId });
            setTimeout(() => navigate("/profile"), 500);
        };
        const handleFault = (faultObj?: FailureResponse) => {
            toast(faultObj?.response?.data?.message || "Operation failed", { id: toastId, icon: "❌" });
        };
        const updatePayload = {
            fullname: formDataPayload.fullname, email: formDataPayload.email,
            phone: formDataPayload.phone, address: formDataPayload.address
        };
        axiosInstance.patch(`/user/editUserProfile/${userId}`, updatePayload, { headers: { "Authorization": `Bearer ${sessionToken}` } })
        .then(() => {
            if (imageFile) {
                const fd = new FormData(); fd.append("image", imageFile);
                axiosInstance.patch(`/user/uploadProfilePhoto`, fd, { headers: { "Authorization": `Bearer ${sessionToken}` } })
                .then((res: { data: { profile_pic?: string; image?: string; user?: { profile_pic?: string } } }) => {
                    let srvUrl = res.data?.profile_pic || res.data?.user?.profile_pic || res.data?.image;
                    if (typeof srvUrl === 'object' && srvUrl !== null) {
                        srvUrl = (srvUrl as { url?: string; path?: string }).url || (srvUrl as { url?: string; path?: string }).path;
                    }
                    const finalImgUrl = typeof srvUrl === 'string' ? `${srvUrl}?t=${new Date().getTime()}` : URL.createObjectURL(imageFile);
                    finishUpdate(finalImgUrl);
                }, handleFault);
            } else {
                finishUpdate(authUser?.profile_pic?.url || "/default-avatar.png");
            }
        }, handleFault);
    };
    
    return { register, handleSubmit, saveProfileData, onImageChange, currentPic, currentFullName, navigate };
};