import { IoLocationOutline } from "react-icons/io5";
import { formatAddress } from "../../../../../utils/formatters";
import type { Address } from "../../../../../types/RestaurantSchema";

export const LocationCard = ({ address }: { address: Address[] }) => {
    return (
        <section className="space-y-6">
            <h3 className="text-xl font-bold text-text-primary">Branches & Locations</h3>
            
            <div className="space-y-4">
                {address.map((addr, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100/50 group-hover:bg-primary/5 duration-300">
                            <IoLocationOutline className="text-xl text-primary" />
                        </div>
                        
                        <div className="flex flex-col justify-center min-h-10">
                            {address.length > 1 && (
                                <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-0.5">
                                    Location #{index + 1}
                                </span>
                            )}
                            <p className="text-text-secondary leading-relaxed font-medium text-sm md:text-base">
                                {formatAddress(addr)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};