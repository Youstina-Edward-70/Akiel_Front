import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaTrash, FaRegFileAlt, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

// واجهة بيانات الريفيو من الباك إند
interface Review {
    id: string;
    restaurantName: string;
    restaurantLogo: string;
    date: string;
    rating: number;
    title: string;
    content: string;
}

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // داتا وهمية (امسحي الداتا وخليها [] عشان تشوفي الـ Empty State)
        const fetchReviews = async () => {
            const mockData = [
                {
                    id: "1",
                    restaurantName: "Sobhy Kaber",
                    restaurantLogo: "https://via.placeholder.com/50/E31E24/FFFFFF?text=SK",
                    date: "January 15, 2026",
                    rating: 4.5,
                    title: "Amazing food and service!",
                    content: "The Koshary was incredible and the service was very fast. Highly recommended for anyone visiting Cairo looking for an authentic experience!"
                },
                {
                    id: "2",
                    restaurantName: "Zooba",
                    restaurantLogo: "https://via.placeholder.com/50/D97706/FFFFFF?text=ZB",
                    date: "January 22, 2026",
                    rating: 5.0,
                    title: "Best Hawawshi in town!",
                    content: "I've been to many Zooba branches but this one has the best atmosphere. The Hawawshi was perfectly spiced and the hibiscus juice was refreshing."
                },
                {
                    id: "3",
                    restaurantName: "Abou El Sid",
                    restaurantLogo: "https://via.placeholder.com/50/F59E0B/FFFFFF?text=AS",
                    date: "December 30, 2025",
                    rating: 4.0,
                    title: "Classic Egyptian vibe",
                    content: "A bit pricey but the Molokhia is unbeatable. The decor takes you back in time."
                }
            ];

            setTimeout(() => {
                setReviews(mockData); // خليها [] للتجربة
                setIsLoading(false);
            }, 500);
        };

        fetchReviews();
    }, []);

    const handleDelete = (id: string) => {
        setReviews(reviews.filter(review => review.id !== id));
        toast.success("Review deleted successfully");
    };

    if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-16 font-sans text-left">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-3xl font-black text-slate-900">My Reviews</h1>
                        <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-bold">
                            {reviews.length} Reviews
                        </span>
                    </div>
                    <p className="text-gray-500 font-medium max-w-2xl">
                        View and manage all the reviews and comments you've shared with restaurants across Egypt.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-8">
                {reviews.length === 0 ? (
                    /* ---------------- EMPTY STATE ---------------- */
                    <div className="bg-white rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 mt-4">
                        <div className="bg-gray-100 p-5 rounded-full text-gray-400 mb-6">
                            <FaRegFileAlt size={32} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                            You haven't written any review yet!
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md font-medium leading-relaxed mx-auto">
                            Share your experiences at restaurants you've recently visited and help others discover the best dishes.
                        </p>
                        <Link 
                            to="/search" 
                            className="bg-[#E31E24] text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-red-700 transition shadow-lg shadow-red-200 w-fit mx-auto"
                        >
                            <FaSearch size={16} /> Discover restaurants
                        </Link>
                    </div>
                ) : (
                    /* ---------------- POPULATED STATE ---------------- */
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative group">
                                <div className="flex justify-between items-start mb-6">
                                    {/* Restaurant Info */}
                                    <div className="flex items-center gap-4">
                                        <img src={review.restaurantLogo} alt={review.restaurantName} className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <h3 className="font-black text-lg text-slate-900">{review.restaurantName}</h3>
                                            <p className="text-xs font-medium text-gray-400">{review.date}</p>
                                        </div>
                                    </div>
                                    {/* Rating */}
                                    <div className="flex items-center gap-1 text-sm font-black text-slate-900">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-200"} />
                                            ))}
                                        </div>
                                        <span className="ml-2">{review.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="mb-6">
                                    <h4 className="font-black text-slate-900 mb-2">{review.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{review.content}</p>
                                </div>

                                {/* Delete Button */}
                                <div className="flex justify-end border-t border-gray-50 pt-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleDelete(review.id)}
                                        className="text-[#E31E24] hover:text-red-700 text-sm font-bold flex items-center gap-2 transition"
                                    >
                                        <FaTrash size={12} /> Delete
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