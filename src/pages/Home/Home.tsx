import HeroSection from "./components/HeroSection";
import PopularRestaurants from "./components/PopularRestaurants";
import Categories from "./components/Categories";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero / Search Section */}
            <HeroSection />

            {/* Popular Restaurants */}
            <PopularRestaurants />

            {/* Categories */}
            <Categories />
        </div>
    )
}

export default Home