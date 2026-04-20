import { motion } from 'framer-motion';
import RestaurantMenu from "./MenuTab/RestaurantMenu";
import RestaurantPhotos from "./PhotoTab/RestaurantPhotos"
import RestaurantReviews from './ReviewTab/RestaurantReviews';
import RestaurantInfo from "./InfoTab/RestaurantInfo";
import type { Restaurant } from "../../../../types/RestaurantSchema";

const TabContent = ({ activeTab, restaurantId, isOwner, restaurant }: {
    activeTab: string;
    restaurantId: string;
    isOwner: boolean;
    restaurant: Restaurant;
}) => (
    <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 10 }} // y-axis
        animate={{ opacity: 1, x: 0 }} // y-axis
        exit={{ opacity: 0, x: -10 }} // y-axis
        transition={{ duration: 0.2, ease: "easeInOut" }}
    >
        {activeTab === "menu" && <RestaurantMenu restaurantId={restaurantId} isOwner={isOwner} />}

        {activeTab === "photos" && <RestaurantPhotos restaurantId={restaurantId} isOwner={isOwner} />}

        {activeTab === "reviews" && <RestaurantReviews restaurantId={restaurantId} isOwner={isOwner} resRating={restaurant.rating} />}

        {activeTab === "info" && <RestaurantInfo restaurant={restaurant} />}
    </motion.div>
);

export default TabContent