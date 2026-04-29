import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import type { Restaurant } from "../../../../types/RestaurantSchema";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";

const tabs = [
    { id: "menu", label: "Menu" },
    { id: "photos", label: "Photos" },
    { id: "reviews", label: "Reviews" },
    { id: "info", label: "Info" },
];

const RestaurantTabs = ({ restaurantId, isOwner, restaurant }: { restaurantId: string, isOwner: boolean, restaurant: Restaurant }) => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(search);
    const activeTab = queryParams.get("select") || "menu";

    const handleTabChange = (tabId: string) => {
        navigate(`?select=${tabId}`, { replace: true });
    };

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-100 relative overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <TabHeader
                        key={tab.id}
                        tab={tab}
                        isActive={activeTab === tab.id}
                        onClick={() => handleTabChange(tab.id)}
                    />
                ))}
            </div>

            {/* Tab Content */}
            <div className="py-8">
                <AnimatePresence mode="wait">
                    <TabContent
                        activeTab={activeTab}
                        restaurantId={restaurantId}
                        isOwner={isOwner}
                        restaurant={restaurant}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RestaurantTabs;