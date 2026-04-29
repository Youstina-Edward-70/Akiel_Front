import { motion } from "framer-motion"
import type { Restaurant } from "../../../../types/RestaurantSchema.ts";
import { checkIfOpen } from "../assets/utils.ts";

import CoverImage from "./CoverImage.tsx";
import CoverBadges from "./CoverBadges.tsx";
import CoverInfo from "./CoverInfo.tsx";
import CoverActions from "./CoverActions.tsx";

const RestaurantCover = ({ restaurant, isFavorite, onToggleFavorite, isOwner }: {
    restaurant: Restaurant;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    isOwner?: boolean;
}) => {
    const isOpen = checkIfOpen(restaurant.openingHours);
    const imageUrl = restaurant.coverPhoto instanceof File
        ? "/images/default-rest.svg"
        : restaurant.coverPhoto?.url || "/images/default-rest.svg";

    return (
        <section className="group relative h-112.5 w-full overflow-hidden rounded-3xl shadow-2xl">
            {/* Background Image Container */}
            <CoverImage src={imageUrl} />

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-start">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Badges Row */}
                    <CoverBadges restaurant={restaurant} isOpen={isOpen} />

                    {/* Name and Actions info */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <CoverInfo name={restaurant.name} cuisineType={restaurant.cuisineType} />

                        {/* Action Buttons: Edit for Owner, Favorite for Users */}
                        <CoverActions
                            restaurantId={restaurant._id}
                            isOwner={!!isOwner}
                            isFavorite={isFavorite}
                            onToggleFavorite={onToggleFavorite}
                        />
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default RestaurantCover;