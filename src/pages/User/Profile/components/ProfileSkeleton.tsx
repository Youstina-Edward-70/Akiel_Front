export const ProfileSkeleton = () => {
    return (
        <section className="max-w-6xl mx-auto py-12 px-4 animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 shrink-0 animate-shimmer" />
                <div className="flex-1 flex flex-col items-center md:items-start gap-3 w-full">
                    <div className="h-8 bg-gray-200 rounded-lg w-1/3" />
                    <div className="h-4 bg-gray-200 rounded-lg w-1/4" />
                    <div className="flex gap-3 mt-2 w-full justify-center md:justify-start">
                        <div className="h-10 bg-gray-200 rounded-2xl w-28" />
                        <div className="h-10 bg-gray-200 rounded-2xl w-40" />
                    </div>
                </div>
            </div>

            {/* Main Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Details Card Skeleton */}
                <div className="lg:col-span-2 bg-gray-50 p-8 rounded-2xl border border-gray-100 space-y-6">
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 rounded-lg w-1/4" />
                        <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 border-b border-gray-200 pb-8">
                        {/* Full Name Skeleton */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                            <div className="space-y-2 w-full mt-1">
                                <div className="h-3 bg-gray-200 rounded w-1/4" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                            </div>
                        </div>

                        {/* Phone Skeleton */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                            <div className="space-y-2 w-full mt-1">
                                <div className="h-3 bg-gray-200 rounded w-1/4" />
                                <div className="h-4 bg-gray-200 rounded w-2/4" />
                            </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-8">
                            {/* Email Skeleton */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                                <div className="space-y-2 w-full mt-1">
                                    <div className="h-3 bg-gray-200 rounded w-12" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>

                            {/* Address Skeleton */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                                <div className="space-y-2 w-full mt-1">
                                    <div className="h-3 bg-gray-200 rounded w-16" />
                                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-28 mt-6" />
                </div>

                {/* Sidebar Skeleton */}
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4 w-full">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                                <div className="space-y-2 w-full">
                                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="h-14 bg-gray-200 rounded-2xl w-full" />
                </div>
            </div>
        </section>
    );
};