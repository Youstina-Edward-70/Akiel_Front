import { IoBicycleOutline } from "react-icons/io5";
import type { Restaurant } from "../../../../../types/RestaurantSchema";
import clsx from "clsx";

const CoverBadges = ({ restaurant }: { restaurant: Restaurant }) => (
    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
        <span className="bg-red-500 text-white text-sm font-bold uppercase px-3 py-1.5 rounded-full tracking-wider shadow-lg whitespace-nowrap">
            Rejection: {restaurant.rejectionCount}
        </span>

        <span className={clsx(
            "px-3 py-1.5 rounded-full text-sm text-white font-bold tracking-wider shadow-lg whitespace-nowrap",
            restaurant.status === 'pending' ? "bg-blue-400 " : "bg-text-secondary"
        )}>
            Status: {restaurant.status === 'pending' ? "Pending" : "Rejected"}
        </span>

        <span className="flex items-center gap-2 bg-secondary text-white text-sm font-bold px-3 py-1.5 rounded-full tracking-wider shadow-lg whitespace-nowrap">
            <IoBicycleOutline className="h-4 w-4" />
            <span>{restaurant.delivery ? "Delivery" : "No Delivery"}</span>
        </span>
    </div>
);

export default CoverBadges