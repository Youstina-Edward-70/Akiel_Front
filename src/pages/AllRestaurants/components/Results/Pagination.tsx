import { useSearchParams } from "react-router-dom";
import type { PaginationProps } from "../../../../types/SearchSchema";
import Button from "../../../../ui/Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const Pagination = ({ totalPages }: PaginationProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const onPageChange = (page: number) => {
        if (page === currentPage) return;

        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());

        setSearchParams(params);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getVisiblePages = () => {
        const pages = [];
        const delta = 1; // number of pages around the current page

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

    // if (totalPages <= 1) return null;
    console.log("Total Pages in Pagination:", totalPages)

    return (
        <div className="flex justify-center items-center gap-2 mt-12 mb-8">
            <Button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                variant="normal"
                className="w-10 h-10 p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
            >
                <FaAngleLeft />
            </Button>

            <div className="flex items-center gap-1">
            {getVisiblePages().map((page:number | string, idx:number) => (
                page === "..." ? (
                    <span key={`dots-${idx}`} className="px-2 text-gray-400">...</span>
                ) : (
                <Button
                    key={page}
                    onClick={() => onPageChange(Number(page))}
                    className={`w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-100`}
                    variant={`${currentPage === page
                        ? 'primary'
                        : 'normal'
                        }`}
                >
                    {page}
                </Button>
            )))}
            </div>

            <Button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                variant="normal"
                className="w-10 h-10 p-2 rounded-lg border border-gray-200 hover:bg-gray-100"            >
                <FaAngleRight />
            </Button>
        </div>
    );
};