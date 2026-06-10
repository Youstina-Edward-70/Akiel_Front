import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";

export const useContact = () => {
    return useMutation({
        mutationFn: async (data: { name: string; email: string; message: string }) => {
            return await axiosInstance.post(API_ENDPOINTS.CONTACT.SEND_MESSAGE, data);
        },
        onSuccess: () => {
            toast.success("Message sent successfully");
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Something went wrong";
            toast.error(msg);
        }
    });
};