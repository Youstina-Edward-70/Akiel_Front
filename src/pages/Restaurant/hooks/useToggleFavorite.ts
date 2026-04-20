import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { useAuthStore } from "../../../store/authStore";
import type { Favorite } from "../../../types/UserSchema";
import toast from "react-hot-toast";

export const useToggleFavorite = (restaurantId: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, user } = useAuthStore();

    // Fetch favorites with long staleTime to prevent "flickering"
    const { data: favoriteList } = useQuery<Favorite[]>({
        queryKey: ["user-favorites"],
        queryFn: async () => {
            const res = await axiosInstance.get(API_ENDPOINTS.USER.FAVORITES.GET_MY_FAVORITES);
            const data = res.data.Data || res.data.data || res.data;
            return Array.isArray(data) ? data : [];
        },
        enabled: isAuthenticated && !!user,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60, // Cache for 1 hour
    });

    // Determine if the current restaurant is in favorites
    const isFavorite = Array.isArray(favoriteList)
        ? favoriteList.some((fav: Favorite) => {
            const restaurantObj = typeof fav.restaurant === 'object' ? fav.restaurant : null;
            const favId = restaurantObj?._id || fav.restaurant || (typeof fav === 'string' ? fav : null);
            return String(favId) === String(restaurantId);
        })
        : false;

    const mutation = useMutation({
        mutationFn: async (currentStatus: boolean) => {
            const method = currentStatus ? 'delete' : 'get';
            const url = API_ENDPOINTS.USER.FAVORITES.TOGGLE(restaurantId);
            const { data } = await axiosInstance({ method, url });
            return data;
        },
        onMutate: async (currentStatus) => {
            await queryClient.cancelQueries({ queryKey: ["user-favorites"] });
            const previousFavorites = queryClient.getQueryData<Favorite[]>(["user-favorites"]);

            if (previousFavorites) {
                queryClient.setQueryData<Favorite[]>(["user-favorites"], (old = []) => {
                    if (currentStatus) {
                        return old.filter(fav => {
                            const restaurantObj = typeof fav.restaurant === 'object' ? fav.restaurant : null;
                            const id = restaurantObj?._id || fav.restaurant || (typeof fav === 'string' ? fav : fav._id);
                            return String(id) !== String(restaurantId);
                        });
                    } else {
                        const newFav = {
                            _id: Math.random().toString(),
                            restaurant: { _id: restaurantId }
                        } as Favorite;

                        return [...old, newFav];
                    }
                });
            }

            return { previousFavorites };
        },
        onError: (error: AxiosError<ApiError>, currentStatus, context) => {
            const msg = error.response?.data?.message || "";

            // If the error says it's already there, we don't rollback (UI stays red)
            if (msg.toLowerCase().includes("already") && !currentStatus) return;

            // Rollback to the previous state on actual errors
            if (context?.previousFavorites) {
                queryClient.setQueryData(["user-favorites"], context.previousFavorites);
            }

            if (error.response?.status === 401) {
                toast.error("Please login first");
                navigate("/auth/login", { state: { from: location.pathname } });
            } else {
                toast.error(msg || "Action failed");
            }
        },
        onSuccess: (_data, currentStatus) => {
            const message = currentStatus ? "Removed" : "Added";
            toast.success(`${message} successfully`);
            queryClient.invalidateQueries({ queryKey: ["restaurant", restaurantId] });
        },
    });

    const handleToggle = () => {
        if (!isAuthenticated) {
            toast.error("Login required");
            navigate("/auth/login", { state: { from: location.pathname } });
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