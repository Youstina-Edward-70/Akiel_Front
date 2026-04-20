// Filter Schema
export interface FilterData {
    delivery: { have: boolean; dontHave: boolean };
    minRating: number;
    priceRange: string;
}

export interface FilterSectionProps {
    onApply: (filters: FilterData) => void;
}

export interface ButtonsFilterProps {
    delivery: { have: boolean; dontHave: boolean };
    minRating: number;
    priceRange: number;
    setDelivery: React.Dispatch<React.SetStateAction<{ have: boolean; dontHave: boolean }>>;
    setMinRating: React.Dispatch<React.SetStateAction<number>>;
    setPriceRange: React.Dispatch<React.SetStateAction<number>>;
}

// Pagination Schema
export interface PaginationProps {
    totalPages: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
}