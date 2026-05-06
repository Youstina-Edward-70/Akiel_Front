import { motion, AnimatePresence } from "framer-motion";
import { IoWarningOutline, IoCloseOutline } from "react-icons/io5";
import {createPortal} from "react-dom"

interface ConfirmPopUpProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading?: boolean;
    variant?: "danger" | "warning";
}

const ConfirmPopUp = ({ 
    isOpen, onClose, onConfirm, title, message, isLoading, variant = "danger" 
}: ConfirmPopUpProps) => {
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-999 flex items-center justify-center p-4 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    
                    {/* Pop Up Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center z-10"
                    >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                            variant === "danger" ? "bg-red-50 text-red-500" : "bg-orange-50 text-orange-500"
                        }`}>
                            <IoWarningOutline className="text-4xl" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">{message}</p>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 py-4 px-6 rounded-full cursor-pointer bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={`flex-1 py-4 px-6 rounded-full cursor-pointer text-white font-bold transition-all shadow-lg disabled:opacity-50 ${
                                    variant === "danger" ? "bg-primary hover:bg-primary/90 shadow-red-100" : "bg-orange-500 hover:bg-orange-600 shadow-orange-100"
                                }`}
                            >
                                {isLoading ? "Processing..." : "Confirm"}
                            </button>
                        </div>

                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <IoCloseOutline className="text-2xl" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ConfirmPopUp;

/*
{reviewToEdit && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">تعديل التقييم</h3>
            
            {/* هنا هتحطي الـ Form بتاعك لأنك ممكن تحتاجي تعديلات أكتر من مجرد محتوى، زي مثلاً الريتينج }
            <textarea 
                defaultValue={reviewToEdit.Content}
                className="w-full border p-3 rounded-lg"
                id="edit-content"
            />
            
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setReviewToEdit(null)}>إلغاء</button>
                <button 
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                    onClick={() => {
                        const newContent = (document.getElementById('edit-content') as HTMLTextAreaElement).value;
                        updateReviewMutation.mutate({ 
                            reviewId: reviewToEdit._id, 
                            updatedData: { Content: newContent } 
                        });
                    }}
                >
                    حفظ التعديلات
                </button>
            </div>
        </div>
    </div>
)}
*/