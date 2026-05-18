import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import type { EditUserFormData } from "../../../../../types/UserSchema";
import { RoleSelect } from "./RoleSelect";

interface UserBasicInfoFieldsProps {
    register: UseFormRegister<EditUserFormData>;
    errors: FieldErrors<EditUserFormData>;
    control: Control<EditUserFormData>;
}

export const UserBasicInfoFields = ({ register, errors, control }: UserBasicInfoFieldsProps) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Full Name</label>
            <input
                {...register("fullname")}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                placeholder="Full Name"
            />
            {errors.fullname && <p className="text-xs text-danger mt-1">{errors.fullname.message}</p>}
        </div>

        {/* Custom Role Select */}
        <RoleSelect control={control} />

        <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Email Address</label>
            <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                placeholder="email@example.com"
            />
            {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Phone Number</label>
            <input
                {...register("phone")}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                placeholder="+20 123 456 7890"
            />
        </div>
    </div>
);
