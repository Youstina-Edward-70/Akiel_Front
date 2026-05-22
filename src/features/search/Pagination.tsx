import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationProps {
    totalPages: number;
    paramName?: string; 
}

export const Pagination = ({ totalPages, paramName = "page" }: PaginationProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const currentPage = Number(searchParams.get(paramName)) || 1;

    const onPageChange = (page: number) => {
        if (page === currentPage) return;

        const params = new URLSearchParams(searchParams);
        params.set(paramName, page.toString());

        setSearchParams(params);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getVisiblePages = () => {
        const pages: (number | string)[] = [];
        const delta = 1;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...");
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 my-4 font-sans">
            <Button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                variant="normal"
                className="w-10 h-10 p-2 rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-40"
            >
                <FaAngleLeft size={14} />
            </Button>

            <div className="flex items-center gap-1">
                {getVisiblePages().map((page, idx) => {
                    if (page === "...") {
                        return (
                            <span 
                                key={`dots-${idx}`}
                                className="w-10 h-10 flex items-center justify-center text-gray-400 font-medium text-sm"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <Button
                            key={`page-${page}`}
                            onClick={() => onPageChange(Number(page))}
                            className="w-10 h-10 rounded-xl border border-gray-100 text-sm font-bold transition-all"
                            variant={currentPage === page ? 'primary' : 'normal'}
                        >
                            {page}
                        </Button>
                    );
                })}
            </div>

            <Button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                variant="normal"
                className="w-10 h-10 p-2 rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-40"
            >
                <FaAngleRight size={14} />
            </Button>
        </div>
    );
};

export default Pagination;