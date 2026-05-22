import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiImage } from "../../../types/RestaurantSchema";

const useRestaurantPhotos = (restaurantId: string) => {
    const queryClient = useQueryClient();

    // Fetch Photos
    const query = useQuery<ApiImage[]>({
        queryKey: ["restaurant-photos", restaurantId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `${API_ENDPOINTS.DETAILS.GET_BY_ID(restaurantId)}/details?select=gallery`
            );
            return data.Data.Gallery || data.data.Gallery || data.Data.gallery || data.data.gallery || [];
        },
        enabled: !!restaurantId,
    });

    // Upload Photo Mutation
    const uploadMutation = useMutation({
        mutationFn: async (files: File | File[]) => {
            const formData = new FormData();
            const filesArray = Array.isArray(files) ? files : [files];
            filesArray.forEach((file) => {
                formData.append("images", file);
            });

            const { data } = await axiosInstance.post(
                `${API_ENDPOINTS.OWNER.PHOTOS.UPLOAD_PHOTO(restaurantId)}`,
                formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurant-photos", restaurantId] });
            toast.success("Photos uploaded successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || error.response?.data?.error || "Failed to upload photos. Please try again.";
            toast.error(msg);
        },
    });

    // Delete Photo Mutation
    const deleteMutation = useMutation({
        mutationFn: async (photoUrl: string) => {
            await axiosInstance.delete(API_ENDPOINTS.OWNER.PHOTOS.DELETE_PHOTO(restaurantId, photoUrl));
            return photoUrl;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurant-photos", restaurantId] });
            toast.success("Photo deleted successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || error.response?.data?.error || "Failed to delete photo. Please try again.";
            toast.error(msg);
        },
    });

    return {
        photos: query.data || [],
        isLoading: query.isLoading,
        uploadPhoto: uploadMutation.mutate,
        isUploading: uploadMutation.isPending,
        deletePhoto: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending
    };
}

export default useRestaurantPhotos;