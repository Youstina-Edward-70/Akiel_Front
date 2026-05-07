import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaCloudUploadAlt, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

// استيراد الثوابت الحقيقية من ملفك
import { CuisineTypes, Days } from "../../types/constants";

const API_URL = "https://all-restaurants-in-one.vercel.app";

// تعريف الـ Types عشان نمنع أي أخطاء من TypeScript نهائياً
interface RestaurantFormValues {
    name: string;
    addresses: { governorate: string; city: string; street: string; details: string; }[];
    deliveryAvailable: boolean;
    description: string;
    phone: string;
    email: string;
    openingHours: { day: string; from: string; to: string; isClosed: boolean; }[];
}

const AddRestaurant = () => {
    const navigate = useNavigate();
    const authUser = useAuthStore((state) => state.user);
    
    const safeAuthUser = authUser as any;
    const token = (useAuthStore.getState() as any).token || safeAuthUser?.Token || safeAuthUser?.token;
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null); 
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>(['Egyptian']);

    const { register, control, handleSubmit, watch } = useForm<RestaurantFormValues>({
        defaultValues: {
            name: "",
            // تم تغيير القيمة الافتراضية للمحافظة لتكون فارغة
            addresses: [{ governorate: "", city: "", street: "", details: "" }],
            deliveryAvailable: true,
            description: "",
            phone: "",
            email: "",
            openingHours: [{ day: "saturday", from: "09:00", to: "23:00", isClosed: false }]
        }
    });

    const { fields: hourFields, append: appendHour, remove: removeHour } = useFieldArray({ control, name: "openingHours" });
    const watchOpeningHours = watch("openingHours");

    // prepend عشان يضيف العنوان الجديد فوق مش تحت
    const { fields: addressFields, prepend: prependAddress, remove: removeAddress } = useFieldArray({ control, name: "addresses" });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setSelectedImageURL(URL.createObjectURL(file));
        }
    };

    const toggleCuisine = (cuisineName: string) => {
        setSelectedCuisines(prev => prev.includes(cuisineName) ? prev.filter(c => c !== cuisineName) : [...prev, cuisineName]);
    };

    const onSubmit = async (data: RestaurantFormValues) => {
        if (selectedCuisines.length === 0) return toast.error("Please select at least one cuisine type.");
        if (!imageFile) return toast.error("Please select a restaurant image.");

        const toastId = toast.loading("Submitting your request...");
        
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("name", data.name);
        formData.append("delivery", data.deliveryAvailable ? "1" : "0"); 
        formData.append("phoneNumber", data.phone);
        formData.append("description", data.description);
        formData.append("image", imageFile);
        
        formData.append("cuisineType", JSON.stringify(selectedCuisines));
        formData.append("address", JSON.stringify(data.addresses)); 
        
        const formattedHours = data.openingHours.map(h => ({
            day: h.day.toLowerCase(),
            opens: h.from,
            closes: h.to,
            isClosed: h.isClosed
        }));
        formData.append("openingHours", JSON.stringify(formattedHours));

        try {
            const response = await fetch(`${API_URL}/restaurants`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData 
            });

            if (response.ok) {
                toast.success("Request sent successfully! We will review it shortly.", { id: toastId });
                navigate("/profile");
            } else {
                const resData = await response.json();
                toast.error(resData.message || "Failed to submit request", { id: toastId });
            }
        } catch (error) {
            toast.error("Network error occurred", { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-surface py-12 font-sans">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-background rounded-[2rem] p-8 md:p-12 shadow-sm border border-border-light text-left">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-heading font-black text-text-primary mb-2">Add Your New Restaurant</h1>
                        <p className="text-text-muted font-medium text-sm">Fill in the details below to add a restaurant to our directory.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                        {/* Basic Info */}
                        <div>
                            <h3 className="text-xl font-black text-text-primary mb-6 border-l-4 border-primary pl-3">Basic Info</h3>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-text-muted uppercase ml-1">Restaurant Name</label>
                                    <input {...register("name", { required: true })} className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                                </div>
                                
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-text-muted uppercase ml-1">Cuisine Type</label>
                                    <div className="flex flex-wrap gap-2">
                                        {/* قراءة بيانات Cuisines الحقيقية من ملف constants */}
                                        {CuisineTypes.map((cuisineObj) => (
                                            <button 
                                                key={cuisineObj.id} 
                                                type="button" 
                                                onClick={() => toggleCuisine(cuisineObj.name)} 
                                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                                                    selectedCuisines.includes(cuisineObj.name) 
                                                    ? 'bg-primary border-primary text-white shadow-md' 
                                                    : 'bg-surface border-border-light text-text-secondary hover:bg-border-light/30'
                                                }`}
                                            >
                                                {cuisineObj.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Dynamic Addresses Section */}
                                <div className="bg-surface p-6 rounded-[1.5rem] border border-border-light space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-primary" /> Address Details
                                        </h4>
                                        <button 
                                            type="button" 
                                            // القيمة الافتراضية هنا بردو بقت فاضية بدل Cairo
                                            onClick={() => prependAddress({ governorate: "", city: "", street: "", details: "" })} 
                                            className="bg-primary-light text-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition"
                                        >
                                            <FaPlus size={12} /> Add New Address
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {addressFields.map((field, index) => (
                                            <div key={field.id} className="relative bg-background p-5 rounded-2xl border border-border-light shadow-sm">
                                                {addressFields.length > 1 && (
                                                    <button type="button" onClick={() => removeAddress(index)} className="absolute top-4 right-4 text-text-muted hover:text-danger bg-surface hover:bg-red-50 p-2 rounded-full transition">
                                                        <FaTrash size={12} />
                                                    </button>
                                                )}
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                                                    {/* تم تغيير select إلى input عشان المستخدم يكتب المحافظة بنفسه */}
                                                    <input {...register(`addresses.${index}.governorate`)} placeholder="Governorate" className="w-full bg-surface border border-border-light rounded-xl p-3 outline-none focus:border-primary font-semibold text-text-primary" />
                                                    <input {...register(`addresses.${index}.city`)} placeholder="City / District" className="w-full bg-surface border border-border-light rounded-xl p-3 outline-none focus:border-primary font-semibold text-text-primary" />
                                                    <input {...register(`addresses.${index}.street`)} placeholder="Street Name" className="w-full bg-surface border border-border-light rounded-xl p-3 outline-none focus:border-primary font-semibold text-text-primary" />
                                                    <input {...register(`addresses.${index}.details`)} placeholder="Details" className="w-full bg-surface border border-border-light rounded-xl p-3 outline-none focus:border-primary font-semibold text-text-primary" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-surface p-5 rounded-2xl border border-border-light">
                                    <span className="text-sm font-bold text-text-primary">Delivery Available</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" {...register("deliveryAvailable")} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-border-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Media Section */}
                        <div>
                            <h3 className="text-xl font-black text-text-primary mb-6 border-l-4 border-primary pl-3">Description & Media</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-text-muted uppercase ml-1">Restaurant Image</label>
                                    <div onClick={() => fileInputRef.current?.click()} className="w-full h-48 border-2 border-dashed border-border-light rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer hover:bg-primary-light hover:border-primary/50 transition group overflow-hidden relative bg-surface">
                                        {selectedImageURL ? (
                                            <img src={selectedImageURL} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <div className="bg-background p-4 rounded-full text-text-muted group-hover:text-primary transition mb-3 shadow-sm">
                                                    <FaCloudUploadAlt size={30} />
                                                </div>
                                                <span className="font-bold text-text-muted group-hover:text-primary">Click to upload main image</span>
                                            </>
                                        )}
                                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-text-muted uppercase ml-1">Description</label>
                                    <textarea {...register("description")} className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary h-32 resize-none" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-text-muted uppercase ml-1">Phone Number</label>
                                        <input {...register("phone")} className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-text-muted uppercase ml-1">Email Address</label>
                                        <input {...register("email")} type="email" className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours Section */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black text-text-primary border-l-4 border-primary pl-3 flex items-center gap-2">
                                    Opening Hours
                                </h3>
                                <button type="button" onClick={() => appendHour({ day: "monday", from: "09:00", to: "23:00", isClosed: false })} className="bg-primary-light text-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition">
                                    <FaPlus size={12} /> Add Day
                                </button>
                            </div>
                            <div className="space-y-4">
                                {hourFields.map((field, index) => {
                                    const isClosed = watchOpeningHours?.[index]?.isClosed;
                                    return (
                                        <div key={field.id} className="grid grid-cols-12 gap-4 items-center bg-surface p-4 rounded-2xl border border-border-light shadow-sm">
                                            <div className="col-span-12 md:col-span-3">
                                                {/* قراءة بيانات Days الحقيقية من ملف constants */}
                                                <select {...register(`openingHours.${index}.day`)} className="w-full bg-background border border-border-light rounded-xl p-3 outline-none font-semibold text-text-primary capitalize">
                                                    {Days.map(d => <option key={d} value={d}>{d}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-span-5 md:col-span-3">
                                                <input type="time" disabled={isClosed} {...register(`openingHours.${index}.from`)} className="w-full bg-background border border-border-light rounded-xl p-3 outline-none font-semibold text-text-primary disabled:opacity-50" />
                                            </div>
                                            <div className="col-span-5 md:col-span-3">
                                                <input type="time" disabled={isClosed} {...register(`openingHours.${index}.to`)} className="w-full bg-background border border-border-light rounded-xl p-3 outline-none font-semibold text-text-primary disabled:opacity-50" />
                                            </div>
                                            <div className="col-span-1 md:col-span-2 flex justify-center items-center gap-2">
                                                <input type="checkbox" {...register(`openingHours.${index}.isClosed`)} className="w-5 h-5 accent-primary cursor-pointer" />
                                                <span className="text-xs font-bold text-text-muted hidden md:block">Closed</span>
                                            </div>
                                            <div className="col-span-1 flex justify-end">
                                                {hourFields.length > 1 && (
                                                    <button type="button" onClick={() => removeHour(index)} className="bg-red-50 text-danger p-2.5 rounded-full hover:bg-danger hover:text-white transition">
                                                        <FaTrash size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 border-t border-border-light">
                            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 bg-background border border-border-light text-text-secondary rounded-2xl font-black hover:bg-surface transition">
                                Cancel
                            </button>
                            <button type="submit" className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary-hover transition">
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRestaurant;