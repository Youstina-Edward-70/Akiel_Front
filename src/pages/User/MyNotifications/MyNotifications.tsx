import { formatDate } from "../../../utils/formatters";
import EmptyNotifications from "./components/EmptyNotifications";
import ErrorNotifications from "./components/ErrorNotifications";
import SkeletonNotifications from "./components/SkeletonNotifications";
import useMyNotifications from "./useMyNotifications";
import { IoNotificationsOutline } from "react-icons/io5";

const MyNotifications = () => {
    const { notifications, isLoading, isError, refetch } = useMyNotifications();

    if (isLoading) {
        return <SkeletonNotifications />;
    }

    if (isError) {
        return <ErrorNotifications refetch={() => refetch()} />;
    }

    if (!notifications || notifications.length === 0) {
        return <EmptyNotifications />;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-start">

            {/* Header*/}
            <div className="py-8 px-12 bg-white shadow-sm">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-black text-text-primary tracking-tight">
                        My Notifications
                    </h1>
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-md border border-blue-100">
                        <IoNotificationsOutline size={20} />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-6 md:py-12 space-y-6">
                <div className="space-y-4">
                    {notifications.map((notification) => {
                        const regex = /Your request has been rejected because:\s*(.*?)\.\s*(You have \d+ attempts left\.)/i;
                        const match = notification.message.match(regex);

                        return (
                            <div
                                key={notification._id}
                                className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <h3 className="text-base font-bold text-text-primary mb-3">
                                    {formatDate(notification.createdAt)}
                                </h3>

                                {match ? (
                                    <div className="text-text-secondary font-medium text-sm md:text-base leading-relaxed space-y-2">
                                        <p>
                                            Your request has been rejected because:{" "}
                                            <span className="text-red-500 font-bold">
                                                "{match[1]}"
                                            </span>
                                        </p>

                                        <p className="text-gray-500 text-xs md:text-sm font-semibold">
                                            {match[2]}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-text-secondary font-medium text-sm md:text-base leading-relaxed">
                                        {notification.message}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default MyNotifications;