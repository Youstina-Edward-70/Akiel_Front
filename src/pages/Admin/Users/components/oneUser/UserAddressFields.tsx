import { IoLocationOutline } from "react-icons/io5";
import type { UseFormRegister } from "react-hook-form";
import type { EditUserFormData } from "../../../../../types/UserSchema";

interface UserAddressFieldsProps {
    register: UseFormRegister<EditUserFormData>;
}

type AddressKey = keyof NonNullable<EditUserFormData["address"]>;

const fields: { name: AddressKey & string; label: string; placeholder: string }[] = [
    { name: "details", label: "Details", placeholder: "Enter address details" },
    { name: "street", label: "Street", placeholder: "Enter street" },
    { name: "city", label: "City", placeholder: "Enter city" },
    { name: "governorate", label: "Governorate", placeholder: "Enter governorate" },
];

export const UserAddressFields = ({ register }: UserAddressFieldsProps) => (
    <div className="space-y-4 pt-4 border-t border-gray-50">
        <h3 className="text-sm font-bold text-text-secondary flex items-center gap-2">
            <IoLocationOutline size={16} /> Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ name, label, placeholder }) => (
                <div key={name} className="space-y-1.5">
                    <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{label}</label>
                    <input
                        {...register(`address.${name}` as const)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                        placeholder={placeholder}
                    />
                </div>
            ))}
        </div>
    </div>
);
