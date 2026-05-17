import { IoMailOutline, IoLocationOutline, IoCallOutline, IoLogoWhatsapp } from "react-icons/io5";
import type { Address } from "../../../../../types/RestaurantSchema";
import { formatAddress } from "../../../../../utils/formatters";

interface GeneralInfoCardProps {
    email: string;
    addresses: Address[];
    phone: string;
    whatsapp: string | null;
    ownerName: string;
    ownerPic: string | null | undefined;
}

export const GeneralInfoCard = ({ email, addresses, phone, whatsapp, ownerName, ownerPic }: GeneralInfoCardProps) => {

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm space-y-8">
            <div className="space-y-6">
                <h3 className="text-lg font-black text-text-primary flex items-center gap-2 border-b border-gray-50 pb-3">
                    <span className="w-1 h-5 bg-primary rounded-full" /> General & Contact Information
                </h3>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Email Address</label>
                        <div className="flex items-center gap-3 bg-gray-50/60 px-4 py-3.5 rounded-2xl border border-gray-100/50 text-sm text-gray-600">
                            <IoMailOutline size={18} className="text-text-secondary" /> <span>{email}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Full Address</label>
                        {addresses.map((addr) => (
                            <div key={addr._id} className="flex items-center gap-3 bg-gray-50/60 px-4 py-3.5 rounded-2xl border border-gray-100/50 text-sm text-gray-600">
                                <IoLocationOutline size={18} className="text-text-secondary" /> <span>{formatAddress(addr)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Phone Number</label>
                        <div className="flex items-center gap-3 bg-gray-50/60 px-4 py-3.5 rounded-2xl border border-gray-100/50 text-sm text-gray-600">
                            <IoCallOutline size={18} className="text-text-secondary" /> <span>{phone}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">WhatsApp Number</label>
                        <div className="flex items-center gap-3 bg-gray-50/60 px-4 py-3.5 rounded-2xl border border-gray-100/50 text-sm text-gray-600">
                            <IoLogoWhatsapp size={18} className={whatsapp ? "text-green-500" : "text-text-secondary"} /> 
                            <span>{whatsapp || "Not Available"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
                <h3 className="text-lg font-black text-text-primary flex items-center gap-2">
                    <span className="w-1 h-5 bg-primary rounded-full" /> Owner Information
                </h3>
                <div className="flex items-center gap-4 bg-gray-50/40 p-4 rounded-2xl border border-gray-50">
                    <img 
                        src={ownerPic  || `https://ui-avatars.com/api/?name=${ownerName}`}
                        alt={ownerName} 
                        className="w-12 h-12 rounded-full object-cover border border-white shadow-sm"
                    />
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm">{ownerName}</h4>
                        <p className="text-xs text-text-secondary">Restaurant Partner</p>
                    </div>
                </div>
            </div>
        </div>
    );
};