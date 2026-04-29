import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/layout/MainLayout';
import AuthLayout from '../layouts/layout/AuthLayout';
import AdminLayout from '../layouts/layout/AdminLayout';

// Pages
import Home from '../pages/Home/Home';
import SearchResults from '../pages/AllRestaurants/SearchResults';
import RestaurantDetails from '../pages/Restaurant/RestaurantDetails';
import AboutUs from '../pages/About/AboutUs';
import Profile from '../pages/User/Profile';
import EditProfile from '../pages/User/EditProfile';
import Favorites from '../pages/User/Favorites';
import Reviews from '../pages/User/Reviews';
import AddRestaurant from '../pages/Owner/AddRestaurant';
import Dashboard from '../pages/Admin/Dashboard';
import NotFound from '../pages/NotFound';

// Auth Features (The rebuilt pages)
import Login from "../features/auth/login";
import Signup from "../features/auth/signup";
import ForgetPass from "../features/auth/forgetPass";
import ResetPass from "../features/auth/resetPass";


export const Routes = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            // Visitors Routes
            { path: "/", element: <Home /> },
            { path: "/search", element: <SearchResults /> },
            { path: "/restaurant/:id", element: <RestaurantDetails /> },
            { path: "/about", element: <AboutUs /> },

            // Authenticated User Routes
            { path: "/profile", element: <Profile /> },
            { path: "/profile/edit", element: <EditProfile /> },
            { path: "/favorites", element: <Favorites /> },
            { path: "/reviews", element: <Reviews /> },

            // Owner Routes
            { path: "/add-restaurant", element: <AddRestaurant /> },
            { path: "/edit-restaurant/:id", element: <AddRestaurant /> },
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
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { path: "dashboard", element: <Dashboard /> },
        ],
    },
    // Catch-all for 404
    {
        path: "*", element: <NotFound code="500" message="The kitchen is currently in a rush!" subtitle="Our chefs are dealing with a temporary issue. Please take a seat and refresh the page in a moment." />
    }
]);