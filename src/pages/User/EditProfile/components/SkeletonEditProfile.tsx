const SkeletonEditProfile = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-start animate-pulse">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header / Avatar Skeleton */}
                <div className="flex flex-col items-center text-center space-y-3">
                    {/* Avatar Circle */}
                    <div className="w-24 h-24 md:w-30 md:h-30 rounded-full bg-gray-200 border-2 border-gray-100 shadow-xl" />

                    {/* Name & Role */}
                    <div className="flex flex-col items-center space-y-2 w-full">
                        <div className="h-6 bg-gray-200 rounded-md w-48" />
                        <div className="h-4 bg-gray-200 rounded-md w-24" />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Basic Information Section */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6">
                        {/* Section Title */}
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-gray-200 rounded-full" />
                            <div className="h-5 bg-gray-200 rounded-md w-40" />
                        </div>

                        {/* Inputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded-md w-16" />
                                <div className="h-11 bg-gray-100 rounded-xl w-full" />
                            </div>
                            {/* Phone Number */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded-md w-24" />
                                <div className="h-11 bg-gray-100 rounded-xl w-full" />
                            </div>
                            {/* Email Address */}
                            <div className="space-y-2 md:col-span-2">
                                <div className="h-4 bg-gray-200 rounded-md w-24" />
                                <div className="h-11 bg-gray-100 rounded-xl w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Address Details Section */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6">
                        {/* Section Title */}
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-gray-200 rounded-full" />
                            <div className="h-5 bg-gray-200 rounded-md w-36" />
                        </div>

                        {/* Address Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Details */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded-md w-12" />
                                <div className="h-11 bg-gray-100 rounded-xl w-full" />
                            </div>
                            {/* Street */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded-md w-12" />
                                <div className="h-11 bg-gray-100 rounded-xl w-full" />
                            </div>
                            {/* City */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded-md w-10" />
                                <div className="h-11 bg-gray-100 rounded-xl w-full" />
                            </div>
                            {/* Governorate */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded-md w-20" />
                                <div className="h-11 bg-gray-100 rounded-xl w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                        {/* Cancel Button */}
                        <div className="w-full sm:w-auto sm:flex-1 h-14 bg-gray-200 rounded-full max-w-xs md:max-w-none" />
                        {/* Save Button */}
                        <div className="w-full sm:w-auto sm:flex-1 h-14 bg-gray-200 rounded-full max-w-xs md:max-w-none" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SkeletonEditProfile
