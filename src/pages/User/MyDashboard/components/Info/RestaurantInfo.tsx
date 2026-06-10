import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import type { Restaurant } from "../../../../../types/RestaurantSchema";
import Button from "../../../../../ui/Button";
import ConfirmPopUp from "../../../../../ui/ConfirmPopUp";
import { useAuthStore } from "../../../../../store/authStore";

import { ContactDetails } from "./ContactDetails";
import { OpeningHoursCard } from "./OpeningHoursCard";
import { LocationCard } from "./LocationCard";
import { DangerZone } from "./DangerZone";
import useMyDashboard from "../../useMyDashboard";

const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { deleteRestaurant, isDeletingRestaurant } = useMyDashboard(restaurant._id!);
    const handleEditNavigation = () => {
        navigate(`/edit-restaurant/${restaurant._id}`);
    };

    const updateUserRole = useAuthStore((state) => state.updateUserRole);

    const handleDelete = () => {
        deleteRestaurant(restaurant._id, {
            onSuccess: () => {
                updateUserRole('user');
                navigate('/', { replace: true });
            }
        });
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="relative min-h-100 w-full py-8 space-y-12 font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-10 bg-primary rounded-full shadow-sm shadow-primary/20" />
                    <h2 className="text-3xl font-black text-text-primary tracking-tight">
                        About {restaurant.name}
                    </h2>
                </div>
                {/* Floating Action Button */}
                <Button
                    variant="primary"
                    onClick={handleEditNavigation}
                    className="group p-4 rounded-full flex items-center gap-0 hover:gap-2"
                >
                    <IoCreateOutline className="text-3xl" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
                        Edit Information
                    </span>
                </Button>
            </div>

            {/* About Section */}
            <section className="bg-white/50 rounded-3xl space-y-4">
                <p className="text-text-secondary leading-relaxed font-medium text-lg italic">
                    "{restaurant.description || 'No description provided for this restaurant.'}"
                </p>
            </section>

            {/* Contact Details */}
            <ContactDetails
                phoneNumber={restaurant.phoneNumber}
                email={restaurant.email}
                whatsappNumber={restaurant.whatsappNumber}
                facebookLink={restaurant.facebookLink as string}
            />

            {/* Opening Hours */}
            <OpeningHoursCard openingHours={restaurant.openingHours} />

            {/* Location */}
            <LocationCard address={restaurant.address} />

            {/* Danger Zone */}
            <DangerZone onDeleteClick={() => setIsDeleteModalOpen(true)} />

            {/* Confirm Delete PopUp */}
            <ConfirmPopUp
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Restaurant?"
                message={`Are you sure you want to delete "${restaurant.name}"? This action cannot be undone and all data will be lost.`}
                variant="danger"
                isLoading={isDeletingRestaurant}
            />
        </div >
    );
};

export default RestaurantInfo;