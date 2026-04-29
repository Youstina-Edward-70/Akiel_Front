import { useSearchParams, useNavigate } from "react-router-dom"
import type { FilterData } from "../../../types/SearchSchema";

export const useSearchActions = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const selectedCuisines = searchParams.getAll('cuisineType');
    const searchQuery = searchParams.get('searchQuery') || '';

    const handleTagClick = (tagName: string) => {
        const params = new URLSearchParams(searchParams);
        const currentCuisines = params.getAll('cuisineType');
        
        if(currentCuisines.includes(tagName)) {
            const filtered = currentCuisines.filter(c => c !== tagName);
            params.delete('cuisineType');
            filtered.forEach(c => params.append('cuisineType', c));
        } else {
            params.append('cuisineType', tagName);
        }
        params.set('page', '1');

        if (window.location.pathname !== '/search') {
            navigate(`/search?${params.toString()}`);
        } else {
            setSearchParams(params, { replace: true });
        }
    };

    const applyFilters = (filters: FilterData) => {
        const params = new URLSearchParams(searchParams);

        // Delivery Filter
        if (filters.delivery.have && !filters.delivery.dontHave) {
            params.set("delivery", "true");
        } else if (!filters.delivery.have && filters.delivery.dontHave) {
            params.set("delivery", "false");
        } else {
            params.delete("delivery");
        }

        // Rating & Price
        params.set("minRating", filters.minRating.toString());
        params.set("price", filters.priceRange);

        params.set("page", "1");
        setSearchParams(params, {replace: true});
    };

    const clearFilters = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('searchQuery', searchQuery);
        selectedCuisines.forEach(c => params.append('cuisineType', c));
        setSearchParams(params, { replace: true });
    };

return { 
        selectedCuisines,
        searchQuery,
        handleTagClick, 
        searchParams, 
        setSearchParams, 
        applyFilters, 
        clearFilters 
    };
}
