import { IoBicycleOutline } from "react-icons/io5";
import type { OpeningHour } from "../../../../../types/RestaurantSchema";
import { formatTime } from "../../../../../utils/formatters";

interface OperationalCardProps {
    openingHours: OpeningHour[];
    delivery: boolean;
}

export const OperationalCard = ({ openingHours, delivery }: OperationalCardProps) => {

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-50 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-text-primary flex items-center gap-2 border-b border-gray-50 pb-3">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Operational Status & Hours
            </h3>

            <div className="divide-y divide-gray-50/60">
                {openingHours.map((item) => (
                    <div key={item._id} className={`flex flex-row justify-between items-center py-4 text-sm gap-4 w-full ${item.isClosed ? "bg-red-50/40 px-3 rounded-xl my-1" : ""}`}>
                        <span className={`font-bold capitalize shrink-0 ${item.isClosed ? "text-red-500" : "text-text-secondary"}`}>
                            {item.day}
                        </span>
                        <span className={`font-medium tracking-wide text-right whitespace-nowrap ${item.isClosed
                                ? "text-red-500 font-bold"
                                : "text-text-primary/70"
                            }`}>
                            {item.isClosed ? "Closed" : `${formatTime(item.opens)} - ${formatTime(item.closes)}`}
                        </span>
                    </div>
                ))}
            </div>

            <div className={`p-4 rounded-2xl border flex items-center gap-4 ${delivery ? 'bg-green-50/50 border-green-100 text-green-700' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                <div className={`p-2.5 rounded-xl shrink-0 ${delivery ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'}`}>
                    <IoBicycleOutline size={22} />
                </div>
                <div>
                    <h4 className="font-bold text-sm">Delivery Status</h4>
                    <p className="text-xs opacity-80">{delivery ? "Has Delivery Service" : "Doesn't have Delivery"}</p>
                </div>
            </div>
        </div>
    );
};