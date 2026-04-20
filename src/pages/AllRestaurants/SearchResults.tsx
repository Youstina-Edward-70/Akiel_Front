import SearchBox_PopularTags from "./components/SearchBox_PopularTagsSection"
import FilterSection from "./components/Filter/FilterSection"
import ResultsSection from "./components/Results/ResultsSection"

const SearchResults = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* search box and popular tags filter section */}
            <SearchBox_PopularTags />

            <div className="flex flex-col md:flex-row">
                {/* Filter Section */}
                <FilterSection />

                {/* search results section */}
                <ResultsSection />
            </div>
        </div>
    )
}

export default SearchResults