import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import type { MenuItem } from "../../../types/RestaurantSchema";

const useRestaurantMenu = (restaurantId: string) => {
    return useQuery<MenuItem[]>({
        queryKey: ["restaurant-menu", restaurantId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `${API_ENDPOINTS.DETAILS.GET_BY_ID(restaurantId)}/details?select=menu`
            );
            console.log(data.Data.menu);
            
            return data.Data.menu || [];
        },
        enabled: !!restaurantId,

    });
};

export default useRestaurantMenu;