import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../../lib/api";
import { API_ENDPOINTS } from "../../../../lib/EndPoints";
import { AllRequestsResponseSchema, type RequestSummary } from "../../../../types/RestaurantSchema";
import toast from "react-hot-toast";
import { useSettings } from "../../Settings/hooks/useSettings";

export const useRequestsData = () => {
    const queryClient = useQueryClient();

    const { data: settings } = useSettings();
    const maxLimit = settings?.maxRejectionLimit || 3;

    const [selectedReq, setSelectedReq] = useState<RequestSummary | null>(null);
    const [showReasonModal, setShowReasonModal] = useState<boolean>(false);
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [rejectionReason, setRejectionReason] = useState<string>("");

    const { data: requests, isLoading } = useQuery({
        queryKey: ["admin-requests"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.REQUESTS.GET_ALL_REQUESTS);
            const validatedData = AllRequestsResponseSchema.parse(data);
            return validatedData.Data;
        },
    });

    const { mutate: handleDecision, isPending } = useMutation({
        mutationFn: async ({ id, action, reason }: { id: string; action: 'approve' | 'reject'; reason?: string }) => {
            return await axiosInstance.post(API_ENDPOINTS.ADMIN.REQUESTS.ACCEPT_OR_REGECT_RESTAURANT(id), { action, reason });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-requests"] });
            const message = variables.action === 'approve' ? "Restaurant approved!" : "Restaurant rejected!";
            toast.success(message);
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message || error?.response?.data?.error || "Failed to update status");
        }
    });

    const handleRejectClick = (req: RequestSummary) => {
        setSelectedReq(req);
        if (req.rejectionCount >= maxLimit) {
            setShowWarningModal(true);
        } else {
            setShowReasonModal(true);
        }
    };

    const closeModals = () => {
        setShowReasonModal(false);
        setShowWarningModal(false);
        setSelectedReq(null);
        setRejectionReason("");
    };

    const confirmRejection = () => {
        if (!rejectionReason.trim()) return toast.error("Please provide a reason");
        if (selectedReq) {
            handleDecision({ id: selectedReq._id, action: 'reject', reason: rejectionReason });
            closeModals();
        }
    };

    const confirmPermanentDelete = () => {
        if (selectedReq) {
            handleDecision({ 
                id: selectedReq._id, 
                action: 'reject', 
                reason: "Reached maximum rejection limit. Permanent removal." 
            });
            closeModals();
        }
    };

    return {
        requests,
        isLoading,
        isPending,
        maxLimit,
        selectedReq,
        showReasonModal,
        showWarningModal,
        rejectionReason,
        setRejectionReason,
        handleRejectClick,
        confirmRejection,
        confirmPermanentDelete,
        closeModals,
        handleApprove: (id: string) => handleDecision({ id, action: 'approve' })
    };
};