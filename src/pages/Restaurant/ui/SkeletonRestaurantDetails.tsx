const SkeletonRestaurantDetails = () => (
    <div className="min-h-screen bg-gray-50 animate-pulse">
        {/* Cover Skeleton */}
        <div className="relative h-120 w-full bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
                {/* Badges Row Skeleton */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-10 w-24 bg-gray-300/50 rounded-xl" />
                    ))}
                </div>

                {/* Info Skeleton (Name & Cuisine) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="space-y-4">
                        {/* Restaurant Name */}
                        <div className="h-16 md:h-20 w-80 md:w-125 bg-gray-300/50 rounded-2xl" />
                        {/* Cuisine Type */}
                        <div className="h-6 w-48 bg-gray-300/30 rounded-full" />
                    </div>

                    {/* Action Button Skeleton (Edit/Favorite) */}
                    <div className="h-16 w-16 md:w-40 bg-gray-300/50 rounded-2xl" />
                </div>
            </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white/50 py-2 rounded-2xl px-2 border border-gray-100 flex gap-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-12 w-28 bg-gray-200 rounded-xl" />
                ))}
            </div>

            {/* Content Area Skeleton */}
            <div className="mt-10 space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-gray-100 rounded-3xl" />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default SkeletonRestaurantDetails;