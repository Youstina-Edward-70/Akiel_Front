import { motion } from "framer-motion";
import { IoFastFoodOutline } from "react-icons/io5";
import Button from "../../../../ui/Button";


const NoResults = ({ searchTerm }: { searchTerm: string }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-20 px-4 text-center">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center mb-8 relative"
            >
                <IoFastFoodOutline className="text-gray-200 text-7xl" />
            </motion.div>

            {/* Text Content */}
            <h3 className="text-2xl font-black text-gray-800 mb-2">
                No restaurants found
            </h3>
            <p className="text-gray-500 max-w-xs mx-auto mb-8 font-medium">
                We couldn't find anything matching <span className="text-primary font-bold">"{searchTerm}"</span>.
                Try checking the spelling or use a different keyword.
            </p>

            {/* Action Button */}
            <Button
                onClick={() => window.history.back()}
                className="px-6 py-3 rounded-2xl"
            >
                Go Back
            </Button>
        </div>
    );
};

export default NoResults;