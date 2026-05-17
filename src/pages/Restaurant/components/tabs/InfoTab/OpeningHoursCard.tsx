import { formatTime } from "../../../../../utils/formatters";

interface OpeningHoursItem {
    day: string;
    isClosed: boolean;
    opens?: string | null;
    closes?: string | null;
}

export const OpeningHoursCard = ({ openingHours }: { openingHours: OpeningHoursItem[] }) => {
    return (
        <section className="space-y-6">
            <h3 className="text-xl font-bold text-text-primary">Opening Hours</h3>
            <div className="bg-gray-50/50 rounded-3xl p-6 space-y-4 border border-gray-100 shadow-sm">
                {openingHours.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                        <span className="font-bold text-text-primary capitalize">
                            {item.day}
                        </span>
                        
                        <span className={`font-black text-sm ${item.isClosed ? 'text-red-500 bg-red-50 px-2.5 py-1 rounded-lg' : 'text-text-secondary'}`}>
                            {item.isClosed ? (
                                "Closed"
                            ) : (
                                `${formatTime(item.opens)} - ${formatTime(item.closes)}`
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};