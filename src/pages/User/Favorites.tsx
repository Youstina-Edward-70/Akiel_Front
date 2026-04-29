import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

const API_URL = "https://all-restaurants-in-one.vercel.app";

const Favorites = () => {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const authUser = useAuthStore((state) => state.user);
    const token = (useAuthStore.getState() as any).token || (authUser as any)?.Token || (authUser as any)?.token;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`${API_URL}/favorites`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setFavorites(data.favorites || data || []); 
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) fetchFavorites();
        else setIsLoading(false);
    }, [token]);

    const handleRemoveFavorite = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/favorites/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                setFavorites(prev => prev.filter(rest => (rest._id || rest.id) !== id));
                toast.success("Removed from favorites");
            } else {
                toast.error("Failed to remove");
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
                        <h1 className="text-3xl font-black text-slate-900">My Favorites</h1>
                        <span className="bg-red-50 text-[#E31E24] px-3 py-1 rounded-full text-xs font-bold transition-all">{favorites.length} Restaurants</span>
                    </div>
                    <p className="text-gray-500 font-medium max-w-2xl">Your curated list of must-visit spots.</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8">
                {favorites.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 mt-4">
                        <div className="bg-gray-100 p-4 rounded-full text-gray-400 mb-6"><FaHeart size={28} /></div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Your collection is empty!</h2>
                        <Link to="/search" className="bg-[#E31E24] text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-red-700 transition shadow-lg shadow-red-200 mx-auto w-fit mt-6"><FaSearch size={16} /> Discover restaurants</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((rest) => (
                            <div key={rest._id || rest.id} className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={rest.image || "/placeholder.jpg"} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <button onClick={() => handleRemoveFavorite(rest._id || rest.id)} className="absolute top-3 right-3 bg-white p-2.5 rounded-full text-[#E31E24] shadow-md hover:scale-110 transition group/btn">
                                        <FaHeart size={16} className="block group-hover/btn:hidden" />
                                        <FaRegHeart size={16} className="hidden group-hover/btn:block text-gray-400" />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-lg font-black text-slate-900 line-clamp-1">{rest.name}</h3>
                                        <div className="flex items-center gap-1 text-sm font-black text-slate-700 bg-gray-50 px-2 py-1 rounded-lg"><FaStar className="text-yellow-400" size={14} /> {rest.rating || "N/A"}</div>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 mb-4 line-clamp-1">{rest.cuisineType ? rest.cuisineType.join(" • ") : "Restaurant"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;