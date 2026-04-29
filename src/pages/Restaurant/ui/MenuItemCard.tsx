import type { Dish } from "../../../types/RestaurantSchema";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import Button from "../../../ui/Button";

interface MenuItemCardProps {
    item: Dish;
    index: number;
    isOwner: boolean;
    onClick: () => void;
    onDelete: () => void;
}

const MenuItemCard = ({ item, isOwner, onClick, onDelete }: MenuItemCardProps) => {
    const imageUrl = item.image instanceof File ? "/images/default-rest.svg" : item.image?.url || "/images/default-rest.svg";

    return (
        <div
            onClick={isOwner ? onClick : undefined}
            className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full select-none
                ${isOwner ? "cursor-pointer active:scale-95" : ""}`}
        >
            {/* Image Section */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={item.dishName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {isOwner && (
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        {/* Edit button*/}
                        <Button
                            variant="normal"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick();
                            }}
                            className="w-12 h-12 rounded-full bg-white text-primary shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white"
                        >
                            <IoCreateOutline size={24} />
                        </Button>

                        {/* Delete button */}
                        <Button
                            variant="normal"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            className="w-12 h-12 rounded-full bg-white text-red-500 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-500 hover:text-white"
                        >
                            <IoTrashOutline size={24} />
                        </Button>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-2 grow text-start">
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