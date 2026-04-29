import { useParams } from "react-router-dom";
import RestaurantCover from "./components/cover/RestaurantCover";
import RestaurantTabs from "./components/tabs/RestaurantTabs";
import { useToggleFavorite } from "./hooks/useToggleFavorite";
import { useAuthStore } from "../../store/authStore";
import useRestaurantDetails from "./hooks/useRestaurantDetails";
import SkeletonRestaurantDetails from "./ui/SkeletonRestaurantDetails";
import NotFound from "../NotFound";
import { AxiosError } from "axios";


const RestaurantDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuthStore();

    const { restaurant: restaurantData, isLoading, isError, error } = useRestaurantDetails(id!);

    const isOwner = user?.id === restaurantData?.Owner;

    const { isFavorite, toggleFavorite } = useToggleFavorite(id!);

    if (isError || !restaurantData) {
        return (
            <div className="flex h-screen items-center justify-center">
                {error instanceof AxiosError && error.response?.status === 404 ? (
                    <NotFound code="404" message="This restaurant is still a mystery to us." subtitle="We haven't added this spot to our cookbook yet. Maybe it's a secret, or perhaps it's brand new! Try searching for another culinary gem." />
                ) : (
                    <NotFound code="500" message="The kitchen is currently in a rush!" subtitle="Our chefs are dealing with a temporary issue. Please take a seat and refresh the page in a moment." />
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {isLoading && <SkeletonRestaurantDetails />}

            {!isLoading && restaurantData && (
                <>
                    {/* RestaurantCover */}
                    < RestaurantCover
                        restaurant={restaurantData}
                        isFavorite={isFavorite}
                        onToggleFavorite={() => toggleFavorite()}
                        isOwner={isOwner}
                    />

                    <div className="min-h-dvh px-4 sm:px-6 lg:px-8 py-8">
                        {/* RestaurantTabs */}
                        <RestaurantTabs restaurantId={id!}
                            isOwner={isOwner}
                            restaurant={restaurantData} />
                    </div>
                </>
            )}
        </div >
    );
};

export default RestaurantDetails;