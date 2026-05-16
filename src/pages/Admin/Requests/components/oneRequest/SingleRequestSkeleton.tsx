export const SingleRequestSkeleton = () => {
    return (
        <div className="space-y-5 md:space-y-6 pb-20 md:pb-12 px-4 md:px-0 animate-pulse">
            
            {/* RequestHero Skeleton */}
            <div className="w-full h-48 md:h-64 bg-gray-200 rounded-3xl relative overflow-hidden">
                <div className="absolute bottom-6 left-6 space-y-3 w-2/3 md:w-1/3">
                    <div className="h-7 bg-gray-300 rounded-xl w-3/4" />
                    <div className="h-4 bg-gray-300 rounded-lg w-1/2" />
                </div>
                <div className="absolute top-6 right-6 h-6 bg-gray-300 rounded-full w-24" />
            </div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6 items-start">
                
                {/* GeneralInfoCard Skeleton */}
                <div className="xl:col-span-2 w-full bg-white rounded-3xl p-6 md:p-8 border border-gray-50 space-y-6">
                    <div className="h-6 bg-gray-200 rounded-lg w-1/4 mb-4" />
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="p-4 bg-gray-50 rounded-2xl space-y-2">
                                <div className="h-3 bg-gray-200 rounded w-1/3" />
                                <div className="h-4 bg-gray-300 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* OperationalCard Skeleton */}
                <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-gray-50 space-y-6">
                    <div className="h-6 bg-gray-200 rounded-lg w-1/3 mb-4" />
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center py-2">
                                <div className="h-4 bg-gray-200 rounded w-1/4" />
                                <div className="h-4 bg-gray-300 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions Bar Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 md:p-5 rounded-2xl border border-gray-50 gap-4">
                <div className="h-5 bg-gray-200 rounded w-full sm:w-auto" />
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="h-10 bg-gray-200 rounded-xl w-full sm:w-28" />
                    <div className="h-10 bg-gray-300 rounded-xl w-full sm:w-28" />
                </div>
            </div>

        </div>
    );
};