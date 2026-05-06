import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { toast } from "react-hot-toast";
import type { Restaurant } from "../../../types/RestaurantSchema";

const useRestaurantDetails = (id: string) => {
    const queryClient = useQueryClient();

    // Fetch Restaurant Details
    const query = useQuery<Restaurant>({
        queryKey: ["restaurant", id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(API_ENDPOINTS.DETAILS.GET_BY_ID(id!));
            return data.Data;
        },
        enabled: !!id,
    });

    // Update Basic Details Mutation
    const updateDetailsMutation = useMutation({
        mutationFn: async (updatedData: Partial<Restaurant>) => {
            const { data } = await axiosInstance.put(
                API_ENDPOINTS.OWNER.UPDATE_RESTAURANT(id!), 
                updatedData
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurant", id] });
            toast.success("Restaurant information updated!");
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Failed to update information.";
            toast.error(msg);
        }
    });

    // Update Cover Photo Mutation
    const updateCoverMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file); 

            const { data } = await axiosInstance.post(
                API_ENDPOINTS.OWNER.COVER.UPLOAD_OR_UPDATE_COVER(id!), 
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurant", id] });
            toast.success("Cover photo updated successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Failed to update cover photo.";
            toast.error(msg);
        }
    });

    // Delete Cover Photo Mutation
    const deleteCoverMutation = useMutation({
        mutationFn: async () => {
            return axiosInstance.delete(API_ENDPOINTS.OWNER.COVER.DELETE_COVER(id!));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurant", id] });
            toast.success("Cover photo removed Successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data?.message || "Failed to remove cover");
        }
    });

    return {
        restaurant: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        
        // Details Mutation Actions
        updateDetails: updateDetailsMutation.mutate,
        isUpdatingDetails: updateDetailsMutation.isPending,
        
        // Cover Mutation Actions
        updateCover: updateCoverMutation.mutate,
        isUpdatingCover: updateCoverMutation.isPending,
        deleteCover: deleteCoverMutation.mutate,
        isDeletingCover: deleteCoverMutation.isPending
    };
}

export default useRestaurantDetails