import { Link } from "react-router-dom";
import { FaRegFileAlt, FaSearch } from "react-icons/fa";

const EmptyReviews = () => {
    return (
        <div className="bg-background rounded-4xl p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm border border-border-light max-w-3xl mx-auto">
            <div className="bg-text-secondary/10 p-3 rounded-full text-text-secondary mb-6">
                <FaRegFileAlt size={24} />
            </div>
            <h2 className="text-2xl font-heading font-black text-text-primary mb-3">
                You haven't written any review yet!
            </h2>
            <p className="text-text-secondary text-sm font-medium max-w-sm leading-relaxed mb-8">
                Share your experiences at restaurants you've recently visited and help others discover the best dishes.
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

export default EmptyReviews;