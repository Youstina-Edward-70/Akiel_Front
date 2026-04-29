import type { FieldError, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { IoTrashOutline } from "react-icons/io5";
import { z } from "zod";
import { MenuSchema } from "../../../types/RestaurantSchema";
import Button from "../../../ui/Button";
import ImageUploadSection from "./ui/ImageUploadSeaction";
import { NameInput, PriceInput } from "./ui/DishInputs";
import CategorySelect from "./ui/CategorySelect";

type MenuFormInput = z.input<typeof MenuSchema>;

interface DishCardProps {
    index: number;
    title?: string;
    register: UseFormRegister<MenuFormInput>;
    errors?: FieldErrors<MenuFormInput["dishes"][number]> | undefined;
    remove: () => void;
    setValue: UseFormSetValue<MenuFormInput>;
    watch: UseFormWatch<MenuFormInput>;
    canDelete: boolean;
    isSaving: boolean;
}

const DishCard = ({ index, title, register, errors, remove, setValue, watch, canDelete, isSaving }: DishCardProps) => {
    const dishImage = watch(`dishes.${index}.image`);
    const categoryValue = watch(`dishes.${index}.category`) ?? "";
    const previewUrl = dishImage instanceof File
        ? URL.createObjectURL(dishImage)
        : (dishImage?.url || undefined);

    const categoryOptions = [
        { value: "Food", label: "Food " },
        { value: "Dessert", label: "Dessert" },
        { value: "Drinks", label: "Drinks" },
    ] as const;

    return (
        <section className="relative rounded-2xl border border-gray-100 bg-white p-6 md:p-10 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.28)]">
            <div className="mb-8">
                <h2 className="text-xl font-extrabold text-text-primary tracking-tight border-l-4 border-primary pl-4">
                    {title || `Menu Item "${index + 1}"`}
                </h2>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                {/* Image Section */}
                <ImageUploadSection
                    index={index}
                    previewUrl={previewUrl}
                    setValue={setValue}
                    error={errors?.image as FieldError | undefined}
                /> 

                {/* Form Fields Section */}
                <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                    {/* Name Input */}
                    <NameInput label="Dish Name" register={register} index={index} error={errors?.dishName} />

                    {/* Price Input */}
                    <PriceInput label="Price" register={register} index={index} error={errors?.price} />

                    {/* Description */}
                    <div className="md:col-span-1">
                        <label className="mb-2 block text-sm font-bold text-text-primary">Description</label>
                        <textarea
                            {...register(`dishes.${index}.description`)}
                            placeholder="Describe the flavors, ingredients, and presentation..."
                            className={`h-32 w-full resize-none no-scrollbar rounded-xl border bg-gray-50 px-5 py-4 text-base outline-none transition focus:border-primary focus:bg-white
                                ${errors?.description ? "border-danger" : "border-gray-100"}`}
                        />
                        <div className="min-h-5">
                            {errors?.description && <p className="pl-2 pt-1 text-xs font-semibold text-danger">{errors.description.message}</p>}
                        </div>
                    </div>

                    {/* Category Select */}
                    <CategorySelect
                        index={index} 
                        value={categoryValue} 
                        options={categoryOptions} 
                        setValue={setValue} 
                        error={errors?.category} 
                    />
                </div>
            </div>

            {canDelete &&
                <div className="mt-10 flex items-center justify-end gap-4">
                    <Button
                        type="button"
                        variant="normal"
                        onClick={remove}
                        disabled={!canDelete || isSaving}
                        className="rounded-full border border-gray-200 bg-white px-9 py-3 text-sm font-bold text-text-secondary hover:border-gray-300 hover:text-text-primary"
                    >
                        <IoTrashOutline size={16} className="mr-2" />
                        Delete
                    </Button>


                </div>
            }
        </section>
    );
};

export default DishCard;