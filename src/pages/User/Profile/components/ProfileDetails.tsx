import { Link } from "react-router-dom";
import type { User } from "../../../../types/UserSchema";
import { InfoItem } from "./InfoItem";
import { FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { formatAddress } from "../../../../utils/formatters";

export const ProfileDetails = ({ user }: { user: User | undefined }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="font-bold text-xl mb-1">Personal Details</h2>
        <p className="text-sm text-text-muted mb-6">Keep your profile information up to date</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 border-b border-gray-200 pb-8">
            <InfoItem label="Full Name" value={user?.fullname || ""} icon={FaUser} />
            <InfoItem label="Phone" value={user?.phone || ""} icon={IoCallOutline} />
            <div className="md:col-span-2 flex flex-col gap-8">
                <InfoItem label="Email" value={user?.email || ""} icon={FaEnvelope} />
                <InfoItem
                    label="Address"
                    value={formatAddress(user?.address)}
                    icon={FaMapMarkerAlt}
                />
            </div>
        </div>
        <Link to={'/auth/change-password'} className="inline-block mt-6 text-primary text-sm font-bold hover:underline">Change Password</Link>
    </div>
);