import { IoCreateOutline, IoStar } from "react-icons/io5";
import Button from "../../../../../ui/Button";

const ReviewHeader = ({ resRating, count, isOwner, onWriteClick, hasReviewed }: { resRating: number; count: number; isOwner: boolean; onWriteClick: () => void, hasReviewed: boolean }) => {
    return (
        <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-primary rounded-full" />
                    <h2 className="text-2xl font-black text-text-primary tracking-tight">
                        Users Reviews
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <IoStar className="text-yellow-400 text-lg" />
                    <span className="font-bold text-lg text-text-primary">{resRating?.toFixed(1) || "0.0"}</span>
                    <span className="text-gray-500 text-sm">({count} reviews)</span>
                </div>
            </div>

            {!isOwner && (
                <Button
                    variant="primary"
                    onClick={onWriteClick}
                    className="group p-4 rounded-full shadow-2xl flex items-center gap-0 hover:gap-2 transition-all duration-300"
                >
                    <IoCreateOutline className="text-3xl" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
                        {hasReviewed ? "Edit My Review" : "Write a Review"}
                    </span>
                </Button>
            )}
        </div>
    )
}

export default ReviewHeader