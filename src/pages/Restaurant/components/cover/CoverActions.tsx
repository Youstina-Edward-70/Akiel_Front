import { useNavigate } from "react-router-dom";
import { IoSettingsOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import Button from "../../../../ui/Button";

const CoverActions = ({
    restaurantId,
    isOwner,
    isFavorite,
    onToggleFavorite
}: {
    restaurantId: string;
    isOwner: boolean;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center gap-3">
            {isOwner ? (
                <Button
                    variant="primary"
                    onClick={() => navigate(`/edit-restaurant/${restaurantId}`)}
                    className="px-8 py-4 rounded-2xl shadow-xl group/edit"            >
                    <IoSettingsOutline className="h-5 w-5 group-hover/edit:rotate-90 transition-transform duration-500" />
                    <span>Edit Restaurant</span>
                </Button>
            ) : (
                <button
                    onClick={onToggleFavorite}
                    className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all active:scale-90 shadow-2xl cursor-pointer group/heart"
                >
                    {isFavorite ? (
                        <IoHeart className="text-red-500 h-6 w-6 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    ) : (
                        <IoHeartOutline className="text-white h-6 w-6 group-hover/heart:text-red-400 transition-colors" />
                    )}
                </button>
            )}
        </div>
    );
};

export default CoverActions;