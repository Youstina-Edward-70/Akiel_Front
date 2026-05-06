import { useAuthStore } from '../store/authStore';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    if (user && !allowedRoles.includes(user.role)) {
        return <Navigate to="not-found" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;