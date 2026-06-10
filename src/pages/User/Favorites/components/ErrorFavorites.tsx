import { IoWarningOutline } from "react-icons/io5";
import Button from "../../../../ui/Button";

interface ErrorFavoritesProps {
    message: string;
    onBack: () => void;
}

export const ErrorFavorites = ({ message, onBack }: ErrorFavoritesProps) => {
    return (
        <div className="min-h-[70dvh] bg-gray-50 flex items-center justify-center p-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-4">
                <div className="w-16 h-16 bg-red-50 text-danger rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    <IoWarningOutline size={30} />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Failed to load favorites page</h3>
                <p className="text-sm text-text-secondary">{message}</p>
                <Button onClick={onBack} className="w-full py-3 rounded-full">
                    Go Back
                </Button>
            </div>
        </div>
    );
};