import { FaStar, FaTrash } from "react-icons/fa";
import type { ReviewItem } from "../hooks/useReviews";

interface Props {
    review: ReviewItem;
    onDelete: (id: string) => void;
}

const ReviewCard = ({ review, onDelete }: Props) => {
    return (
        <div className="bg-background rounded-4xl p-8 shadow-sm border border-border-light relative group transition-all hover:border-primary/20">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface border border-border-light flex items-center justify-center font-bold text-text-muted text-xl">
                        {review.restaurantName ? review.restaurantName.charAt(0).toUpperCase() : "R"}
                    </div>
                    <div>
                        <h3 className="font-heading font-black text-lg text-text-primary">
                            {review.restaurantName || "Restaurant"}
                        </h3>
                        <p className="text-xs font-medium text-text-muted">
                            {review.date || "Recently"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-text-primary">
                    <div className="flex text-warning">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(review.rating) ? "text-warning" : "text-border-light"} />
                        ))}
                    </div>
                    <span className="ml-1 bg-surface px-2 py-0.5 rounded-md border border-border-light">{review.rating}</span>
                </div>
            </div>
            <div className="mb-6">
                <p className="text-text-secondary text-sm leading-relaxed italic">
                    "{review.Content || review.content}"
                </p>
            </div>
            <div className="flex justify-end border-t border-border-light pt-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                    onClick={() => onDelete(review._id || review.id || "")} 
                    className="text-danger hover:text-primary transition-colors text-sm font-bold flex items-center gap-2"
                >
                    <FaTrash size={12} /> Delete Review
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;