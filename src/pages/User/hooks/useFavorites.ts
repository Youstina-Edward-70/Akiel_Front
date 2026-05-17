import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../store/authStore";

const API_URL = "https://all-restaurants-in-one.vercel.app";

export interface FavoriteRestaurant {
    _id?: string;
    id?: string;
    name: string;
    image?: string;
    rating?: number | string;
    cuisineType?: string[];
}
interface StoreState {
    token?: string;
    user?: { Token?: string; token?: string };
}

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<FavoriteRestaurant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const state = useAuthStore.getState() as unknown as StoreState;
    const authUser = useAuthStore((s: unknown) => (s as StoreState).user);
    const token = state.token || authUser?.Token || authUser?.token;

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await fetch(`${API_URL}/favorites`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (response.ok) {
                setFavorites(data.favorites || data || []);
            }
        };

        if (token) {
            fetchFavorites().then(
                () => setIsLoading(false),
                () => setIsLoading(false) // بديل الـ catch
            );
        } else {
            setIsLoading(false);
        }
    }, [token]);

    const handleRemoveFavorite = async (id: string) => {
        const performRemove = async () => {
            const response = await fetch(`${API_URL}/favorites/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            if (response.ok) {
                setFavorites(prev => prev.filter(rest => (rest._id || rest.id) !== id));
                toast.success("Removed from favorites");
            } else {
                toast("Failed to remove", { icon: "❌" });
            }
        };

        performRemove().then(
            () => {},
            () => toast("Network issue", { icon: "❌" }) // بديل الـ catch
        );
    };

    return { favorites, isLoading, handleRemoveFavorite };
};