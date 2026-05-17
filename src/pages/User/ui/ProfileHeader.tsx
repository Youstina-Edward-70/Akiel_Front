import { FaUser, FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

interface HeaderProps {
    name: string;
    role: string;
    pic: string;
}

const ProfileHeader = ({ name, role, pic }: HeaderProps) => (
    <div className="bg-background rounded-4xl p-8 shadow-sm border border-border-light relative overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-36 h-36 rounded-full p-2 bg-[#FDEADD] overflow-hidden flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white flex items-center justify-center">
                    {pic ? <img src={pic} className="w-full h-full object-cover" alt="User" /> : <FaUser size={40} className="text-primary" />}
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-black text-text-primary mb-1">{name || "User Name"}</h1>
                <p className="text-text-secondary font-medium mb-6 capitalize">{role}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <Link to="/profile/edit" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-primary-hover transition shadow-sm">
                        <FaEdit size={16} /> Edit Profile
                    </Link>
                    {role === "user" && (
                        <Link to="/add-restaurant" className="bg-slate-500 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-slate-600 transition shadow-sm">
                            <FaPlus size={16} /> Add a new restaurant
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default ProfileHeader;