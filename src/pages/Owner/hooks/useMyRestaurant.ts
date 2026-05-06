import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { useAuthStore } from "../../../store/authStore";

export const useMyRestaurant = () => {
    const { user, isAuthenticated } = useAuthStore();
    const isOwner = user?.role === "owner";

    return useQuery({
        queryKey: ["my-restaurant", user?.id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER.MY_RESTAURANT);
            return data.Data || data.data || data; 
        },
        enabled: isAuthenticated && isOwner && !!user?.id,
        staleTime: 1000 * 60 * 5,
    });
};