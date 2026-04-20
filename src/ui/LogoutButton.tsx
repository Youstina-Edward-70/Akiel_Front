import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LuLogOut } from "react-icons/lu";
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const LogoutButton = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        queryClient.clear();
        logout();
        toast.success("Logged out successfully");
        navigate('/auth/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-danger hover:bg-red-50 rounded-xl transition-all duration-200"
        >
            <LuLogOut size={18} />
            <span>Sign Out</span>
        </button>
    );
};

export default LogoutButton;