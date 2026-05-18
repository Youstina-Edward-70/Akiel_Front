import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../lib/api";
import { API_ENDPOINTS } from "../../../../lib/EndPoints";
import type { Restaurant } from "../../../../types/RestaurantSchema";
import { useSearchActions } from "../../../../features/search/hooks/useSearchActions";
import RestaurantCard from "../../ui/RestaurantCard";
import { RestaurantCardSkeleton } from "../../ui/SkeletonRestaurantCard";
import { Pagination } from "../../../../features/search/Pagination";
import NoResults from "./NoResults";
import SearchError from "./SearchError";

export default function SearchPage() {
    const { searchParams } = useSearchActions();

    // Reading from URL searchQuery
    const cuisineTypes = searchParams.getAll("cuisineType");
    const searchQuery = searchParams.get("searchQuery");

    // Fetching data based on searchParams
    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryKey: ["restaurants-search", searchParams.toString()],
        queryFn: async () => {
            const res = await axiosInstance.get(API_ENDPOINTS.RESTAURANTS.LIST, {
                params: searchParams
            });
            return res.data;
        },
        placeholderData: (previousData) => previousData,
        retry: 1,
    });

    // State to hold restaurant list and total pages for pagination
    const restaurantList: Restaurant[] = data?.Data || [];
    const totalPages = data?.meta?.pagesCount || 1;

    // Change Page Title based on query
    const getPageTitle = () => {
        if (searchQuery) return `Results for "${searchQuery}"`;
        if (cuisineTypes.length > 0) return `Found Results for "${cuisineTypes.join(', ')}"`;
        return "Popular Restaurants in Egypt";
    };

    if (isError) return <SearchError onRetry={refetch} />;

    return (
        <div className="max-w-7xl grow px-6 py-10 md:text-left font-sans">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-text-primary">{getPageTitle()}</h1>
                <p className="text-text-secondary mt-2 italic">Discover the best Egyptian flavors near you.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                <main className="w-full">
                    {/* Loading State */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => <RestaurantCardSkeleton key={i} />)}
                        </div>
                    ) : restaurantList.length > 0 ? (
                        // Results Found
                        <div>
                            {/* Restaurants List Result */}
                            <div className="relative">
                                {isFetching && (
                                    <div className="absolute inset-0 bg-white/60 rounded-2xl z-10 flex items-center justify-center">
                                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {restaurantList.map((rest) => (
                                        <RestaurantCard
                                            key={rest._id}
                                            {...rest}
                                            coverPhoto={rest.coverPhoto || null}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 &&
                                <div className="mt-16 border-t border-gray-200 pt-8">
                                    <Pagination totalPages={totalPages} />
                                </div>
                            }
                        </div>
                    ) : (
                        // No Results Found
                        <div className="py-10">
                            <NoResults searchTerm={searchQuery || cuisineTypes.join(', ') || ""} />
                        </div>
                    )}
                </main>
            </div >
        </div >
    );
}