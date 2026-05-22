import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../../lib/api";
import { API_ENDPOINTS } from "../../../../lib/EndPoints";
import { allUsersResponseSchema, type AdminUserSummary } from "../../../../types/UserSchema";
import toast from "react-hot-toast";

export const useUsersData = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const [userToDelete, setUserToDelete] = useState<AdminUserSummary | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["admin-users", searchParams.toString()],
        queryFn: async () => {
            const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS.GET_ALL_USERS, {
                params: searchParams,
            });
            const validated = allUsersResponseSchema.parse(data);
            return validated;
        },
    });

    const { mutate: deleteUser, isPending: isDeleting } = useMutation({
        mutationFn: async (id: string) => {
            return await axiosInstance.delete(API_ENDPOINTS.ADMIN.USERS.DELETE_USER(id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            toast.success("User deleted successfully");
            closeModals();
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message || error?.response?.data?.error || "Failed to delete user");
        },
    });

    const handleDeleteClick = (user: AdminUserSummary) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (userToDelete) deleteUser(userToDelete._id);
    };

    const closeModals = () => {
        setUserToDelete(null);
        setShowDeleteModal(false);
    };

    return {
        users: data?.data || [],
        totalPages: data?.meta?.pagesCount || 1,
        totalUsers: data?.meta?.totalInDatabase || 0,
        isLoading,
        isError,
        isDeleting,
        refetch,
        userToDelete,
        showDeleteModal,
        handleDeleteClick,
        confirmDelete,
        closeModals,
    };
};
