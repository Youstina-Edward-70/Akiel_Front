const SkeletonNotifications = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 animate-pulse font-sans">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                    <div className="h-10 w-48 bg-gray-200 rounded-xl" />
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                </div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-3">
                        <div className="h-5 w-28 bg-gray-200 rounded-md" />
                        <div className="h-4 w-16 bg-gray-100 rounded-md" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded-md pt-2" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkeletonNotifications
