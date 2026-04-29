import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { toast } from "react-hot-toast";
import type { Review } from "../../../types/UserSchema";
import type { AxiosError } from "axios";
import { useAuthStore } from "../../../store/authStore";

const useRestaurantReviews = (restaurantId: string) => {
    const queryClient = useQueryClient();
    const { user: currentUser } = useAuthStore();

    // Fetch Reviews
    const query = useQuery<Review[]>({
        queryKey: ["reviews", restaurantId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `${API_ENDPOINTS.DETAILS.GET_BY_ID(restaurantId)}/details?select=reviews`
            );
            return data.Data.reviews || [];
        },
        enabled: !!restaurantId,
    });

    const userReview = query.data?.find(
        (rev) => rev.user?._id === currentUser?.id
    );

    // Add or Update Review Mutation
    const updateReviewMutation = useMutation({
        mutationFn: async ({ content, rating }: { content: string, rating?: number }) => {
            const { data } = await axiosInstance.post(
                API_ENDPOINTS.USER.REVIEWS.ADD_OR_UPDATE_REVIEW(restaurantId),
                {
                    Content: content,
                    rating: rating
                }
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews", restaurantId] });
            toast.success("Review updated successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Failed to update review. Please try again.";
            toast.error(msg);
        }
    });

    // Delete Review Mutation
    const deleteReviewMutation = useMutation({
        mutationFn: async () => {
            await axiosInstance.delete(API_ENDPOINTS.USER.REVIEWS.DELETE_REVIEW(restaurantId));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews", restaurantId] });
            toast.success("Review deleted successfully!");
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Failed to delete review. Please try again.";
            toast.error(msg);
        },
    });


    return {
        reviews: query.data || [],
        userReview,
        hasReviewed: !!userReview,
        isLoading: query.isLoading,
        isError: query.isError,

        // Delete functionality
        deleteReview: deleteReviewMutation.mutate,
        isDeleting: deleteReviewMutation.isPending,

        // Update functionality
        updateReview: updateReviewMutation.mutate,
        updateReviewAsync: updateReviewMutation.mutateAsync,
        isUpdating: updateReviewMutation.isPending,

        // Helpers
        refetch: query.refetch
    };
}

export default useRestaurantReviews;