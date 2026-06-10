import { IoAlertCircleOutline } from "react-icons/io5";
import Button from "../../../../ui/Button";

const ErrorEditProfile = ({error, navigate}: {error:Error; navigate: () => void;} ) => {
    return (
        <div className="min-h-[70dvh] bg-gray-50 flex items-center justify-center font-sans p-4">
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center space-y-4">
                <IoAlertCircleOutline className="text-5xl text-danger mx-auto" />
                <h3 className="text-xl font-bold text-text-primary">Failed to load profile</h3>
                <p className="text-sm text-text-secondary">{error?.message || "Try Again Later"}</p>
                <Button onClick={navigate} className="w-full py-3 rounded-full">
                    Go Back
                </Button>
            </div>
        </div>
    );
}

export default ErrorEditProfile
