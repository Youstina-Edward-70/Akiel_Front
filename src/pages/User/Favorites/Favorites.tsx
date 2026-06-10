import { motion, AnimatePresence } from "framer-motion";
import useFavorites from "./useFavorites";
import RestaurantCard from "./components/RestaurantCard";
import FavoritesSkeleton from "./components/FavoritesSkeleton";
import EmptyFavorites from "./components/EmptyFavorites";
import type { FavoriteItem } from "../../../types/UserSchema";
import { ErrorFavorites } from "./components/ErrorFavorites";

const Favorites = () => {
    const { myFavorites, isLoading, error, navigate } = useFavorites();

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <FavoritesSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <ErrorFavorites
                message={error?.message || "Could not retrieve your favorites. Please try again later."}
                onBack={() => navigate(-1)}
            />
        );
    }

    const totalFavorites = myFavorites?.length || 0;

    return (
        <div className="min-h-screen bg-gray-50/40 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                <div className="flex flex-col items-start gap-1 text-start border-b border-gray-100 pb-5">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                            My Favorites
                        </h1>
                        <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100/60">
                            {totalFavorites} {totalFavorites === 1 ? "Restaurant" : "Restaurants"}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Your curated list of must-visit spots. From traditional Koshary to the finest grills across Egypt.
                    </p>
                </div>

                {totalFavorites === 0 ? (
                    <EmptyFavorites />
                ) : (
                    <div className="w-full">
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {myFavorites.map((fav: FavoriteItem) => (
                                    <motion.div
                                        key={fav.restaurant._id || fav._id}
                                        layout
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <RestaurantCard
                                            _id={fav.restaurant._id}
                                            name={fav.restaurant.name}
                                            coverPhoto={fav.restaurant.coverPhoto}
                                            rating={fav.restaurant.rating}
                                            cuisineType={fav.restaurant.cuisineType}
                                            priceRange={fav.restaurant.priceRange}
                                            openingHours={fav.restaurant.openingHours}
                                            delivery={fav.restaurant.delivery}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Favorites;