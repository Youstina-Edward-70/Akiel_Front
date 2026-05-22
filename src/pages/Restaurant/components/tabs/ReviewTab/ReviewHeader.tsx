import { IoCreateOutline, IoStar } from "react-icons/io5";
import Button from "../../../../../ui/Button";

const ReviewHeader = ({ resRating, count, isNotAuthorToReview, onWriteClick, hasReviewed }: { resRating: number; count: number; isNotAuthorToReview: boolean; onWriteClick: () => void, hasReviewed: boolean }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 pb-6 mb-10 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="w-2 h-12 bg-primary rounded-full" />
                <div>
                    <h2 className="text-3xl font-black text-text-primary tracking-tight">
                        Users Reviews
                    </h2>
                    <div className="flex items-center gap-2 mt-1.5">
                        <IoStar className="text-yellow-400 text-lg" />
                        <span className="font-bold text-base text-text-primary">{resRating?.toFixed(1) || "0.0"}</span>
                        <span className="text-gray-400 font-medium text-sm">({count} reviews)</span>
                    </div>
                </div>
            </div>

            {!isNotAuthorToReview && (
                <Button
                    variant="primary"
                    onClick={onWriteClick}
                    className="group p-4 rounded-full flex items-center gap-0 hover:gap-2"
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