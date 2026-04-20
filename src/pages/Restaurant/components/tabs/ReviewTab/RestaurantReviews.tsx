import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Review } from "../../../../../types/UserSchema";
import ConfirmPopUp from "../../../../../ui/ConfirmPopUp";
import { useAuthStore } from "../../../../../store/authStore";
import useRestaurantReviews from "../../../hooks/useRestaurantReviews";
import ReviewHeader from "./ReviewHeader";
import ReviewCard from "../../../ui/ReviewCard";
import SkeletonReviewCard from "../../../ui/SkeletonReviewCard";
import EmptyState from "../../../../../ui/EmptyState";
// import EditReviewModal from "../../ui/EditReviewModal";
import { FaCommentSlash } from "react-icons/fa";

const RestaurantReviews = ({ restaurantId, isOwner, resRating }: { restaurantId: string; isOwner: boolean; resRating: number }) => {
    const {
        reviews,
        isLoading,
        deleteReview,
        isDeleting,
        updateReview,
        isUpdating
    } = useRestaurantReviews(restaurantId);

    const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);
    const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
    const { user: currentUser } = useAuthStore();

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <ReviewHeader
                resRating={resRating}
                count={reviews.length}
                isOwner={isOwner}
                onWriteClick={() => {
                    // Open Add Review Modal 
                    console.log("Open Add Review Modal");
                }}
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
                                    isAuthor={rev.user?._id === currentUser?._id}
                                    onEdit={(selectedReview) => setReviewToEdit(selectedReview)}
                                    onDelete={(id) => setReviewToDelete(id)}
                                />
                            ))
                        ) : (
                            // Empty State
                            <EmptyState
                                icon={FaCommentSlash}
                                message="No reviews for this restaurant yet."
                                subtitle={isOwner ? "Be the first to review this restaurant!" : ""}
                            />
                        )}
                    </AnimatePresence >
                )}
            </div >

            {/* Delete Pop Up */}
            <ConfirmPopUp
                isOpen={!!reviewToDelete}
                onClose={() => setReviewToDelete(null)}
                onConfirm={() => reviewToDelete &&
                    deleteReview(reviewToDelete, {
                        onSuccess: () => setReviewToDelete(null)
                    })}
                isLoading={isDeleting}
                title="Delete Review"
                message="Are you sure you want to delete this review? This action cannot be undone."
                variant="danger"
            />

            {/* Edit Review Modal */}
            {/* {reviewToEdit && (
                <EditReviewModal
                    isOpen={!!reviewToEdit}
                    review={reviewToEdit}
                    onClose={() => setReviewToEdit(null)}
                    onSave={(newContent) => {
                        updateReview({ 
                            reviewId: reviewToEdit._id!, 
                            content: newContent 
                        }, {
                            onSuccess: () => setReviewToEdit(null)
                        });
                    }}
                    isLoading={isUpdating}
                />
            )} */}
        </div >
    );
};

export default RestaurantReviews;