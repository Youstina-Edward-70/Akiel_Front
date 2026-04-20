import type { MenuItem } from "../../../types/RestaurantSchema";
import { IoCreateOutline } from "react-icons/io5";

const MenuItemCard = ({ item, isOwner, onClick }: { item: MenuItem, index: number, isOwner: boolean, onClick: () => void }) => {
    return (
        <div
            onClick={isOwner ? onClick : undefined}
            className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full select-none
                ${isOwner ? "cursor-pointer active:scale-95" : ""}`}
        >
            {/* Image Section */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={item.image || "/images/default-rest.svg"}
                    alt={item.dishName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {isOwner && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <IoCreateOutline className="text-primary text-2xl" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col grow text-start">
                <div className="flex justify-between items-start  gap-2">
                    <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-primary transition-colors">
                        {item.dishName}
                    </h3>
                    <span className="text-primary font-bold text-lg whitespace-nowrap">
                        {item.price} <span className="text-sm uppercase">EGP</span>
                    </span>
                </div>

                <p className="grow text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {item.description || "Traditional Egyptian dish prepared with our special secret recipe and fresh ingredients."}
                </p>
            </div>
        </div>
    );
};

export default MenuItemCard;