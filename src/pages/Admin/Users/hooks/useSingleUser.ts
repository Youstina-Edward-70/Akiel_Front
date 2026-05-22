import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../../lib/api";
import { API_ENDPOINTS } from "../../../../lib/EndPoints";
import { editUserSchema, type EditUserFormData } from "../../../../types/UserSchema";
import toast from "react-hot-toast";

export const useSingleUser = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user, isLoading, error } = useQuery({
        queryKey: ["admin-user", id],
        queryFn: async () => {
            if (!id) throw new Error("User ID is missing");
            const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS.GET_ONE_USER(id));
            return data.user;
        },
        enabled: !!id,
    });

    const form = useForm<EditUserFormData>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phone: "",
            role: "user",
            address: { details: "", street: "", city: "", governorate: "" },
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                fullname: user.fullname || "",
                email: user.email || "",
                phone: user.phone || "",
                role: user.role || "user",
                address: {
                    details: user.address?.details || "",
                    street: user.address?.street || "",
                    city: user.address?.city || "",
                    governorate: user.address?.governorate || "",
                },
            });
        }
    }, [user, form]);

    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: async (formData: EditUserFormData) => {
            if (!id) return;            
            return await axiosInstance.patch(API_ENDPOINTS.ADMIN.USERS.EDIT_USER(id), formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            queryClient.invalidateQueries({ queryKey: ["admin-user", id] });
            toast.success("User updated successfully");
            navigate("/admin/users");
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message || error?.response?.data?.error || "Failed to update user");
        },
    });

    const onSubmit = form.handleSubmit((data) => updateUser(data));

    return {
        user,
        isLoading,
        error,
        form,
        isPending,
        onSubmit,
        goBack: () => navigate("/admin/users"),
    };
};
