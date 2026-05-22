import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import type { Dish } from "../../../types/RestaurantSchema";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const useRestaurantMenu = (restaurantId: string) => {
    const queryClient = useQueryClient();

    const menuQuery = useQuery<Dish[]>({
        queryKey: ["restaurant-menu", restaurantId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `${API_ENDPOINTS.DETAILS.GET_BY_ID(restaurantId)}/details?select=menu`
            );

            const rawMenu = data.Data.menu || data.data.menu || [];
            return rawMenu.map((item: Dish) => ({
                _id: item._id,
                dishName: item.dishName ?? "",
                price: String(item.price ?? ""),
                description: item.description ?? "",
                category: (item.category as Dish["category"]) ?? "",
                image: (item.image && typeof item.image === "object" && !("_id" in item.image && item.image instanceof File))
                    ? {
                        url: item.image.url ?? "",
                        publicId: item.image.publicId ?? null,
                        _id: item.image._id,
                    }
                    : null,
            }));
        },
        enabled: !!restaurantId,
    });

    const deleteMutation = useMutation({
        mutationFn: async (dishId: string) => {
            return axiosInstance.delete(API_ENDPOINTS.OWNER.MENU.DELETE_DISH(restaurantId, dishId));
        },
        onSuccess: () => {
            toast.success("Dish deleted Successfully!");
            queryClient.invalidateQueries({ queryKey: ["restaurant-menu", restaurantId] });
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || error.response?.data?.error || "Failed to delete the dish.";
            toast.error(msg);
        }
    });

    return {
        data: menuQuery.data ?? [],
        isLoading: menuQuery.isLoading,
        error: menuQuery.error,
        
        // mutation operations
        deleteDish: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        deleteError: deleteMutation.error
    }
};

export default useRestaurantMenu;