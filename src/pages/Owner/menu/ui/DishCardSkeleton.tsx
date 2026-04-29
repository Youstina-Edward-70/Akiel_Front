const DishCardSkeleton = () => (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 md:p-10 shadow-sm">
        <div className="mb-8 h-8 w-48 rounded-md bg-gray-200" />
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <div className="h-65 w-full rounded-xl bg-gray-200 lg:max-w-82" />
            <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-12 rounded-xl bg-gray-200" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-12 rounded-xl bg-gray-200" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-32 rounded-xl bg-gray-200" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-12 rounded-xl bg-gray-200" />
                </div>
            </div>
        </div>
    </div>
);

export default DishCardSkeleton;