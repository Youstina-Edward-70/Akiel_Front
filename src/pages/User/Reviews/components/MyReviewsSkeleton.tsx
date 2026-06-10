import { motion } from "framer-motion";
import ReviewSkeleton from "../../../Restaurant/components/tabs/ReviewTab/SkeletonReviewCard";

const MyReviewsSkeleton = () => {
    const skeletonItems = [1, 2, 3];

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col items-start gap-3 border-b border-gray-100 pb-5 animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-40 bg-gray-200 rounded-md" />
                    <div className="h-6 w-14 bg-gray-100 rounded-full" />
                </div>
                <div className="h-4 w-3/4 bg-gray-100 rounded-md" />
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-5 w-full"
            >
                {skeletonItems.map((item) => (
                    <ReviewSkeleton key={item} />
                ))}
            </motion.div>
        </div>
    );
};

export default MyReviewsSkeleton;