import { motion } from "framer-motion";
import type { ReviewUser } from "../../../../types/UserSchema";
import { IoCreateOutline, IoStar, IoStarHalf, IoTrashOutline } from "react-icons/io5";
import Button from "../../../../ui/Button";
import { formatDate } from "../../../../utils/formatters";

interface ReviewUserCardProps {
    rev: ReviewUser;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting?: boolean;
}

const ReviewCard = ({ rev, onEdit, onDelete, isDeleting }: ReviewUserCardProps) => {
    const coverPhotoUrl =
        rev.restaurant?.coverPhoto && !(rev.restaurant.coverPhoto instanceof File)
            ? rev.restaurant.coverPhoto.url
            : `https://ui-avatars.com/api/?name=${rev.restaurant?.name || "?"}`;
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="group relative p-4 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"        >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                <div className="flex gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 overflow-hidden shrink-0">
                        <img
                            src={coverPhotoUrl}
                            alt={`${rev.restaurant?.name || "UNKNOWN"}`}
                            className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-0.5">
                        <h4 className="font-bold text-text-primary text-base sm:text-lg">{rev.restaurant?.name || "UNKNOWN"}</h4>
                        <p className="text-gray-400 text-[10px] sm:text-xs font-medium">
                            {formatDate(rev.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center sm:flex-col sm:items-end gap-2">
                    <span className="text-xs font-bold text-gray-500">
                        ({rev.rating.toFixed(2)})
                    </span>
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => {
                            const ratingValue = i + 1;
                            const starProps = {
                                size: 18,
                                className: "transition-colors duration-200"
                            }
                            return (
                                <span key={i}>
                                    {rev.rating >= ratingValue ? (
                                        <IoStar {...starProps} className={`${starProps.className} fill-yellow-400`} />
                                    ) : rev.rating >= ratingValue - 0.5 ? (
                                        <IoStarHalf {...starProps} className={`${starProps.className} fill-yellow-400`} />
                                    ) : (
                                        <IoStar {...starProps} className={`${starProps.className} fill-gray-200`} />
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Review Content */}
            <div className="mt-4 sm:mt-6 space-y-3">
                <p className="text-text-secondary text-start leading-relaxed max-w-4xl font-medium text-sm sm:text-base">
                    {rev.Content}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-1 mt-4">
                {/* Edit Button */}
                <Button
                    variant="normal"
                    onClick={onEdit}
                    title="Edit Review"
                    className="p-2 text-gray-400 hover:text-blue-600  hover:bg-blue-50 rounded-lg shadow-none transition-colors cursor-pointer">
                    <IoCreateOutline size={22} />
                </Button>

                {/* Delete Button */}
                <Button
                    variant="normal"
                    onClick={onDelete}
                    title="Delete Review"
                    className={`p-2 rounded-lg shadow-none transition-colors cursor-pointer
                            ${isDeleting ? "text-gray-300" : "text-gray-400 hover:text-red-600 hover:bg-red-50"}`}
                >
                    <IoTrashOutline size={22} className={isDeleting ? "animate-pulse" : ""} />
                </Button>
            </div>
        </motion.div>
    )
}

export default ReviewCard