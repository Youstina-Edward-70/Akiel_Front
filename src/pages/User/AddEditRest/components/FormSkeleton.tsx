const FormSkeleton = () => {
    return (
        <div className="space-y-10 animate-pulse">
            {/* Basic Info Skeleton */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div className="h-4 w-36 bg-gray-200 rounded mb-2"></div>
                    <div className="h-11 w-full bg-gray-100 rounded-xl"></div>
                </div>
            </div>

            {/* Cuisine Selector Skeleton */}
            <div className="space-y-3">
                <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
                <div className="flex gap-3 overflow-x-auto p-2 no-scrollbar">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-10 w-28 bg-gray-100 rounded-full shrink-0"></div>
                    ))}
                </div>
            </div>

            {/* Address Manager Skeleton */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-48 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
                <div className="p-5 border border-border-light rounded-xl bg-surface space-y-4">
                    <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i}>
                                <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
                                <div className="h-10 w-full bg-gray-100 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="border-border-light" />

            {/* Description & Media Skeleton */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                    <div className="h-28 w-full bg-gray-100 rounded-xl"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i}>
                            <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
                            <div className="h-11 w-full bg-gray-100 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="border-border-light" />

            {/* Opening Hours Skeleton */}
            <div className="space-y-4">
                <div className="h-3 w-36 bg-gray-200 rounded uppercase tracking-wider mb-3"></div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div key={i} className="h-9 w-14 bg-gray-100 rounded-xl"></div>
                    ))}
                </div>
            </div>

            {/* Buttons Skeleton */}
            <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="h-12 bg-gray-100 rounded-xl"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
            </div>
        </div>
    );
};

export default FormSkeleton;