import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes, FaCloudUploadAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const AddRestaurant = () => {
    const navigate = useNavigate();

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            branches: [{
                governorate: "",
                city: "",
                street: "",
                details: ""
            }],
            openingHours: [
                { day: "Monday", from: "09:00", to: "23:00", isClosed: false },
                { day: "Friday", from: "14:00", to: "23:00", isClosed: true }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "branches" });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => await axios.post("/api/restaurants/request", data),
        onSuccess: () => {
            toast.success("Sent to Admin! Waiting for approval.");
            navigate("/profile");
        },
        onError: () => toast.error("Submission failed.")
    });

    const onSubmit = (data: any) => mutate(data);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-sans text-left">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-text-primary mb-4">Add Your New Restaurant</h1>
                <p className="text-text-secondary bg-primary-light/30 inline-block px-6 py-2 rounded-full text-sm font-bold border border-primary/10">
                    Admin Approval Required to become an Owner
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-background rounded-[3rem] shadow-2xl p-8 md:p-16 border border-border-light/10">

                {/* 01. Basic Info Section */}
                <section className="space-y-10">
                    <h2 className="text-xl font-black text-text-primary border-l-4 border-primary pl-4 uppercase tracking-widest">01. Basic Info</h2>

                    <div className="space-y-3">
                        <label className="font-bold text-text-secondary ml-1">Restaurant Name</label>
                        <input
                            {...register("name", { required: "Restaurant name is required" })}
                            placeholder="e.g. Sobhy Kaber"
                            className={`w-full bg-surface border-none rounded-2xl p-5 ring-1 focus:ring-2 focus:ring-primary outline-none transition shadow-sm ${errors.name ? 'ring-danger' : 'ring-border-light/50'}`}
                        />
                        {errors.name && <p className="text-danger text-xs font-bold mt-1">⚠️ {errors.name.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="border-2 border-dashed border-border-light/30 rounded-4xl p-8 flex flex-col items-center justify-center bg-surface hover:bg-background transition cursor-pointer group">
                            <FaCloudUploadAlt className="text-text-muted text-4xl mb-3 group-hover:text-primary transition" />
                            <p className="text-sm font-bold text-text-secondary italic">Upload Cover Photo</p>
                        </div>
                        <div className="border-2 border-dashed border-border-light/30 rounded-4xl p-8 flex flex-col items-center justify-center bg-surface hover:bg-background transition cursor-pointer group">
                            <FaCloudUploadAlt className="text-text-muted text-4xl mb-3 group-hover:text-primary transition" />
                            <p className="text-sm font-bold text-text-secondary italic">Upload Gallery</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-1">
                            <label className="font-bold text-text-secondary ml-1 italic underline">Branch Locations</label>
                            <button type="button" onClick={() => append({ governorate: "", city: "", street: "", details: "" })} className="bg-primary text-white p-2 rounded-xl hover:bg-primary-hover shadow-md transition">
                                <FaPlus size={14} />
                            </button>
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className="p-6 bg-surface/50 rounded-4xl border border-border-light/10 space-y-4 animate-fadeIn relative">
                                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                                    <FaMapMarkerAlt />
                                    <span>Branch </span>
                                    {fields.length > 1 && (
                                        <button type="button" onClick={() => remove(index)} className="ml-auto text-danger hover:scale-110 transition"><FaTimes /></button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-text-muted ml-1">Governorate</label>
                                        <input {...register(`branches.${index}.governorate` as const)} placeholder="e.g. Qena" className="w-full bg-background border-none rounded-xl p-3 ring-1 ring-border-light/30 focus:ring-1 focus:ring-primary outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-text-muted ml-1">City</label>
                                        <input {...register(`branches.${index}.city` as const)} placeholder="e.g. Qena City" className="w-full bg-background border-none rounded-xl p-3 ring-1 ring-border-light/30 focus:ring-1 focus:ring-primary outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-text-muted ml-1">Street</label>
                                        <input {...register(`branches.${index}.street` as const)} placeholder="Street name" className="w-full bg-background border-none rounded-xl p-3 ring-1 ring-border-light/30 focus:ring-1 focus:ring-primary outline-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-text-muted ml-1">Details (Optional)</label>
                                        <input {...register(`branches.${index}.details` as const)} placeholder="Building/Floor" className="w-full bg-background border-none rounded-xl p-3 ring-1 ring-border-light/30 focus:ring-1 focus:ring-primary outline-none" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 02. Opening Hours Section */}
                <section className="mt-16">
                    <h2 className="text-xl font-black text-text-primary border-l-4 border-primary pl-4 uppercase tracking-widest mb-10">02. Opening Hours</h2>
                    {watch("openingHours").map((hour, index) => (
                        <div key={index} className="flex flex-col mb-6">
                            <div className={`flex flex-wrap items-center gap-4 p-5 rounded-3xl border transition-all ${hour.isClosed ? 'bg-gray-100 opacity-60' : 'bg-surface border-border-light/20'}`}>
                                <div className="w-28 flex items-center gap-2 font-black text-text-primary">
                                    <FaClock className="text-primary/50" /> {hour.day}
                                </div>
                                <input type="time" {...register(`openingHours.${index}.from`)} disabled={hour.isClosed} className="bg-background rounded-xl px-4 py-2 ring-1 ring-border-light/50 disabled:bg-gray-200" />
                                <span className="text-text-muted font-bold">To</span>
                                <input type="time" {...register(`openingHours.${index}.to`)} disabled={hour.isClosed} className={`bg-background rounded-xl px-4 py-2 ring-1 disabled:bg-gray-200 ${!hour.isClosed && hour.from >= hour.to ? 'ring-danger ring-2' : 'ring-border-light/50'}`} />
                                <label className="flex items-center gap-3 ml-auto cursor-pointer bg-white px-4 py-2 rounded-xl shadow-sm border border-border-light/10">
                                    <input type="checkbox" {...register(`openingHours.${index}.isClosed`)} className="accent-primary w-5 h-5 rounded-lg" />
                                    <span className="font-black text-text-secondary text-xs uppercase tracking-tighter">Closed</span>
                                </label>
                            </div>
                            {!hour.isClosed && hour.from >= hour.to && (
                                <p className="text-danger text-[10px] font-black mt-2 ml-32 uppercase tracking-tighter animate-pulse">⚠️ Error: Opening must be before closing</p>
                            )}
                        </div>
                    ))}
                </section>

                <div className="flex gap-6 pt-12 mt-12 border-t border-border-light/20">
                    <button type="button" onClick={() => navigate(-1)} className="flex-1 py-5 rounded-3xl font-black text-text-muted bg-surface hover:bg-gray-200 transition uppercase tracking-widest text-center">Cancel</button>
                    <button type="submit" disabled={isPending} className="flex-1 py-5 rounded-3xl font-black text-white bg-primary hover:bg-primary-hover shadow-xl shadow-primary/40 transition disabled:opacity-50 uppercase tracking-widest text-center">
                        {isPending ? "Sending Request..." : "Submit to Admin"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;