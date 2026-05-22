import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance, { type ApiError } from "../../../../lib/api";
import { API_ENDPOINTS } from "../../../../lib/EndPoints";
import { settingsSchema, type SettingsFormData } from "../../../../types/SettingsSchema";

export interface SiteSettings {
    lowMax: number;
    mediumMax: number;
    maxRejectionLimit: number;
}

interface ApiResponse {
    settings: SiteSettings
}

export function useSettings() {
    const queryClient = useQueryClient();

    const queryInfo = useQuery<SiteSettings, AxiosError<ApiError>>({
        queryKey: ["site-settings"],
        queryFn: async () => {
            const { data } = await axiosInstance.get<ApiResponse>(API_ENDPOINTS.ADMIN.SETTIGNS.GET_SETTINGS);
            return data.settings;
        },
        staleTime: 1000 * 60 * 60,
    });

    const form = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            lowMax: 50,
            mediumMax: 150,
            maxRejectionLimit: 5,
        },
        values: queryInfo.data ? {
            lowMax: queryInfo.data.lowMax,
            mediumMax: queryInfo.data.mediumMax,
            maxRejectionLimit: queryInfo.data.maxRejectionLimit,
        } : undefined,
    });

    const { mutate: saveSettings, isPending: isSaving } = useMutation({
        mutationFn: async (formData: SettingsFormData) => {
            return await axiosInstance.put(API_ENDPOINTS.ADMIN.SETTIGNS.EDIT_SETTINGS, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["site-settings"] });
            toast.success("Settings updated successfully");
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message || "Failed to update settings");
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        saveSettings(data);
    });

    const handleResetToDefaults = () => {
        form.reset({
            lowMax: 50,
            mediumMax: 150,
            maxRejectionLimit: 5,
        });
        toast.success("Reset to default values");
    };

    return {
        ...queryInfo,
        form,
        isSaving,
        onSubmit,
        handleResetToDefaults,
    };
}