import { useSearchParams } from "react-router-dom";
import Search from "../../../features/search/Search";
import { CuisineTypes } from "../../../types/constants";
import Button from "../../../ui/Button";

const SearchBox_PopularTags = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCuisines = searchParams.getAll("cuisineType")

    const handleTagClick = (cuisineName: string) => {
        const params = new URLSearchParams(searchParams);
        const currentSelected = params.getAll("cuisineType");

        if (currentSelected.includes(cuisineName)) {
            const updated = currentSelected.filter((name) => name !== cuisineName);
            params.delete("cuisineType");
            updated.forEach((name) => params.append("cuisineType", name));
        } else {
            params.append("cuisineType", cuisineName);
        }

        params.set("page", "1");
        setSearchParams(params);
    };

    return (
        <section className="w-full py-12 flex flex-col gap-4 bg-white p-6 shadow z-5">
            <div className="w-full flex justify-center">
                <Search placeholder="Search for restaurants or dishes..." />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                <span className="text-gray-500 font-medium text-sm whitespace-nowrap">
                    Popular:
                </span>

                <div className="flex items-center gap-2 overflow-x-auto p-2 no-scrollbar">
                    {CuisineTypes.map((cuisine) => {
                        const isActive = selectedCuisines.includes(cuisine.name);
                        const Icon = cuisine.icon;
                        return (
                            <Button
                                key={cuisine.id}
                                onClick={() => handleTagClick(cuisine.name)}
                                variant="outline"
                                style={{
                                    borderColor: isActive ? cuisine.color : '',
                                    backgroundColor: isActive ? cuisine.color : ''
                                }}
                                className={`
                                    flex items-center gap-2 px-5 py-2.5 rounded-full text-sm whitespace-nowrap transition-all duration-300 border
                                    ${isActive
                                        ? 'text-white shadow-lg transform scale-105'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                    }
                                `}
                            >

                                <Icon
                                    className={`text-lg ${isActive ? 'text-white' : ''}`}
                                    style={{ color: !isActive ? cuisine.color : '' }}
                                />

                                <span className="font-medium">{cuisine.name}</span>
                            </Button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SearchBox_PopularTags;