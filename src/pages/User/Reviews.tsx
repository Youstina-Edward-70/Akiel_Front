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

    if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-16 font-sans text-left">
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-3xl font-black text-slate-900">My Reviews</h1>
                        <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-bold">{reviews.length} Reviews</span>
                    </div>
                    <p className="text-gray-500 font-medium max-w-2xl">View and manage all your reviews.</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-8">
                {reviews.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 mt-4">
                        <div className="bg-gray-100 p-5 rounded-full text-gray-400 mb-6"><FaRegFileAlt size={32} /></div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">You haven't written any review yet!</h2>
                        <Link to="/search" className="bg-[#E31E24] text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-red-700 transition shadow-lg shadow-red-200 w-fit mx-auto mt-6"><FaSearch size={16} /> Discover restaurants</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review._id || review.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xl">
                                            {review.restaurantName ? review.restaurantName.charAt(0).toUpperCase() : "R"}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-lg text-slate-900">{review.restaurantName || "Restaurant"}</h3>
                                            <p className="text-xs font-medium text-gray-400">{review.date || "Recently"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-black text-slate-900">
                                        <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<FaStar key={i} className={i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-200"} />))}</div>
                                        <span className="ml-2">{review.rating}</span>
                                    </div>
                                </div>
                                <div className="mb-6"><p className="text-gray-500 text-sm leading-relaxed">{review.Content || review.content}</p></div>
                                <div className="flex justify-end border-t border-gray-50 pt-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleDelete(review._id || review.id)} className="text-[#E31E24] hover:text-red-700 text-sm font-bold flex items-center gap-2 transition"><FaTrash size={12} /> Delete</button>
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