import { useSingleRequest } from "./hooks/useSingleRequest";
import { RequestHero } from "./components/oneRequest/RequestHero";
import { GeneralInfoCard } from "./components/oneRequest/GeneralInfoCard";
import { OperationalCard } from "./components/oneRequest/OperationalCard";
import { RejectionReasonModal } from "./components/RejectionReasonModal";
import { PermanentDeleteModal } from "./components/PermanentDeleteModal";
import { IoArrowBackOutline, IoCloseOutline, IoCheckmarkOutline } from "react-icons/io5";
import Button from "../../../ui/Button";
import { SingleRequestSkeleton } from "./components/oneRequest/SingleRequestSkeleton";
import { RequestErrorState } from "./components/oneRequest/RequestErrorState";

const SingleRequest = () => {
    const {
        request,
        isLoading,
        error,
        isPending,
        maxLimit,
        showReasonModal,
        showWarningModal,
        rejectionReason,
        setRejectionReason,
        handleRejectClick,
        confirmRejection,
        confirmPermanentDelete,
        closeModals,
        handleApprove,
        goBack
    } = useSingleRequest();

    if (isLoading) {
        return <SingleRequestSkeleton />;
    }

    if (error || !request) {
        return <RequestErrorState onGoBack={goBack} />;
    }

    return (
        <div className="space-y-5 md:space-y-6 px-4 md:px-0">
            <RequestHero
                coverUrl={request.coverPhoto.url}
                name={request.name}
                cuisines={request.cuisineType}
                rejectionCount={request.rejectionCount}
                maxLimit={maxLimit}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6 items-start">
                <div className="xl:col-span-2 w-full">
                    <GeneralInfoCard
                        email={request.email}
                        addresses={request.address}
                        phone={request.phoneNumber}
                        whatsapp={request.whatsappNumber}
                        ownerName={request.Owner.fullname}
                        ownerPic={request.Owner.profile_pic}
                    />
                </div>
                <div className="w-full">
                    <OperationalCard
                        openingHours={request.openingHours}
                        delivery={request.delivery}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 md:p-5 rounded-2xl border border-gray-50 shadow-sm gap-4">
                <Button
                    onClick={goBack}
                    variant="normal"
                    className="w-full sm:w-auto gap-2 py-2 text-sm font-bold text-text-secondary hover:text-text-primary duration-300"
                >
                    <IoArrowBackOutline size={18} /> Back to Requests
                </Button>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                        onClick={handleRejectClick}
                        isLoading={isPending}
                        variant="danger"
                        className="w-full sm:w-auto gap-2 px-6 py-2.5 rounded-full text-sm"
                    >
                        <IoCloseOutline size={20} /> Reject
                    </Button>
                    <Button
                        onClick={handleApprove}
                        isLoading={isPending}
                        variant="normal"
                        className="w-full sm:w-auto gap-2 px-6 py-2.5 font-bold bg-success text-white rounded-full shadow-md shadow-success/10 hover:bg-success/80 text-sm"
                    >
                        <IoCheckmarkOutline size={20} /> Approve
                    </Button>
                </div>
            </div>

            {showReasonModal && (
                <RejectionReasonModal
                    restaurantName={request.name}
                    reason={rejectionReason}
                    isPending={isPending}
                    setReason={setRejectionReason}
                    onClose={closeModals}
                    onConfirm={confirmRejection}
                />
            )}

            {showWarningModal && (
                <PermanentDeleteModal
                    maxLimit={maxLimit}
                    isPending={isPending}
                    onClose={closeModals}
                    onConfirm={confirmPermanentDelete}
                />
            )}
        </div>
    );
};

export default SingleRequest;