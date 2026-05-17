import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/api";
import { API_ENDPOINTS } from "../../../../lib/EndPoints";

export interface SiteSettings {
    lowMax: number;
    mediumMax: number;
    maxRejectionLimit: number;
}

export function useSettings() {
    return useQuery<SiteSettings>({
        queryKey: ["site-settings"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.GET_SETTINGS);
            return data.Data;
        },
        staleTime: 1000 * 60 * 60,
    });
}