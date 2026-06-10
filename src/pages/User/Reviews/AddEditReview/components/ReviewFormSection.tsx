import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ReviewFormData } from "../../../../../types/UserSchema";
import type { NavigateFunction } from "react-router-dom";
import Button from "../../../../../ui/Button";

interface ReviewFormSectionProps {
    register: UseFormRegister<ReviewFormData>;
    errors: FieldErrors<ReviewFormData>;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    currentRating: number;
    hoverRating: number | null;
    setHoverRating: (rating: number | null) => void;
    setRatingValue: (val: number) => void;
    getRatingLabel: (stars: number) => string;
    isSubmitting: boolean;
    isEditMode: boolean;
    navigate: NavigateFunction;
}

export const ReviewFormSection = ({
    register,
    errors,
    onSubmit,
    currentRating,
    setHoverRating,
    setRatingValue,
    getRatingLabel,
    isSubmitting,
    isEditMode,
    navigate,
}: ReviewFormSectionProps) => {
    return (
        <div className="w-full flex flex-col items-center">
            {/* Rating Star */}
            <div className="flex flex-col items-center gap-2 mb-6 w-full">
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="relative d-inline-block group">
                            <div className="text-3xl md:text-4xl text-amber-400 transition-transform duration-100 group-hover:scale-110">
                                {currentRating >= index ? (
                                    <FaStar />
                                ) : currentRating >= index - 0.5 ? (
                                    <FaStarHalfAlt />
                                ) : (
                                    <FaRegStar />
                                )}
                            </div>

                            <div
                                className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
                                onMouseEnter={() => setHoverRating(index - 0.5)}
                                onMouseLeave={() => setHoverRating(null)}
                                onClick={() => setRatingValue(index - 0.5)}
                            />

                            <div
                                className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
                                onMouseEnter={() => setHoverRating(index)}
                                onMouseLeave={() => setHoverRating(null)}
                                onClick={() => setRatingValue(index)}
                            />
                        </div>
                    ))}
                </div>

                <p className="text-base font-black text-primary min-h-6 capitalize text-center">
                    {getRatingLabel(currentRating)}
                </p>
                {errors.rating && (
                    <p className="text-xs text-danger font-medium mt-1">{errors.rating.message as string}</p>
                )}
            </div>

            {/* Review Content */}
            <form onSubmit={onSubmit} className="w-full flex flex-col items-start">
                <label className="text-xs font-bold text-text-secondary mb-2">
                    Your Feedback
                </label>
                <textarea
                    {...register("Content")}
                    placeholder="Share your experience in detail..."
                    className={`w-full h-36 p-4 rounded-xl border bg-gray-50 text-text-primary placeholder-gray-400 focus:outline-none focus:bg-white text-sm transition-all resize-none ${
                        errors.Content ? "border-danger focus:border-danger" : "border-gray-100 focus:border-primary/40"
                    }`}
                />
                {errors.Content && (
                    <p className="text-xs text-danger font-medium mt-1.5">{errors.Content.message as string}</p>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-4 w-full mt-6">
                    <Button
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                        variant="outline"
                        className="flex-1 py-3.5 px-6 rounded-full"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 px-6 rounded-full"
                    >
                        {isSubmitting ? "Saving..." : isEditMode ? "Update Review" : "Post Review"}
                    </Button>
                </div>
            </form>
        </div>
    );
};