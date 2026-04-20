import { FaAngleRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../../lib/api";
import { API_ENDPOINTS } from "../../../lib/EndPoints";
import RestaurantCard from "../../AllRestaurants/ui/RestaurantCard";
import { RestaurantCardSkeleton } from "../../AllRestaurants/ui/SkeletonRestaurantCard";
import EmptyState from "../../../ui/EmptyState";
import { IoRestaurantOutline } from "react-icons/io5";
import Button from "../../../ui/Button";
import type { RestaurantCardProps } from "../../../types/RestaurantSchema";

const PopularRestaurantsSection = () => {
    const Navigate = useNavigate();

    const { data: restaurants = [], isLoading } = useQuery<RestaurantCardProps[]>({
        queryKey: ["popular-restaurants"],
        queryFn: async () => {
            const res = await axiosInstance.get(API_ENDPOINTS.RESTAURANTS.POPULAR);
            return res.data?.Data || [];
        },
    });

    return (
        <section className="py-16 bg-white">
            <div className=" max-w-7xl container mx-auto px-6 md:px-8 py-12">
                {/* Section Header */}
                <div className="flex justify-between items-center flex-col md:flex-row mb-12 gap-6">
                    <div className="text-center md:text-start">
                        <h2 className="text-3xl font-extrabold text-text-primary mb-4">Popular Restaurants Now</h2>
                        <p className="text-gray-500">Handpicked favorites trending this week</p>
                    </div>
                    <Button
                        variant="normal"
                        onClick={() => Navigate("/search")}
                        className="group flex items-center gap-2 text-primary font-bold hover:bg-primary/5 px-6 py-3 rounded-2xl transition-all"
                    >
                        View All
                        <FaAngleRight className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                {/* Restaurant Cards */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <RestaurantCardSkeleton key={i} />
                        ))}
                    </div>
                ) : restaurants.length === 0 ? (
                    <EmptyState
                        message="No popular restaurants found"
                        icon={IoRestaurantOutline}
                        subtitle="We're currently updating our top picks. Check back soon!"
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {restaurants.slice(0, 4).map((res, index) => (
                                <motion.div
                                    key={res._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <RestaurantCard key={res._id} {...res} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PopularRestaurantsSection;