import type { UseFormRegister, Path } from "react-hook-form";
import { Days } from "../../../../types/constants";
import type { RestaurantFormInput } from "../../../../types/RestaurantSchema";

interface Props {
    register: UseFormRegister<RestaurantFormInput>;
    selectedDays: string[];
    toggleDay: (dayToToggle: string) => void;
}

const OpeningHoursSelector = ({ register, selectedDays, toggleDay }: Props) => (
    <div>
        <label className="text-xs font-black text-text-muted uppercase ml-1 mb-3 block">Opening Days & Hours</label>
        <div className="flex flex-wrap gap-2 mb-6">
            {Days.map(dayName => {
                const isSelected = selectedDays.includes(dayName);
                return (
                    <button 
                        key={dayName} 
                        type="button" 
                        onClick={() => toggleDay(dayName)} 
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${isSelected ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' : 'bg-surface border border-border-light text-text-muted hover:bg-border-light/30'}`}
                    >
                        {dayName.slice(0, 3)} 
                    </button>
                );
            })}
        </div>
        {selectedDays.length > 0 && (
            <div className="bg-surface p-6 rounded-3xl border border-border-light space-y-4">
                {selectedDays.map((activeDay, index) => (
                    <div key={activeDay} className="flex flex-col md:flex-row md:items-center gap-4 bg-background p-4 rounded-xl border border-border-light shadow-sm">
                        <span className="w-24 font-bold text-text-primary capitalize">{activeDay}</span>
                        <div className="flex-1 flex items-center gap-3">
                            <input 
                                type="hidden" 
                                {...register(`openingHours.${index}.day` as Path<RestaurantFormInput>)} 
                                value={activeDay} 
                            />
                            <input 
                                type="time" 
                                {...register(`openingHours.${index}.opens` as Path<RestaurantFormInput>)} 
                                defaultValue="09:00" 
                                className="w-full bg-surface border border-border-light rounded-lg p-2.5 outline-none font-semibold text-text-primary text-sm focus:border-primary transition" 
                            />
                            <span className="text-text-muted font-bold text-sm">To</span>
                            <input 
                                type="time" 
                                {...register(`openingHours.${index}.closes` as Path<RestaurantFormInput>)} 
                                defaultValue="23:00" 
                                className="w-full bg-surface border border-border-light rounded-lg p-2.5 outline-none font-semibold text-text-primary text-sm focus:border-primary transition" 
                            />
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default OpeningHoursSelector;