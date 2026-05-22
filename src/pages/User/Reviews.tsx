import { useReviews } from "./hooks/useReviews";
import ReviewCard from "./ui/ReviewCard";
import EmptyReviews from "./ui/EmptyReviews";

const Reviews = () => {
    const { reviews, isLoading, handleDelete } = useReviews();

    if (isLoading) return <div className="min-h-screen bg-surface flex items-center justify-center font-sans text-text-muted">Loading...</div>;

    return (
        <div className="min-h-screen bg-surface pb-16 font-sans text-left">
            <div className="bg-background border-b border-border-light">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex flex-col gap-2 mb-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-[28px] font-heading font-black text-text-primary">My Reviews</h1>
                            <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-bold">
                                {Array.isArray(reviews) ? reviews.length : 0} Reviews
                            </span>
                        </div>
                        <p className="text-text-secondary text-sm font-medium max-w-xl leading-relaxed mt-1">
                            View and manage all the reviews and comments you've shared with restaurants across Egypt.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-12">
                {(!reviews || !Array.isArray(reviews) || reviews.length === 0) ? (
                    <EmptyReviews />
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <ReviewCard 
                                key={review._id || review.id} 
                                review={review} 
                                onDelete={handleDelete} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;