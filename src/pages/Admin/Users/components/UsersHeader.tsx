import { IoPeopleOutline } from "react-icons/io5";

interface UsersHeaderProps {
    total: number;
    isLoading: boolean;
}

export const UsersHeader = ({ total, isLoading }: UsersHeaderProps) => {
    return (
        <div className="flex justify-between items-center bg-white p-8 rounded-2xl shadow-sm border border-gray-50 gap-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                    <IoPeopleOutline size={28} />
                </div>
                <h1 className="text-xl md:text-2xl font-black text-text-primary">Total Users</h1>
            </div>
            <span className="text-xl md:text-2xl font-black text-text-primary">
                {isLoading ? "..." : total.toLocaleString()}
            </span>
        </div>
    );
};
