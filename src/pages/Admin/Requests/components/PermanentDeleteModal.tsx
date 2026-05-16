import { IoWarningOutline } from "react-icons/io5";
import Button from "../../../../ui/Button";

interface PermanentDeleteModalProps {
    maxLimit: number;
    isPending: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const PermanentDeleteModal = ({ maxLimit, isPending, onClose, onConfirm }: PermanentDeleteModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-red-50">
                <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-red-50 text-danger rounded-full mb-4 animate-pulse">
                        <IoWarningOutline size={40} />
                    </div>
                    <h2 className="text-xl font-black text-danger/90 mb-2">Final Warning: Permanent Deletion</h2>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        This restaurant has reached the maximum rejection limit (<span className="font-bold text-danger">{maxLimit} rejections</span>). 
                        Completing this action will <span className="font-bold text-text-primary">permanently delete</span> the restaurant data from the system.
                    </p>
                    
                    <div className="w-full p-4 bg-red-50/60 rounded-2xl mb-6 border border-red-100/50 text-left flex items-start gap-3">
                        <div className="text-danger mt-0.5 font-bold">i</div>
                        <p className="text-danger/90 text-xs leading-relaxed">
                            This action is irreversible. All related files, records, and logs will be purged from the central database.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Button 
                            onClick={onConfirm} 
                            isLoading={isPending} 
                            variant="danger" 
                            className="w-full py-4 rounded-xl text-sm"
                        >
                            Reject and Delete Permanently
                        </Button>
                        <Button 
                            onClick={onClose} 
                            variant="outline" 
                            className="w-full py-3.5 rounded-xl text-sm text-gray-500 bg-transparent hover:bg-gray-50 border-none shadow-none"
                        >
                            Cancel/Go Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};