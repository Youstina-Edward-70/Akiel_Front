import { IoWarningOutline } from "react-icons/io5";
import Button from "../../../../ui/Button";

interface SettingsErrorProps {
    onRetry: () => void;
    message?: string;
}

export const SettingsError = ({ onRetry, message = "Failed to load system configurations." }: SettingsErrorProps) => (
    <div className="flex flex-col items-center justify-center min-h-80 bg-white rounded-2xl border border-gray-50 p-8 md:p-12 text-center shadow-sm max-w-3xl mx-auto my-8 font-sans">
        {/* Error Visual Indicator */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6 border border-red-100/50">
            <IoWarningOutline size={30} />
        </div>

        <h3 className="text-lg font-black text-text-primary mb-2">Configuration Error</h3>
        <p className="text-sm text-text-secondary max-w-sm mb-8 leading-relaxed">
            {message} Please check your connection or access permissions and try again.
        </p>

        <Button
            type="button"
            onClick={onRetry}
            className="px-8 py-3 rounded-full text-sm font-bold"
        >
            Try Again
        </Button>
    </div>
);