import { IoBicycleOutline, IoStarOutline } from "react-icons/io5";
import type { Restaurant } from "../../../../types/RestaurantSchema";
import { FaMoneyBills } from "react-icons/fa6";
import clsx from "clsx";

const CoverBadges = ({ restaurant, isOpen }: { restaurant: Restaurant; isOpen: boolean }) => (
    <div className="flex items-center gap-3 mb-4">
        <span className={clsx(
            "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg",
            isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
        )}>
            {isOpen ? "Open Now" : "Closed"}
        </span>
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <IoStarOutline className="text-orange-400 h-4 w-4" />
            <span className="text-white font-bold text-sm">{restaurant.rating?.toFixed(1) || "0.0"}</span>
            <span className="text-gray-300 text-xs font-medium">({restaurant.reviewsCount || 0} reviews)</span>
        </div>
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <FaMoneyBills className="text-green-600 h-4 w-4" />
            <span className="text-white font-medium text-sm">{restaurant.priceRange === 'high' ? '$$$' : restaurant.priceRange === 'medium' ? '$$' : '$'}</span>
        </div>
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <IoBicycleOutline className="text-blue-400 h-4 w-4" />
            <span className="text-white font-medium text-sm">{restaurant.delivery ? "Delivery" : "No Delivery"}</span>
        </div>
    </div>
);

export default CoverBadges