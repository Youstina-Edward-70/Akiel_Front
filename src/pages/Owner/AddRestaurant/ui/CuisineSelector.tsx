import { CuisineTypes } from "../../../../types/constants";

interface Props {
    selectedCuisines: string[];
    toggleCuisine: (cuisineName: string) => void;
}

const CuisineSelector = ({ selectedCuisines, toggleCuisine }: Props) => (
    <div className="space-y-3">
        <label className="text-xs font-black text-text-muted uppercase ml-1">Cuisine Type</label>
        <div className="flex overflow-x-auto pb-4 gap-3 snap-x no-scrollbar">
            {CuisineTypes.map((cuisineObj) => {
                const isSelected = selectedCuisines.includes(cuisineObj.name);
                const Icon = cuisineObj.icon; 
                return (
                    <button
                        key={cuisineObj.id} 
                        type="button" 
                        onClick={() => toggleCuisine(cuisineObj.name)}
                        className={`snap-start shrink-0 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 border transition-all duration-300 ${isSelected ? 'bg-primary border-primary text-white shadow-md' : 'bg-surface border-border-light text-text-secondary hover:bg-border-light/30'}`}
                    >
                        <Icon size={20} color={isSelected ? "#FFFFFF" : cuisineObj.color} />
                        {cuisineObj.name}
                    </button>
                );
            })}
        </div>
    </div>
);

export default CuisineSelector;