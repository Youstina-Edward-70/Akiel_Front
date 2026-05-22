import { IoCashOutline } from "react-icons/io5";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { SettingsFormData } from "../../../../types/SettingsSchema";

interface PriceClassificationsProps {
    register: UseFormRegister<SettingsFormData>;
    errors: FieldErrors<SettingsFormData>;
}

export const PriceClassifications = ({ register, errors }: PriceClassificationsProps) => (
    <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <h2 className="text-base font-black text-text-primary flex items-center gap-2">
                <div className="h-5 w-1 bg-primary rounded-full" />
                Price Classifications
            </h2>
            <IoCashOutline className="text-slate-400" size={20} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Minimum Low-Range Price */}
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    Minimum Low-Range Price (EGP)
                </label>
                <div className="relative flex items-center">
                    <span className="absolute left-4 text-xs font-bold text-slate-400 select-none border-r border-gray-100 pr-3">
                        EGP
                    </span>
                    <input
                        type="number"
                        {...register("lowMax", { valueAsNumber: true })}
                        className="w-full pl-16 pr-4 py-3.5 rounded-xl bg-gray-50/50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm text-slate-700 font-medium transition-all"
                        placeholder="e.g., 50"
                    />
                </div>
                {errors.lowMax && (
                    <p className="text-xs text-danger mt-1 font-medium">{errors.lowMax.message}</p>
                )}
            </div>

            {/* Average Medium-Range Price */}
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    Average Medium-Range Price (EGP)
                </label>
                <div className="relative flex items-center">
                    <span className="absolute left-4 text-xs font-bold text-slate-400 select-none border-r border-gray-100 pr-3">
                        EGP
                    </span>
                    <input
                        type="number"
                        {...register("mediumMax", { valueAsNumber: true })}
                        className="w-full pl-16 pr-4 py-3.5 rounded-xl bg-gray-50/50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:bg-white text-sm text-slate-700 font-medium transition-all"
                        placeholder="e.g., 150"
                    />
                </div>
                {errors.mediumMax && (
                    <p className="text-xs text-danger mt-1 font-medium">{errors.mediumMax.message}</p>
                )}
            </div>
        </div>
    </div>
);