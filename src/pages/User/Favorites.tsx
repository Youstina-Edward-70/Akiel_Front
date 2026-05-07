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

    if (isLoading) return <div className="min-h-screen bg-surface flex items-center justify-center font-sans text-text-muted">Loading...</div>;

    return (
        <div className="min-h-screen bg-surface pb-16 font-sans text-left">
            {/* Header Section */}
            <div className="bg-background border-b border-border-light">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex flex-col gap-2 mb-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-[28px] font-heading font-black text-text-primary">My Favorites</h1>
                            <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-bold">
                                {favorites.length} Restaurants
                            </span>
                        </div>
                        <p className="text-text-secondary text-sm font-medium max-w-xl leading-relaxed mt-1">
                            Your curated list of must-visit spots. From traditional Koshary to the finest grills across Egypt.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 mt-12">
                {favorites.length === 0 ? (
                    /* Empty State - Matched with Screenshot */
                    <div className="bg-background rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm border border-border-light max-w-3xl mx-auto">
                        <div className="bg-text-secondary/10 p-3 rounded-full text-text-secondary mb-6">
                            <FaHeart size={20} />
                        </div>
                        <h2 className="text-2xl font-heading font-black text-text-primary mb-3">
                            Your collection of favorites is empty!
                        </h2>
                        <p className="text-text-secondary text-sm font-medium max-w-sm leading-relaxed mb-8">
                            No favorites yet? Explore our top-rated spots, save your cravings, and keep all your culinary gems in one place.
                        </p>
                        <Link 
                            to="/search" 
                            className="bg-primary text-white px-8 py-3.5 rounded-[1rem] font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-hover transition shadow-sm"
                        >
                            <FaSearch size={14} /> Discover restaurants
                        </Link>
                    </div>
                ) : (
                    /* Favorites Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((rest) => (
                            <div key={rest._id || rest.id} className="bg-background rounded-[1.5rem] overflow-hidden shadow-sm border border-border-light hover:shadow-md transition group">
                                <div className="relative h-48 overflow-hidden bg-surface">
                                    <img src={rest.image || "/placeholder.jpg"} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <button 
                                        onClick={() => handleRemoveFavorite(rest._id || rest.id)} 
                                        className="absolute top-3 right-3 bg-background p-2.5 rounded-full text-primary shadow-md hover:scale-110 transition group/btn"
                                    >
                                        <FaHeart size={16} className="block group-hover/btn:hidden" />
                                        <FaRegHeart size={16} className="hidden group-hover/btn:block text-text-muted" />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-lg font-black text-text-primary line-clamp-1">{rest.name}</h3>
                                        <div className="flex items-center gap-1 text-sm font-black text-text-primary bg-surface border border-border-light px-2 py-1 rounded-lg">
                                            <FaStar className="text-warning" size={14} /> {rest.rating || "N/A"}
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-text-muted mb-4 line-clamp-1">
                                        {rest.cuisineType ? rest.cuisineType.join(" • ") : "Restaurant"}
                                    </p>
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