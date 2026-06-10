import { useParams } from "react-router-dom";
import useMyDashboard from "./useMyDashboard"

import SkeletonDashboard from "./components/SkeletonDashboard";
import RestaurantCover from "./components/cover/RestaurantCover";
import RestaurantInfo from "./components/Info/RestaurantInfo";
import { AxiosError } from "axios";
import NotFound from "../../NotFound";

const MyDashboard = () => {
    const { id } = useParams<{ id: string }>();

    const { restaurant: restaurantData, isLoading, isError, error } = useMyDashboard(id!);

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
            {isLoading && <SkeletonDashboard />}

            {!isLoading && restaurantData && (
                <>
                    <RestaurantCover restaurant={restaurantData} />

                    <div className="min-h-dvh px-4 sm:px-6 lg:px-8 py-8">
                        <RestaurantInfo restaurant={restaurantData} />
                    </div>
                </>
            )}
        </div>
    )
}

export default MyDashboard
