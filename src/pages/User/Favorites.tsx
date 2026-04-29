import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaSearch } from "react-icons/fa";
import { BiDish, BiTimeFive } from "react-icons/bi";
import toast from "react-hot-toast";


interface FavoriteRestaurant {
    id: string;
    name: string;
    image: string;
    isOpen: boolean;
    rating: number;
    tags: string;
    distance: string;
    expenseLevel: string;
    deliveryTime: string;
}

const Favorites = () => {
    const [favorites, setFavorites] = useState<FavoriteRestaurant[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        const fetchFavorites = async () => {
            const mockData = [
                {
                    id: "1",
                    name: "Abou Tarek",
                    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=600&auto=format&fit=crop", 
                    isOpen: true,
                    rating: 4.8,
                    tags: "Egyptian • Koshary",
                    distance: "1.2 km",
                    expenseLevel: "Medium",
                    deliveryTime: "15-25 min"
                },
                {
                    id: "2",
                    name: "Sobhy Kaber",
                    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
                    isOpen: true,
                    rating: 4.7,
                    tags: "Oriental Grill • BBQ",
                    distance: "3.5 km",
                    expenseLevel: "High",
                    deliveryTime: "40-50 min"
                },
                {
                    id: "3",
                    name: "Andrea Mariouteya",
                    image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=600&auto=format&fit=crop",
                    isOpen: false,
                    rating: 4.5,
                    tags: "Grilled Chicken • Scenic",
                    distance: "8.1 km",
                    expenseLevel: "Medium",
                    deliveryTime: "30-45 min"
                },
                {
                    id: "4",
                    name: "El Brince",
                    image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?q=80&w=600&auto=format&fit=crop",
                    isOpen: true,
                    rating: 4.9,
                    tags: "Oriental • Famous",
                    distance: "4.2 km",
                    expenseLevel: "Medium",
                    deliveryTime: "20-30 min"
                }
            ];
            
            setTimeout(() => {
                setFavorites(mockData); 
                setIsLoading(false);
            }, 500);
        };

        fetchFavorites();
    }, []);

   
    const handleRemoveFavorite = (id: string) => {
        
        setFavorites(prevFavorites => prevFavorites.filter(rest => rest.id !== id));
        
        toast.success("Removed from favorites");

    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-16 font-sans text-left">
            
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-3xl font-black text-slate-900">My Favorites</h1>
                        <span className="bg-red-50 text-[#E31E24] px-3 py-1 rounded-full text-xs font-bold transition-all">
                            {favorites.length} Restaurants
                        </span>
                    </div>
                    <p className="text-gray-500 font-medium max-w-2xl">
                        Your curated list of must-visit spots. From traditional Koshary to the finest grills across Egypt.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8">
                {favorites.length === 0 ? (
                   
                    <div className="bg-white rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 mt-4">
                        <div className="bg-gray-100 p-4 rounded-full text-gray-400 mb-6">
                            <FaHeart size={28} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                            Your collection of favorites is empty!
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md font-medium leading-relaxed mx-auto">
                            No favorites yet? Explore our top-rated spots, save your cravings, and keep all your culinary gems in one place.
                        </p>
                        <Link 
                            to="/search" 
                            className="bg-[#E31E24] text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-red-700 transition shadow-lg shadow-red-200 mx-auto w-fit"
                        >
                            <FaSearch size={16} /> Discover restaurants
                        </Link>
                    </div>
                ) : (
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((rest) => (
                            <div key={rest.id} className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={rest.image} 
                                        alt={rest.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    
                                  
                                    <button 
                                        onClick={() => handleRemoveFavorite(rest.id)}
                                        className="absolute top-3 right-3 bg-white p-2.5 rounded-full text-[#E31E24] shadow-md hover:scale-110 transition group/btn"
                                        title="Remove from favorites"
                                    >
                                        <FaHeart size={16} className="block group-hover/btn:hidden" />
                                        <FaRegHeart size={16} className="hidden group-hover/btn:block text-gray-400" />
                                    </button>

                                    <span className={`absolute bottom-3 left-3 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white shadow-sm ${rest.isOpen ? 'bg-green-500' : 'bg-slate-700'}`}>
                                        {rest.isOpen ? 'OPEN NOW' : 'CLOSED'}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-lg font-black text-slate-900 line-clamp-1">{rest.name}</h3>
                                        <div className="flex items-center gap-1 text-sm font-black text-slate-700 bg-gray-50 px-2 py-1 rounded-lg">
                                            <FaStar className="text-yellow-400" size={14} /> {rest.rating}
                                        </div>
                                    </div>
                                    
                                    <p className="text-xs font-bold text-gray-400 mb-4 line-clamp-1">
                                        {rest.tags} • {rest.distance}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
                                        <div className="flex items-center gap-1.5">
                                            <BiDish size={16} className="text-gray-300" /> {rest.expenseLevel}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <BiTimeFive size={16} className="text-gray-300" /> {rest.deliveryTime}
                                        </div>
                                    </div>
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