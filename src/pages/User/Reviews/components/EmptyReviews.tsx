import { motion } from "framer-motion";
import { IoChatbubbleEllipsesOutline, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../../../../ui/Button";

const EmptyReviews = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4"
        >
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-2">
                <IoChatbubbleEllipsesOutline size={32} />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                You haven't written any review yet!
            </h3>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed font-medium">
                Share your experiences at restaurants you've recently visited and help others discover the best dishes.
            </p>

            <Button
                onClick={() => navigate("/")}
                className="mt-3 px-6 py-3 text-sm rounded-xl gap-2"
            >
                <IoSearch size={16} /> Explore Restaurants
            </Button>
        </motion.div>
    );
};

export default EmptyReviews;