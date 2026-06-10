import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FiRefreshCw, FiUploadCloud } from "react-icons/fi";
import type { RestaurantFormInput } from "../../../../types/RestaurantSchema";

interface Props {
    register: UseFormRegister<RestaurantFormInput>;
    errors: FieldErrors<RestaurantFormInput>;
    setValue: UseFormSetValue<RestaurantFormInput>;
    watch: UseFormWatch<RestaurantFormInput>;
    isEditMode?: boolean;
}

const BasicInfoFields = ({ register, errors, setValue, watch, isEditMode = false }: Props) => {
    const coverPhotoValue = watch("image");
    const coverPreviewValue = watch("coverPreview");

    const previewUrl = coverPreviewValue ||
        (typeof coverPhotoValue === "object" && coverPhotoValue && "url" in coverPhotoValue ? coverPhotoValue.url : null);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h2 className="text-xl font-heading font-bold text-text-primary">Basic Info</h2>
            </div>

            {/* Restaurant Name */}
            <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Restaurant Name</label>
                <input
                    type="text"
                    placeholder="Enter restaurant name"
                    {...register("name")}
                    className="w-full px-4 py-3 bg-surface border border-border-light rounded-xl focus:outline-none focus:border-primary text-sm"
                />
                {errors.name && <p className="text-danger text-xs font-bold mt-1">{errors.name.message}</p>}
            </div>

            {/* Cover Photo */}
            {!isEditMode && (
                <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">Cover Photo</label>
                    <div className="group border-2 border-dashed border-border-light rounded-xl h-52 bg-surface hover:bg-gray-50 relative cursor-pointer overflow-hidden flex flex-col items-center justify-center">

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];

                                    if (previewUrl && previewUrl.startsWith("blob:")) {
                                        URL.revokeObjectURL(previewUrl);
                                    }

                                    const newObjectUrl = URL.createObjectURL(file);

                                    setValue("image", file, { shouldDirty: true, shouldValidate: true });
                                    setValue("coverPreview", newObjectUrl);

                                    e.target.value = "";
                                }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                        />

                        {previewUrl ? (
                            <div className="absolute inset-0 w-full h-full z-10">
                                <img
                                    src={previewUrl}
                                    alt="Cover Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white z-20 pointer-events-none">
                                    <FiRefreshCw size={24} className="animate-spin-slow" />
                                    <p className="text-sm font-medium">Click to change cover photo</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                                <div className="p-3 bg-white rounded-full shadow-sm text-text-secondary">
                                    <FiUploadCloud size={24} />
                                </div>
                                <p className="text-sm font-medium text-text-secondary">Click or drag image</p>
                                <p className="text-xs text-text-muted">High resolution JPEG or PNG, Max size 5MB.</p>
                            </div>
                        )}
                    </div>
                    {errors.image && <p className="text-danger text-xs font-bold mt-1">{errors.image.message as string}</p>}
                </div>
            )}

            {/* Delivery Toggle Switch */}
            <div className="flex items-center justify-between p-4 border border-border-light rounded-xl bg-surface">
                <label className="block text-sm font-semibold text-text-primary">Delivery Service</label>

                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        {...register("delivery")}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>
            {errors.delivery && <p className="text-danger text-xs font-bold mt-1">{errors.delivery.message}</p>}
        </div>
    );
};

export default BasicInfoFields;