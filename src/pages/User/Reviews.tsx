import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaTrash, FaRegFileAlt, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

const API_URL = "https://all-restaurants-in-one.vercel.app";

const Reviews = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const authUser = useAuthStore((state) => state.user);
    const token = (useAuthStore.getState() as any).token || (authUser as any)?.Token || (authUser as any)?.token;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${API_URL}/reviews/my-reviews`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setReviews(data.reviews || data || []);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) fetchReviews();
        else setIsLoading(false);
    }, [token]);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/reviews/delete-review/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                setReviews(prev => prev.filter(review => (review._id || review.id) !== id));
                toast.success("Review deleted successfully");
            } else {
                toast.error("Failed to delete review");
            }
        } catch (error) {
            toast.error("Network error");
        }
    };

    if (isLoading) return <div className="min-h-screen bg-surface flex items-center justify-center font-sans text-text-muted">Loading...</div>;

    return (
        <div className="min-h-screen bg-surface pb-16 font-sans text-left">
            {/* Header Section */}
            <div className="bg-background border-b border-border-light">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex flex-col gap-2 mb-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-[28px] font-heading font-black text-text-primary">My Reviews</h1>
                            <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-bold">
                                {reviews.length} Reviews
                            </span>
                        </div>
                        <p className="text-text-secondary text-sm font-medium max-w-xl leading-relaxed mt-1">
                            View and manage all the reviews and comments you've shared with restaurants across Egypt.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 mt-12">
                {reviews.length === 0 ? (
                    /* Empty State - Matched with Screenshot */
                    <div className="bg-background rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm border border-border-light max-w-3xl mx-auto">
                        <div className="bg-text-secondary/10 p-3 rounded-full text-text-secondary mb-6">
                            <FaRegFileAlt size={24} />
                        </div>
                        <h2 className="text-2xl font-heading font-black text-text-primary mb-3">
                            You haven't written any review yet!
                        </h2>
                        <p className="text-text-secondary text-sm font-medium max-w-sm leading-relaxed mb-8">
                            Share your experiences at restaurants you've recently visited and help others discover the best dishes.
                        </p>
                        <Link 
                            to="/search" 
                            className="bg-primary text-white px-8 py-3.5 rounded-[1rem] font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-hover transition shadow-sm"
                        >
                            <FaSearch size={14} /> Discover restaurants
                        </Link>
                    </div>
                ) : (
                    /* Reviews List */
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review._id || review.id} className="bg-background rounded-[2rem] p-8 shadow-sm border border-border-light relative group transition-all hover:border-primary/20">
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
                                        onClick={() => handleDelete(review._id || review.id)} 
                                        className="text-danger hover:text-primary transition-colors text-sm font-bold flex items-center gap-2"
                                    >
                                        <FaTrash size={12} /> Delete Review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;