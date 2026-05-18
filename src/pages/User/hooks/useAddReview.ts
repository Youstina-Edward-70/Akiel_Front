import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../store/authStore";
import  type { RestaurantDetails } from "./types";

const API_URL = "https://all-restaurants-in-one.vercel.app";

interface StoreState {
    token?: string;
    user?: { Token?: string; token?: string };
}

export const useAddReview = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [content, setContent] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const state = useAuthStore.getState() as unknown as StoreState;
    const authUser = useAuthStore((s: unknown) => (s as StoreState).user);
    const token = state.token || authUser?.Token || authUser?.token;

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) return;
            const response = await fetch(`${API_URL}/restaurants/${id}`);
            const data = await response.json();
            if (response.ok) {
                setRestaurant(data.restaurant || data);
            }
        };
        fetchRestaurant().then(
            () => setIsLoading(false),
            () => setIsLoading(false)
        );
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (rating === 0) {
            toast("Please select a rating", { icon: "⚠️" });
            return;
        }
        if (!content.trim()) {
            toast("Please write your feedback", { icon: "⚠️" });
            return;
        }

        setIsSubmitting(true);

        const performSubmit = async () => {
            const response = await fetch(`${API_URL}/reviews/add-review`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    restaurantId: id, 
                    rating, 
                    content 
                })
            });

            if (response.ok) {
                toast.success("Review posted successfully!");
                navigate(`/restaurant/${id}`); // الرجوع لصفحة المطعم
            } else {
                toast("Failed to post review", { icon: "❌" });
            }
        };

        performSubmit().then(
            () => setIsSubmitting(false),
            () => {
                toast("Network issue", { icon: "❌" }); 
                setIsSubmitting(false);
            }
        );
    };

    const handleCancel = () => {
        navigate(`/restaurant/${id}`);
    };

    return {
        restaurant,
        rating,
        setRating,
        content,
        setContent,
        isSubmitting,
        isLoading,
        handleSubmit,
        handleCancel
    };
};