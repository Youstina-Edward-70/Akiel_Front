import { IoCloudUploadOutline } from "react-icons/io5";
import type { UseFormSetValue, FieldError } from "react-hook-form";
import { MenuSchema } from "../../../../types/RestaurantSchema";
import { z } from "zod";

type MenuFormInput = z.input<typeof MenuSchema>;

interface ImageUploadSectionProps {
    index: number;
    previewUrl?: string;
    setValue: UseFormSetValue<MenuFormInput>;
    error?: FieldError;
}
const ImageUploadSection = ({ index, previewUrl, setValue, error }: ImageUploadSectionProps) => (
    <div className="w-full lg:max-w-82">
        <label className="mb-2 block text-sm font-bold text-text-primary">Dish Photo</label>
        <div className={`relative h-65 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all
            ${previewUrl ? "border-primary/60 bg-primary/5" : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"}`}>
            {previewUrl ? (
                <img src={previewUrl} alt="Dish Preview" className="h-full w-full object-cover" />
            ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-text-secondary">
                    <IoCloudUploadOutline size={24} />
                    <div>
                        <p className="text-lg font-semibold">Click or drag image</p>
                        <p className="mt-1 text-xs">High resolution JPEG or PNG. Max 5MB.</p>
                    </div>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setValue(`dishes.${index}.image`, file, { 
                            shouldDirty: true, 
                            shouldValidate: true 
                        });
                        e.currentTarget.value = "";
                    }}
            />
        </div>
        <div className="min-h-5">
            {error && <p className="pl-2 pt-2 text-xs font-semibold text-danger">{error.message}</p>}
        </div>
    </div>
);

export default ImageUploadSection;