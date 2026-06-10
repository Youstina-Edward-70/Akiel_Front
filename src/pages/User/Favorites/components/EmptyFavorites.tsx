import { motion } from "framer-motion";
import { IoHeartOutline, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../../../../ui/Button";

const EmptyFavorites = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4"
        >
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-2">
                <IoHeartOutline size={32} />
            </div>

            <h3 className="text-xl font-bold text-text-primary">Your collection of favorites is empty</h3>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed font-medium">
                No favorites yet? Explore our top-rated spots, save your cravings, and keep all your culinary gems in one place.
            </p>

            <Button
                onClick={() => navigate("/")}
                className="mt-3 px-6 py-3 text-sm rounded-xl gap-2"
            >
                <IoSearch size={16} /> Discover Restaurants
            </Button>
        </motion.div>
    );
};

export default EmptyFavorites;