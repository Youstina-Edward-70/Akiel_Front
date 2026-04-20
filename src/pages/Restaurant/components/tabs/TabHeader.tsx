import {motion} from 'framer-motion';

const TabHeader = ({ tab, isActive, onClick }: {
    tab: { id: string; label: string };
    isActive: boolean;
    onClick: () => void;
}) => (
    <button
        key={tab.id}
        onClick={onClick}
        className={`relative px-6 py-4 text-sm font-bold transition-colors duration-300 shrink-0 cursor-pointer
            ${isActive ? "text-primary " : "text-text-secondary hover:text-gray-700"
            }`}
    >
        {tab.label}

        {isActive && (
            <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        )}
    </button>
);

export default TabHeader