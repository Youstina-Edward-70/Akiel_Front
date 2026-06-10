import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useReview from "./useReview"
import type { ReviewUser } from "../../../types/UserSchema";
import ReviewCard from "./components/ReviewCard"
import ConfirmPopUp from "../../../ui/ConfirmPopUp";
import EmptyReviews from "./components/EmptyReviews";
import { ErrorAddEditReview } from "./AddEditReview/components/ErrorAddEditReview";
import MyReviewsSkeleton from "./components/MyReviewsSkeleton";

const Reviews = () => {
    const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

    const {
        myReviews,
        isLoadingRev,
        revError,
        deleteReview,
        isDeleting,
        navigate
    } = useReview({ forceFetch: true });

    if (isLoadingRev) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10">
                <MyReviewsSkeleton />
            </div>
        );
    }

    if (revError) {
        return (
            <ErrorAddEditReview
                message={revError?.message || "Could not retrieve your reviews. Please try again later."}
                onBack={() => navigate(-1)}
            />
        );
    }

    const totalReviews = myReviews?.length || 0;

    const handleEditRedirect = (restaurantId: string, reviewId: string) => {
        navigate(`/restaurant/${restaurantId}/edit-review/${reviewId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-10 px-4 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                <div className="flex flex-col items-start gap-1 text-start border-b border-gray-100 pb-5">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
                            My Reviews
                        </h1>
                        <span className="bg-secondary/20 text-secondary text-xs font-bold px-2.5 py-1 rounded-full border border-orange-100">
                            {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
                        </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                        View and manage all the reviews and comments you've shared with restaurants across Egypt.
                    </p>
                </div>

                {/* Reviews List */}
                {totalReviews === 0 ? (
                    <EmptyReviews />
                ) : (
                    <motion.div className="grid grid-cols-1 gap-5 w-full">
                        <AnimatePresence mode="popLayout">
                            {myReviews.map((review: ReviewUser) => (
                                <ReviewCard
                                    key={review._id}
                                    rev={review}
                                    onEdit={() => handleEditRedirect(review.restaurant?._id, review._id!)}
                                    onDelete={() => setReviewToDelete(review.restaurant?._id)}
                                    isDeleting={isDeleting}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
                <ConfirmPopUp
                    isOpen={!!reviewToDelete}
                    onClose={() => !isDeleting && setReviewToDelete(null)}
                    onConfirm={() => {
                        if (reviewToDelete) {
                            deleteReview.mutate(reviewToDelete, {
                            onSuccess: () => setReviewToDelete(null)
                        });
                        }
                    }}
                    isLoading={isDeleting}
                    title="Delete Review"
                    message="Are you sure you want to delete this review? This action cannot be undone."
                    variant="danger"
                />
            </div>
        </div>
    )
}

export default Reviews
