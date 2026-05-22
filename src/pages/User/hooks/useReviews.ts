import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../store/authStore";

const API_URL = "https://all-restaurants-in-one.vercel.app";

export interface ReviewItem {
    _id?: string;
    id?: string;
    restaurantName?: string;
    date?: string;
    rating: number;
    Content?: string;
    content?: string;
    restaurantId?: unknown; 
}

interface StoreState {
    token?: string;
    user?: { Token?: string; token?: string };
}

export const useReviews = () => {
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const state = useAuthStore.getState() as unknown as StoreState;
    const authUser = useAuthStore((s: unknown) => (s as StoreState).user);
    const token = state.token || authUser?.Token || authUser?.token;

    const fetchReviews = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/reviews/my-reviews`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.ok) {
            const extractedReviews = data.reviews || data.Data || data.data || data;
            setReviews(Array.isArray(extractedReviews) ? extractedReviews : []);
        }
        setIsLoading(false);
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchReviews().then(
                () => {},
                () => setIsLoading(false)
            );
        } else {
            setIsLoading(false);
        }
    }, [token, fetchReviews]); 

    const handleDelete = async (id: string) => {
        const performDelete = async () => {
            const response = await fetch(`${API_URL}/reviews/delete-review/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success("Review deleted successfully");
                fetchReviews().then(
                    () => {},
                    () => toast("Failed to refresh the list", { icon: "❌" })
                );
            } else {
                toast("Failed to delete review", { icon: "❌" });
            }
        };

        performDelete().then(
            () => {},
            () => toast("Network issue", { icon: "❌" })
        );
    };

    return { reviews, isLoading, handleDelete };
};