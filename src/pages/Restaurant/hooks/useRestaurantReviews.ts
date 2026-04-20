import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {type ApiError} from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { toast } from "react-hot-toast";
import type { Review } from "../../../types/UserSchema";
import type { AxiosError } from "axios";

const useRestaurantReviews = (restaurantId: string) => {
    const queryClient = useQueryClient();

    // Fetch Reviews
    const query = useQuery<Review[]>({
        queryKey: ["reviews", restaurantId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `${API_ENDPOINTS.DETAILS.GET_BY_ID(restaurantId)}/details?select=reviews`
            );
            return data.data.Reviews || [];
        },
        enabled: !!restaurantId,
    });

    // Update Review Mutation
    const updateReviewMutation = useMutation({
        mutationFn: async ({ reviewId, updatedData }: { reviewId: string, updatedData: string }) => {
            const { data } = await axiosInstance.patch(
                API_ENDPOINTS.USER.REVIEWS.UPDATE_REVIEW(restaurantId, reviewId),
                { Content: updatedData }
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
        mutationFn: async (reviewId: string) => {
            await axiosInstance.delete(API_ENDPOINTS.USER.REVIEWS.DELETE_REVIEW(restaurantId, reviewId));
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
        isLoading: query.isLoading,
        isError: query.isError,

        // Delete functionality
        deleteReview: deleteReviewMutation.mutate,
        isDeleting: deleteReviewMutation.isPending,

        // Update functionality
        updateReview: updateReviewMutation.mutate,
        isUpdating: updateReviewMutation.isPending,

        // Helpers
        refetch: query.refetch
    };
}

export default useRestaurantReviews;