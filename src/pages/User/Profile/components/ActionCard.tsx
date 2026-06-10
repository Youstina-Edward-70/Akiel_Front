import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

interface CardProps {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    path?: string;
    color: string;
    bg: string;
    onClick?: () => void;
}

export const ActionCard = ({ title, subtitle, icon: Icon, path, onClick, color, bg }: CardProps) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={onClick ? onClick : () => path && navigate(path)}
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all duration-300"
        >
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`p-3.5 rounded-xl shrink-0 transition-transform duration-300 group-hover:rotate-6 ${bg} ${color}`}>
                    <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-black text-text-primary truncate">{title}</h4>
                    <p className="text-xs text-text-muted font-medium truncate">{subtitle}</p>
                </div>
                <div className="ml-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                    <FaChevronRight className="text-border-light" />
                </div>
            </div>
        </div>
    );
};