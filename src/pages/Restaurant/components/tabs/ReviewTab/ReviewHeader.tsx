import { IoCreateOutline, IoStar } from "react-icons/io5";

const ReviewHeader = ({ resRating, count, isOwner, onWriteClick }: { resRating: number; count: number; isOwner: boolean; onWriteClick: () => void }) => {
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
                <button 
                onClick={onWriteClick}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 cursor-pointer text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">
                    <IoCreateOutline className="text-xl" />
                    Write a Review
                </button>
            )}
        </div>
    )
}

export default ReviewHeader