import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { UpdateAccountFormData } from "../../../../types/UserSchema";

interface AddressDetailsProps {
    register: UseFormRegister<UpdateAccountFormData>;
    errors: FieldErrors<UpdateAccountFormData>;
}

const AddressDetails = ({ register, errors }: AddressDetailsProps) => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                <h3 className="text-xl font-bold text-text-primary">Address Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Details */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">Details</label>
                    <input
                        type="text"
                        {...register("address.details")}
                        placeholder="Enter additional details"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                    />
                    {errors.address?.details && (
                        <p className="text-xs text-danger mt-1">{errors.address.details.message as string}</p>
                    )}
                </div>

                {/* Street */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">Street</label>
                    <input
                        type="text"
                        {...register("address.street")}
                        placeholder="Enter street"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                    />
                    {errors.address?.street && (
                        <p className="text-xs text-danger mt-1">{errors.address.street.message as string}</p>
                    )}
                </div>

                {/* City */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">City</label>
                    <input
                        type="text"
                        {...register("address.city")}
                        placeholder="Enter city"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                    />
                    {errors.address?.city && (
                        <p className="text-xs text-danger mt-1">{errors.address.city.message as string}</p>
                    )}
                </div>

                {/* Governorate */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">Governorate</label>
                    <input
                        type="text"
                        {...register("address.governorate")}
                        placeholder="Enter governorate"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm transition-all"
                    />
                    {errors.address?.governorate && (
                        <p className="text-xs text-danger mt-1">{errors.address.governorate.message as string}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressDetails;