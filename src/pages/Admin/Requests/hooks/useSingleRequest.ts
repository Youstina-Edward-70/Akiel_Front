import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../../lib/api";
import { API_ENDPOINTS } from "../../../../lib/EndPoints";
import { SingleRequestResponseSchema } from "../../../../types/RestaurantSchema";
import { useSettings } from "../../Settings/hooks/useSettings";
import toast from "react-hot-toast";

export const useSingleRequest = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: settings } = useSettings();
    const maxLimit = settings?.maxRejectionLimit || 3;

    const [showReasonModal, setShowReasonModal] = useState<boolean>(false);
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [rejectionReason, setRejectionReason] = useState<string>("");

    const { data: request, isLoading, error } = useQuery({
        queryKey: ["admin-request", id],
        queryFn: async () => {
            if (!id) throw new Error("Request ID is missing");
            const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.GET_ONE_REQUEST(id));
            const validatedData = SingleRequestResponseSchema.parse(data);
            return validatedData.Data;
        },
        enabled: !!id,
    });

    const { mutate: handleDecision, isPending } = useMutation({
        mutationFn: async ({ action, reason }: { action: 'approve' | 'reject'; reason?: string }) => {
            if (!id) return;
            return await axiosInstance.post(API_ENDPOINTS.ADMIN.ACCEPT_OR_REGECT_RESTAURANT(id), { action, reason });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-requests"] });
            queryClient.invalidateQueries({ queryKey: ["admin-request", id] });
            
            const message = variables.action === 'approve' ? "Restaurant approved successfully!" : "Restaurant rejected!";
            toast.success(message);
            
            navigate("/admin/requests");
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message || "Failed to update status");
        }
    });

    const handleRejectClick = () => {
        if (!request) return;
        if (request.rejectionCount >= maxLimit) {
            setShowWarningModal(true);
        } else {
            setShowReasonModal(true);
        }
    };

    const confirmRejection = () => {
        if (!rejectionReason.trim()) return toast.error("Please provide a reason");
        handleDecision({ action: 'reject', reason: rejectionReason });
        closeModals();
    };

    const confirmPermanentDelete = () => {
        handleDecision({ action: 'reject', reason: "Reached maximum rejection limit. Permanent removal." });
        closeModals();
    };

    const closeModals = () => {
        setShowReasonModal(false);
        setShowWarningModal(false);
        setRejectionReason("");
    };

    return {
        request,
        isLoading,
        error,
        isPending,
        maxLimit,
        showReasonModal,
        showWarningModal,
        rejectionReason,
        setRejectionReason,
        handleRejectClick,
        confirmRejection,
        confirmPermanentDelete,
        closeModals,
        handleApprove: () => handleDecision({ action: 'approve' }),
        goBack: () => navigate("/admin/requests")
    };
};