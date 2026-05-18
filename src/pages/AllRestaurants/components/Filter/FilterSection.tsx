import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import DeliveryFilter from "./DeliveryFilter";
import RatingFilter from "./RatingFilter";
import PriceFilter from "./PriceFilter";
import ButtonsFilter from "./ButtonsFilter";

const priceLabels = ["low", "medium", "high"];

const FilterSection = () => {
    const [searchParams] = useSearchParams();
    
    const hasDeliveryParam = searchParams.get("hasDelivery");
    const minRatingParam = Number(searchParams.get("minRating")) || 4;
    const priceRangeParam = priceLabels.indexOf(searchParams.get("priceRange") || "low");

    const [delivery, setDelivery] = useState<{ have: boolean; dontHave: boolean }>({
        have: hasDeliveryParam === null? true : hasDeliveryParam === "true",
        dontHave: hasDeliveryParam === "false",
        });
    const [minRating, setMinRating] = useState(minRatingParam);
    const [priceRange, setPriceRange] = useState(priceRangeParam === -1? 0 : priceRangeParam);

    return (
        <div className="w-full max-w-xs mx-auto md:mx-0 px-6 py-10 text-left flex flex-col gap-8 font-sans border border-gray-50 ">
            {/* Header */}
            <div className="flex items-center gap-3">
                <IoFilter className="text-primary text-2xl" />
                <h2 className="text-2xl font-bold text-text-primary">Filters</h2>
            </div>

            {/* Delivery Section */}
            <DeliveryFilter value={delivery} onChange={setDelivery} />

            {/* Rating Section */}
            <RatingFilter value={minRating} onChange={setMinRating} />

            {/* Price Section */}
            <PriceFilter value={priceRange} onChange={setPriceRange} />

            {/* Apply & Clear Buttons */}
            <ButtonsFilter
                delivery={delivery}
                minRating={minRating}
                priceRange={priceRange}
                setDelivery={setDelivery}
                setMinRating={setMinRating}
                setPriceRange={setPriceRange}
            />
        </div>
    );
};

export default FilterSection;