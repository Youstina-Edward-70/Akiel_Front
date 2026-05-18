import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Props {
    rating: number;
    setRating: (val: number) => void;
}

const InteractiveStars = ({ rating, setRating }: Props) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        // لو الماوس في النص الأول من النجمة تبقى نص، لو في النص التاني تبقى نجمة كاملة
        const isHalf = x < width / 2;
        setHoverValue(isHalf ? index - 0.5 : index);
    };

    const displayValue = hoverValue !== null ? hoverValue : rating;

    const getFeedbackText = (val: number) => {
        if (val === 0) return "Select a rating";
        if (val <= 1.5) return "Poor";
        if (val <= 2.5) return "Fair";
        if (val <= 3.5) return "Good";
        if (val <= 4.5) return "Very Good";
        return "Excellent!";
    };

    return (
        <div className="flex flex-col items-center gap-2 mb-6">
            <div className="flex items-center gap-1" onMouseLeave={() => setHoverValue(null)}>
                {[1, 2, 3, 4, 5].map((starIndex) => {
                    const isFull = displayValue >= starIndex;
                    const isHalf = displayValue >= starIndex - 0.5 && displayValue < starIndex;

                    return (
                        <div
                            key={starIndex}
                            className="cursor-pointer text-4xl transition-transform hover:scale-110"
                            onMouseMove={(e) => handleMouseMove(e, starIndex)}
                            onClick={() => setRating(hoverValue || starIndex)}
                        >
                            {isFull ? (
                                <FaStar className="text-[#FFD700]" />
                            ) : isHalf ? (
                                <FaStarHalfAlt className="text-[#FFD700]" />
                            ) : (
                                <FaRegStar className="text-[#FFD700]" />
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="text-danger font-bold text-sm h-5 transition-opacity">
                {displayValue > 0 ? getFeedbackText(displayValue) : ""}
            </p>
        </div>
    );
};

export default InteractiveStars;