interface RequestHeroProps {
    coverUrl: string;
    name: string;
    cuisines: string[];
    rejectionCount: number;
    maxLimit: number;
}

export const RequestHero = ({ coverUrl, name, cuisines, rejectionCount, maxLimit }: RequestHeroProps) => {
    return (
        <div className="relative h-64 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <img src={coverUrl} alt={name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="space-y-2 text-white">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${rejectionCount >= maxLimit ? 'bg-red-500' : 'bg-red-600'}`}>
                        Rejections: {rejectionCount}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-black">{name}</h1>
                    <p className="text-gray-300 text-sm font-medium">{cuisines.join(' · ')}</p>
                </div>
            </div>
        </div>
    );
};