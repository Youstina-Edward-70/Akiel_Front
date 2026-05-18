import { IoSettingsOutline } from "react-icons/io5";

export const SettingsHeader = () => (
    <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
        <div className="p-3 bg-red-50 text-red-500 rounded-xl shrink-0">
            <IoSettingsOutline size={28} />
        </div>
        <div>
            <h1 className="text-xl md:text-2xl font-black mb-1.5 text-text-primary">System Configurations</h1>
            <p className="text-sm text-text-secondary">Adjust global parameters, pricing thresholds, and automation policies.</p>
        </div>
    </div>
);