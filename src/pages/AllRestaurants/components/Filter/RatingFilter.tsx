import { IoStarOutline } from "react-icons/io5";

interface RatingFilterProps {
    value: number;
    onChange: (val: number) => void;
}

const RatingFilter = ({ value, onChange }: RatingFilterProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-text-primary">Minimum Rating</h3>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => onChange(star)}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all border cursor-pointer active:scale-90
                            ${star <= value
                                ? 'bg-yellow-50 border-yellow-200 text-yellow-500'
                                : 'bg-gray-50 border-gray-100 text-gray-300 hover:border-gray-200'}`}>
                        <IoStarOutline className="text-lg" />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default RatingFilter;