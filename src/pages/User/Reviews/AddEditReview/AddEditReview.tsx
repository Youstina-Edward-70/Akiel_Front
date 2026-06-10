import { useState } from "react";
import useReview from "../useReview";

import { ReviewRestaurantHeader } from "./components/ReviewRestaurantHeader";
import { ReviewFormSection } from "./components/ReviewFormSection";
import { SkeletonAddEditReview } from "./components/SkeletonAddEditReview";
import { ErrorAddEditReview } from "./components/ErrorAddEditReview";

const AddEditReview = () => {
    const {
        currentRestaurant,
        form,
        onSubmit,
        isEditMode,
        isLoadingRev,
        isLoadingRest,
        revError,
        restError,
        isSubmitting,
        ratingValue,
        setRatingValue,
        navigate
    } = useReview();

    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const { register, formState: { errors } } = form;

    const restaurantName = currentRestaurant?.name;
    const restaurantImage = currentRestaurant?.coverPhoto?.url || "/images/default-rest.svg";
    const restaurantRating = currentRestaurant?.rating;

    const getRatingLabel = (stars: number) => {
        if (stars === 0) return "Select your rating";
        if (stars <= 1.5) return "Terrible!";
        if (stars <= 2.5) return "Bad";
        if (stars <= 3.5) return "Good";
        if (stars <= 4.5) return "Very Good!";
        return "Excellent!";
    };

    const currentRating = hoverRating !== null ? hoverRating : ratingValue;

    // Loading State
    if (isLoadingRev || isLoadingRest) {
        return <SkeletonAddEditReview />;
    }

    // Error State
    if (revError || restError) {
        return (
            <ErrorAddEditReview
                message={revError?.message || restError?.message || "An unexpected error occurred."}
                onBack={() => navigate(-1)}
            />
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10 p-4 font-sans text-start">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full p-6 md:p-8 flex flex-col items-center relative transition-all">

                {/* Header */}
                <ReviewRestaurantHeader
                    restaurantName={restaurantName}
                    restaurantImage={restaurantImage}
                    restaurantRating={restaurantRating}
                    isEditMode={isEditMode}
                />

                {/* Form & Interactivity */}
                <ReviewFormSection
                    register={register}
                    errors={errors}
                    onSubmit={onSubmit}
                    currentRating={currentRating}
                    hoverRating={hoverRating}
                    setHoverRating={setHoverRating}
                    setRatingValue={setRatingValue}
                    getRatingLabel={getRatingLabel}
                    isSubmitting={isSubmitting}
                    isEditMode={isEditMode}
                    navigate={navigate}
                />

            </div>
        </div>
    );
};

export default AddEditReview;