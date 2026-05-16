import { useRef, useState } from "react";
import useRestaurantDetails from "../../hooks/useRestaurantDetails";
import { useAuthStore } from "../../../../store/authStore";
import { IoImageOutline, IoTrashOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import Button from "../../../../ui/Button";
import ConfirmPopUp from "../../../../ui/ConfirmPopUp";

interface CoverProps {
    restaurantId: string;
    isOwner: boolean;
    isFavorite: boolean;
    onToggleFavorite: () => void;
};

const CoverActions = ({
    restaurantId,
    isOwner,
    isFavorite,
    onToggleFavorite
}: CoverProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { user } = useAuthStore();
    const role = user?.role;

    const { updateCover, isUpdatingCover, deleteCover, isDeletingCover } = useRestaurantDetails(restaurantId);

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateCover(file);
            e.target.value = "";
        }
    };

    const showHeartButton = !isOwner && role !== 'admin';

    return (
        <div className="flex items-center gap-3">
            {isOwner ? (
                <>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleCoverChange}
                    />
                    <Button
                        variant="normal"
                        onClick={() => setIsDeleteModalOpen(true)}
                        disabled={isDeletingCover}
                        className="w-14 h-14 rounded-full bg-white shadow-xl hover:bg-gray-50 flex items-center justify-center transition-all"
                    >
                        <IoTrashOutline className="text-primary text-2xl" />
                    </Button>

                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUpdatingCover}
                        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all"
                    >
                        <IoImageOutline className="text-white text-2xl" />
                    </Button>

                    <ConfirmPopUp
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={() => {
                            deleteCover();
                            setIsDeleteModalOpen(false);
                        }}
                        title="Delete Cover Photo"
                        message="Are you sure you want to remove the cover photo?"
                        variant="danger"
                    />
                </>
            ) : (
                showHeartButton && (
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
                )
            )}
        </div>
    );
};

export default CoverActions;