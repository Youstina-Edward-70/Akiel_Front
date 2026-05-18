import { useSearchActions } from "../../../../features/search/hooks/useSearchActions";
import Button from "../../../../ui/Button";

export interface ButtonsFilterProps {
    delivery: { have: boolean; dontHave: boolean };
    minRating: number;
    priceRange: number;
    setDelivery: React.Dispatch<React.SetStateAction<{ have: boolean; dontHave: boolean }>>;
    setMinRating: React.Dispatch<React.SetStateAction<number>>;
    setPriceRange: React.Dispatch<React.SetStateAction<number>>;
}

const ButtonsFilter = (
    {
        delivery,
        minRating,
        priceRange,
        setDelivery,
        setMinRating,
        setPriceRange
    }: ButtonsFilterProps) => {
    const { applyFilters, clearFilters } = useSearchActions();

    const handleApply = () => {
        const priceMap = ["low", "medium", "high"];
        applyFilters({ 
            delivery, 
            minRating, 
            priceRange: priceMap[priceRange]
        });
    };

    return (
        <div className="flex flex-col gap-3 mt-4">
            <Button
                onClick={handleApply}
                className="w-full py-4 font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90"
            >
                Apply Filters
            </Button>

            <Button
                onClick={() => {
                    clearFilters();
                    setDelivery({ have: true, dontHave: false });
                    setMinRating(4);
                    setPriceRange(0);
                }}
                variant="outline"
                className="w-full py-3 font-bold rounded-2xl"
            >
                Clear All
            </Button>
        </div>
    )
}

export default ButtonsFilter