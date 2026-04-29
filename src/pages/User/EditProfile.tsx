import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaArrowLeft, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";

interface EditProfileInputs {
    fullname: string;
    email: string;
    phone: string;
    address: {
        governorate: string;
        city: string;
        street: string;
        details: string;
    };
}

const EditProfile = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const { register, handleSubmit } = useForm<EditProfileInputs>({
        defaultValues: {
            fullname: user?.fullname || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: {
                governorate: user?.address?.[0]?.governorate || "Qena",
                city: user?.address?.[0]?.city || "",
                street: user?.address?.[0]?.street || "",
                details: user?.address?.[0]?.details || ""
            }
        }
    });

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = (data: EditProfileInputs) => {
        console.log("Updated Data:", data);
        toast.success("Profile updated successfully!");
        navigate("/profile"); // يرجعه لصفحة البروفايل بعد الحفظ
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 font-sans text-left">
            <div className="max-w-3xl mx-auto px-4">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-100 transition text-slate-600"
                    >
                        <FaArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Edit Profile</h1>
                        <p className="text-sm text-gray-500 font-medium">Update your information and how others see you</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Profile Picture Upload Section */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-red-50 p-1 overflow-hidden bg-gray-50">
                                <img
                                    src={selectedImage || (user?.profile_pic === "default.png" || !user?.profile_pic ? "/default-avatar.png" : user?.profile_pic)}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <input type="file" ref={fileInputRef} onChange={onImageChange} className="hidden" accept="image/*" />
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-1 right-1 bg-[#E31E24] p-2.5 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
                            >
                                <FaCamera size={14} />
                            </button>
                        </div>
                        <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tap camera to change photo</p>
                    </div>

                    {/* Main Information */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#E31E24] rounded-full"></span>
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase ml-1">Full Name</label>
                                <input {...register("fullname")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase ml-1">Email Address</label>
                                <input {...register("email")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase ml-1">Phone Number</label>
                                <input {...register("phone")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" />
                            </div>
                        </div>
                    </div>

                    {/* Address Information - التقسيم المطلوب */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#E31E24] rounded-full"></span>
                            Address Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase ml-1">Governorate</label>
                                <select {...register("address.governorate")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700 appearance-none">
                                    <option value="Qena">Qena</option>
                                    <option value="Cairo">Cairo</option>
                                    <option value="Sohag">Sohag</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase ml-1">City</label>
                                <input {...register("address.city")} placeholder="e.g. Qena City" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase ml-1">Street</label>
                                <input {...register("address.street")} placeholder="e.g. University St." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase ml-1">Detailed Address</label>
                                <input {...register("address.details")} placeholder="Building, Floor, Apartment" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button 
                            type="button" 
                            onClick={() => navigate(-1)}
                            className="flex-1 py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-2 py-4 bg-[#E31E24] text-white rounded-2xl font-black shadow-lg shadow-red-200 hover:bg-red-700 transition flex items-center justify-center gap-2"
                        >
                            <FaSave /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;