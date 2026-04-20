import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import type { Restaurant } from "../../../types/RestaurantSchema";

const useRestaurantDetails = (id: string) => {
    return useQuery<Restaurant>({
            queryKey: ["restaurant", id],
            queryFn: async () => {
                const { data } = await axiosInstance.get(API_ENDPOINTS.DETAILS.GET_BY_ID(id!));
                return data.Data;
            },
            enabled: !!id,
    });
}

export default useRestaurantDetails