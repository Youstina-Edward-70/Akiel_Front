import { IoStarOutline, IoHeartOutline, IoHeart, IoBicycleOutline } from "react-icons/io5";
import { FaMoneyBills } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { checkIfOpen } from "../../Restaurant/components/assets/utils";
import type { RestaurantCardProps } from "../../../types/RestaurantSchema";
import { useToggleFavorite } from "../../Restaurant/hooks/useToggleFavorite";

const RestaurantCard = ({ _id, name, coverPhoto, rating, cuisineType, priceRange, openingHours, delivery }: RestaurantCardProps) => {
    const isOpen = checkIfOpen(openingHours);
    const imageUrl = coverPhoto instanceof File
        ? "/images/default-rest.svg"
        : coverPhoto?.url || "/images/default-rest.svg";
    const { isFavorite, toggleFavorite } = useToggleFavorite(_id!);

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <div className="relative h-44 overflow-hidden">
                {/* Image */}
                <Link to={`/restaurant/${_id}`}>
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>

                {/* Status Badge */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm transition-colors ${isOpen ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                    }`}>
                    {isOpen ? 'Open Now' : 'Closed'}
                </div>

                {/* Favorite Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite();
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/70 backdrop-blur-md rounded-full text-gray-600 cursor-pointer hover:bg-white hover:text-red-500 transition-all shadow-sm active:scale-90 z-5"
                >
                    {isFavorite ? (
                        <IoHeart className="text-red-500 h-5 w-5" />
                    ) : (
                        <IoHeartOutline className="h-5 w-5" />
                    )}
                </button>
            </div>

            <div className="p-4 flex flex-col flex-1 text-start">
                <div className="flex justify-between items-center mb-1">
                    <Link to={`/restaurant/${_id}`}>
                        <h3 className="font-bold text-base text-gray-800 hover:text-primary transition-colors line-clamp-1">
                            {name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                        <IoStarOutline className="text-orange-600 h-3.5 w-3.5" />
                        <span className="text-xs font-bold text-orange-600">{rating}</span>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-3 line-clamp-1 italic">
                    {Array.isArray(cuisineType) ? cuisineType.join(' • ') : cuisineType}
                </p>

                {/* Bottom Info */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        <FaMoneyBills className="text-gray-400" />
                        {priceRange === 'low' ? '$' : priceRange === 'medium' ? '$$' : '$$$'}
                    </span>

                    <div className="flex items-center gap-1.5">
                        <IoBicycleOutline className={`h-4 w-4 ${delivery ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className={`text-[11px] font-medium ${delivery ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                            {delivery ? 'Delivery' : 'No Delivery'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;