import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { useNavigate } from "react-router-dom";

const useFavorites = () => {
    const navigate = useNavigate();

    const { data: myFavorites, isLoading, error } = useQuery({
        queryKey: ["user-favorites"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(API_ENDPOINTS.USER.FAVORITES.GET_MY_FAVORITES);
            return data.Data || data.data;
        },
    });

    return {
        myFavorites,
        isLoading,
        error,
        navigate,
    };
};

export default useFavorites;