import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ConfirmPopUp from "../../../../../ui/ConfirmPopUp";
import { useAuthStore } from "../../../../../store/authStore";
import useRestaurantReviews from "../../../hooks/useRestaurantReviews";
import ReviewHeader from "./ReviewHeader";
import ReviewCard from "./ReviewCard";
import SkeletonReviewCard from "./SkeletonReviewCard";
import EmptyState from "../../../../../ui/EmptyState";
import { FaCommentSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RestaurantReviews = ({ restaurantId, isOwner, resRating }: { restaurantId: string; isOwner: boolean; resRating: number }) => {
    const navigate = useNavigate();
    const {
        reviews,
        isLoading,
        deleteReview,
        isDeleting,
        hasReviewed
    } = useRestaurantReviews(restaurantId);
    const { user: currentUser } = useAuthStore();

    const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
    
    const handleActionClick = () => {
        navigate(`/restaurant/${restaurantId}/review`);
    };

    const handleEditReview = () => {
        navigate(`/restaurant/${restaurantId}/review`);
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <ReviewHeader
                resRating={resRating}
                count={reviews.length}
                isOwner={isOwner}
                onWriteClick={handleActionClick}
                hasReviewed={hasReviewed}
            />

            {/* Reviews List Section */}
            <div className="space-y-6">
                {isLoading ? (
                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <SkeletonReviewCard key={i} />
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {reviews && reviews.length > 0 ? (
                            reviews.map((rev) => (
                                <ReviewCard
                                    key={rev._id}
                                    rev={rev}
                                    isAuthor={rev.user?._id === currentUser?.id}
                                    onEdit={handleEditReview}
                                    onDelete={() => setReviewToDelete(rev._id!)}
                                    isDeleting={isDeleting && reviewToDelete === rev._id}
                                />
                            ))
                        ) : (
                            // Empty State
                            <EmptyState
                                icon={FaCommentSlash}
                                message="No reviews for this restaurant yet."
                                subtitle={isOwner ? "Your restaurant is waiting for its first rating!" : "Be the first one to share your experience!"} />
                        )}
                    </AnimatePresence >
                )}
            </div >

            {/* Delete Pop Up */}
            <ConfirmPopUp
                isOpen={!!reviewToDelete}
                onClose={() => !isDeleting && setReviewToDelete(null)}
                onConfirm={() => {
                    if (reviewToDelete) {
                        deleteReview(undefined, {
                            onSuccess: () => setReviewToDelete(null)
                        });
                    }
                }}
                isLoading={isDeleting}
                title="Delete Review"
                message="Are you sure you want to delete this review? This action cannot be undone."
                variant="danger"
            />
        </div >
    );
};

export default RestaurantReviews;