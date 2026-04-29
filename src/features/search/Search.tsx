import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import Button from "../../ui/Button";
import { IoSearch } from "react-icons/io5";

export default function Search({ placeholder }: { placeholder: string }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const currentQuery = searchParams.get('searchQuery') || '';
    const isHomePage = location.pathname === '/';

    const updateUrl = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (value.trim()) params.set('searchQuery', value.trim());
        else params.delete('searchQuery');

        if (isHomePage) {
            navigate(`/search?${params.toString()}`);
        } else {
            navigate(`?${params.toString()}`, { replace: true });
        }
    };

    const debouncedSearch = useDebouncedCallback((value: string) => {
        if (!isHomePage) {
            updateUrl(value);
        }
    }, 400);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateUrl(e.currentTarget.value);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-2 w-full max-w-5xl">
            <div className="relative flex-1">
                <input
                    key={currentQuery}
                    type='search'
                    name='searchQuery'
                    id='search'
                    className="peer block w-full h-12 rounded-full bg-white text-text-primary placeholder:text-text-muted py-3 pl-10 pr-32 text-sm outline-none transition-all shadow-sm relative [&::-webkit-search-cancel-button]:appearance-none"
                    placeholder={placeholder}
                    defaultValue={currentQuery}
                    onChange={(e) => debouncedSearch(e.target.value) }
                    onKeyDown={handleKeyDown}
                />
                <IoSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-primary transition-colors" />

                <Button onClick={() => {
                    const input = document.getElementById('search') as HTMLInputElement
                    updateUrl(input.value)
                }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 py-1.5 px-6 text-sm rounded-full h-[75%]">
                    Search
                </Button>
            </div>
        </div>
    );
}
