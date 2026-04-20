export const RestaurantCardSkeleton = () => {
    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full h-48 bg-gray-200 rounded-2xl"></div>

            {/* Title & Rating Skeleton */}
            <div className="flex justify-between items-center">
                <div className="h-6 w-1/2 bg-gray-200 rounded-lg"></div>
                <div className="h-6 w-12 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Subtitle Skeleton */}
            <div className="h-4 w-3/4 bg-gray-100 rounded-lg"></div>

            {/* Footer (Price/Distance) Skeleton */}
            <div className="flex gap-3">
                <div className="h-5 w-16 bg-gray-100 rounded-lg"></div>
                <div className="h-5 w-20 bg-gray-100 rounded-lg"></div>
            </div>
        </div>
    );
};