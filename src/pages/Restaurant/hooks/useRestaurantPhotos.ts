import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";

const useRestaurantPhotos = (restaurantId: string) => {
    const queryClient = useQueryClient();

    // Fetch Photos
    const query = useQuery<string[]>({
        queryKey: ["restaurant-photos", restaurantId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `${API_ENDPOINTS.DETAILS.GET_BY_ID(restaurantId)}/details?select=gallery`
            );
            return data.data.Gallery || [];
        },
        enabled: !!restaurantId,
    });

    // Upload Photo Mutation
    const uploadMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
            const { data } = await axiosInstance.post(
                `${API_ENDPOINTS.DETAILS.GET_BY_ID(restaurantId)}/details?select=gallery`,
                formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurant-photos", restaurantId] });
            toast.success("Photo uploaded successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Failed to upload photo. Please try again.";
            toast.error(msg);
        },
    });

    // Delete Photo Mutation
    const deleteMutation = useMutation({
        mutationFn: async (photoUrl: string) => {
            await axiosInstance.delete(API_ENDPOINTS.OWNER.PHOTOS.DELETE_PHOTO(photoUrl));
            return photoUrl;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurant-photos", restaurantId] });
            toast.success("Photo deleted successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Failed to delete photo. Please try again.";
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