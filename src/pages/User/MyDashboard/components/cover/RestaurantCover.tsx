import { motion } from "framer-motion";
import type { Restaurant } from "../../../../../types/RestaurantSchema.ts";

import CoverImage from "./CoverImage.tsx";
import CoverBadges from "./CoverBadges.tsx";
import CoverInfo from "./CoverInfo.tsx";
import CoverActions from "./CoverActions.tsx";

const RestaurantCover = ({ restaurant }: { restaurant: Restaurant }) => {
    const imageUrl = restaurant.coverPhoto instanceof File
        ? "/images/default-rest.svg"
        : restaurant.coverPhoto?.url || "/images/default-rest.svg";

    return (
        <section className="group relative h-84 md:h-112.5 w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
            {/* Background Image Container */}
            <CoverImage src={imageUrl} />

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-end p-5 md:p-12 text-start">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full flex flex-col"
                >
                    {/* Badges Row */}
                    <CoverBadges restaurant={restaurant} />

                    {/* Name and Actions info */}
                    <div className="flex flex-row justify-between items-end gap-4 md:gap-6 w-full">
                        <CoverInfo name={restaurant.name} cuisineType={restaurant.cuisineType} />

                        {/* Action Buttons: Edit for Owner, Favorite for Users */}
                        <CoverActions
                            restId={restaurant._id}
                        />
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default RestaurantCover;