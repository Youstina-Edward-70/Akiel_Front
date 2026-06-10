import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { Days } from "../../../../types/constants";
import type { RestaurantFormInput, OpeningHour } from "../../../../types/RestaurantSchema";

interface Props {
    register: UseFormRegister<RestaurantFormInput>;
    errors: FieldErrors<RestaurantFormInput>;
    watchOpeningHours: OpeningHour[];
    selectedDays: string[];
    handleDayToggle: (dayName: string) => void;
}

const OpeningHoursSection = ({ register, errors, watchOpeningHours, selectedDays, handleDayToggle }: Props) => {
    const rootArrayError = errors.openingHours && !Array.isArray(errors.openingHours) ? errors.openingHours : null;

    return (
        <div className="space-y-6">
            <div>
                <label className="text-xs font-black text-text-muted uppercase ml-1 mb-3 block tracking-wider">
                    Opening Days & Hours
                </label>

                <div className="flex flex-wrap gap-2 mb-6">
                    {Days.map((dayName) => {
                        const isSelected = selectedDays.includes(dayName);
                        return (
                            <button
                                key={dayName}
                                type="button"
                                onClick={() => handleDayToggle(dayName)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                    isSelected
                                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                                        : "bg-surface border border-border-light text-text-muted hover:bg-border-light/30"
                                }`}
                            >
                                {dayName.slice(0, 3)}
                            </button>
                        );
                    })}
                </div>

                {rootArrayError && (
                    <p className="text-danger text-xs font-bold bg-danger/10 p-3 rounded-xl border border-danger/20 mb-4">
                        {rootArrayError.message as string}
                    </p>
                )}

                {selectedDays.length > 0 && (
                    <div className="bg-surface p-6 rounded-3xl border border-border-light space-y-5 pt-8">
                        {watchOpeningHours.map((hourField, index) => {
                            const isClosed = hourField.isClosed;

                            const dayErrors = errors.openingHours && Array.isArray(errors.openingHours)
                                ? (errors.openingHours[index] as FieldErrors<OpeningHour>)
                                : undefined;

                            const hasError = !!(dayErrors?.root || dayErrors?.opens || dayErrors?.closes);

                            return (
                                <div key={hourField.day} className="space-y-1.5 relative">
                                    
                                    <button
                                        type="button"
                                        onClick={() => handleDayToggle(hourField.day)}
                                        className="absolute -top-2 -right-2 p-1.5 bg-danger text-white rounded-full hover:bg-red-600 shadow-md z-20 cursor-pointer transition-transform"
                                        title="Remove day"
                                    >
                                        <FiX size={14} />
                                    </button>

                                    <div
                                        className={`flex flex-col md:flex-row md:items-center gap-4 bg-background p-4 rounded-xl border transition-all ${
                                            isClosed 
                                                ? "opacity-50 bg-slate-50 border-border-light/60" 
                                                : hasError
                                                    ? "border-danger bg-danger/1"
                                                    : "border-border-light shadow-sm"
                                        }`}
                                    >
                                        <span className="w-24 font-bold text-text-primary capitalize select-none">
                                            {hourField.day}
                                        </span>

                                        <div className={`flex-1 flex flex-wrap items-center gap-3 ${isClosed ? "pointer-events-none opacity-50" : ""}`}>
                                            <input
                                                type="hidden"
                                                {...register(`openingHours.${index}.day`)}
                                                value={hourField.day}
                                            />

                                            <input
                                                type="time"
                                                disabled={isClosed}
                                                {...register(`openingHours.${index}.opens`)}
                                                className={`bg-surface border rounded-lg p-2.5 outline-none font-semibold text-text-primary text-sm focus:border-primary transition ${
                                                    dayErrors?.opens ? "border-danger focus:border-danger" : "border-border-light"
                                                }`}
                                            />

                                            <span className="text-text-muted font-bold text-sm select-none">To</span>

                                            <input
                                                type="time"
                                                disabled={isClosed}
                                                {...register(`openingHours.${index}.closes`)}
                                                className={`bg-surface border rounded-lg p-2.5 outline-none font-semibold text-text-primary text-sm focus:border-primary transition ${
                                                    dayErrors?.closes ? "border-danger focus:border-danger" : "border-border-light"
                                                }`}
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 md:ml-auto select-none z-10">
                                            <label 
                                                htmlFor={`closed-chk-${hourField.day}`}
                                                className="text-xs font-bold text-text-secondary cursor-pointer"
                                            >
                                                Closed
                                            </label>
                                            <input
                                                id={`closed-chk-${hourField.day}`}
                                                type="checkbox"
                                                {...register(`openingHours.${index}.isClosed`)}
                                                className="w-4 h-4 accent-primary cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    {hasError && (
                                        <div className="pl-2 space-y-0.5 bg-danger/3 p-2 rounded-lg border border-danger/10">
                                            {dayErrors?.root?.message && (
                                                <p className="text-danger text-xs font-bold">{dayErrors.root.message}</p>
                                            )}
                                            {dayErrors?.opens?.message && (
                                                <p className="text-danger text-xs font-semibold">· {dayErrors.opens.message}</p>
                                            )}
                                            {dayErrors?.closes?.message && (
                                                <p className="text-danger text-xs font-semibold">· {dayErrors.closes.message}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OpeningHoursSection;