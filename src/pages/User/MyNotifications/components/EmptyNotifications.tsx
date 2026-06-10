import { IoNotificationsOutline } from "react-icons/io5"

const EmptyNotifications = () => {
    return (
        <div className="min-h-[70dvh] bg-gray-50 flex items-start justify-center p-12 text-center font-sans">
            <div className="flex flex-col items-center bg-white p-12 pt-8 rounded-2xl shadow-md w-full max-w-7xl">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                    <IoNotificationsOutline className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-1">All caught up!</h3>
                <p className="text-text-secondary text-sm">You don't have any notifications right now.</p>
            </div>
        </div>
    )
}

export default EmptyNotifications
