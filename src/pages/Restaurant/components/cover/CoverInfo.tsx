const CoverInfo = ({ name, cuisineType }: { name: string;cuisineType: string[] }) => (
    <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tighter drop-shadow-md">
            {name}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-medium opacity-90">
            {Array.isArray(cuisineType)
                ? cuisineType.join(' • ')
                : cuisineType}
        </p>
    </div>
);

export default CoverInfo;