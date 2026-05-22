import { FaGavel } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { SettingsFormData } from "../../../../types/SettingsSchema";

interface SuspensionPolicyProps {
    register: UseFormRegister<SettingsFormData>;
    errors: FieldErrors<SettingsFormData>;
}

export const SuspensionPolicy = ({ register, errors }: SuspensionPolicyProps) => (
    <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <h2 className="text-base font-black text-text-primary flex items-center gap-2">
                <div className="h-5 w-1 bg-primary rounded-full" />
                Account Suspension Policy
            </h2>
            <FaGavel className="text-slate-400" size={20} />
        </div>

        <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                Maximum Allowed Rejections Count
            </label>
            <input
                type="number"
                {...register("maxRejectionLimit", { valueAsNumber: true })}
                className="w-full px-5 py-3.5 rounded-xl bg-gray-50/50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm text-slate-700 font-medium transition-all"
                placeholder="e.g., 5"
            />
            {errors.maxRejectionLimit && (
                <p className="text-xs text-danger mt-1 font-medium">{errors.maxRejectionLimit.message}</p>
            )}
        </div>

        {/* Warning Notice Box */}
        <div className="flex items-start gap-2.5 text-danger pt-2">
            <IoInformationCircleOutline className="shrink-0 mt-0.5" size={18} />
            <p className="text-xs font-medium leading-relaxed">
                Restaurants reaching this threshold will be flagged for automatic account deletion.
            </p>
        </div>
    </div>
);