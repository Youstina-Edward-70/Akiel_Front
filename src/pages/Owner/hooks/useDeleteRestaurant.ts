import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import toast from "react-hot-toast";

export const useDeleteRestaurant = () => {
    const queryClient = useQueryClient();
    const updateUserRest = useAuthStore((state) => state.updateResutaurantOwner);

    return useMutation({
        mutationFn: async (restaurantId: string) => {
            const { data } = await axiosInstance.delete(API_ENDPOINTS.OWNER.DELETE_RESTAURANT(restaurantId));
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants"] });
            queryClient.invalidateQueries({ queryKey: ["my-restaurant"] });
            updateUserRest(false);
            toast.success("Restaurant deleted successfully");
        },
        onError: (error: AxiosError<ApiError>) => {
            const message = error.response?.data?.message || error.response?.data?.error || "Failed to delete restaurant";            
            toast.error(message);
        }
    });
};