import { motion } from "framer-motion";
import type { Review } from "../../../types/UserSchema";
import { IoCreateOutline, IoStar, IoTrashOutline } from "react-icons/io5";
import Button from "../../../ui/Button";

const ReviewCard = ({ rev, isAuthor, onEdit, onDelete }: { rev: Review, isAuthor: boolean, onEdit: (reviwe: Review) => void, onDelete: (id: string) => void }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="group relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden shrink-0">
                        <img
                            src={rev.user?.profile_pic || `https://ui-avatars.com/api/?name=${rev.user?.fullname}`}
                            alt={`${rev.user?.fullname}`}
                            className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-0.5">
                        <h4 className="font-bold text-text-primary text-lg">{rev.user?.fullname}</h4>
                        <p className="text-gray-400 text-xs font-medium">
                            {new Date(rev.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* Rating Stars */}
                <div className="flex flex-col items-end gap-2">
                    <div className="flex text-yellow-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <IoStar
                                key={i}
                                className={i < rev.rating ? "fill-yellow-400" : "fill-gray-200"}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Review Content */}
            <div className="mt-6 space-y-3">
                <p className="text-text-secondary text-start leading-relaxed mw-w-4xl font-medium">
                    {rev.Content}
                </p>
            </div>

            {/* Action Buttons (Only for the author) */}
            {isAuthor && (
                <div className="flex justify-end items-center gap-1 mt-3">
                    <Button
                        variant="normal"
                        onClick={() => onEdit(rev)}
                        title="Edit Review"
                        className="p-2 text-gray-400 hover:text-blue-600  hover:bg-blue-50 rounded-lg shadow-none transition-colors cursor-pointer">
                        <IoCreateOutline className="text-xl" />
                    </Button>
                    <Button
                        variant="normal"
                        onClick={() => onDelete(rev._id!)}
                        title="Delete Review"
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg shadow-none transition-colors cursor-pointer"
                    >
                        <IoTrashOutline className="text-xl" />
                    </Button>
                </div>
            )}
        </motion.div>
    )
}

export default ReviewCard