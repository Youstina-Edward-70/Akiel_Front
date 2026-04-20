import { IoCallOutline, IoLogoWhatsapp, IoLocationOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import type { Restaurant } from "../../../../../types/RestaurantSchema";

const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {

    return (
        <div className="max-w-4xl space-y-12 pb-20">
            {/* About Section */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-primary rounded-full" />
                    <h2 className="text-2xl font-black text-text-primary tracking-tight">
                        About {restaurant.name}
                    </h2>
                </div>
                <div className="text-text-secondary leading-relaxed space-y-4 font-medium">
                    <p>
                        {restaurant.description}
                    </p>
                </div>
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
        </div>
    );
};

export default RestaurantInfo;