interface PriceFilterProps {
    value: number;
    onChange: (val: number) => void;
}

const PriceFilter = ({ value, onChange }: PriceFilterProps) => {
    const priceMap = ["Low", "Medium", "High"];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-text-primary">Price Range</h3>
                <span className="text-primary font-bold text-sm bg-red-50 px-2 py-0.5 rounded-lg">{priceMap[value]}</span>
            </div>
            <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1">
                <span>LOW</span>
                <span>MEDIUM</span>
                <span>HIGH</span>
            </div>
        </div>
    )
}

export default PriceFilter;