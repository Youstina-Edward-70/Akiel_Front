import { FaStar } from "react-icons/fa";
import { useAddReview } from "./hooks/useAddReview";
import InteractiveStars from "./ui/InteractiveStars";

const AddReview = () => {
    const {
        restaurant,
        rating,
        setRating,
        content,
        setContent,
        isSubmitting,
        isLoading,
        isEditing,
        handleSubmit,
        handleCancel
    } = useAddReview();

    if (isLoading) {
        return <div className="min-h-screen bg-surface flex items-center justify-center font-sans text-text-muted">Loading...</div>;
    }

    const restaurantRating = Number(restaurant?.rating || 0);
    const placeholderImg = `https://ui-avatars.com/api/?name=${restaurant?.name || "R"}&background=FDEADD&color=F2704E&size=150`;
    const restaurantImage = restaurant?.coverPhoto?.url || restaurant?.image || placeholderImg;

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-4 font-sans text-center">
            <div className="bg-background w-full max-w-xl rounded-4xl p-10 shadow-sm border border-border-light">
                
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 shadow-sm bg-gray-100 border border-gray-200">
                        <img 
                            src={restaurantImage} 
                            alt={restaurant?.name || "Restaurant"} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="text-2xl font-heading font-black text-text-primary mb-2">
                        {restaurant?.name || "Restaurant Name"}
                    </h1>
                    <div className="flex items-center gap-1 text-sm font-bold text-text-muted">
                        <div className="flex text-[#FFD700]">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} size={14} className={i < Math.floor(restaurantRating) ? "text-[#FFD700]" : "text-border-light"} />
                            ))}
                        </div>
                        <span className="ml-1">{restaurant?.rating ? `${restaurantRating.toFixed(1)} Rating` : "No Ratings Yet"}</span>
                    </div>
                </div>

                <h2 className="text-xl font-heading font-black text-text-primary mb-6">
                    {isEditing ? "Edit your review for" : "Write your review for"} {restaurant?.name || "this restaurant"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col text-left">
                    <InteractiveStars rating={rating} setRating={setRating} />

                    <div className="mb-8">
                        <label className="block text-xs font-bold text-text-secondary mb-2">
                            Your Feedback
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your experience in detail..."
                            className="w-full bg-surface border border-border-light rounded-xl p-4 min-h-30 resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                        ></textarea>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="flex-1 bg-surface border border-border-light text-text-primary font-bold py-3.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isSubmitting ? (isEditing ? "Updating..." : "Posting...") : (isEditing ? "Update Review" : "Post Review")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReview;