import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import toast from "react-hot-toast";
import { reviewFormSchema, type ReviewUser, type ReviewFormData } from "../../../types/UserSchema";

const useReview = (options?: { forceFetch?: boolean }) => {
    const { id: restId, revId } = useParams<{ id: string; revId: string }>();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const isEditMode = !!revId;

    const form = useForm<ReviewFormData>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            Content: "",
            rating: 0,
        },
    });

    const { data: myReviews, isLoading: isLoadingReview, error: RevError } = useQuery({
        queryKey: ["my-reviews"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(API_ENDPOINTS.USER.REVIEWS.GET_MY_REVIEWS);
            return data.Data || data.data;
        },
        enabled: isEditMode || !!options?.forceFetch,
    });

    useEffect(() => {
        if (isEditMode && myReviews && myReviews.length > 0) {
            const currentRestReview = myReviews.find(
                (rev: ReviewUser) => rev.restaurant._id === restId
            );

            if (currentRestReview) {
                form.reset({
                    Content: currentRestReview.Content || "",
                    rating: currentRestReview.rating || 0,
                });
            }
        }
    }, [myReviews, isEditMode, restId, form]);

    const reviewMutation = useMutation({
        mutationFn: async (formData: ReviewFormData) => {
            const { data } = await axiosInstance.post(API_ENDPOINTS.USER.REVIEWS.ADD_OR_UPDATE_REVIEW(restId!), formData);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["restaurantReviews", restId] });
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] });

            toast.success(data.message);
            navigate(-1);
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Faild to update the review.";
            toast.error(msg);
        }
    });

    const reviewDeletion = useMutation({
        mutationFn: async (restaurantId?: string) => {
            const targetId = restaurantId || restId;
        
        if (!targetId) {
            throw new Error("Restaurant ID is required to delete a review.");
        }

        const { data } = await axiosInstance.delete(
            API_ENDPOINTS.USER.REVIEWS.DELETE_REVIEW(targetId)
        );
        return { data, targetId };
        },
        onSuccess: ({ data, targetId }) => {
            queryClient.invalidateQueries({ queryKey: ["restaurantReviews", targetId] });
        queryClient.invalidateQueries({ queryKey: ["my-reviews"] });

        const successMsg = data?.message || data?.response?.message || "Review deleted successfully";
        toast.success(successMsg);
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Faild to delete the review.";
            toast.error(msg);
        }
    });

    const onSubmit = form.handleSubmit((data) => {
        reviewMutation.mutate(data);
    });

    const ratingValue = useWatch({
        control: form.control,
        name: "rating",
        defaultValue: 0
    });

    const { data: currentRestaurant, isLoading: isLoadingRest, error: restError } = useQuery({
        queryKey: ["current-restaurant"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(API_ENDPOINTS.DETAILS.GET_BY_ID(restId!));
            return data.Data || data.data;
        },
    });

    return {
        myReviews,
        currentRestaurant,
        form,
        onSubmit,
        revError: RevError as AxiosError<ApiError> | null,
        restError: restError as AxiosError<ApiError> | null,
        isEditMode,
        isLoadingRev: isEditMode && isLoadingReview,
        isLoadingRest: isLoadingRest,
        isSubmitting: reviewMutation.isPending,
        deleteReview: reviewDeletion,
        isDeleting: reviewDeletion.isPending,
        ratingValue,
        setRatingValue: (val: number) => form.setValue("rating", val, { shouldValidate: true }),
        navigate
    };
}

export default useReview;