import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchActions } from './hooks/useSearchActions';
import { IoSearch } from "react-icons/io5";
import Button from "../../ui/Button";

interface SearchProps {
    placeholder: string;
    paramName?: string;
    pageParamName?: string;
    redirectPath?: string;
}

export default function Search({ placeholder, paramName = "searchQuery", pageParamName = "page", redirectPath = "/search", }: SearchProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const { queryValue, handleSearch, isHomePage } = useSearchActions({
        paramName,
        pageParamName,
        redirectPath,
    });

    const debouncedSearch = useDebouncedCallback((value: string) => {
        if (!isHomePage) {
            handleSearch(value);
        }
    }, 400);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch(e.currentTarget.value);
        }
    };

    const handleButtonClick = () => {
        if (inputRef.current) {
            handleSearch(inputRef.current.value);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="relative flex-1">
                <input
                    ref={inputRef}
                    type="search"
                    name={paramName}
                    id={`search-${paramName}`}
                    className="peer block w-full h-12 rounded-full bg-white text-text-primary placeholder:text-text-muted py-3 pl-10 pr-32 text-sm outline-none transition-all shadow-sm relative [&::-webkit-search-cancel-button]:appearance-none"
                    placeholder={placeholder}
                    defaultValue={queryValue}
                    onChange={(e) => debouncedSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <IoSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-primary transition-colors" />

                <Button
                    onClick={handleButtonClick}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 py-1.5 px-6 text-sm rounded-full h-[75%]"
                >
                    Search
                </Button>
            </div>
        </div>
    );
}
