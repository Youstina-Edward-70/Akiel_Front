import { useNavigate } from "react-router-dom";
import { IoCallOutline, IoLogoWhatsapp, IoLocationOutline, IoCreateOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import type { Restaurant } from "../../../../../types/RestaurantSchema";
import Button from "../../../../../ui/Button";

const RestaurantInfo = ({ restaurant, isOwner }: { restaurant: Restaurant; isOwner: boolean }) => {
    const navigate = useNavigate();
    const handleEditNavigation = () => {
        navigate(`/edit-restaurant/${restaurant._id}`);
    };

    return (
        <div className="relative min-h-100 pb-24 space-y-12 font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-10 bg-primary rounded-full shadow-sm shadow-primary/20" />
                    <div>
                        <h2 className="text-3xl font-black text-text-primary tracking-tight">
                            About {restaurant.name}
                        </h2>
                        <p className="text-gray-400 font-medium text-sm mt-1">
                            Everything you need to know about our place
                        </p>
                    </div>
                </div>
                {/* Floating Action Button */}
                {isOwner && (
                    <Button
                        variant="primary"
                        onClick={handleEditNavigation}
                        className="group p-4 rounded-full shadow-2xl flex items-center gap-0 hover:gap-2 transition-all duration-300"
                    >
                        <IoCreateOutline className="text-3xl" />
                        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
                            Edit Information
                        </span>
                    </Button>
                )}
            </div>

            {/* About Section */}
            <section className="bg-white/50 rounded-3xl space-y-4">
                <p className="text-text-secondary leading-relaxed font-medium text-lg italic">
                    "{restaurant.description || 'No description provided for this restaurant.'}"
                </p>
            </section>

            {/* Contact Details */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-text-primary">Contact Details</h3>
                <div className="grid gap-4">
                    <div className="flex items-center gap-4 text-text-secondary">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                            <IoCallOutline className="text-xl text-primary" />
                        </div>
                        <span className="font-bold">{restaurant.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-4 text-text-secondary">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                            <IoLogoWhatsapp className="text-xl text-green-500" />
                        </div>
                        <span className="font-bold">{restaurant.whatsappNumber || 'Not Available'}</span>
                    </div>
                    <div className="flex items-center gap-4 text-text-secondary">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                            <FaFacebook className="text-xl text-blue-600" />
                        </div>
                        <span className="font-bold">{(restaurant.facebookLink as string) || 'Not Available'}</span>
                    </div>
                </div>
            </section>

            {/* Opening Hours */}
            <section className="space-y-6">
                <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-text-primary">Opening Hours</h3>
                </div>
                <div className="bg-gray-50/50 rounded-3xl p-6 space-y-4 border border-gray-100 shadow-sm">
                    {restaurant.openingHours.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                            <span className={'font-bold text-text-primary'}>
                                {item.day}
                            </span>
                            <span className={'font-black text-text-secondary'}>
                                {item.opens} - {item.closes}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Location */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-text-primary">Location</h3>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                        <IoLocationOutline className="text-xl text-primary" />
                    </div>
                    <p className="text-text-secondary leading-relaxed font-medium">
                        {restaurant.address[0].details}, {restaurant.address[0].street}, {restaurant.address[0].city}, {restaurant.address[0].governorate}
                    </p>
                </div>
            </section>
        </div >
    );
};

export default RestaurantInfo;