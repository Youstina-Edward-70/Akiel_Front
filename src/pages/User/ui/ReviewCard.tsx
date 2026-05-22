import { FaStar, FaTrash } from "react-icons/fa";
import type { ReviewItem } from "../hooks/useReviews";

interface Props {
    review: ReviewItem;
    onDelete: (id: string) => void;
}

type FlexibleReviewData = {
    restaurantId?: { _id?: string, id?: string, name?: string } | string;
    restaurant?: { _id?: string, id?: string, name?: string } | string;
    restaurantName?: string;
    createdAt?: string;
    date?: string;
    Content?: string;
    content?: string;
    rating?: number;
    _id?: string;
    id?: string;
};

const ReviewCard = ({ review, onDelete }: Props) => {
    const data = review as unknown as FlexibleReviewData;
    
    const restObj = data.restaurantId || data.restaurant;
    const restaurantName = (typeof restObj === 'object' ? restObj?.name : data.restaurantName) || "Restaurant";
    
    const targetRestId = (typeof restObj === 'object' && restObj) ? (restObj._id || restObj.id) : (typeof restObj === 'string' ? restObj : "");

    const rawDate = data.createdAt || data.date;
    let displayDate = "Recently";
    if (rawDate) {
        const dateObj = new Date(rawDate);
        if (!isNaN(dateObj.getTime())) {
            displayDate = dateObj.toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }

    const reviewContent = data.Content || data.content || "No review content provided.";
    const ratingValue = Number(data.rating) || 0;

    return (
        <div className="bg-background rounded-4xl p-8 shadow-sm border border-border-light relative group transition-all hover:border-primary/20">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface border border-border-light flex items-center justify-center font-bold text-text-muted text-xl">
                        {restaurantName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-heading font-black text-lg text-text-primary">
                            {restaurantName}
                        </h3>
                        <p className="text-xs font-medium text-text-muted">
                            {displayDate}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-text-primary">
                    <div className="flex text-warning">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(ratingValue) ? "text-[#FFD700]" : "text-border-light"} />
                        ))}
                    </div>
                    <span className="ml-1 bg-surface px-2 py-0.5 rounded-md border border-border-light">{ratingValue}</span>
                </div>
            </div>
            <div className="mb-6">
                <p className="text-text-secondary text-sm leading-relaxed italic">
                    "{reviewContent}"
                </p>
            </div>
            <div className="flex justify-end border-t border-border-light pt-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                    onClick={() => onDelete(targetRestId as string)} 
                    className="text-danger hover:text-primary transition-colors text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                    <FaTrash size={12} /> Delete Review
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;