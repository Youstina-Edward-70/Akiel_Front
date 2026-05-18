import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import type { FavoriteRestaurant } from "../hooks/useFavorites";

interface Props {
    rest: FavoriteRestaurant;
    onRemove: (id: string) => void;
}

const FavoriteCard = ({ rest, onRemove }: Props) => {
    return (
        <div className="bg-background rounded-3xl overflow-hidden shadow-sm border border-border-light hover:shadow-md transition group">
            <div className="relative h-48 overflow-hidden bg-surface">
                <img 
                    src={rest.image || "/placeholder.jpg"} 
                    alt={rest.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <button 
                    onClick={() => onRemove(rest._id || rest.id || "")} 
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
    );
};

export default FavoriteCard;