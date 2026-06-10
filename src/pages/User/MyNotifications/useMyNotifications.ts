import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import { toast } from "react-hot-toast";
import type { NotificationsResponse } from "../../../types/RestaurantSchema";

const useMyNotifications = () => {
    // Fetch all notifications
    const query = useQuery<NotificationsResponse, AxiosError<ApiError>>({
        queryKey: ["notifications"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(API_ENDPOINTS.OWNER.MY_NOTIFICATIONS);
            return data.Data; 
        },
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (query.isError) {
            const errorMessage = query.error?.response?.data?.message || "Failed to fetch notifications";
            toast.error(errorMessage);
        }
    }, [query.isError, query.error]);

    return {
        notifications: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch
    };
};

export default useMyNotifications;