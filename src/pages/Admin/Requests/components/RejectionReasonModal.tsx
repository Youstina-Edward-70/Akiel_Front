import { IoWarningOutline } from "react-icons/io5";
import Button from "../../../../ui/Button";

interface RejectionReasonModalProps {
    restaurantName: string;
    reason: string;
    isPending: boolean;
    setReason: (val: string) => void;
    onClose: () => void;
    onConfirm: () => void;
}

export const RejectionReasonModal = ({ restaurantName, reason, isPending, setReason, onClose, onConfirm }: RejectionReasonModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex flex-col items-center">
                    <div className="p-4 bg-primary/10 text-primary rounded-full mb-4">
                        <IoWarningOutline size={36} />
                    </div>
                    <h2 className="text-xl font-black text-text-primary mb-2">Reject Restaurant Request</h2>
                    <p className="text-text-secondary text-sm text-center mb-6 leading-relaxed">
                        Please provide a reason for rejecting <span className="font-bold text-danger">{restaurantName}</span>. This will be sent to the owner.
                    </p>
                    
                    <div className="w-full text-left mb-2">
                        <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Rejection Reason</label>
                    </div>
                    <textarea 
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Type the reason here..."
                        className="w-full h-32 p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent/50 focus:bg-white resize-none mb-6 text-sm transition-all"
                    />

                    <div className="flex gap-3 w-full">
                        <Button 
                            onClick={onClose} 
                            variant="outline" 
                            className="flex-1 py-3.5 rounded-xl border border-gray-100 bg-white text-text-secondary hover:bg-gray-50 shadow-none text-sm"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={onConfirm} 
                            isLoading={isPending} 
                            variant="danger" 
                            className="flex-1 py-3.5 rounded-xl text-sm"
                        >
                            Confirm Rejection
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};