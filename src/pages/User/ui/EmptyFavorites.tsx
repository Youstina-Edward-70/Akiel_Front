import { Link } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";

const EmptyFavorites = () => {
    return (
        <div className="bg-background rounded-4xl p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm border border-border-light max-w-3xl mx-auto">
            <div className="bg-text-secondary/10 p-3 rounded-full text-text-secondary mb-6">
                <FaHeart size={20} />
            </div>
            <h2 className="text-2xl font-heading font-black text-text-primary mb-3">
                Your collection of favorites is empty!
            </h2>
            <p className="text-text-secondary text-sm font-medium max-w-sm leading-relaxed mb-8">
                No favorites yet? Explore our top-rated spots, save your cravings, and keep all your culinary gems in one place.
            </p>
            <Link 
                to="/search" 
                className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-hover transition shadow-sm"
            >
                <FaSearch size={14} /> Discover restaurants
            </Link>
        </div>
    );
};

export default EmptyFavorites;