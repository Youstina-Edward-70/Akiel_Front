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
    const token = state.token || authUser?.Token || state.token || authUser?.token;

    // دالة لجلب الداتا (استخدمناها كذا مرة عشان كدا عملناها في دالة منفصلة)
    const fetchFavorites = async () => {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/favorites`, {
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.ok) {
            const extractedFavs = data.favorites || data.Data || data.data || data;
            setFavorites(Array.isArray(extractedFavs) ? extractedFavs : []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/favorites`, {
                method: "GET",
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (response.ok) {
                const extractedFavs = data.favorites || data.Data || data.data || data;
                setFavorites(Array.isArray(extractedFavs) ? extractedFavs : []);
            }
            setIsLoading(false);
        };

        if (token) {
            fetchFavorites();
        } else {
            setIsLoading(false);
        }
    }, [token]); 

    const handleRemoveFavorite = async (id: string) => {
        const response = await fetch(`${API_URL}/favorites/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (response.ok) {
            toast.success("Removed successfully");
            // بعد الحذف الناجح، بنعمل fetch جديد للداتا عشان نضمن تحديث القائمة فوراً
            await fetchFavorites();
        } else {
            toast.error("Failed to remove, please try again");
        }
    };

    return { favorites, isLoading, handleRemoveFavorite };
};