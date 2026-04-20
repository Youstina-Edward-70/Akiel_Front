import { motion } from "framer-motion";
import { type IconType } from "react-icons";
import { FaInbox } from "react-icons/fa";

const EmptyState = ({ icon: Icon = FaInbox, message, subtitle }: { icon?: IconType; message: string; subtitle?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-20 mb-16 bg-white rounded-2xl border-2 border-dashed border-gray-200"
        >
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-400">{message}</p>
            {subtitle &&
                <p className="text-gray-500">
                    {subtitle}
                </p>
            }
        </motion.div>
    );
};

export default EmptyState;