import type { UseFormRegister, FieldError } from "react-hook-form";
import { z } from "zod";
import { MenuSchema } from "../../../../types/RestaurantSchema";

type MenuFormInput = z.input<typeof MenuSchema>;

interface InputProps {
    label: string;
    error?: FieldError;
}

export const NameInput = ({ label, register, index, error }: InputProps & { register: UseFormRegister<MenuFormInput>, index: number }) => (
    <div className="md:col-span-1">
        <label className="mb-2 block text-sm font-bold text-text-primary">{label}</label>
        <input
            type="text"
            placeholder="e.g. Truffle Infused Risotto"
            {...register(`dishes.${index}.dishName`)}
            className={`w-full rounded-xl border bg-gray-50 px-5 py-4 text-base outline-none transition focus:border-primary focus:bg-white
                ${error ? "border-danger" : "border-gray-100"}`}
        />
        <div className="min-h-5">
            {error && <p className="pl-2 pt-1 text-xs font-semibold text-danger">{error.message}</p>}
        </div>
    </div>
);

export const PriceInput = ({ label, register, index, error }: InputProps & { register: UseFormRegister<MenuFormInput>, index: number }) => (
    <div className="md:col-span-1">
        <label className="mb-2 block text-sm font-bold text-text-primary">{label}</label>
        <div className="relative">
            <input
                type="number"
                step="0.25"
                placeholder="0.00"
                {...register(`dishes.${index}.price`)}
                onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                className={`w-full rounded-xl border bg-gray-50 px-5 py-4 pr-12 text-base font-semibold outline-none transition focus:border-primary focus:bg-white
                    ${error ? "border-danger" : "border-gray-100"}`}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-text-secondary">EGP</span>
        </div>
        <div className="min-h-5">
            {error && <p className="pl-2 pt-1 text-xs font-semibold text-danger">{error.message}</p>}
        </div>
    </div>
);