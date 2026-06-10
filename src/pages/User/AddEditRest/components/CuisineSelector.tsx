import { CuisineTypes } from "../../../../types/constants";
import Button from "../../../../ui/Button";

interface Props {
    selectedCuisines: string[];
    toggleCuisine: (cuisineName: string) => void;
    formIssues?: {
        cuisineType?: { message?: string };
    };
}

const CuisineSelector = ({ selectedCuisines, toggleCuisine, formIssues }: Props) => (
    <div className="space-y-3">
        <label className="block text-sm font-semibold text-text-primary mb-2">Cuisine Type</label>
        <div className="flex overflow-x-auto p-2 gap-3 no-scrollbar">
            {CuisineTypes.map((cuisineObj) => {
                const isSelected = selectedCuisines.includes(cuisineObj.name);
                const Icon = cuisineObj.icon;
                return (
                    <Button
                        key={cuisineObj.id}
                        type="button"
                        onClick={() => toggleCuisine(cuisineObj.name)}
                        variant="outline"
                        style={{
                            borderColor: isSelected ? cuisineObj.color : '',
                            backgroundColor: isSelected ? cuisineObj.color : ''
                        }}
                        className={`
                                    flex items-center gap-2 px-5 py-2.5 rounded-full text-sm whitespace-nowrap transition-all duration-300 border
                                    ${isSelected
                                ? 'text-white shadow-lg transform scale-105'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }
                                `}
                    >
                        <Icon
                                    className={`text-lg ${isSelected ? 'text-white' : ''}`}
                                    style={{ color: !isSelected ? cuisineObj.color : '' }}
                                />

                                <span className="font-medium">{cuisineObj.name}</span>
                    </Button>
                );
            })}
        </div>
        {formIssues?.cuisineType && <p className="text-danger text-xs font-bold mt-1">{formIssues.cuisineType.message}</p>}
    </div>
);

export default CuisineSelector;