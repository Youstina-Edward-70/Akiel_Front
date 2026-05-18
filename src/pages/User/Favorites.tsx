import { useFavorites } from "./hooks/useFavorites";
import FavoriteCard from "./ui/FavoriteCard";
import EmptyFavorites from "./ui/EmptyFavorites";

const Favorites = () => {
    const { favorites, isLoading, handleRemoveFavorite } = useFavorites();

    if (isLoading) return <div className="min-h-screen bg-surface flex items-center justify-center font-sans text-text-muted">Loading...</div>;

    return (
        <div className="min-h-screen bg-surface pb-16 font-sans text-left">
            <div className="bg-background border-b border-border-light">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex flex-col gap-2 mb-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-[28px] font-heading font-black text-text-primary">My Favorites</h1>
                            <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-bold">
                                {favorites.length} Restaurants
                            </span>
                        </div>
                        <p className="text-text-secondary text-sm font-medium max-w-xl leading-relaxed mt-1">
                            Your curated list of must-visit spots. From traditional Koshary to the finest grills across Egypt.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12">
                {favorites.length === 0 ? (
                    <EmptyFavorites />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((rest) => (
                            <FavoriteCard 
                                key={rest._id || rest.id} 
                                rest={rest} 
                                onRemove={handleRemoveFavorite} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;