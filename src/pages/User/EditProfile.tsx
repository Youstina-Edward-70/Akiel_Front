import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaArrowLeft, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";

const API_URL = "https://all-restaurants-in-one.vercel.app";

const EditProfile = () => {
    const authUser = useAuthStore((state) => state.user);
    const { profile, updateProfile } = useUserStore();
    
    const token = (useAuthStore.getState() as any).token || (authUser as any)?.Token || (authUser as any)?.token;
    const userId = (authUser as any)?._id || (authUser as any)?.id;
    
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null); 

    const currentFullName = profile?.fullname || authUser?.fullname || "";
    const currentEmail = profile?.email || authUser?.email || "";
    const currentPhone = profile?.phone || authUser?.phone || "";
    const currentAddress = profile?.address?.[0] || authUser?.address?.[0] || { governorate: "Qena", city: "", street: "", details: "" };
    const currentPic = selectedImage || profile?.profile_pic || authUser?.profile_pic || "/default-avatar.png";

    const { register, handleSubmit } = useForm({
        defaultValues: {
            fullname: currentFullName,
            email: currentEmail,
            phone: currentPhone,
            address: currentAddress
        }
    });

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file); 
            setSelectedImage(URL.createObjectURL(file)); 
        }
    };

    const onSubmit = async (data: any) => {
        if (!userId || !token) return toast.error("Session expired, please login again.");
        const toastId = toast.loading("Updating profile...");

        try {
            const updateResponse = await fetch(`${API_URL}/user/editUserProfile/${userId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) 
            });

            if (!updateResponse.ok) {
                const err = await updateResponse.json();
                throw new Error(err.message || "Failed to update profile data");
            }

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                const photoResponse = await fetch(`${API_URL}/user/uploadProfilePhoto`, {
                    method: "PATCH",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData
                });
                if (!photoResponse.ok) throw new Error("Data updated, but photo failed.");
            }

            updateProfile({
                fullname: data.fullname,
                email: data.email,
                phone: data.phone,
                address: [data.address]
            });

            toast.success("Profile updated successfully!", { id: toastId });
            navigate("/profile"); 
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile", { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 font-sans text-left">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-100 transition text-slate-600"><FaArrowLeft size={18} /></button>
                    <div><h1 className="text-2xl font-black text-slate-900">Edit Profile</h1><p className="text-sm text-gray-500 font-medium">Update your information and how others see you</p></div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-red-50 p-1 overflow-hidden bg-gray-50">
                                <img src={currentPic} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <input type="file" ref={fileInputRef} onChange={onImageChange} className="hidden" accept="image/*" />
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-1 right-1 bg-[#E31E24] p-2.5 rounded-full text-white shadow-lg hover:scale-110 transition-transform"><FaCamera size={14} /></button>
                        </div>
                        <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tap camera to change photo</p>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#E31E24] rounded-full"></span> Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2"><label className="text-xs font-black text-gray-400 uppercase ml-1">Full Name</label><input {...register("fullname")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" /></div>
                            <div className="space-y-2"><label className="text-xs font-black text-gray-400 uppercase ml-1">Email Address</label><input {...register("email")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" /></div>
                            <div className="md:col-span-2 space-y-2"><label className="text-xs font-black text-gray-400 uppercase ml-1">Phone Number</label><input {...register("phone")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" /></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#E31E24] rounded-full"></span> Address Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2"><label className="text-xs font-black text-gray-400 uppercase ml-1">Governorate</label><select {...register("address.governorate")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700 appearance-none"><option value="Qena">Qena</option><option value="Cairo">Cairo</option><option value="Sohag">Sohag</option></select></div>
                            <div className="space-y-2"><label className="text-xs font-black text-gray-400 uppercase ml-1">City</label><input {...register("address.city")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" /></div>
                            <div className="space-y-2"><label className="text-xs font-black text-gray-400 uppercase ml-1">Street</label><input {...register("address.street")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" /></div>
                            <div className="space-y-2"><label className="text-xs font-black text-gray-400 uppercase ml-1">Detailed Address</label><input {...register("address.details")} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-700" /></div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black hover:bg-gray-50 transition">Cancel</button>
                        <button type="submit" className="flex-2 py-4 bg-[#E31E24] text-white rounded-2xl font-black shadow-lg shadow-red-200 hover:bg-red-700 transition flex items-center justify-center gap-2"><FaSave /> Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;