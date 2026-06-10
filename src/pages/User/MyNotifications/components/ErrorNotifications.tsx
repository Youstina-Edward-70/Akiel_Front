import { IoRefreshOutline } from "react-icons/io5"
import Button from "../../../../ui/Button"

const ErrorNotifications = ({ refetch }: { refetch: () => void }) => {
    return (
        <div className="min-h-[70dvh] bg-gray-50 flex items-start justify-center p-12 text-center font-sans">
            <div className="bg-white p-8 rounded-3xl shadow-sm max-w-md border border-gray-100">
                <p className="text-text-secondary font-semibold text-lg mb-4">
                    Something went wrong while loading notifications.
                </p>
                <Button
                    onClick={() => refetch()}
                    className="px-6 py-2.5 rounded-xl gap-2 text-sm"
                >
                    <IoRefreshOutline size={20} /> Try Again
                </Button>
            </div>
        </div>
    )
}

export default ErrorNotifications
