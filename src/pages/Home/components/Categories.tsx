import { useSearchActions } from "../../../features/search/hooks/useSearchActions";
import { CuisineTypes } from "../../../types/constants";
import Button from "../../../ui/Button";

const CategoriesSection = () => {
    const { handleTagClick } = useSearchActions();

    return (
        <section className="py-16">
            <div className="max-w-7xl container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-text-primary mb-4">
                        Browse by Cuisine
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        From local favorites to international delicacies, find exactly what you're craving.
                    </p>
                </div>
                <div className="flex flex-wrap gap-5 justify-center my-16">
                    {CuisineTypes.map((cat) => {
                        const Icon = cat.icon;

                        return (
                            <Button
                                key={cat.id}
                                variant="normal"
                                onClick={() => handleTagClick(cat.name)}
                                style={{ '--brand-color': cat.color } as React.CSSProperties}
                                className="group flex flex-col items-center justify-center w-30 h-30 rounded-full border-2 border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-2 hover:bg-(--brand-color) hover:border-(--brand-color) hover:text-white transition-all duration-300 "
                            >
                                <Icon
                                    className="text-3xl mb-3 text-(--brand-color) group-hover:text-white group-hover:scale-110 transition-all duration-300"
                                />
                                <span className="text-sm font-bold tracking-wide">
                                    {cat.name}
                                </span>
                            </Button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default CategoriesSection