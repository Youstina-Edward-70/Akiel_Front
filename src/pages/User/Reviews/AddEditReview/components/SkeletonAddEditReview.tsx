export const SkeletonAddEditReview = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10 p-4 animate-pulse">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full p-6 md:p-8 flex flex-col items-center">
                {/* RestImage */}
                <div className="w-20 h-20 rounded-xl bg-gray-200 mb-4" />
                {/* RestName */}
                <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
                {/* RestRating */}
                <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
                {/* Heading */}
                <div className="h-5 w-64 bg-gray-200 rounded mb-6" />
                {/* Star Rating */}
                <div className="h-10 w-44 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-20 bg-gray-200 rounded mb-6" />
                {/* Review Content */}
                <div className="w-full h-36 bg-gray-200 rounded-xl mb-6" />
                {/* Buttons */}
                <div className="flex gap-4 w-full">
                    <div className="flex-1 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1 h-12 bg-gray-200 rounded-full" />
                </div>
            </div>
        </div>
    );
};