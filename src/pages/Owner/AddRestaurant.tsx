import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaMapMarkerAlt, FaPlus, FaArrowLeft, FaSave } from "react-icons/fa";
import { useAddEditRestaurant } from "./AddRestaurant/hooks/useAddEditRestaurant";
import CuisineSelector from "./AddRestaurant/ui/CuisineSelector";
import OpeningHoursSelector from "./AddRestaurant/ui/OpeningHoursSelector";
import AddressCard from "./AddRestaurant/ui/AddressCard";

const AddRestaurant = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        register, handleSubmit, formIssues, addressArray, isEditMode, isLoadingData,
        selectedImageURL, handleImageChange, selectedCuisines, toggleCuisine,
        selectedDays, toggleDay, onSubmit, navigate,
        whatsappNum, setWhatsappNum, fbLink, setFbLink 
    } = useAddEditRestaurant();

    const listIssues = formIssues?.address as Record<string, Record<string, { message?: string }>> | undefined;

    if (isLoadingData) return <div className="min-h-screen flex justify-center items-center font-bold text-text-muted bg-surface">Loading Data...</div>;

    return (
        <div className="min-h-screen bg-surface py-12 font-sans text-left">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <button type="button" onClick={() => navigate(-1)} className="p-3 bg-background rounded-full shadow-sm hover:bg-border-light/30 transition text-text-secondary"><FaArrowLeft size={18} /></button>
                    <div>
                        <h1 className="text-3xl font-heading font-black text-text-primary">{isEditMode ? "Edit Your Restaurant" : "Add New Restaurant"}</h1>
                        <p className="text-sm text-text-muted font-medium">{isEditMode ? "Update your details." : "Fill in the details below to complete the setup."}</p>
                    </div>
                </div>

                <div className="bg-background rounded-4xl p-8 md:p-12 shadow-sm border border-border-light">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                        
                        <div>
                            <h3 className="text-xl font-heading font-black text-text-primary mb-6 border-l-4 border-primary pl-3">Basic Information</h3>
                            <div className="space-y-8">
                                <div>
                                    <label className="text-xs font-black text-text-muted uppercase ml-1">Restaurant Name</label>
                                    <input {...register("name")} className="w-full mt-2 bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                                    {formIssues?.name && <p className="text-danger text-xs font-bold mt-1">{formIssues.name.message}</p>}
                                </div>
                                
                                <CuisineSelector selectedCuisines={selectedCuisines} toggleCuisine={toggleCuisine} />

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-bold text-text-primary flex items-center gap-2"><FaMapMarkerAlt className="text-primary" /> Addresses</h4>
                                        <button type="button" onClick={() => addressArray.prepend({ governorate: "", city: "", street: "", details: "" })} className="bg-primary-light text-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition"><FaPlus size={12} /> Add</button>
                                    </div>
                                    <div className="space-y-4 bg-surface p-6 rounded-3xl border border-border-light">
                                        {formIssues?.address && !Array.isArray(formIssues.address) && <p className="text-danger text-xs font-bold">{formIssues.address.message}</p>}
                                        <AnimatePresence initial={false}>
                                            {addressArray.fields.map((field, index) => {
                                                const recordItem = listIssues ? listIssues[index] : undefined;
                                                return (
                                                    <motion.div key={field.id} layout initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                                                        <AddressCard index={index} register={register} issues={recordItem as unknown as Record<string, { message?: string }>} remove={() => addressArray.remove(index)} canDelete={addressArray.fields.length > 1} />
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-surface p-5 rounded-2xl border border-border-light">
                                    <span className="font-bold text-text-primary">Delivery Available</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" {...register("delivery")} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-border-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <hr className="border-border-light" />

                        <div>
                            <h3 className="text-xl font-heading font-black text-text-primary mb-6 border-l-4 border-primary pl-3">Description & Media</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-black text-text-muted uppercase ml-1">Restaurant Cover Image</label>
                                    <div onClick={() => fileInputRef.current?.click()} className="w-full mt-2 h-56 border-2 border-dashed border-border-light rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary-light hover:border-primary/50 transition group overflow-hidden relative bg-surface">
                                        {selectedImageURL ? (<img src={selectedImageURL} alt="Preview" className="w-full h-full object-cover" />) : (<><div className="bg-background p-4 rounded-full text-text-muted group-hover:text-primary shadow-sm transition mb-3"><FaCloudUploadAlt size={32} /></div><span className="font-bold text-text-muted group-hover:text-primary">Click to upload image</span></>)}
                                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-black text-text-muted uppercase ml-1">Description</label>
                                    <textarea {...register("description")} className="w-full mt-2 bg-surface border border-border-light rounded-3xl p-5 outline-none focus:border-primary transition font-semibold text-text-primary h-32 resize-none" />
                                    {formIssues?.description && <p className="text-danger text-xs font-bold">{formIssues.description.message}</p>}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <label className="text-xs font-black text-text-muted uppercase ml-1 block mb-2">Phone Number</label>
                                        <div className="flex">
                                            <span className="bg-surface border border-r-0 border-border-light rounded-l-2xl p-4 font-bold text-text-muted">+20</span>
                                            <input {...register("phoneNumber")} placeholder="123 456 7890" className="w-full bg-surface border border-border-light rounded-r-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                                        </div>
                                        {formIssues?.phoneNumber && <p className="text-danger text-xs font-bold mt-1">{formIssues.phoneNumber.message}</p>}
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-text-muted uppercase ml-1 block mb-2">Email Address</label>
                                        <input {...register("email")} type="email" placeholder="contact@restaurant.com" className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" />
                                        {formIssues?.email && <p className="text-danger text-xs font-bold mt-1">{formIssues.email.message}</p>}
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-text-muted uppercase ml-1 block mb-2">Whatsapp Number</label>
                                        <input 
                                            value={whatsappNum} 
                                            onChange={(e) => setWhatsappNum(e.target.value)} 
                                            placeholder="123 456 7890" 
                                            className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-text-muted uppercase ml-1 block mb-2">Facebook Link</label>
                                        <input 
                                            value={fbLink} 
                                            onChange={(e) => setFbLink(e.target.value)} 
                                            placeholder="https://facebook.com/..." 
                                            className="w-full bg-surface border border-border-light rounded-2xl p-4 outline-none focus:border-primary transition font-semibold text-text-primary" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-border-light" />

                        <OpeningHoursSelector register={register} selectedDays={selectedDays} toggleDay={toggleDay} />

                        <div className="flex gap-4 pt-6 border-t border-border-light">
                            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 bg-background border border-border-light text-text-secondary rounded-2xl font-black hover:bg-surface transition">Cancel</button>
                            <button type="submit" className="flex-2 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary-hover transition flex items-center justify-center gap-2"><FaSave size={20} /> Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRestaurant;