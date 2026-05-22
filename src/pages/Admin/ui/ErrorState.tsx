import { IoAlertCircleOutline, IoArrowBackOutline } from "react-icons/io5";
import Button from "../../../ui/Button";

interface ErrorStateProps {
    message?: string;
    errorInWhat: string;
    onGoBack: () => void;
}

export const ErrorState = ({ message, errorInWhat, onGoBack }: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-3xl border border-gray-100 p-8 text-center w-full mx-auto shadow-sm my-8">
            <div className="p-4 bg-red-50 text-danger rounded-full mb-4">
                <IoAlertCircleOutline size={48} />
            </div>
            <h3 className="text-lg font-black text-text-primary mb-2">Something went wrong</h3>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed max-w-sm">
                {message} Please check your connection or make sure the {errorInWhat} ID is correct.
            </p>
            <Button
                onClick={onGoBack} 
                variant="outline" 
                className="gap-2 text-sm px-5 py-2.5 rounded-xl text-text-secondary border-gray-200 hover:bg-gray-50"
            >
                <IoArrowBackOutline size={18} /> Back to {errorInWhat}
            </Button>
        </div>
    );
};