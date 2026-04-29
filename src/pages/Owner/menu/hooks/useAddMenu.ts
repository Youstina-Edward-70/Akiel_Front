import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MenuSchema } from "../../../../types/RestaurantSchema";

import { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../../lib/api";
import { API_ENDPOINTS } from "../../../../lib/EndPoints";
import { z } from "zod";

type MenuFormInput = z.input<typeof MenuSchema>;

export const useAddMenu = (restaurantId?: string) => {
const navigate = useNavigate();

const formMethods = useForm<MenuFormInput>({
        resolver: zodResolver(MenuSchema),
        defaultValues: {
            dishes: [{
                id: nanoid(),
                dishName: "",
                price: "",
                description: "",
                category: "",
                image: null,
            }],
        },
    });

    const {control, handleSubmit} = formMethods;
    const fieldArray = useFieldArray({
        control,
        name: "dishes",
    })

    const mutation = useMutation({
        mutationFn: async (data: MenuFormInput) => {
            if (!restaurantId) {
                throw new Error("Restaurant id is missing.");
            }

            const formData = new FormData();
            const menuPayload = data.dishes.map((dish) => ({
                dishName: dish.dishName,
                price: dish.price,
                description: dish.description ?? "",
                category: dish.category,
            }));

            formData.append("menu", JSON.stringify(menuPayload));

            data.dishes.forEach((dish) => {
                if (dish.image instanceof File) {
                    formData.append("images", dish.image);
                }
            });

            return axiosInstance.post(API_ENDPOINTS.OWNER.MENU.ADD_DISH(restaurantId!), formData);
        },
        onSuccess: () => {
            toast.success("Menu updated successfully!");
            navigate(-1);
        },
        onError: (error: AxiosError<ApiError>) => {
            const msg = error.response?.data?.message || "Failed to save menu.";
            toast.error(msg);
        }
    });

    return {
        ...formMethods,
        ...fieldArray,
        handleSubmit,
        formState: formMethods.formState,
        saveMenu: mutation.mutate,
        isPending: mutation.isPending
    };
};