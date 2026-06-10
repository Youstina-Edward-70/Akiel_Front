import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/layout/MainLayout';
import AuthLayout from '../layouts/layout/AuthLayout';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../pages/Home/Home';
import SearchResults from '../pages/AllRestaurants/SearchResults';
import RestaurantDetails from '../pages/Restaurant/RestaurantDetails';
import AboutUs from '../pages/About/AboutUs';
import NotFound from '../pages/NotFound';

// Authenticated
import Profile from '../pages/User/Profile/Profile';
import EditProfile from '../pages/User/EditProfile/EditProfile';

// User
import Favorites from '../pages/User/Favorites/Favorites';
import Reviews from '../pages/User/Reviews/Reviews';
import AddEditReview from '../pages/User/Reviews/AddEditReview/AddEditReview';
import Add_EditRestaurant from '../pages/User/AddEditRest/Add_EditRestaurant';
import MyDashboard from '../pages/User/MyDashboard/MyDashboard';
import MyNotifications from '../pages/User/MyNotifications/MyNotifications';

// Owner
import AddMenuPage from '../pages/Owner/menu/AddMenuPage';
import EditDishPage from '../pages/Owner/menu/EditDishPage';

// Admin
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Requests from '../pages/Admin/Requests/Requsets';
import SingleRequest from '../pages/Admin/Requests/SingleRequest';
import Users from '../pages/Admin/Users/Users';
import EditSingleUser from '../pages/Admin/Users/EditSingleUser';
import Settings from '../pages/Admin/Settings/Settings';

// Auth Features
import Login from "../features/auth/login";
import Register from "../features/auth/register";
import ForgetPass from "../features/auth/forgetPass";
import ResetPass from "../features/auth/resetPass";
import ChangePass from '../features/auth/changePass';
import OtpVerify from '../features/auth/otpVerify';

export const Routes = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            // Visitors Routes
            { path: "/", element: <Home /> },
            { path: "/search", element: <SearchResults /> },
            { path: "/restaurant/:id", element: <RestaurantDetails /> },
            { path: "/about", element: <AboutUs /> },

            // Authenticated Routes
            {
                element: <ProtectedRoute allowedRoles={["user", "admin", "owner"]} />,
                children: [
                    { path: "/profile/:id", element: <Profile /> },
                    { path: "/profile/edit/:id", element: <EditProfile /> },
                ]
            },
            {
                element: <ProtectedRoute allowedRoles={["user", "owner"]} />,
                children: [
                    { path: "/add-restaurant", element: <Add_EditRestaurant /> },
                    { path: "/edit-restaurant/:id", element: <Add_EditRestaurant /> },
                    { path: "/my-dashboard/:id", element: <MyDashboard /> },
                    { path: "/my-notifications", element: <MyNotifications /> },
                ]
            },
            // User Routes
            {
                element: <ProtectedRoute allowedRoles={["user"]} />,
                children: [
                    { path: "/favorites", element: <Favorites /> },
                    { path: "/reviews", element: <Reviews /> },
                    { path: "/restaurant/:id/add-review", element: <AddEditReview /> },
                    { path: "/restaurant/:id/edit-review/:revId", element: <AddEditReview /> },
                ]
            },
            // Owner Routes
            {
                element: <ProtectedRoute allowedRoles={["owner"]} />,
                children: [
                    { path: "/restaurant/:id/menu/add", element: <AddMenuPage /> },
                    { path: "/restaurant/:id/menu/edit/:dishId", element: <EditDishPage /> },
                ]
            },
        ],
    },
    // Admin Routes
    {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
            {
                path: "/admin",
                element: <AdminDashboard />,
                children: [
                    { index: true, element: <Requests /> },
                    { path: "requests", element: <Requests /> },
                    { path: "requests/:id", element: <SingleRequest /> },
                    { path: "users", element: <Users /> },
                    { path: "users/:id", element: <EditSingleUser /> },
                    { path: "settings", element: <Settings /> },
                ]
            }
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "forget-password", element: <ForgetPass /> },
            { path: "reset-password", element: <ResetPass /> },
            { path: "change-password", element: <ChangePass /> },
            { path: "otp-verification", element: <OtpVerify /> },
        ],
    },
    // Catch-all for 404
    {
        path: "*",
        element: <NotFound code="404" message="Page Not Found!" subtitle="The page you are looking for doesn't exist or has been moved." />
    }
]);