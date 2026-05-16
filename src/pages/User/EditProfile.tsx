import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaArrowLeft, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";

const API_URL = "https://all-restaurants-in-one.vercel.app";

const getValidImageUrl = (url: any) => {
    if (!url || typeof url !== 'string' || url === "undefined" || url === "null" || url === "/default-avatar.png") return "/default-avatar.png";
    if (url.startsWith("http") || url.startsWith("blob:") || url.startsWith("data:")) return url;
    return `${API_URL}/${url.replace(/^\/+/, '')}`;
};

const EditProfile = () => {
    const authUser = useAuthStore((state) => state.user);
    const updateUserAuth = useAuthStore((state) => (state as any).updateUser);
    const { profile, updateProfile } = useUserStore();
    
    const safeProfile = profile as any;
    const safeAuthUser = authUser as any;
    
    const token = (useAuthStore.getState() as any).token || safeAuthUser?.Token || safeAuthUser?.token;
    const userId = safeAuthUser?._id || safeAuthUser?.id;
    
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null); 

    const currentFullName = safeProfile?.fullname || safeAuthUser?.fullname || "";
    const currentEmail = safeProfile?.email || safeAuthUser?.email || "";
    const currentPhone = safeProfile?.phone || safeAuthUser?.phone || "";
    const currentAddress = safeProfile?.address?.[0] || safeAuthUser?.address?.[0] || { governorate: "", city: "", street: "", details: "" };
    
    const currentPic = getValidImageUrl(selectedImage || safeProfile?.profile_pic || safeAuthUser?.profile_pic || safeAuthUser?.image);

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

            let finalImageUrl = safeAuthUser?.profile_pic || safeAuthUser?.image;

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                const photoResponse = await fetch(`${API_URL}/user/uploadProfilePhoto`, {
                    method: "PATCH",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData
                });
                
                if (photoResponse.ok) {
                    const photoData = await photoResponse.json();
                    
                    // استخراج الرابط المبدئي
                    let serverUrl = photoData?.profile_pic || photoData?.user?.profile_pic || photoData?.data?.profile_pic || photoData?.image;
                    
                    // حل ذكي للإيرور: لو السيرفر رجع object بدل string، نحاول نطلع جواه كلمة url أو path
                    if (typeof serverUrl === 'object' && serverUrl !== null) {
                        serverUrl = serverUrl.url || serverUrl.path || serverUrl.secure_url;
                    }

                    // التأكد إن الرابط نص صحيح قبل ما نستخدم .includes
                    if (typeof serverUrl === 'string') {
                        finalImageUrl = `${serverUrl}${serverUrl.includes('?') ? '&' : '?'}t=${new Date().getTime()}`;
                    } else {
                        finalImageUrl = URL.createObjectURL(imageFile); 
                    }
                } else {
                    throw new Error("Data updated, but photo failed.");
                }
            }

            const newUserData: any = {
                ...safeAuthUser, 
                fullname: data.fullname,
                email: data.email,
                phone: data.phone,
                address: [data.address],
                profile_pic: finalImageUrl,
                image: finalImageUrl 
            };

            updateProfile(newUserData);
            
            if (typeof updateUserAuth === "function") {
                updateUserAuth(newUserData);
            }
            useAuthStore.setState({ user: newUserData });

            toast.success("Profile updated successfully!", { id: toastId });
            
            setTimeout(() => {
                navigate("/profile");
            }, 500);

        } catch (error: any) {
            toast.error(error.message || "Failed to update profile", { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-surface py-12 font-sans text-left">
            <div className="max-w-3xl mx-auto px-4">
                
                <div className="flex items-center gap-4 mb-2">
                    <button type="button" onClick={() => navigate(-1)} className="p-3 bg-background rounded-full shadow-sm border border-border-light hover:bg-gray-50 transition text-text-secondary">
                        <FaArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-text-primary">Edit Profile</h1>
                        <p className="text-sm text-text-muted font-medium">Update your information</p>
                    </div>
                </div>

                <div className="flex flex-col items-center mb-10 mt-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full p-2 bg-[#DDBEA9] overflow-hidden flex items-center justify-center shadow-sm">
                            <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white">
                                <img src={currentPic} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={onImageChange} className="hidden" accept="image/*" />
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-1 right-1 bg-primary p-2.5 rounded-full text-white shadow-md hover:bg-primary-hover transition-colors border-2 border-white">
                            <FaCamera size={14} />
                        </button>
                    </div>
                    <h2 className="mt-4 text-2xl font-black text-text-primary">{currentFullName || "User"}</h2>
                    <p className="text-sm text-text-secondary font-medium">User</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="bg-background rounded-2xl p-8 shadow-sm border border-border-light">
                        <h3 className="text-lg font-black text-text-primary mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text-muted uppercase ml-1">Full Name</label>
                                <input {...register("fullname")} className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text-muted uppercase ml-1">Email Address</label>
                                <input {...register("email")} className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black text-text-muted uppercase ml-1">Phone Number</label>
                                <input {...register("phone")} className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-background rounded-[2rem] p-8 shadow-sm border border-border-light">
                        <h3 className="text-lg font-black text-text-primary mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Address Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text-muted uppercase ml-1">Governorate</label>
                                <input {...register("address.governorate")} placeholder="Governorate" className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text-muted uppercase ml-1">City</label>
                                <input {...register("address.city")} placeholder="City / District" className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text-muted uppercase ml-1">Street</label>
                                <input {...register("address.street")} placeholder="Street Name" className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text-muted uppercase ml-1">Detailed Address</label>
                                <input {...register("address.details")} placeholder="Details" className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 bg-background border border-border-light text-text-secondary rounded-2xl font-black hover:bg-surface transition">
                            Cancel
                        </button>
                        <button type="submit" className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black shadow-lg hover:bg-primary-hover transition flex items-center justify-center gap-2">
                            <FaSave /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;