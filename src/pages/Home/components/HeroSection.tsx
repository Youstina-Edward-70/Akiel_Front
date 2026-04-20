import Search from "../../../features/search/Search"

const HeroSection = () => {
    return (
        <section className="py-16 bg-(image:--image-hero-overlay) bg-cover bg-center bg-no-repeat w-full h-125 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Discover the Best <br />
                    <span className="text-[#FFD54F]">Restaurants</span> in Egypt
                </h1>
                <p className="text-sm opacity-80 mb-8">
                    From hidden street food gems to luxury dining experiences.
                </p>
                {/* Search Box */}
                <Search placeholder="Search for restaurants, cuisines, or dishes..." />
            </div>
        </section>
    )
}

export default HeroSection