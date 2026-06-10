import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { UpdateAccountFormData } from "../../../../types/UserSchema";

interface BasicInfoProps {
    register: UseFormRegister<UpdateAccountFormData>;
    errors: FieldErrors<UpdateAccountFormData>;
}

const BasicInfo = ({ register, errors }: BasicInfoProps) => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                <h3 className="text-xl font-bold text-text-primary">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">Full Name</label>
                    <input
                        type="text"
                        {...register("fullname")}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                    />
                    {errors.fullname && <p className="text-xs text-danger mt-1">{errors.fullname.message as string}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">Phone Number</label>
                    <input
                        type="text"
                        {...register("phone")}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                    />
                    {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message as string}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-text-secondary">Email Address</label>
                    <input
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                    />
                    {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message as string}</p>}
                </div>
            </div>
        </div>
    );
};

export default BasicInfo;