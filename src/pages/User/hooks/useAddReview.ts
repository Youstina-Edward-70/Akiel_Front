import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../store/authStore";
import type { RestaurantDetails } from "./types";

const API_URL = "https://all-restaurants-in-one.vercel.app";

interface StoreStructure {
    token?: string;
    Token?: string;
    user?: { Token?: string; token?: string };
}

export const useAddReview = () => {
    const params = useParams();
    const restaurantId = params.restaurantId || params.id || "";
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [content, setContent] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const token = useAuthStore((s: unknown) => {
        const localState = s as StoreStructure;
        return localState.token || localState.Token || localState.user?.Token || localState.user?.token || "";
    });

    useEffect(() => {
        if (!restaurantId) return;

        const fetchDetails = async () => {
            const resReq = fetch(`${API_URL}/restaurants/${restaurantId}`).then(
                async (response) => {
                    const d = await response.json();
                    if (response.ok) {
                        const actualData = d.restaurant || d.Data || d.data || d;
                        setRestaurant(actualData);
                    }
                },
                (fail) => console.log("Failed to load restaurant data", fail)
            );

            const reviewReq = fetch(`${API_URL}/reviews/review/${restaurantId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(
                async (response) => {
                    const d = await response.json();
                    
                    const extracted = d.Data || d.data || d.review || d;
                    const actualReviewData = Array.isArray(extracted) ? extracted[0] : extracted;
                    
                    if (response.ok && actualReviewData) {
                        const savedRating = Number(actualReviewData.rating);
                        const savedContent = actualReviewData.Content || actualReviewData.content || "";
                        
                        if (savedRating > 0 || savedContent.trim() !== "") {
                            setIsEditing(true);
                            setRating(savedRating);
                            setContent(savedContent);
                            return;
                        }
                    }
                    setIsEditing(false);
                },
                (fail) => console.log("Failed to load old review", fail)
            );

            await Promise.all([resReq, reviewReq]);
            setIsLoading(false);
        };

        fetchDetails();
    }, [restaurantId, token]);

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
            const response = await fetch(`${API_URL}/reviews/add-review/${restaurantId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    rating, 
                    Content: content 
                })
            });

            const responseData = await response.json().then(
                (d) => d,
                () => null
            );

            if (response.ok) {
                toast.success(isEditing ? "Review updated successfully!" : "Review posted successfully!");
                navigate(`/restaurant/${restaurantId}`); 
            } else {
                const issueMessage = responseData?.message || responseData?.issue || "Failed to save review";
                toast(issueMessage, { icon: "❌" });
            }
        };

        performSubmit().then(
            () => setIsSubmitting(false),
            () => {
                toast("Network issue or server is down", { icon: "❌" });
                setIsSubmitting(false);
            }
        );
    };

    const handleCancel = () => {
        navigate(`/restaurant/${restaurantId}`);
    };

    return {
        restaurant,
        rating,
        setRating,
        content,
        setContent,
        isSubmitting,
        isLoading,
        isEditing,
        handleSubmit,
        handleCancel
    };
};