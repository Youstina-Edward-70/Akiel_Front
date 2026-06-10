import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface ReviewRestaurantHeaderProps {
    restaurantName?: string;
    restaurantImage?: string;
    restaurantRating?: number;
    isEditMode: boolean;
}

export const ReviewRestaurantHeader = ({
    restaurantName,
    restaurantImage,
    restaurantRating = 0,
    isEditMode,
}: ReviewRestaurantHeaderProps) => {
    return (
        <>
            {/* RestImage */}
            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md border-2 border-white mb-4 shrink-0">
                <img
                    src={restaurantImage}
                    alt={restaurantName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* RestName */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-1 text-center">
                {restaurantName}
            </h2>

            {/* RestRating */}
            <div className="flex items-center gap-1.5 mb-6 justify-center">
                <div className="flex text-amber-400 text-sm">
                    {[1, 2, 3, 4, 5].map((index) => {
                        if (restaurantRating >= index) {
                            return <FaStar key={index} />;
                        }
                        if (restaurantRating >= index - 0.5) {
                            return <FaStarHalfAlt key={index} />;
                        }
                        return <FaRegStar key={index} />;
                    })}
                </div>
                <span className="text-xs font-bold text-text-secondary">
                    {restaurantRating}
                </span>
            </div>

            <h3 className="text-xl md:text-xl font-bold text-text-primary mb-5 text-center leading-tight">
                {isEditMode ? "Update your review for " : "Write your review for "}
                <span className="font-black text-primary">"{restaurantName}"</span>
            </h3>
        </>
    );
};