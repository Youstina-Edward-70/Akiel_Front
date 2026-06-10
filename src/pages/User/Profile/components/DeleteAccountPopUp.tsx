import { motion, AnimatePresence } from "framer-motion";
import { IoTrashOutline } from "react-icons/io5";
import Button from "../../../../ui/Button";

interface DeleteAccountPopUpProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export const DeleteAccountPopUp = ({ isOpen, onClose, onConfirm, isLoading = false }: DeleteAccountPopUpProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="bg-white w-full max-w-md p-6 rounded-2xl border border-gray-100 shadow-xl relative z-10"
                    >
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="p-3 rounded-full bg-red-50 text-danger">
                                <IoTrashOutline size={32} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-text-primary">Delete Account</h3>
                            <p className="text-sm text-text-secondary max-w-xs">
                                This action is permanent and cannot be undone. All your profile data, reviews, and favorites will be permanently removed.
                            </p>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 py-3 text-sm rounded-xl font-semibold"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={onConfirm}
                                isLoading={isLoading}
                                className="flex-1 py-3 text-sm rounded-xl font-semibold"
                            >
                                Delete Account
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};