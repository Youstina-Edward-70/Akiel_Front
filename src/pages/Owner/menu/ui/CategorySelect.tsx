import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import type { UseFormSetValue, FieldError } from "react-hook-form";
import { MenuSchema } from "../../../../types/RestaurantSchema";
import { z } from "zod";

type MenuFormInput = z.input<typeof MenuSchema>;
type CategoryValue = MenuFormInput["dishes"][number]["category"];

interface CategoryOption {
    readonly value: CategoryValue;
    readonly label: string;
}

interface CategorySelectProps {
    index: number;
    value: string;
    options: readonly CategoryOption[];
    setValue: UseFormSetValue<MenuFormInput>;
    error?: FieldError;
}
const CategorySelect = ({ index, value, options, setValue, error }: CategorySelectProps) => (
    <div className="md:col-span-1">
        <label className="mb-2 block text-sm font-bold text-text-primary">Category</label>
        <details className="group relative">
            <summary className={clsx(
                "flex list-none w-full cursor-pointer items-center justify-between rounded-xl border bg-gray-50 px-5 py-4 text-sm font-medium outline-none transition marker:content-none",
                "group-open:border-primary/40 group-open:bg-white",
                error ? "border-danger" : "border-gray-100"
            )}>
                <span className={clsx(!value && "text-text-secondary")}>
                    {options.find(opt => opt.value === value)?.label || "Select category..."}
                </span>
                <IoChevronDown className="transition-transform group-open:rotate-180" size={20} />
            </summary>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute space-y-1 z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-xl"
                >
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={(e) => {
                                setValue(`dishes.${index}.category`, opt.value, { shouldValidate: true });
                                (e.currentTarget.closest("details"))?.removeAttribute("open");
                            }}
                            className={clsx(
                                "w-full rounded-xl px-4 py-3 text-left transition",
                                value === opt.value
                                    ? "bg-primary/10 ring-1 ring-primary/20"
                                    : "hover:bg-gray-50"
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </motion.div>
            </AnimatePresence>
        </details>
        <div className="min-h-5">
            {error && <p className="pl-2 pt-1 text-xs font-semibold text-danger">{error.message}</p>}
        </div>
    </div>
);
export default CategorySelect;