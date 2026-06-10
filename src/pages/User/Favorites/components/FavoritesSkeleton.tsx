import { RestaurantCardSkeleton } from "../../../AllRestaurants/ui/SkeletonRestaurantCard";

const FavoritesSkeleton = () => {
    const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

    return (
        <div className="w-full flex flex-col gap-8 animate-pulse">
            <div className="flex flex-col items-start gap-3 border-b border-gray-100 pb-5">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-44 bg-gray-200 rounded-md" />
                    <div className="h-6 w-24 bg-gray-100 rounded-full" />
                </div>
                <div className="h-4 w-2/3 bg-gray-100 rounded-md sm:w-1/2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {skeletonItems.map((item) => (
                    <RestaurantCardSkeleton key={item} />
                ))}
            </div>
        </div>
    );
};

export default FavoritesSkeleton;