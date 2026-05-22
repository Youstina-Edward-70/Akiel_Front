import { FaHeart, FaStar, FaUtensils, FaEdit, FaClipboardList, FaUsers, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ActionProps {
    role: string;
    onLogout: () => void;
    favoritesCount?: number;
    reviewsCount?: number;
    restaurantId?: string; 
}

interface CardProps {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    sub: string;
    to: string;
    color: string;
    bg: string;
}

const RoleActions = ({ role, onLogout, favoritesCount = 0, reviewsCount = 0, restaurantId = "" }: ActionProps) => (
    <div className="space-y-4">
        {role === "user" && (
            <>
                <ActionCard icon={FaHeart} title="My Favorites" sub={`${favoritesCount} Restaurants saved`} to="/favorites" color="text-primary" bg="bg-primary-light" />
                <ActionCard icon={FaStar} title="My Reviews" sub={`${reviewsCount} Reviews published`} to="/reviews" color="text-orange-500" bg="bg-orange-50" />
            </>
        )}
        
        {role === "owner" && (
            <>
                <ActionCard 
                    icon={FaUtensils} 
                    title="My Restaurant" 
                    sub="View my restaurant details" 
                    to="/my-restaurant" 
                    color="text-primary" 
                    bg="bg-primary-light" 
                />
                <ActionCard 
                    icon={FaEdit} 
                    title="Edit Restaurant" 
                    sub="Update restaurant info" 
                    to={restaurantId ? `/edit-restaurant/${restaurantId}` : "/my-restaurant"} 
                    color="text-orange-500" 
                    bg="bg-orange-50"
                />
            </>
        )}
        
        {role === "admin" && (
            <>
                <ActionCard icon={FaClipboardList} title="Requests" sub="View restaurant requests" to="/admin/requests" color="text-primary" bg="bg-primary-light" />
                <ActionCard icon={FaUsers} title="All Users" sub="View all users" to="/admin/users" color="text-orange-500" bg="bg-orange-50" />
            </>
        )}
        
        <button onClick={onLogout} className="w-full bg-background p-5 rounded-3xl shadow-sm border border-border-light flex items-center gap-4 hover:shadow-md transition group cursor-pointer">
            <div className="bg-surface p-3.5 rounded-xl text-text-muted group-hover:text-primary transition-colors"><FaSignOutAlt size={20} /></div>
            <div className="flex-1 text-left"><h4 className="font-black text-text-primary">Logout</h4><p className="text-xs text-text-muted font-medium">Securely sign out</p></div>
            <FaChevronRight className="text-border-light" />
        </button>
    </div>
);

const ActionCard = ({ icon: Icon, title, sub, to, color, bg }: CardProps) => (
    <Link to={to} className="bg-background p-5 rounded-3xl shadow-sm border border-border-light flex items-center gap-4 hover:shadow-md transition group">
        <div className={`p-3.5 rounded-xl transition-transform group-hover:scale-105 ${bg} ${color}`}><Icon size={20} /></div>
        <div className="flex-1 text-left"><h4 className="font-black text-text-primary">{title}</h4><p className="text-xs text-text-muted font-medium">{sub}</p></div>
        <FaChevronRight className="text-border-light" />
    </Link>
);

export default RoleActions;