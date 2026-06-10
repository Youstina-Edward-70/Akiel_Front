import { useAuthStore } from "../../../store/authStore";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { updateAccountSchema, type UpdateAccountFormData, type User } from "../../../types/UserSchema";
import toast from "react-hot-toast";

export const useEditProfile = () => {
    const { id: userId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const updateUser = useAuthStore((state) => state.updateUser);

    // Fetch user date
    const { data: user, isLoading, error } = useQuery<User>({
        queryKey: ['userProfile', userId],
        queryFn: async () => {
            if (!userId) throw new Error("User ID is required");
            const { data } = await axiosInstance.get(API_ENDPOINTS.USER.PROFILE(userId));
            return data.user || data.Date;
        },
        enabled: !!userId,
    });

    // Photo mutation
    const uploadPhotoMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);

            const { data } = await axiosInstance.patch(
                API_ENDPOINTS.USER.UPLOAD_PHOTO,
                formData
            );
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['userProfile', userId] });

            const updatedProfilePic = data?.user?.profile_pic || data?.profile_pic || data?.data?.profile_pic;
            if (updatedProfilePic) {
                updateUser({ profile_pic: updatedProfilePic });
                toast.success("Profile photo updated successfully!");
            }
        },
        onError: (error: AxiosError<ApiError>) => {
            const errorMsg = error.response?.data?.message || "Failed to upload photo";
            toast.error(errorMsg);
        }
    });

    // Form for validation
    const form = useForm<UpdateAccountFormData>({
        resolver: zodResolver(updateAccountSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phone: "",
            address: { details: "", street: "", city: "", governorate: "" },
        },
    });

    // Display the data 
    useEffect(() => {
        if (user) {
            form.reset({
                fullname: user.fullname || "",
                email: user.email || "",
                phone: user.phone || "",
                address: {
                    details: user.address?.details || "",
                    street: user.address?.street || "",
                    city: user.address?.city || "",
                    governorate: user.address?.governorate || "",
                },
            });
        }
    }, [user, form]);

    // Update Account mutation
    const { mutate: updateAccount, isPending } = useMutation({
        mutationFn: async (formData: UpdateAccountFormData) => {
            if (!userId) throw new Error("User ID is required to update the account");
            const {data} = await axiosInstance.patch(
                API_ENDPOINTS.USER.EDIT_PROFILE(userId),
                formData
            );
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['userProfile', userId] });
            
            const updatedUser = data?.user || data?.data || data;
            if (updatedUser) {
                updateUser(updatedUser);
            }
            toast.success("Profile details updated successfully!");
            navigate("/profile");
        },
        onError: (error: AxiosError<ApiError>) => {
            const errorMsg = error?.response?.data?.message || error?.response?.data?.error || "Failed to update profile";
            toast.error(errorMsg);
        }
    });

    const onSubmit = form.handleSubmit((data) => {
        console.log(data);
        
        updateAccount(data)
    });

    // Avatar helper functions
    const avatarUrl = (() => {
        const pic = user?.profile_pic;
        const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullname || "User")}`;
        if (!pic) return fallback;
        if (typeof pic === "object" && "url" in pic && pic.url) return pic.url;
        return fallback;
    })();

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            uploadPhotoMutation.mutate(file);
        }
    };

    const handleTriggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return {
        user,
        isLoading,
        error,

        avatarUrl,
        fileInputRef,
        handleAvatarChange,
        handleTriggerFileInput,
        isUploading: uploadPhotoMutation.isPending,
        uploadError: (uploadPhotoMutation.error as AxiosError<ApiError>)?.response?.data?.message || null,

        form,
        isPending,
        onSubmit,
        navigate
    };
};