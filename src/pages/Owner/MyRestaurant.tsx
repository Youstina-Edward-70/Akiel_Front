import { AxiosError } from "axios";
import RestaurantCover from "../Restaurant/components/cover/RestaurantCover";
import RestaurantTabs from "../Restaurant/components/tabs/RestaurantTabs";
import SkeletonRestaurantDetails from "../Restaurant/components/SkeletonRestaurantDetails";
import NotFound from "../NotFound";
import { useMyRestaurant } from "./hooks/useMyRestaurant";

const MyRestaurant = () => {
    const { data: restaurantData, isLoading, isError, error } = useMyRestaurant();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <SkeletonRestaurantDetails />
            </div>
        );
    }

    if (isError || !restaurantData) {
        return (
            <div className="flex h-screen items-center justify-center">
                {error instanceof AxiosError && error.response?.status === 404 ? (
                    <NotFound 
                        code="404" 
                        message="No Restaurant Found!" 
                        subtitle="You haven't added your restaurant details yet. Go to Edit Profile to add one." 
                    />
                ) : (
                    <NotFound 
                        code="500" 
                        message="Something went wrong!" 
                        subtitle="We couldn't load your restaurant data. Please try again later." 
                    />
                )}
            </div>
        );
    }

    const restaurantId = restaurantData._id || restaurantData.id;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* RestaurantCover */}
            <RestaurantCover
                restaurant={restaurantData}
                isFavorite={false} 
                onToggleFavorite={() => {}} 
                isOwner={true} 
            />

            <div className="min-h-dvh px-4 sm:px-6 lg:px-8 py-8">
                {/* RestaurantTabs */}
                <RestaurantTabs 
                    restaurantId={restaurantId}
                    isOwner={true}
                    restaurant={restaurantData} 
                />
            </div>
        </div>
    );
};

export default MyRestaurant;