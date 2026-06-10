import { useRef, useState } from "react";
import { IoImageOutline, IoTrashOutline, } from "react-icons/io5";
import Button from "../../../../../ui/Button";
import ConfirmPopUp from "../../../../../ui/ConfirmPopUp";
import useMyDashboard from "../../useMyDashboard";

const CoverActions = ({ restId }: { restId: string }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { updateCover, isUpdatingCover, deleteCover, isDeletingCover } = useMyDashboard(restId!);

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateCover(file);
            e.target.value = "";
        }
    };

    return (
        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
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
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl hover:bg-gray-50 flex items-center justify-center transition-all"
                >
                    <IoTrashOutline className="text-primary text-xl md:text-2xl" />
                </Button>

                <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUpdatingCover}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl flex items-center justify-center transition-all"
                >
                    <IoImageOutline className="text-white text-xl md:text-2xl" />
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

        </div>
    );
};

export default CoverActions;