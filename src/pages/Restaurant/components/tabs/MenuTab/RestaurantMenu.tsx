import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoAddOutline } from "react-icons/io5";
import useRestaurantMenu from "../../../hooks/useRestaurantMenu.ts";
import { MenuCategories } from "../../../../../types/constants.ts";
import MenuItemCard from "../../../ui/MenuItemCard.tsx";
import { SkeletonMenuSection } from "../../../ui/SkeletonMenuItemCard.tsx";
import { MdNoFood } from "react-icons/md";
import EmptyState from "../../../../../ui/EmptyState.tsx";
import Button from "../../../../../ui/Button.tsx";

const RestaurantMenu = ({ restaurantId, isOwner }: { restaurantId: string; isOwner: boolean }) => {
    const navigate = useNavigate();

    const { data: menuData = [], isLoading } = useRestaurantMenu(restaurantId);

    const handleEditItem = (itemId: string) => {
        if (isOwner) {
            navigate(`/restaurant/menu/edit/${itemId}`);
        }
    };

    const handleAddNewDish = () => {
        navigate(`/restaurant/menu/add/${restaurantId}`);
    };

    if (isLoading) {
        return (
            <div className="space-y-12">
                <SkeletonMenuSection />
                <SkeletonMenuSection />
            </div>
        );
    }

    return (
        <div className="relative min-h-100 pb-24 font-sans">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-8 bg-primary rounded-full" />
                <h2 className="text-2xl font-black text-text-primary tracking-tight">
                    Restaurant Menu
                </h2>
            </div>

            {/* Empty State */}
            {menuData.length === 0 ? (
                <EmptyState
                    icon={MdNoFood}
                    message="Your Menu is Empty"
                    subtitle={isOwner ? "Time to dazzle your customers! Click the + button below to add your first dish." : "This restaurant hasn't uploaded its menu yet."}
                />
            ) : (
                <div className="space-y-16">
                    {MenuCategories.map((cat) => {
                        const categoryItems = menuData.filter(item => item.category === cat);

                        if (categoryItems.length === 0 && !isOwner) return null;

                        return (
                            <section key={cat} className="space-y-8">
                                {/* Section Header */}
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-8 bg-primary rounded-full" />
                                    <h2 className="text-2xl font-black text-text-primary tracking-tight uppercase">
                                        {cat}
                                    </h2>
                                    <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                        {categoryItems.length} items
                                    </span>
                                </div>

                                {/* Grid Dishes */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                    <AnimatePresence mode="popLayout">
                                        {categoryItems.map((item, index) => (
                                            <motion.div
                                                key={item._id || `${cat}-${index}`}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                            >
                                                <MenuItemCard
                                                    item={item}
                                                    index={index}
                                                    isOwner={isOwner}
                                                    onClick={() => handleEditItem(item._id!)}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}

            {/* Floating Action Button */}
            {
                isOwner && (
                    <Button
                        variant="primary"
                        onClick={handleAddNewDish}
                        className="p-4 rounded-full shadow-2xl group flex items-center gap-0 hover:gap-2 transition-all duration-300"
                    >
                        <IoAddOutline className="text-3xl" />
                        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
                            Add New Dish
                        </span>
                    </Button>
                )
            }
        </div >
    );
};

export default RestaurantMenu;