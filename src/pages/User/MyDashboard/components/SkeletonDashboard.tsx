const SkeletonDashboard = () => (
    <div className="w-full space-y-12 animate-pulse font-sans">

        {/* Restaurant Cover Skeleton */}
        <div className="relative h-84 md:h-112.5 w-full rounded-2xl md:rounded-3xl bg-gray-200 overflow-hidden flex flex-col justify-end p-5 md:p-12">
            <div className="w-full space-y-4">
                {/* Badges Row Skeleton */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <div className="h-8 w-28 bg-gray-300 rounded-full" />
                    <div className="h-8 w-32 bg-gray-300 rounded-full" />
                    <div className="h-8 w-24 bg-gray-300 rounded-full" />
                </div>

                {/* Title & Info Row */}
                <div className="flex flex-row justify-between items-end gap-4 md:gap-6 w-full">
                    <div className="max-w-2xl w-full space-y-3">
                        <div className="h-10 md:h-14 w-3/4 bg-gray-300 rounded-2xl" />
                        <div className="h-5 w-1/2 bg-gray-300 rounded-xl" />
                    </div>
                    {/* Circle Action Buttons */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-300" />
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-300" />
                    </div>
                </div>
            </div>
        </div>

        {/* Restaurant Info Container Skeleton */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-12">

            {/* Header Section (Title + Edit Button) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-2 h-10 bg-gray-300 rounded-full" />
                    <div className="h-8 w-64 bg-gray-200 rounded-xl" />
                </div>
                <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0 md:self-auto self-start" />
            </div>

            {/* About Section Description */}
            <div className="space-y-3 py-2">
                <div className="h-5 w-full bg-gray-200 rounded-xl" />
                <div className="h-5 w-5/6 bg-gray-200 rounded-xl" />
            </div>

            {/* Contact Details Skeleton */}
            <div className="space-y-6">
                <div className="h-6 w-40 bg-gray-200 rounded-lg" /> {/* Title */}
                <div className="grid gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                            <div className="h-5 w-48 bg-gray-200 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Opening Hours Card Skeleton */}
            <div className="space-y-6">
                <div className="h-6 w-36 bg-gray-200 rounded-lg" /> {/* Title */}
                <div className="bg-gray-100/50 rounded-3xl p-6 space-y-5 border border-gray-100">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex justify-between items-center border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                            <div className="h-5 w-20 bg-gray-200 rounded-md" />
                            <div className="h-6 w-32 bg-gray-200 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Location Card Skeleton */}
            <div className="space-y-6">
                <div className="h-6 w-48 bg-gray-200 rounded-lg" /> {/* Title */}
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                            <div className="space-y-2 w-full pt-1">
                                <div className="h-3 w-16 bg-gray-200 rounded-md" />
                                <div className="h-5 w-2/3 bg-gray-200 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Danger Zone Skeleton */}
            <div className="pt-12 border-t border-gray-100">
                <div className="bg-gray-100/40 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-200/60">
                    <div className="text-center md:text-left space-y-2 w-full md:w-auto">
                        <div className="h-6 w-36 bg-gray-200 rounded-lg mx-auto md:mx-0" />
                        <div className="h-4 w-64 md:w-96 bg-gray-200 rounded-md mx-auto md:mx-0" />
                    </div>
                    <div className="w-44 h-12 bg-gray-200 rounded-2xl shrink-0" />
                </div>
            </div>

        </div>
    </div>
);

export default SkeletonDashboard;