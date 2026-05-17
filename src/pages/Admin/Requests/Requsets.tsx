import EmptyState from "./components/EmptyState";
import RequestsTableSkeleton from "./components/RequestsTableSkeleton";

import { RequestsHeader } from "./components/RequestsHeader";
import { RequestsTable } from "./components/RequestsTable";
import { RejectionReasonModal } from "./components/RejectionReasonModal";
import { PermanentDeleteModal } from "./components/PermanentDeleteModal";

import { useRequestsData } from "./hooks/useRequestsData";

const Requests = () => {
    const {
        requests,
        isLoading,
        isPending,
        maxLimit,
        selectedReq,
        showReasonModal,
        showWarningModal,
        rejectionReason,
        setRejectionReason,
        handleRejectClick,
        confirmRejection,
        confirmPermanentDelete,
        closeModals,
        handleApprove
    } = useRequestsData();

    return (
        <div className="space-y-8 relative">
            <RequestsHeader count={requests?.length || 0} isLoading={isLoading} />

            {isLoading ? (
                <RequestsTableSkeleton />
            ) : !requests || requests.length === 0 ? (
                <EmptyState heading="No Pending Requests" subtext="You've cleared all the queue!" />
            ) : (
                <RequestsTable 
                    requests={requests}
                    maxLimit={maxLimit}
                    isPending={isPending}
                    onApprove={handleApprove}
                    onRejectClick={handleRejectClick}
                />
            )}

            {showReasonModal && selectedReq && (
                <RejectionReasonModal 
                    restaurantName={selectedReq.name}
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

export default Requests;