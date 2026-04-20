const SkeletonMenuItemCard = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse shadow-sm">
            {/* Image Section Skeleton */}
            <div className="h-44 bg-gray-200" />

            {/* Content Section Skeleton */}
            <div className="p-4 flex flex-col grow space-y-4">
                <div className="flex justify-between items-start">
                    {/* Dish Name */}
                    <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
                    {/* Price */}
                    <div className="h-5 w-16 bg-primary/10 rounded-md" />
                </div>

                {/* Description Lines */}
                <div className="space-y-2 grow">
                    <div className="h-3 w-full bg-gray-100 rounded-md" />
                    <div className="h-3 w-full bg-gray-100 rounded-md" />
                    <div className="h-3 w-2/3 bg-gray-100 rounded-md" />
                </div>
            </div>
        </div>
    );
};

export const SkeletonMenuSection = () => (
    <div className="space-y-8 mb-16">
        {/* Section Header Skeleton */}
        <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-gray-200 rounded-full" />
            <div className="h-7 w-40 bg-gray-200 rounded-full" />
            <div className="h-6 w-12 bg-gray-100 rounded-full" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[...Array(3)].map((_, i) => (
                <SkeletonMenuItemCard key={i} />
            ))}
        </div>
    </div>
);

export default SkeletonMenuItemCard;