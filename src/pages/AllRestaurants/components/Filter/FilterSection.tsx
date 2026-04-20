import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import DeliveryFilter from "./DeliveryFilter";
import RatingFilter from "./RatingFilter";
import PriceFilter from "./PriceFilter";
import ButtonsFilter from "./ButtonsFilter";

const FilterSection = () => {
    const [delivery, setDelivery] = useState({ have: true, dontHave: false });
    const [minRating, setMinRating] = useState(4);
    const [priceRange, setPriceRange] = useState(0);

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