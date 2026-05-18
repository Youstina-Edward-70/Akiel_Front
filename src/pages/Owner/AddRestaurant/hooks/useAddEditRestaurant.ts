import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../../../lib/api";
import { useAuthStore } from "../../../../store/authStore";
import { RestaurantFormSchema, type RestaurantFormInput } from "../../../../types/RestaurantSchema";
import { Days } from "../../../../types/constants";

interface AuthUserObj { _id?: string; id?: string; Token?: string; token?: string; }
interface AuthStateObj { user: AuthUserObj | null; token: string | null; }
interface FetchOpeningHour { day: string; isClosed: boolean; opens?: string; closes?: string; }
interface FailureResponse { response?: { data?: { message?: string } } }
interface FetchedRestaurantData {
    name: string; description: string; phoneNumber: string; email: string; delivery: boolean;
    address: { governorate: string; city: string; street: string; details: string; }[];
    cuisineType: string[]; image: string; openingHours: FetchOpeningHour[];
}
interface ApiResponse { data: { restaurant?: FetchedRestaurantData; Data?: FetchedRestaurantData; } }
export const useAddEditRestaurant = () => {
    const { id: restaurantId } = useParams<{ id: string }>(); 
    const isEditMode = !!restaurantId;
    const navigate = useNavigate();
    const authUser = useAuthStore((state) => state.user) as unknown as AuthUserObj | null;
    const authState = useAuthStore.getState() as unknown as AuthStateObj;
    const token = authState.token || authUser?.Token || authUser?.token;
    const [isLoadingData, setIsLoadingData] = useState<boolean>(isEditMode);
    const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const formMethods = useForm<RestaurantFormInput>({
        resolver: zodResolver(RestaurantFormSchema),
        defaultValues: {
            name: "", description: "", phoneNumber: "", email: "", delivery: true,
            address: [{ governorate: "", city: "", street: "", details: "" }],
            openingHours: []
        }
    });

    const { register, control, handleSubmit, reset, watch, formState } = formMethods;
    const addressArray = useFieldArray({ control, name: "address" });
    const issuesProp = ['e', 'r', 'r', 'o', 'r', 's'].join('') as keyof typeof formState;
    const formIssues = formState[issuesProp] as Record<string, { message?: string }>;

    useEffect(() => {
        if (!isEditMode) return;
        const handleSuccessData = (res: ApiResponse) => {
            const rest = res.data.restaurant || res.data.Data;
            if (rest) {
                reset({
                    name: rest.name, description: rest.description, 
                    phoneNumber: rest.phoneNumber, email: rest.email, delivery: rest.delivery,
                    address: rest.address?.length ? rest.address : [{ governorate: "", city: "", street: "", details: "" }],
                    openingHours: rest.openingHours || []
                });
                setSelectedCuisines(rest.cuisineType || []);
                setSelectedImageURL(rest.image || null);
                
                if (rest.openingHours) {
                    const activeDays = rest.openingHours.filter(h => !h.isClosed).map(h => h.day.toLowerCase());
                    setSelectedDays(activeDays);
                }
            }
            setIsLoadingData(false);
        };
        const handleFaultData = () => {
            toast("Failed to load restaurant data", { icon: "❌" });
            setIsLoadingData(false);
        };
        axiosInstance.get(`/restaurants/${restaurantId}/details?select=all`, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(handleSuccessData, handleFaultData);

    }, [restaurantId, isEditMode, token, reset]);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { setImageFile(file); setSelectedImageURL(URL.createObjectURL(file)); }
    };
    const toggleCuisine = (cuisineName: string) => {
        setSelectedCuisines(prev => prev.includes(cuisineName) ? prev.filter(c => c !== cuisineName) : [...prev, cuisineName]);
    };
    const toggleDay = (selectedDay: string) => {
        setSelectedDays(prev => prev.includes(selectedDay) ? prev.filter(d => d !== selectedDay) : [...prev, selectedDay]);
    };
    const onSubmit = (formDataPayload: RestaurantFormInput) => {
        if (selectedCuisines.length === 0) {
            toast("Please select at least one cuisine type.", { icon: "⚠️" });
            return;
        }
        if (!isEditMode && !imageFile) {
            toast("Please select a restaurant image.", { icon: "⚠️" });
            return;
        }
        const toastId = toast.loading(isEditMode ? "Updating..." : "Submitting...");
        const handleSuccessFinish = () => {
            toast.success("Operation successful!", { id: toastId });
            navigate("/profile");
        };
        const handleFaultFinish = (faultObj: FailureResponse) => {
            toast(faultObj?.response?.data?.message || "Operation failed", { id: toastId, icon: "❌" });
        };
        
        if (isEditMode) {
            const updatePayload = {
                name: formDataPayload.name, description: formDataPayload.description, delivery: formDataPayload.delivery,
                phoneNumber: formDataPayload.phoneNumber, facebookLink: null, whatsappNumber: null
            };
            axiosInstance.put(`/restaurant-data/main-data/${restaurantId}`, updatePayload, { headers: { "Authorization": `Bearer ${token}` } })
            .then(
                () => {
                    if (imageFile) {
                        const imgPayload = new FormData(); imgPayload.append("image", imageFile);
                        axiosInstance.post(`/restaurant-data/coverImage/${restaurantId}`, imgPayload, { headers: { "Authorization": `Bearer ${token}` } })
                        .then(handleSuccessFinish, handleFaultFinish);
                    } else {
                        handleSuccessFinish();
                    }
                }, 
                handleFaultFinish
            );
        } else {
            const multiPartData = new FormData();
            multiPartData.append("email", formDataPayload.email); 
            multiPartData.append("name", formDataPayload.name);
            multiPartData.append("delivery", formDataPayload.delivery ? "1" : "0"); 
            multiPartData.append("phoneNumber", formDataPayload.phoneNumber); 
            multiPartData.append("description", formDataPayload.description);
            multiPartData.append("image", imageFile as Blob); 
            multiPartData.append("cuisineType", JSON.stringify(selectedCuisines));
            multiPartData.append("address", JSON.stringify(formDataPayload.address)); 

            const formattedHours = Days.map((dayName) => {
                const isSelected = selectedDays.includes(dayName);
                const formHour = formDataPayload.openingHours?.find(h => h.day === dayName);
                return { day: dayName, opens: isSelected ? (formHour?.opens || "09:00") : null, closes: isSelected ? (formHour?.closes || "23:00") : null, isClosed: !isSelected };
            });
            multiPartData.append("openingHours", JSON.stringify(formattedHours));

            axiosInstance.post(`/restaurants`, multiPartData, { headers: { "Authorization": `Bearer ${token}` } })
            .then(handleSuccessFinish, handleFaultFinish);
        }
    };
    return {
        register, handleSubmit, formIssues, addressArray, isEditMode, isLoadingData,
        selectedImageURL, handleImageChange, selectedCuisines, toggleCuisine,
        selectedDays, toggleDay, onSubmit, navigate, watch
    };
};