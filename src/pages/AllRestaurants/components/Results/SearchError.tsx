import { useNavigate } from "react-router-dom";
import { LuWifiOff } from "react-icons/lu";
import Button from "../../../../ui/Button";

interface SearchErrorProps {
    onRetry: () => void;
}

const ErrorMessage = ({ onRetry }: SearchErrorProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-start justify-center w-full py-16 px-4">
            <div className="bg-white border border-gray-100 rounded-2xl py-16 max-w-3xl w-full text-center shadow-sm">
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
                    <LuWifiOff className="text-2xl text-danger" />
                </div>

                {/* Text */}
                <h3 className="text-base font-semibold text-text-primary mb-2">
                    Something went wrong
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    We couldn't load the restaurants. Please check your connection and try again.
                </p>

                {/* Actions */}
                <div className="flex gap-2 justify-center">
                    <Button
                        onClick={onRetry}
                        className="px-6 py-2.5 rounded-full text-sm"
                    >
                        Try again
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        variant="outline"
                        className="px-6 py-2.5 rounded-full text-sm"
                    >
                        Go home
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ErrorMessage
