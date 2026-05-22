import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import type { FavoriteRestaurant } from "../hooks/useFavorites";

interface Props {
    rest: FavoriteRestaurant;
    onRemove: (id: string) => void;
}

type FlexibleRestaurantData = {
    restaurantId?: string | { _id: string };
    restaurant?: string | { _id: string };
    name?: string;
    coverPhoto?: { url?: string };
    image?: string;
    rating?: number | string;
    cuisineType?: string[];
    _id?: string;
    id?: string;
};

const FavoriteCard = ({ rest, onRemove }: Props) => {
    const data = rest as unknown as FlexibleRestaurantData;
    
    // استخراج بيانات المطعم
    const restaurantObj = data.restaurantId || data.restaurant || data;
    
    // استخراج الـ ID للحذف
    const restId = (typeof restaurantObj === 'object' && '_id' in restaurantObj) 
        ? restaurantObj._id 
        : (typeof restaurantObj === 'string' ? restaurantObj : rest._id || rest.id || "");

    // استخراج الـ name مع قيمة افتراضية لتجنب خطأ الـ charAt
    const name = (typeof restaurantObj === 'object' && 'name' in restaurantObj && restaurantObj.name) 
        ? restaurantObj.name 
        : "Unknown";

    // الـ placeholderImg الآن يعمل بأمان
    const placeholderImg = `https://ui-avatars.com/api/?name=${name.charAt(0)}&background=FDEADD&color=F2704E&size=150`;
    
    const image = (typeof restaurantObj === 'object' && 'coverPhoto' in restaurantObj ? restaurantObj.coverPhoto?.url : null) || 
                  (typeof restaurantObj === 'object' && 'image' in restaurantObj ? restaurantObj.image : null) || 
                  placeholderImg;
                  
    const rating = (typeof restaurantObj === 'object' && 'rating' in restaurantObj) ? restaurantObj.rating : "N/A";
    const cuisines = (typeof restaurantObj === 'object' && 'cuisineType' in restaurantObj) ? restaurantObj.cuisineType : [];
    const cuisineText = cuisines && Array.isArray(cuisines) ? cuisines.join(" • ") : "Restaurant";

    return (
        <div className="bg-background rounded-3xl overflow-hidden shadow-sm border border-border-light hover:shadow-md transition group">
            <div className="relative h-48 overflow-hidden bg-surface">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <button 
                    onClick={() => {
                        onRemove(restId as string);
                    }} 
                    className="absolute top-3 right-3 bg-background p-2.5 rounded-full text-primary shadow-md hover:scale-110 transition group/btn cursor-pointer"
                >
                    <FaHeart size={16} className="block group-hover/btn:hidden" />
                    <FaRegHeart size={16} className="hidden group-hover/btn:block text-text-muted" />
                </button>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-black text-text-primary line-clamp-1">{name}</h3>
                    <div className="flex items-center gap-1 text-sm font-black text-text-primary bg-surface border border-border-light px-2 py-1 rounded-lg">
                        <FaStar className="text-[#FFD700]" size={14} /> 
                        {typeof rating === 'number' ? rating.toFixed(1) : rating}
                    </div>
                </div>
                <p className="text-xs font-bold text-text-muted mb-4 line-clamp-1">
                    {cuisineText}
                </p>
            </div>
        </div>
    );
};

export default FavoriteCard;