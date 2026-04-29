import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface OpeningHour {
    day: string;
    from: string;
    to: string;
    isClosed: boolean;
}

interface RestaurantFormInputs {
    name: string;
    address: {
        governorate: string;
        city: string;
        street: string;
        details: string;
    };
    deliveryAvailable: boolean;
    description: string;
    phone: string;
    email: string;
    whatsapp: string;
    facebook: string;
    openingHours: OpeningHour[];
}

const CUISINES = ['Egyptian', 'Italian', 'Grill', 'Sea Food', 'Pastries'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AddRestaurant = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // States
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>(['Egyptian']); // Default selected

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<RestaurantFormInputs>({
        defaultValues: {
            name: "",
            address: { governorate: "Cairo", city: "", street: "", details: "" },
            deliveryAvailable: true,
            description: "",
            phone: "",
            email: "",
            whatsapp: "",
            facebook: "",
            openingHours: [{ day: "Monday", from: "09:00", to: "23:00", isClosed: false }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "openingHours"
    });

    const watchOpeningHours = watch("openingHours");

    // Image Upload Handler
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    // Cuisine Toggle
    const toggleCuisine = (cuisine: string) => {
        setSelectedCuisines(prev => 
            prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
        );
    };

    const onSubmit = (data: RestaurantFormInputs) => {
        if (selectedCuisines.length === 0) {
            toast.error("Please select at least one cuisine type.");
            return;
        }

        const finalData = { ...data, cuisines: selectedCuisines, image: selectedImage };
        console.log("Request Data:", finalData);
        
        toast.success("Request sent to Admin successfully! We will review it shortly.");
        navigate("/profile");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 font-sans">
            <div className="max-w-3xl mx-auto px-4">
                
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 text-left">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Add Your New Restaurant</h1>
                        <p className="text-gray-500 font-medium text-sm">
                            Fill in the details below to add a restaurant to our directory. After review, it will go live.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                        
                        {/* Section 1: Basic Info */}
                        <div>
                            <h3 className="text-xl font-black text-slate-900 mb-6 border-l-4 border-[#E31E24] pl-3">Basic Info</h3>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-500 uppercase ml-1">Restaurant Name</label>
                                    <input {...register("name", { required: true })} placeholder="e.g. Sobhy Kaber" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-800" />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-gray-500 uppercase ml-1">Cuisine Type</label>
                                    <div className="flex flex-wrap gap-2">
                                        {CUISINES.map((cuisine) => (
                                            <button
                                                key={cuisine}
                                                type="button"
                                                onClick={() => toggleCuisine(cuisine)}
                                                className={`px-5 py-2 rounded-full text-sm font-bold transition ${selectedCuisines.includes(cuisine) ? 'bg-[#E31E24] text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                            >
                                                {cuisine}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                                    <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">Address Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <select {...register("address.governorate")} className="w-full bg-white border border-gray-200 rounded-xl p-3 outline-none focus:border-[#E31E24] font-semibold text-slate-700 appearance-none">
                                            <option value="Cairo">Cairo</option>
                                            <option value="Giza">Giza</option>
                                            <option value="Alexandria">Alexandria</option>
                                            <option value="Qena">Qena</option>
                                        </select>
                                        <input {...register("address.city")} placeholder="City / District" className="w-full bg-white border border-gray-200 rounded-xl p-3 outline-none focus:border-[#E31E24] font-semibold text-slate-700" />
                                        <input {...register("address.street")} placeholder="Street Name" className="w-full bg-white border border-gray-200 rounded-xl p-3 outline-none focus:border-[#E31E24] font-semibold text-slate-700" />
                                        <input {...register("address.details")} placeholder="Details (Building, Floor...)" className="w-full bg-white border border-gray-200 rounded-xl p-3 outline-none focus:border-[#E31E24] font-semibold text-slate-700" />
                                    </div>
                                </div>

                                {/* Delivery Switch */}
                                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <span className="text-sm font-bold text-slate-700">Delivery Available</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" {...register("deliveryAvailable")} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E31E24]"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Description & Media */}
                        <div>
                            <h3 className="text-xl font-black text-slate-900 mb-6 border-l-4 border-[#E31E24] pl-3">Description & Media</h3>
                            
                            <div className="space-y-6">
                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-500 uppercase ml-1">Restaurant Image</label>
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-red-50 hover:border-red-300 transition group overflow-hidden relative"
                                    >
                                        {selectedImage ? (
                                            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <div className="bg-gray-100 p-4 rounded-full text-gray-400 group-hover:text-[#E31E24] group-hover:bg-white transition mb-3">
                                                    <FaCloudUploadAlt size={30} />
                                                </div>
                                                <span className="font-bold text-gray-500 group-hover:text-[#E31E24]">Click to upload main image</span>
                                            </>
                                        )}
                                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-500 uppercase ml-1">Description</label>
                                    <textarea {...register("description")} placeholder="Tell us what makes your restaurant special..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-800 h-32 resize-none" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-500 uppercase ml-1">Phone Number</label>
                                        <div className="flex bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden focus-within:border-[#E31E24] transition">
                                            <span className="bg-gray-200 px-4 flex items-center font-bold text-gray-600">+20</span>
                                            <input {...register("phone")} placeholder="123 456 7890" className="w-full p-4 bg-transparent outline-none font-semibold text-slate-800" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-500 uppercase ml-1">Email Address</label>
                                        <input {...register("email")} type="email" placeholder="contact@restaurant.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-500 uppercase ml-1">WhatsApp Number</label>
                                        <div className="flex bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden focus-within:border-[#E31E24] transition">
                                            <span className="bg-gray-200 px-4 flex items-center font-bold text-gray-600">+20</span>
                                            <input {...register("whatsapp")} placeholder="123 456 7890" className="w-full p-4 bg-transparent outline-none font-semibold text-slate-800" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-500 uppercase ml-1">Facebook Link</label>
                                        <input {...register("facebook")} placeholder="https://facebook.com/..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-[#E31E24] transition font-semibold text-slate-800" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Opening Hours */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black text-slate-900 border-l-4 border-[#E31E24] pl-3">Opening Hours</h3>
                                <button 
                                    type="button" 
                                    onClick={() => append({ day: "Monday", from: "09:00", to: "23:00", isClosed: false })}
                                    className="bg-red-50 text-[#E31E24] px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-100 flex items-center gap-2"
                                >
                                    <FaPlus size={12} /> Add New Hour
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-12 gap-4 text-xs font-black text-gray-400 uppercase ml-2 px-4">
                                    <div className="col-span-3">Day</div>
                                    <div className="col-span-3">From</div>
                                    <div className="col-span-3">To</div>
                                    <div className="col-span-2 text-center">Closed</div>
                                    <div className="col-span-1"></div>
                                </div>

                                {fields.map((field, index) => {
                                    const isClosed = watchOpeningHours?.[index]?.isClosed;
                                    
                                    return (
                                        <div key={field.id} className="relative">
                                            <div className={`grid grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-2xl border ${errors.openingHours?.[index]?.to ? 'border-red-500' : 'border-gray-100'}`}>
                                                
                                                <div className="col-span-3">
                                                    <select {...register(`openingHours.${index}.day` as const)} className="w-full bg-white border border-gray-200 rounded-xl p-3 outline-none font-semibold text-slate-700">
                                                        {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>

                                                <div className="col-span-3">
                                                    <input 
                                                        type="time" 
                                                        disabled={isClosed}
                                                        {...register(`openingHours.${index}.from` as const)} 
                                                        className="w-full bg-white border border-gray-200 rounded-xl p-3 outline-none font-semibold text-slate-700 disabled:opacity-50 disabled:bg-gray-100" 
                                                    />
                                                </div>

                                                <div className="col-span-3">
                                                    <input 
                                                        type="time" 
                                                        disabled={isClosed}
                                                        {...register(`openingHours.${index}.to` as const, {
                                                            validate: (value, formValues) => {
                                                                if (formValues.openingHours[index].isClosed) return true;
                                                                if (formValues.openingHours[index].from >= value) {
                                                                    return "Invalid time range";
                                                                }
                                                                return true;
                                                            }
                                                        })} 
                                                        className={`w-full bg-white border border-gray-200 rounded-xl p-3 outline-none font-semibold text-slate-700 disabled:opacity-50 disabled:bg-gray-100 ${errors.openingHours?.[index]?.to ? 'border-red-500 text-red-500' : ''}`} 
                                                    />
                                                </div>

                                                <div className="col-span-2 flex justify-center">
                                                    <input 
                                                        type="checkbox" 
                                                        {...register(`openingHours.${index}.isClosed` as const)} 
                                                        className="w-5 h-5 accent-[#E31E24] cursor-pointer"
                                                    />
                                                </div>

                                                <div className="col-span-1 flex justify-end">
                                                    {fields.length > 1 && (
                                                        <button 
                                                            type="button" 
                                                            onClick={() => remove(index)}
                                                            className="bg-red-100 text-red-500 p-2.5 rounded-full hover:bg-[#E31E24] hover:text-white transition"
                                                        >
                                                            <FaTrash size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Error Message for Time Validation */}
                                            {errors.openingHours?.[index]?.to && (
                                                <p className="text-red-500 text-xs font-bold mt-2 ml-4">
                                                    "To" time must be later than "From" time.
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4 pt-6">
                            <button 
                                type="button" 
                                onClick={() => navigate(-1)}
                                className="flex-1 py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-2 py-4 bg-[#E31E24] text-white rounded-2xl font-black shadow-lg shadow-red-200 hover:bg-red-700 transition"
                            >
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