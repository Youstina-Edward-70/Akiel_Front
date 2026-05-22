import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { MenuSchema } from "../../../../types/RestaurantSchema";
import { z } from "zod";
import axiosInstance, { type ApiError } from "../../../../lib/api";
import { API_ENDPOINTS } from "../../../../lib/EndPoints";
import type { AxiosError } from "axios";

type MenuFormInput = z.input<typeof MenuSchema>;

export const useEditDish = () => {
    const { id, dishId } = useParams();
    const navigate = useNavigate();

    // Fetching Data
    const { data: existingDish, isLoading } = useQuery({
        queryKey: ["dish", dishId],
        queryFn: async () => {
            const res = await axiosInstance.get(API_ENDPOINTS.OWNER.MENU.GET_DISH(id!, dishId!));
            return res.data.dish;
        },
    });

    // Form Initialization
    const form = useForm<MenuFormInput>({
        resolver: zodResolver(MenuSchema),
        values: existingDish ? {
            dishes: [{
                ...existingDish,
                price: String(existingDish.price)
            }]
        } : undefined
    });

    // Mutation Logic
    const { mutate: updateDish, isPending } = useMutation({
        mutationFn: async (data: MenuFormInput) => {
            const formData = new FormData();
            const targetDish = data.dishes[0];
            formData.append("dishName", targetDish.dishName);
            formData.append("price", targetDish.price);
            formData.append("description", targetDish.description);
            formData.append("category", targetDish.category);

            if (targetDish.image instanceof File) {
                formData.append("image", targetDish.image);
            }

            return axiosInstance.put(API_ENDPOINTS.OWNER.MENU.UPDATE_DISH(id!, dishId!), formData);
        },
        onSuccess: () => {
            toast.success("Dish updated successfully!");
            navigate(-1);
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || error.response?.data?.error || "Failed to save menu.";
            toast.error(msg);
        }
    });

    return {
        existingDish,
        isLoading,
        isPending,
        form,
        updateDish,
        navigate
    };
};