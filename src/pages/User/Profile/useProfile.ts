import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import type { User } from "../../../types/UserSchema";

export const useProfile = (userId: string) => {
    const queryClient = useQueryClient();

    const profileQuery = useQuery<User>({
        queryKey: ['userProfile', userId],
        queryFn: async () => {
            if (!userId) throw new Error("User ID is required");
            const { data } = await axiosInstance.get(API_ENDPOINTS.USER.PROFILE(userId));
            return data.user || data.Date;
        },

        enabled: !!userId,
    });

    const deleteAccountMutation = useMutation({
        mutationFn: async () => {
            if (!userId) throw new Error("User ID is required to delete account");
            const { data } = await axiosInstance.delete(API_ENDPOINTS.USER.DELETE_ACCOUNT(userId));
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile', userId] });
        },
    });

    const ownerRestaurantIdMutation = useQuery({
        queryKey: ['ownerRestaurantId', userId],
        queryFn: async () => {
            if (!userId) throw new Error("User ID is required to fetch restaurant ID");
            const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER.MY_RESTAURANT);
            return data.Data._id;
        },
        enabled: !!userId && profileQuery.data?.isRestaurantOwner === true,
    });

    return {
        ...profileQuery,

        deleteAccount: deleteAccountMutation.mutate,
        isDeleting: deleteAccountMutation.isPending,
        deleteError: deleteAccountMutation.error,
        ownerRestaurantId: ownerRestaurantIdMutation.data,
    };
};