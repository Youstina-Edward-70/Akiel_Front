const ReviewSkeleton = () => {
    return (
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4 animate-pulse">
            {/* Header: Avatar + Info + Stars */}
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    {/* Avatar Skeleton */}
                    <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0" />

                    {/* Name & Date Skeleton */}
                    <div className="space-y-2 py-1">
                        <div className="h-4 w-32 bg-gray-200 rounded-md" />
                        <div className="h-3 w-20 bg-gray-100 rounded-md" />
                    </div>
                </div>

                {/* Stars Skeleton */}
                <div className="h-6 w-24 bg-yellow-50 rounded-lg" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-2 mt-4">
                <div className="h-3.5 w-full bg-gray-100 rounded-md" />
                <div className="h-3.5 w-[90%] bg-gray-100 rounded-md" />
                <div className="h-3.5 w-[60%] bg-gray-100 rounded-md" />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-50">
                <div className="h-8 w-8 bg-gray-50 rounded-lg" />
                <div className="h-8 w-8 bg-gray-50 rounded-lg" />
            </div>
        </div>
    );
};

export default ReviewSkeleton;