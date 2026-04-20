interface DeliveryFilterProps {
    value: { have: boolean; dontHave: boolean };
    onChange: (val: { have: boolean; dontHave: boolean }) => void;
}

const DeliveryFilter = ({ value, onChange }: DeliveryFilterProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-text-primary">Delivery</h3>
            <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={value.have}
                        onChange={() => onChange({ ...value, have: !value.have })}
                        className="w-5 h-5 accent-primary rounded cursor-pointer transition-transform active:scale-90"
                    />
                    <span className="text-gray-600 font-medium group-hover:text-text-primary transition-colors">Have Delivery</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={value.dontHave}
                        onChange={() => onChange({ ...value, dontHave: !value.dontHave })}
                        className="w-5 h-5 accent-primary rounded cursor-pointer transition-transform active:scale-90"
                    />
                    <span className="text-gray-600 font-medium group-hover:text-text-primary transition-colors">Don't Have Delivery</span>
                </label>
            </div>
        </div>
    )
}

export default DeliveryFilter;