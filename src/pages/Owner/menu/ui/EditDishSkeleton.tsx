import DishCardSkeleton from "./DishCardSkeleton"

const EditDishSkeleton = () => {
    return (
        <div className="min-h-screen bg-surface px-4 py-10 md:px-8">
            <div className="mx-auto max-w-6xl space-y-8 px-4 md:px-8">
                <div className="h-10 w-64 rounded bg-gray-200 animate-pulse" />
                <DishCardSkeleton />
                <div className="flex justify-end w-full md:w-auto gap-4">
                    <div className="h-14 w-34 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-14 w-34 rounded-full bg-gray-200 animate-pulse" />
                </div>
            </div>
        </div>
    )
}

export default EditDishSkeleton