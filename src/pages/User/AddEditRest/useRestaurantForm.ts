import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import axiosInstance, { type ApiError } from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import {
    createRestaurantSchema,
    updateRestaurantSchema,
    type CreateRestaurantInput,
    type UpdateRestaurantInput,
    type RestaurantFormInput,
} from "../../../types/RestaurantSchema";
import { LIMITS } from "../../../types/constants";

export const useRestaurantForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const isEditMode = location.pathname.includes("edit") || !!id;

    const currentSchema = !isEditMode ? createRestaurantSchema : updateRestaurantSchema;

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch,
        reset
    } = useForm<RestaurantFormInput>({
        resolver: zodResolver(currentSchema),
        defaultValues: {
            name: '',
            delivery: false,
            phoneNumber: '',
            cuisineType: [],
            address: [{ details: '', street: '', city: '', governorate: '' }],
            openingHours: [],
            description: '',
            facebookLink: null,
            whatsappNumber: null,
            email: '',
            image: null,
        }
    });

    const selectedCuisines = useWatch({ control, name: "cuisineType" }) || [];

    const rawOpeningHours = useWatch({ control, name: "openingHours" }) || [];
    const watchOpeningHours = rawOpeningHours.map(item => ({
        ...item,
        isClosed: !!item.isClosed
    }));

    const selectedDays = watchOpeningHours.map((h) => h.day);

    const handleCuisineToggle = (cuisineName: string) => {
        if (selectedCuisines.includes(cuisineName)) {
            setValue("cuisineType", selectedCuisines.filter((name) => name !== cuisineName));
        } else {
            if (selectedCuisines.length >= LIMITS.CUISINE_TYPES) {
                toast.error(`You can select up to ${LIMITS.CUISINE_TYPES} cuisine types only.`);
                return;
            }
            setValue("cuisineType", [...selectedCuisines, cuisineName]);
        }
    };

    const handleDayToggle = (dayName: string) => {
        if (selectedDays.includes(dayName)) {
            setValue("openingHours", watchOpeningHours.filter((h) => h.day !== dayName));
        } else {
            if (watchOpeningHours.length >= 7) {
                toast.error("Maximum 7 days allowed.");
                return;
            }

            const updatedHours = [
                ...watchOpeningHours,
                { day: dayName, opens: "", closes: "", isClosed: false },
            ];

            setValue("openingHours", updatedHours);
        }
    };

    const { data: existingRestaurant, isLoading: isLoadingDetails } = useQuery({
        queryKey: ["restaurantDetails", id],
        queryFn: async () => {
            const res = await axiosInstance.get(API_ENDPOINTS.DETAILS.GET_BY_ID(id!));
            return res.data?.Data;
        },
        enabled: isEditMode && !!id,
    });

    const { data: myDashboard, isLoading: isLoadingDashboard } = useQuery({
        queryKey: ["restaurantDetails", id],
        queryFn: async () => {
            const res = await axiosInstance.get(API_ENDPOINTS.OWNER.MY_RESTAURANT);
            return res.data?.Data;
        },
        enabled: isEditMode && !!id,
    });

    useEffect(() => {
        if (existingRestaurant || myDashboard) {
            reset({
                name: existingRestaurant.name || "",
                description: existingRestaurant.description || "",
                phoneNumber: existingRestaurant.phoneNumber || "",
                whatsappNumber: existingRestaurant.whatsappNumber ?? "",
                facebookLink: existingRestaurant.facebookLink ?? "",
                delivery: !!existingRestaurant.delivery || false,
                cuisineType: existingRestaurant.cuisineType || [],
                address: existingRestaurant.address?.length
                    ? existingRestaurant.address
                    : [{ details: "", street: "", city: "", governorate: "" }],
                openingHours: existingRestaurant.openingHours?.length
                    ? existingRestaurant.openingHours
                    : [],
                email: existingRestaurant.email ?? "",
                image: null,
            });
        }
    }, [existingRestaurant, myDashboard, reset]);

    const createRestaurantApi = async (data: CreateRestaurantInput) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('delivery', data.delivery ? '1' : '0');
        formData.append('description', data.description || '');
        formData.append('cuisineType', JSON.stringify(data.cuisineType));
        formData.append('address', JSON.stringify(data.address));
        formData.append('openingHours', JSON.stringify(data.openingHours));

        if (data.image instanceof File) {
            formData.append('image', data.image);
        } else if (data.image) {
            formData.append('image', JSON.stringify(data.image));
        }

        const response = await axiosInstance.post(API_ENDPOINTS.OWNER.CREATE_RESTAURANT, formData);
        return response.data;
    };

    const updateRestaurantApi = async ({ id, data }: { id: string; data: UpdateRestaurantInput }) => {
        const response = await axiosInstance.put(API_ENDPOINTS.OWNER.UPDATE_RESTAURANT(id), data);
        return response.data;
    };

    const createMutation = useMutation({
        mutationFn: createRestaurantApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] });
            toast.success("Restaurant created successfully!");
            navigate(-1);
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data?.message || "Failed to create restaurant");
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateRestaurantApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] });
            queryClient.invalidateQueries({ queryKey: ['restaurantDetails', id] });
            toast.success("Restaurant updated successfully!");
            navigate(-1);
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data?.message || "Failed to update restaurant");
        }
    });

    const onSubmit = async (data: RestaurantFormInput) => {
        if (!isEditMode) {
            await createMutation.mutateAsync(data as CreateRestaurantInput);
        } else if (id) {
            await updateMutation.mutateAsync({ id, data: data as UpdateRestaurantInput });
        } else {
            toast.error("Missing restaurant ID for update.");
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return {
        register,
        handleSubmit,
        errors,
        control,
        setValue,
        watch,
        reset,
        isSubmitting: isPending,
        onSubmit,
        isEditMode,
        selectedCuisines,
        watchOpeningHours,
        selectedDays,
        handleCuisineToggle,
        handleDayToggle,
        isLoadingDetails,
        isLoadingDashboard
    };
};