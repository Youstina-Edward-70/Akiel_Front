import { IoClipboardOutline } from "react-icons/io5";

const EmptyState = ({ heading, subtext }: { heading: string, subtext: string }) => (
    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl shadow-sm border border-gray-50 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
            <IoClipboardOutline size={40} />
        </div>
        <h3 className="text-xl font-black text-gray-800 mb-2">{heading}</h3>
        <p className="text-gray-400 text-sm max-w-sm">
            {subtext}
        </p>
    </div>
);

export default EmptyState;