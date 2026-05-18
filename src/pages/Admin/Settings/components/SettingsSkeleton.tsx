const SettingsSkeleton = () => (
    <div className="space-y-8 font-sans animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
            <div className="w-14 h-14 bg-gray-100 rounded-xl shrink-0" />
            <div className="space-y-2 w-full">
                <div className="h-6 bg-gray-100 rounded-md w-1/4" />
                <div className="h-4 bg-gray-100 rounded-md w-1/2" />
            </div>
        </div>

        {/* Sections Skeletons */}
        {[1, 2].map((index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-50 shadow-sm p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="h-5 bg-gray-100 rounded-md w-1/5" />
                    <div className="w-5 h-5 bg-gray-100 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded-md w-1/3" />
                        <div className="h-12 bg-gray-50 rounded-xl w-full" />
                    </div>
                    {index === 1 && (
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-100 rounded-md w-1/3" />
                            <div className="h-12 bg-gray-50 rounded-xl w-full" />
                        </div>
                    )}
                </div>
            </div>
        ))}

        {/* Action Buttons Footer Skeleton */}
        <div className="flex items-center justify-end gap-4 pt-4">
            <div className="w-36 h-11 bg-gray-100 rounded-full" />
            <div className="w-36 h-11 bg-gray-100 rounded-full" />
        </div>
    </div>
);

export default SettingsSkeleton;