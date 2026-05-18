export const SingleUserSkeleton = () => (
    <div className="space-y-6 px-4 md:px-0 animate-pulse">
        {/* Header */}
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-50">
            <div className="w-14 h-14 bg-gray-200 rounded-full shrink-0" />
            <div className="space-y-2">
                <div className="h-5 w-36 bg-gray-200 rounded-lg" />
                <div className="h-3 w-48 bg-gray-100 rounded-lg" />
            </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-50 p-6 md:p-8 space-y-6">
            <div className="h-5 w-40 bg-gray-200 rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-3 w-20 bg-gray-100 rounded" />
                        <div className="h-11 bg-gray-100 rounded-xl" />
                    </div>
                ))}
            </div>
            <div className="pt-4 border-t border-gray-50 space-y-4">
                <div className="h-4 w-24 bg-gray-100 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-3 w-16 bg-gray-100 rounded" />
                            <div className="h-11 bg-gray-100 rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-50 gap-4">
            <div className="h-5 w-20 bg-gray-100 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded-full" />
        </div>
    </div>
);
