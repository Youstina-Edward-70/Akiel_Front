import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { useAuthStore } from "../../../store/authStore";
import type { FavoriteItem } from "../../../types/UserSchema";
import toast from "react-hot-toast";

export const useToggleFavorite = (restaurantId: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, user } = useAuthStore();

    const isRegularUser = user?.role === "user";

    // Fetch favorites
    const { data: favoriteList } = useQuery<FavoriteItem[]>({
        queryKey: ["user-favorites"],
        queryFn: async () => {
            const res = await axiosInstance.get(API_ENDPOINTS.USER.FAVORITES.GET_MY_FAVORITES);
            const data = res.data.Data || res.data.data || res.data;
            return Array.isArray(data) ? data : [];
        },
        enabled: isAuthenticated && !!user && isRegularUser,
        staleTime: 1000 * 60 * 5,
    });

    // Determine if the current restaurant is in favorites
    const isFavorite = Array.isArray(favoriteList) && favoriteList.some((fav: FavoriteItem) => {
        const favId = fav.restaurant?._id || fav.restaurant || (typeof fav === 'string' ? fav : null);
        return String(favId) === String(restaurantId);
    });

    const mutation = useMutation({
        mutationFn: async (currentStatus: boolean) => {
            const method = currentStatus ? 'delete' : 'post';
            const url = API_ENDPOINTS.USER.FAVORITES.TOGGLE(restaurantId);
            const { data } = await axiosInstance({ method, url });
            return data;
        },
        onMutate: async (currentlyFavorite) => {
            await queryClient.cancelQueries({ queryKey: ["user-favorites"] });
            const previousFavorites = queryClient.getQueryData<FavoriteItem[]>(["user-favorites"]);

            if (previousFavorites) {
                queryClient.setQueryData<FavoriteItem[]>(["user-favorites"], (old = []) => {
                    if (currentlyFavorite) {
                        return old.filter((fav: FavoriteItem) => {
                            const id = fav.restaurant?._id || fav.restaurant || fav._id;
                            return String(id) !== String(restaurantId);
                        });
                    } else {
                        const newFav = {
                            _id: Date.now().toString(),
                            restaurant: { _id: restaurantId }
                        } as FavoriteItem;

                        return [...old, newFav];
                    }
                });
            }

            return { previousFavorites };
        },
        onError: (error: AxiosError<ApiError>, _vars, context) => {
            if (context?.previousFavorites) {
                queryClient.setQueryData(["user-favorites"], context.previousFavorites);
            }
            toast.error(error.response?.data?.message || error.response?.data?.error || "Operation failed");
        },
        onSuccess: (_data, currentlyFavorite) => {
            toast.success(`${currentlyFavorite ? "Removed from favorites" : "Added to favorites"} successfully`);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
        },
    });

    const handleToggle = () => {
        if (!isAuthenticated) {
            toast.error("Please login first");
            navigate("/auth/login", { state: { from: location.pathname } });
            return;
        }

        if(!isRegularUser) {
            toast.error("Admins and Owners cannot add restaurants to favorites.");
            return;
        }

        if (mutation.isPending) return;
        mutation.mutate(isFavorite);
    };

    return {
        isFavorite,
        toggleFavorite: handleToggle,
        isLoading: mutation.isPending
    };
};