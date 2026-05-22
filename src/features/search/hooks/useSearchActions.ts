import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

interface UseSearchActionsOptions {
    paramName?: string;
    pageParamName?: string;
    redirectPath?: string;
}

interface FilterOptions {
    delivery?: { have: boolean; dontHave: boolean };
    minRating?: number;
    priceRange?: string;
}

export function useSearchActions({ paramName = "searchQuery", pageParamName = "page", redirectPath = "/search" }: UseSearchActionsOptions = {}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === "/";
    const queryValue = searchParams.get(paramName) || "";

    const buildParams = (value: string): URLSearchParams => {
        const params = new URLSearchParams(searchParams);
        if (value.trim()) {
            params.set(paramName, value.trim());
        } else {
            params.delete(paramName);
        }
        params.set(pageParamName, "1");
        return params;
    };

    const handleSearch = (value: string) => {
        const params = buildParams(value);

        if (isHomePage) {
            navigate(`${redirectPath}?${params.toString()}`);
        } else {
            setSearchParams(params);
        }
    };

    const clearSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.delete(paramName);
        params.set(pageParamName, "1");
        setSearchParams(params);
    };

    const applyFilters = ({ delivery, minRating, priceRange }: FilterOptions) => {
        const params = new URLSearchParams(searchParams);

        // Delivery
        params.delete("hasDelivery");
        if (delivery?.have && !delivery?.dontHave) params.set("hasDelivery", "true");
        if (!delivery?.have && delivery?.dontHave) params.set("hasDelivery", "false");

        // Rating
        if (minRating && minRating > 0) {
            params.set("minRating", minRating.toString());
        } else {
            params.delete("minRating");
        }

        // Price
        if (priceRange) {
            params.set("priceRange", priceRange);
        } else {
            params.delete("priceRange");
        }

        params.set(pageParamName, "1");
        setSearchParams(params);
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("hasDelivery");
        params.delete("minRating");
        params.delete("priceRange");
        params.set(pageParamName, "1");
        setSearchParams(params);
    };

    return {
        searchParams,
        queryValue,
        handleSearch,
        clearSearch,
        isHomePage,
        applyFilters,
        clearFilters,
    };
}