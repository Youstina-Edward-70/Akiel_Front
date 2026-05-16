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
import Profile from '../pages/User/Profile';
import EditProfile from '../pages/User/EditProfile';

// User
import Favorites from '../pages/User/Favorites';
import Reviews from '../pages/User/Reviews';
import AddRestaurant from '../pages/Owner/AddRestaurant';

// Owner
import AddMenuPage from '../pages/Owner/menu/AddMenuPage';
import EditDishPage from '../pages/Owner/menu/EditDishPage';

// Admin
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Requests from '../pages/Admin/Requests/Requsets';
import Users from '../pages/Admin/Users/Users';
import Settings from '../pages/Admin/Settings/Settings';

// Auth Features
import Login from "../features/auth/login";
import Signup from "../features/auth/signup";
import ForgetPass from "../features/auth/forgetPass";
import ResetPass from "../features/auth/resetPass";
import SingleRequest from '../pages/Admin/Requests/SingleRequest';

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
                    { path: "/profile", element: <Profile /> },
                    { path: "/profile/edit", element: <EditProfile /> },
                ]
            },
            // User Routes
            {
                element: <ProtectedRoute allowedRoles={["user"]} />,
                children: [
                    { path: "/favorites", element: <Favorites /> },
                    { path: "/reviews", element: <Reviews /> },
                    { path: "/add-restaurant", element: <AddRestaurant /> },
                ]
            },
            // Owner Routes
            {
                element: <ProtectedRoute allowedRoles={["owner"]} />,
                children: [
                    { path: "/my-restaurant", element: <AddRestaurant /> },
                    { path: "/edit-restaurant/:id", element: <AddRestaurant /> },
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
                    {path: "/admin/requests/:id", element: <SingleRequest />},
                    { path: "users", element: <Users /> },
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
            { path: "signup", element: <Signup /> },
            { path: "forget-password", element: <ForgetPass /> },
            { path: "reset-password", element: <ResetPass /> },
        ],
    },
    // Catch-all for 404
    {
        path: "*", element: <NotFound code="500" message="The kitchen is currently in a rush!" subtitle="Our chefs are dealing with a temporary issue. Please take a seat and refresh the page in a moment." />
    }
]);